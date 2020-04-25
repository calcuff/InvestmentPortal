package api

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
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
		fmt.Println("Error populating registration")
		writeErrorResponse(w, http.StatusBadRequest, "Error with submitted body")
		return
	}

	err := services.Register(user)
	if err != nil {
		writeErrorResponse(w, http.StatusOK, "Could not register")
		return
	}
	fmt.Println("Returned to api")
	writeOKResponse(w, user)
}

func Login(w http.ResponseWriter, r *http.Request, params httprouter.Params) {
	fmt.Println("Logging in in api")
	creds := models.Creds{}

	if err := populateModelFromHandler(w, r, params, &creds); err != nil {
		fmt.Println("Error populating credentials")
		writeErrorResponse(w, http.StatusBadRequest, "Error with submitted body")
		return
	}

	err := services.Login(creds)
	if err != nil {
		writeErrorResponse(w, http.StatusOK, "Bad credentials")
		return
	}

	fmt.Println("Returned to api")
	writeOKResponse(w, creds)
	fmt.Fprint(w)
}

func Buy(w http.ResponseWriter, r *http.Request, params httprouter.Params) {
	fmt.Println("Buying in in api")

	opt := models.Option{}

	if err := populateModelFromHandler(w, r, params, &opt); err != nil {
		fmt.Println("Error populating option")
		writeErrorResponse(w, http.StatusBadRequest, "Error with submitted body")
		return
	}

	err := services.Buy(opt)
	if err != nil {
		writeErrorResponse(w, http.StatusOK, "Not enough funds")
		return
	}

	fmt.Println("Returned to api")
	writeOKResponse(w, opt)
	fmt.Fprint(w)
}

func Portfolio(w http.ResponseWriter, r *http.Request, params httprouter.Params) {
	fmt.Println("Portfolioing in in api")
	portfolio := []models.Portfolio{}

	creds := models.Creds{
		Email: params.ByName("email"),
	}

	portfolio, err := services.Portfolio(creds)

	if err != nil {
		writeErrorResponse(w, http.StatusBadRequest, "Error with submitted body")
		return
	}

	writeOKDataResponse(w, portfolio)
	fmt.Fprint(w)
}

func Balance(w http.ResponseWriter, r *http.Request, params httprouter.Params) {
	fmt.Println("Gteting balance in in api")

	creds := models.Creds{
		Email: params.ByName("email"),
	}
	log.Println("EMail : ", creds.Email)
	balance, err := services.Balance(creds)
	if err != nil {
		writeErrorResponse(w, http.StatusBadRequest, "Error with submitted body")
		return
	}

	writeOKDataResponse(w, balance)
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

// Writes the response as a standard JSON response with StatusOK
func writeOKResponse(w http.ResponseWriter, m interface{}) {
	w.Header().Set("Content-Type", "application/json; charset=UTF-8")
	w.WriteHeader(http.StatusOK)
	fmt.Fprintf(w, "true")
}

// Writes the error response as a Standard API JSON response with a response code
func writeErrorResponse(w http.ResponseWriter, errorCode int, errorMsg string) {
	w.Header().Set("Content-Type", "application/json; charset=UTF-8")
	w.WriteHeader(errorCode)
	json.
		NewEncoder(w).
		Encode(&models.JsonErrorResponse{Error: &models.ApiError{Status: errorCode, Title: errorMsg}})
	fmt.Fprintf(w, "false")
}

// Writes the response as a standard JSON response with StatusOK
func writeOKDataResponse(w http.ResponseWriter, m interface{}) {
	w.Header().Set("Content-Type", "application/json; charset=UTF-8")
	w.WriteHeader(http.StatusOK)
	if err := json.NewEncoder(w).Encode(&models.JsonResponse{Data: m}); err != nil {
		writeErrorResponse(w, http.StatusInternalServerError, "Internal Server Error")
	}
}
