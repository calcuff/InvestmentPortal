package services

import (
	"encoding/json"
	"errors"
	"fmt"
	"io/ioutil"
	"log"
	"math"
	"net/http"

	"../models"
	db "../repo"
)

func YahooSummary() models.YahooResponse {
	url := "https://apidojo-yahoo-finance-v1.p.rapidapi.com/market/get-quotes?region=US&lang=en&symbols=BAC%252CKC%253DF%252C002210.KS%252CIWM%252CAMECX"
	req, err := http.NewRequest("GET", url, nil)
	if err != nil {
		fmt.Println(err)
	}

	req.Header.Add("x-rapidapi-host", "apidojo-yahoo-finance-v1.p.rapidapi.com")
	req.Header.Add("x-rapidapi-key", "807803f5d0msh30ebe2386bcb87bp1d620djsnd4f62f748453")
	req.Header.Add("Content-Type", "application/json")

	res, err := http.DefaultClient.Do(req)
	if err != nil {
		fmt.Println(err)
	}

	body, err := ioutil.ReadAll(res.Body)
	if err != nil {
		fmt.Println(err)
	}
	defer res.Body.Close()

	//var result map[string]interface{}
	var marketSummary models.YahooResponse

	err = json.Unmarshal(body, &marketSummary)
	if err != nil {
		fmt.Println(err)
	}

	return marketSummary
}

func Register(user models.User) error {
	fmt.Println("Registering in services")

	err := db.Register(user)
	if err != nil {
		return err
	}

	return nil
}

func Login(creds models.Creds) error {
	fmt.Println("Logging in in services")
	err := db.Login(creds)
	if err != nil {
		return err
	}
	return nil
}

func Buy(opt models.Option) error {
	fmt.Println("Buying in services")

	balance, err := db.GetBalance(opt.Holder)
	if err != nil {
		return err
	}

	quant := float64(opt.Quantity)
	salePrice := opt.Price * quant

	if balance < salePrice {
		return errors.New("Not enough funds")
	}

	if err := db.Buy(opt); err != nil {
		return err
	}

	updatedBal := balance - salePrice
	if err = db.UpdateBalance(updatedBal, opt.Holder); err != nil {
		return err
	}

	return nil
}

func Portfolio(creds models.Creds) ([]models.Portfolio, error) {
	fmt.Println("Portfolioing in services", creds.Email)

	var portfolio []models.Portfolio

	options, err := db.Portfolio(creds.Email)
	if err != nil {
		return portfolio, err
	}

	groupedOpts := group(options)

	var symbols []string
	for _, entry := range groupedOpts {
		symbols = append(symbols, entry.Symbol)
	}

	currentPricesList, err := GetCurrentPrices(symbols)
	if err != nil {
		log.Println("Error getting current price")
	}

	portfolio, err = makePortfolio(currentPricesList, groupedOpts)
	if err != nil {
		return nil, err
	}

	return portfolio, nil
}

func makePortfolio(currentQuotes []models.CurrentQuote, groupedOpts []models.Portfolio) ([]models.Portfolio, error) {
	var retPortfolio []models.Portfolio
	var entry models.Portfolio

	for _, option := range groupedOpts {
		entry.Symbol = option.Symbol
		entry.Name = option.Name
		entry.Shares = option.Shares
		entry.AvgCost = math.Round(option.TotalCost/float64(option.Shares)*100) / 100

		for _, quote := range currentQuotes {
			if option.Symbol == quote.Symbol {
				entry.Price = quote.Price
			}
		}

		entry.PercentChange = calcPercentChange(entry.Price, entry.AvgCost)
		entry.Change = math.Round((entry.Price-entry.AvgCost)*100) / 100
		entry.TotalCost = option.TotalCost
		entry.MarketValue = math.Round(entry.Price*float64(entry.Shares)*100) / 100
		entry.Return = math.Round((entry.MarketValue-entry.TotalCost)*100) / 100

		log.Println("Entry name: ", entry.Name)
		retPortfolio = append(retPortfolio, entry)
	}

	return retPortfolio, nil
}

func calcPercentChange(currentPrice float64, avgCost float64) float64 {
	diff := currentPrice - avgCost
	percent := diff / avgCost * 100
	return math.Round(percent*100) / 100
}

// Return an array of options with just symbol price filled in
func GetCurrentPrices(symbols []string) ([]models.CurrentQuote, error) {
	var returnedQuotes []models.CurrentQuote
	var quote models.CurrentQuote

	log.Println("Calling Yahho API")
	baseURL := "https://apidojo-yahoo-finance-v1.p.rapidapi.com/market/get-quotes?region=US&lang=en&symbols="

	url := baseURL
	for i, symbol := range symbols {
		url += symbol
		if i != len(symbols)-1 {
			url += "%252C"
		}
	}

	log.Println("url: ", url)
	req, err := http.NewRequest("GET", url, nil)
	if err != nil {
		fmt.Println(err)
	}

	req.Header.Add("x-rapidapi-host", "apidojo-yahoo-finance-v1.p.rapidapi.com")
	req.Header.Add("x-rapidapi-key", "807803f5d0msh30ebe2386bcb87bp1d620djsnd4f62f748453")
	req.Header.Add("Content-Type", "application/json")

	res, err := http.DefaultClient.Do(req)
	if err != nil {
		fmt.Println(err)
	}

	body, err := ioutil.ReadAll(res.Body)
	if err != nil {
		fmt.Println(err)
	}
	defer res.Body.Close()

	var marketSummary models.MyJsonName

	err = json.Unmarshal(body, &marketSummary)
	if err != nil {
		fmt.Println(err)
	}

	log.Println("Length :", len(marketSummary.QuoteResponse.Result))

	for _, company := range marketSummary.QuoteResponse.Result {
		quote.Symbol = company.Symbol
		quote.Price = company.RegularMarketPrice

		returnedQuotes = append(returnedQuotes, quote)
	}

	log.Println("length of ret: ", len(returnedQuotes))
	return returnedQuotes, nil
}

func group(options []models.Option) []models.Portfolio {
	var retPortfolio []models.Portfolio
	tempPortfolio := make([]models.Portfolio, len(options))
	used := make([]bool, len(options))

	for i := 0; i < len(options); i++ {
		if !used[i] {
			tempPortfolio[i].Name = options[i].Name
			tempPortfolio[i].Symbol = options[i].Symbol
			tempPortfolio[i].Shares = options[i].Quantity
			tempPortfolio[i].TotalCost = float64(options[i].Quantity) * options[i].Price
			used[i] = true
		}
		for j := i + 1; j < len(options); j++ {
			if options[i].Symbol == options[j].Symbol && !used[j] {
				tempPortfolio[i].Shares += options[j].Quantity
				tempPortfolio[i].TotalCost += float64(options[j].Quantity) * options[j].Price
				used[j] = true
			}
		}
	}

	for _, entry := range tempPortfolio {
		if entry.Symbol != "" {
			retPortfolio = append(retPortfolio, entry)
		}
	}

	return retPortfolio
}

func Balance(creds models.Creds) (float64, error) {
	balance, err := db.GetBalance(creds.Email)
	if err != nil {
		return 0, err
	}

	return math.Round(balance*100) / 100, nil
}
