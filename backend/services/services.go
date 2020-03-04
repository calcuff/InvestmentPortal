package services

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
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
