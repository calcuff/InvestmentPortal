package app

import (
	"fmt"
	"log"
	"net/http"

	"../api"
	"github.com/rs/cors"

	"github.com/julienschmidt/httprouter"
)

type App struct{}

func New() *App {
	return &App{}
}

func (a *App) Start() error {
	// Set up new router
	router := httprouter.New()
	// /Quotes endpoint
	router.GET("/Summary", api.Summary)
	// Enable CORS to make API accessible by client-side
	handler := cors.Default().Handler(router)
	// Start server
	fmt.Println("Starting server on :8080")
	log.Fatal(http.ListenAndServe(":8080", handler))
	return nil
}
