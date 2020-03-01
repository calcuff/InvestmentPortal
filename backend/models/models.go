package models

// type YahooSummaryResponse struct {
// 	MarketSummaryResponse struct {
// 		Result []struct {
// 			FullExchangeName     string `json:"fullExchangeName"`
// 			ExchangeTimezoneName string `json:"exchangeTimezoneName"`
// 			Symbol               string `json:"symbol"`
// 			RegularMarketChange  struct {
// 				Raw float64 `json:"raw"`
// 				Fmt string  `json:"fmt"`
// 			} `json:"regularMarketChange"`
// 			GmtOffSetMilliseconds int    `json:"gmtOffSetMilliseconds"`
// 			ExchangeDataDelayedBy int    `json:"exchangeDataDelayedBy"`
// 			Language              string `json:"language"`
// 			RegularMarketTime     struct {
// 				Raw int    `json:"raw"`
// 				Fmt string `json:"fmt"`
// 			} `json:"regularMarketTime"`
// 			RegularMarketChangePercent struct {
// 				Raw float64 `json:"raw"`
// 				Fmt string  `json:"fmt"`
// 			} `json:"regularMarketChangePercent"`
// 			ExchangeTimezoneShortName string `json:"exchangeTimezoneShortName"`
// 			QuoteType                 string `json:"quoteType"`
// 			MarketState               string `json:"marketState"`
// 			RegularMarketPrice        struct {
// 				Raw float64 `json:"raw"`
// 				Fmt string  `json:"fmt"`
// 			} `json:"regularMarketPrice"`
// 			Market                     string `json:"market"`
// 			QuoteSourceName            string `json:"quoteSourceName"`
// 			PriceHint                  int    `json:"priceHint"`
// 			Tradeable                  bool   `json:"tradeable"`
// 			SourceInterval             int    `json:"sourceInterval"`
// 			Exchange                   string `json:"exchange"`
// 			Region                     string `json:"region"`
// 			ShortName                  string `json:"shortName"`
// 			RegularMarketPreviousClose struct {
// 				Raw float64 `json:"raw"`
// 				Fmt string  `json:"fmt"`
// 			} `json:"regularMarketPreviousClose"`
// 			Triggerable bool `json:"triggerable"`
// 		} `json:"result"`
// 		Error interface{} `json:"error"`
// 	} `json:"marketSummaryResponse"`
// }

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
