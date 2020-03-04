package main

import (
	"./app"
	db "./repo"
)

func main() {
	
	go func() { db.Init() }()
	// Create new app and start
	app := app.New()
	app.Start()

}
