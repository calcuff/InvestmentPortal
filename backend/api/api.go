package api

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"net/http"

	"../models"

	"../services"
	"github.com/julienschmidt/httprouter"
)

// Summary endpoint
func Summary(w http.ResponseWriter, r *http.Request, _ httprouter.Params) {
	//fmt.Fprint(w, "Getting Summary!\n")
	resp := services.YahooSummary()
	//json.NewEncoder(w).Encode(resp)
	fmt.Fprint(w, resp)
}

func Register(w http.ResponseWriter, r *http.Request, params httprouter.Params) {
	fmt.Println("Registering in api")
	user := models.User{}

	if err := populateModelFromHandler(w, r, params, &user); err != nil {
		fmt.Println("Error populating model")
		//write error
		return
	}

	err := services.Register(user)
	if err != nil {
		//write error
		return
	}
	fmt.Println("Returned to api")
	writeOKResponse(w, user)
	fmt.Fprint(w) //,resp
}

func Login(w http.ResponseWriter, r *http.Request, params httprouter.Params) {
	fmt.Println("Logging in in api")
	creds := models.Creds{}

	if err := populateModelFromHandler(w, r, params, &creds); err != nil {
		fmt.Println("Error populating model")
		//write error
		return
	}
	err := services.Login(creds)
	if err != nil {
		//write error
		return
	}
	fmt.Println("Returned to api")
	writeOKResponse(w, creds)
	fmt.Fprint(w) //,resp
}

func populateModelFromHandler(w http.ResponseWriter, r *http.Request, params httprouter.Params, model interface{}) error {
	body, err := ioutil.ReadAll(r.Body)
	if err != nil {
		return err
	}

	defer r.Body.Close()

	fmt.Println(body)
	if err := json.Unmarshal(body, &model); err != nil {
		fmt.Println("ERROR: ", err)
		return err
	}

	return nil
}

func writeOKResponse(w http.ResponseWriter, m interface{}) {
	w.Header().Set("Content-Type", "application/json; charset=UTF-8")
	w.WriteHeader(http.StatusOK)
}
