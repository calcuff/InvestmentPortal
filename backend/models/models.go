package models

import "github.com/julienschmidt/httprouter"

type Route struct {
	Name        string
	Method      string
	Path        string
	HandlerFunc httprouter.Handle
}

type Routes []Route

type User struct {
	Name     string `json:"name"`
	Email    string `json:"email"`
	Role     string `json:"role"`
	Phone    string `json:"phone"`
	Password string `json:"password"`
	Balance  string `json:"balance"`
}

type Creds struct {
	Email    string `json:"email"`
	Password string `json:"password"`
}

type Option struct {
	Name         string  `json:"name"`
	Symbol       string  `json:"symbol"`
	Price        float64 `json:"price"`
	Quantity     int     `json:"quantity"`
	Holder       string  `json:"holder"`
	PurchaseDate string  `json:"purchaseDate"`
}

type JsonResponse struct {
	// Reserved field to add some meta information to the API response
	Meta interface{} `json:"meta"`
	Data interface{} `json:"data"`
}

type JsonErrorResponse struct {
	Error *ApiError `json:"error"`
}

type ApiError struct {
	Status int    `json:"status"`
	Title  string `json:"title"`
}

type YahooResponse struct {
	MarketSummaryResponse MarketSummaryResponse `json:"marketSummaryResponse"`
}

type MarketSummaryResponse struct {
	Results []*Result   `json:"result"`
	Error   interface{} `json:"error"`
}
type Result struct {
	FullExchangeName           string                     `json:"fullExchangeName"`
	ExchangeTimezoneName       string                     `json:"exchangeTimezoneName"`
	Symbol                     string                     `json:"symbol"`
	RegularMarketChange        RegularMarketChange        `json:"regularMarketChange"`
	GmtOffSetMilliseconds      int                        `json:"gmtOffSetMilliseconds"`
	ExchangeDataDelayedBy      int                        `json:"exchangeDataDelayedBy"`
	Language                   string                     `json:"language"`
	RegularMarketTime          RegularMarketTime          `json:"regularMarketTime"`
	RegularMarketChangePercent RegularMarketChangePercent `json:"regularMarketChangePercent"`
	ExchangeTimezoneShortName  string                     `json:"exchangeTimezoneShortName"`
	QuoteType                  string                     `json:"quoteType"`
	MarketState                string                     `json:"marketState"`
	RegularMarketPrice         RegularMarketPrice         `json:"regularMarketPrice"`
	Market                     string                     `json:"market"`
	QuoteSourceName            string                     `json:"quoteSourceName"`
	PriceHint                  int                        `json:"priceHint"`
	Tradeable                  bool                       `json:"tradeable"`
	SourceInterval             int                        `json:"sourceInterval"`
	Exchange                   string                     `json:"exchange"`
	Region                     string                     `json:"region"`
	ShortName                  string                     `json:"shortName"`
	RegularMarketPreviousClose RegularMarketPreviousClose `json:"regularMarketPreviousClose"`
}

type RegularMarketChange struct {
	Raw float64 `json:"raw"`
	Fmt string  `json:"fmt"`
}
type RegularMarketTime struct {
	Raw int    `json:"raw"`
	Fmt string `json:"fmt"`
}
type RegularMarketChangePercent struct {
	Raw float64 `json:"raw"`
	Fmt string  `json:"fmt"`
}
type RegularMarketPrice struct {
	Raw float64 `json:"raw"`
	Fmt string  `json:"fmt"`
}
type RegularMarketPreviousClose struct {
	Raw float64 `json:"raw"`
	Fmt string  `json:"fmt"`
}
