package app

import (
	"fmt"
	"log"
	"net/http"

	"../models"

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
	router := NewRouter(AllRoutes())
	// Enable CORS to make API accessible by client-side
	handler := cors.Default().Handler(router)
	// Start server
	fmt.Println("Starting server on :8080")
	log.Fatal(http.ListenAndServe(":8080", handler))
	return nil
}

func NewRouter(routes models.Routes) *httprouter.Router {
	router := httprouter.New()
	for _, route := range routes {
		var handle httprouter.Handle
		handle = route.HandlerFunc
		router.Handle(route.Method, route.Path, handle)
	}

	fmt.Println("Set up all the routes")
	return router
}

func AllRoutes() models.Routes {
	routes := models.Routes{
		models.Route{"Summary", "GET", "/summary", api.Summary},
		models.Route{"Register", "POST", "/register", api.Register},
		models.Route{"Login", "POST", "/login", api.Login},
	}
	return routes
}
