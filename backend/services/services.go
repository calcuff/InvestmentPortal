package services

import (
	"encoding/json"
	"errors"
	"fmt"
	"io/ioutil"
	"log"
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

	var options []models.Option
	var portfolio []models.Portfolio

	options, err := db.Portfolio(creds.Email)
	if err != nil {
		return portfolio, err
	}

	for _, option := range options {
		entry, err := makePortfolio(option)
		if err != nil {
			return portfolio, err
		}
		log.Println("Entry name: ", entry.Name)
		portfolio = append(portfolio, entry)
	}

	return portfolio, nil
}

func makePortfolio(option models.Option) (models.Portfolio, error) {
	var entry models.Portfolio

	entry = models.Portfolio{
		Symbol:  option.Symbol,
		Name:    option.Name,
		Shares:  option.Quantity,
		AvgCost: option.Price,
	}

	return entry, nil
}
