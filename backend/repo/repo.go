package db

import (
	"database/sql"
	"errors"
	"fmt"
	"log"
	"strconv"

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

	err := ifExists(user.Email)
	if err != nil {
		return err
	}

	db := Init()
	stmt, err := db.Prepare("INSERT INTO users (name, email, role, phone, password, balance) VALUES ($1, $2, $3, $4, $5, $6)")
	if err != nil {
		fmt.Println("error preparing: ", err)
		return err
	}

	_, err = stmt.Query(&user.Name, &user.Email, &user.Role, &user.Phone, &user.Password, 10000)

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
	defer db.Close()

	if !rows.Next() {
		fmt.Println("Did not find creds")
		return sql.ErrNoRows
	} else {
		fmt.Println("Found good creds")
		return nil
	}

}

func Buy(opt models.Option) error {
	fmt.Println("buying in repo")

	db := Init()

	stmt, err := db.Prepare("INSERT INTO options (name, symbol, price, quantity, holder, date) VALUES ($1, $2, $3, $4, $5, $6)")
	if err != nil {
		fmt.Println("error preparing: ", err)
		return err
	}

	_, err = stmt.Query(&opt.Name, &opt.Symbol, &opt.Price, &opt.Quantity, &opt.Holder, &opt.PurchaseDate)

	defer db.Close()

	if err != nil {
		fmt.Println("ERROR Execing: ", err)
		return err
	}

	fmt.Println("Bought in repo")
	return nil
}

func Portfolio(email string) ([]models.Option, error) {
	fmt.Println("folioing in repo")
	var id int
	var opt models.Option
	options := make([]models.Option, 0)

	db := Init()

	stmt, err := db.Prepare("select * from options where holder = $1")
	if err != nil {
		log.Fatal(err)
	}

	rows, err := stmt.Query(&email)
	if err != nil {
		log.Fatal(err)
	}

	defer rows.Close()
	if !rows.Next() {
		log.Println("Did not find user in database")
	}
	for {
		if rows.Next() {
			err := rows.Scan(&id, &opt.Name, &opt.Symbol, &opt.Price, &opt.Quantity, &opt.Holder, &opt.PurchaseDate)
			if err != nil {
				log.Fatal(err)
			}
			log.Println("Option Name ", opt.Name)
			log.Println("Option holder ", opt.Holder)
			options = append(options, opt)
		} else {
			break
		}
	}

	err = rows.Err()
	if err != nil {
		log.Fatal(err)
	}

	return options, nil
}

func ifExists(email string) error {
	db := Init()

	stmt, err := db.Prepare("select * from users where email = $1")

	rows, err := stmt.Query(&email)
	if err != nil {
		fmt.Println("ERROR IN REPO: ", err)
		return err
	}

	defer rows.Close()
	defer db.Close()

	if rows.Next() {
		fmt.Println("Email already exists")
		return errors.New("Unique email constraint")
	} else {
		fmt.Println("No user exists")
		return nil
	}

}

func GetBalance(email string) (float64, error) {
	fmt.Println("Getting balance")
	var balance float64
	var user models.User
	var id int

	db := Init()

	stmt, err := db.Prepare("select * from users where email = $1")
	if err != nil {
		log.Fatal(err)
	}

	rows, err := stmt.Query(&email)
	if err != nil {
		log.Fatal(err)
	}

	defer rows.Close()
	if rows.Next() {
		err := rows.Scan(&id, &user.Name, &user.Email, &user.Role, &user.Phone, &user.Password, &user.Balance)
		if err != nil {
			log.Fatal(err)
		}
		log.Println("Balance in repo: ", user.Balance)
	} else {
		log.Println("Did not find user in database")
	}

	err = rows.Err()
	if err != nil {
		log.Fatal(err)
	}

	if balance, err = strconv.ParseFloat(user.Balance, 64); err != nil {
		return 0, err
	}

	return balance, nil
}

func UpdateBalance(updatedBalance float64, email string) error {
	fmt.Println("Updating balance")

	db := Init()

	sqlStatement := `
		UPDATE users
		SET balance = $1
		WHERE email = $2;`

	_, err := db.Exec(sqlStatement, &updatedBalance, &email)
	if err != nil {
		return err
	}

	defer db.Close()

	fmt.Println("Updated balance in repo")
	return nil

}

func RemoveOptions(opt models.Option) error {
	var id int
	var dbOpt models.Option
	fmt.Println("Removing shares in DB")

	db := Init()

	// sort options by date FIFO
	stmt, err := db.Prepare("select * from options where holder = $1 and symbol = $2 ORDER BY date")

	rows, err := stmt.Query(&opt.Holder, &opt.Symbol)
	if err != nil {
		fmt.Println("ERROR IN REPO: ", err)
		return err
	}

	defer rows.Close()
	defer db.Close()

	for opt.Quantity > 0 {
		if rows.Next() {
			err := rows.Scan(&id, &dbOpt.Name, &dbOpt.Symbol, &dbOpt.Price, &dbOpt.Quantity, &dbOpt.Holder, &dbOpt.PurchaseDate)
			if err != nil {
				log.Fatal(err)
			}

			//  if amount selling is less than this position, update DB and return
			if opt.Quantity < dbOpt.Quantity {
				log.Println("Updating # of shares in DB")

				dbOpt.Quantity -= opt.Quantity
				stmt, _ := db.Prepare("UPDATE options SET quantity = $1 WHERE id = $2;")

				rows, err := stmt.Query(&dbOpt.Quantity, &id)
				if err != nil {
					fmt.Println("ERROR IN REPO: ", err)
					return err
				}

				defer rows.Close()

				return nil
			} else { // We are selling more shares than this position, delete it and move on to next
				log.Println("DELETING row from DB")

				opt.Quantity -= dbOpt.Quantity
				stmt, _ := db.Prepare("DELETE FROM options WHERE id = $1")

				rows, err := stmt.Query(&id)
				if err != nil {
					fmt.Println("ERROR IN REPO: ", err)
					return err
				}

				defer rows.Close()
				log.Println("Quantity = ", opt.Quantity)
			}

		} else {
			return errors.New("Invalid selling quantity error")
		}
	}

	return nil
}
