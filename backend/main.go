package main

import (
	"github.com/calcuff/investment-portal/backend/app"
	db "github.com/calcuff/investment-portal/backend/repo"
)

func main() {

	go func() { db.Init() }()
	// Create new app and start
	app := app.New()
	app.Start()

}
