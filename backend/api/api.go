package api

import (
	"fmt"
	"net/http"

	"../services"
	"github.com/julienschmidt/httprouter"
)

// func GetQuotes(w http.ResponseWriter, r *http.Request) {
// 	payload := getAPIquotes()
// 	json.NewEncoder(w).Encode(payload)
// }

// Dummy Summary endpoint
func Summary(w http.ResponseWriter, r *http.Request, _ httprouter.Params) {
	//fmt.Fprint(w, "Getting Summary!\n")
	resp := services.YahooSummary()
	//json.NewEncoder(w).Encode(resp)
	fmt.Fprint(w, resp)
}
