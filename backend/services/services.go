package services

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"net/http"

	"../models"
)

func YahooSummary() models.YahooSummaryResponse {
	url := "https://apidojo-yahoo-finance-v1.p.rapidapi.com/market/get-quotes?region=US&lang=en&symbols=BAC%252CKC%253DF%252C002210.KS%252CIWM%252CAMECX"
	req, err := http.NewRequest("GET", url, nil)
	if err != nil {
		fmt.Println(err)
	}

	req.Header.Add("x-rapidapi-host", "apidojo-yahoo-finance-v1.p.rapidapi.com")
	req.Header.Add("x-rapidapi-key", "807803f5d0msh30ebe2386bcb87bp1d620djsnd4f62f748453")

	res, err := http.DefaultClient.Do(req)
	if err != nil {
		fmt.Println(err)
	}

	defer res.Body.Close()
	body, err := ioutil.ReadAll(res.Body)
	if err != nil {
		fmt.Println(err)
	}

	var marketSummary models.YahooSummaryResponse
	err = json.Unmarshal([]byte(body), &marketSummary)
	if err != nil {
		fmt.Println(err)
	}

	//fmt.Println(body)
	//fmt.Println(string(body))
	return marketSummary
}

// func GetQuotes(w http.ResponseWriter, r *http.Request) {
// 	payload := quotesByte()
// 	json.NewEncoder(w).Encode(payload)
// }
