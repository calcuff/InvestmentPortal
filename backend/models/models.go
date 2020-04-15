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

type CurrentQuote struct {
	Symbol string  `json:"symbol"`
	Price  float64 `json:"price"`
}

type Portfolio struct {
	Symbol        string  `json:"symbol"`
	Name          string  `json:"name"`
	Price         float64 `json:"price"`
	PercentChange float64 `json:"percentChange"`
	Change        float64 `json:"change"`
	Shares        int     `json:"shares"`
	AvgCost       float64 `json:"avg_cost"`
	TotalCost     float64 `json:"total_cost"`
	MarketValue   float64 `json:"market_value"`
	Return        float64 `json:"return"`
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

type MyJsonName struct {
	QuoteResponse struct {
		Error  interface{} `json:"error"`
		Result []struct {
			Ask                           float64  `json:"ask"`
			AskSize                       int64    `json:"askSize"`
			AverageDailyVolume3Month      int64    `json:"averageDailyVolume3Month"`
			Beta                          float64  `json:"beta"`
			Bid                           float64  `json:"bid"`
			BidSize                       int64    `json:"bidSize"`
			Components                    []string `json:"components"`
			Currency                      string   `json:"currency"`
			DividendRate                  float64  `json:"dividendRate"`
			DividendYield                 float64  `json:"dividendYield"`
			DividendsPerShare             float64  `json:"dividendsPerShare"`
			EarningsTimestamp             int64    `json:"earningsTimestamp"`
			EarningsTimestampEnd          int64    `json:"earningsTimestampEnd"`
			EarningsTimestampStart        int64    `json:"earningsTimestampStart"`
			EpsTrailingTwelveMonths       float64  `json:"epsTrailingTwelveMonths"`
			EsgPopulated                  bool     `json:"esgPopulated"`
			Exchange                      string   `json:"exchange"`
			ExchangeDataDelayedBy         int64    `json:"exchangeDataDelayedBy"`
			ExchangeTimezoneName          string   `json:"exchangeTimezoneName"`
			ExchangeTimezoneShortName     string   `json:"exchangeTimezoneShortName"`
			FiftyTwoWeekHigh              float64  `json:"fiftyTwoWeekHigh"`
			FiftyTwoWeekHighChange        float64  `json:"fiftyTwoWeekHighChange"`
			FiftyTwoWeekHighChangePercent float64  `json:"fiftyTwoWeekHighChangePercent"`
			FiftyTwoWeekLow               float64  `json:"fiftyTwoWeekLow"`
			FiftyTwoWeekLowChange         float64  `json:"fiftyTwoWeekLowChange"`
			FiftyTwoWeekLowChangePercent  float64  `json:"fiftyTwoWeekLowChangePercent"`
			FiftyTwoWeekRange             string   `json:"fiftyTwoWeekRange"`
			FirstTradeDateMilliseconds    int64    `json:"firstTradeDateMilliseconds"`
			FullExchangeName              string   `json:"fullExchangeName"`
			GmtOffSetMilliseconds         int64    `json:"gmtOffSetMilliseconds"`
			Language                      string   `json:"language"`
			LongName                      string   `json:"longName"`
			Market                        string   `json:"market"`
			MarketCap                     int64    `json:"marketCap"`
			MarketState                   string   `json:"marketState"`
			MessageBoardID                string   `json:"messageBoardId"`
			PageViews                     struct {
				LongTermTrend  string `json:"longTermTrend"`
				MidTermTrend   string `json:"midTermTrend"`
				ShortTermTrend string `json:"shortTermTrend"`
			} `json:"pageViews"`
			PriceHint                  int64   `json:"priceHint"`
			QuoteSourceName            string  `json:"quoteSourceName"`
			QuoteType                  string  `json:"quoteType"`
			Region                     string  `json:"region"`
			RegularMarketChange        float64 `json:"regularMarketChange"`
			RegularMarketChangePercent float64 `json:"regularMarketChangePercent"`
			RegularMarketDayHigh       float64 `json:"regularMarketDayHigh"`
			RegularMarketDayLow        float64 `json:"regularMarketDayLow"`
			RegularMarketDayRange      string  `json:"regularMarketDayRange"`
			RegularMarketOpen          float64 `json:"regularMarketOpen"`
			RegularMarketPreviousClose float64 `json:"regularMarketPreviousClose"`
			RegularMarketPrice         float64 `json:"regularMarketPrice"`
			RegularMarketTime          int64   `json:"regularMarketTime"`
			RegularMarketVolume        int64   `json:"regularMarketVolume"`
			SharesOutstanding          int64   `json:"sharesOutstanding"`
			ShortName                  string  `json:"shortName"`
			SourceInterval             int64   `json:"sourceInterval"`
			Symbol                     string  `json:"symbol"`
			TargetPriceMean            float64 `json:"targetPriceMean"`
			Tradeable                  bool    `json:"tradeable"`
			TrailingPE                 float64 `json:"trailingPE"`
			Triggerable                bool    `json:"triggerable"`
		} `json:"result"`
	} `json:"quoteResponse"`
}
