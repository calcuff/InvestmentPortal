package main

import (
	"log"
	"net/http"

	"./Router"
	"github.com/julienschmidt/httprouter"
	"github.com/rs/cors"
)

func main() {
	// Set up new router
	router := httprouter.New()
	// Endpoint and function from Router packahe
	router.GET("/Quotes", Router.Quotes)
	// Enable CORS to make API accessible by client-side
	handler := cors.Default().Handler(router)
	// Start server
	log.Fatal(http.ListenAndServe(":8080", handler))
}
