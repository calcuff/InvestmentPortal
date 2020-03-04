package db

import (
	"database/sql"
	"fmt"

	"../models"

	_ "github.com/lib/pq"
)

const (
	host     = "localhost"
	port     = 5432
	user     = "postgres"
	password = "calcuff"
	dbname   = "investment"
)

// Makes connection to DB and makes it available
func Init() *sql.DB {
	psqlInfo := fmt.Sprintf("host=%s port=%d user=%s "+
		"password=%s dbname=%s sslmode=disable",
		host, port, user, password, dbname)

	db, err := sql.Open("postgres", psqlInfo)
	if err != nil {
		panic(err)
	}

	fmt.Println("Successfully started DB!")

	return db
}

// Takes in a User model and inserts in into the database
func Register(user models.User) error {
	fmt.Println("Registering in DB")

	db := Init()
	stmt, err := db.Prepare("INSERT INTO users (name, email, role, phone, password) VALUES ($1, $2, $3, $4, $5)")
	if err != nil {
		fmt.Println("error preparing: ", err)
		return err
	}

	_, err = stmt.Query(&user.Name, &user.Email, &user.Role, &user.Phone, &user.Password)

	defer db.Close()

	if err != nil {
		fmt.Println("ERROR Execing: ", err)
		return err
	}

	fmt.Println("Registered in repo")
	return nil
}

// Takes in a Creds model and queries for user name and password, reports if found
func Login(creds models.Creds) error {
	fmt.Println("Logging in in DB")

	db := Init()

	stmt, err := db.Prepare("select * from users where email = $1 and password = $2")

	rows, err := stmt.Query(&creds.Email, &creds.Password)
	if err != nil {
		fmt.Println("ERROR IN REPO: ", err)
		return err
	}

	defer rows.Close()

	if !rows.Next() {
		fmt.Println("Did not find creds")
		return nil
	} else {
		fmt.Println("Found good creds")
	}

	defer db.Close()

	return nil
}
