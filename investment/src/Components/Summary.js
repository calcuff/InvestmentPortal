import React, { Component } from 'react'
import axios from "axios";

export default class Summary extends React.Component {
    // State will apply to the posts object which is set to loading by default
    state = {
      markets: [],
      isLoading: true,
      errors: null
    };
    // Now we're going to make a request for data using axios
    getPosts() {
        console.log("Before call")
      axios.get("https://apidojo-yahoo-finance-v1.p.rapidapi.com/market/get-summary?region=US&lang=en", {
            headers: {
                'x-rapidapi-host': 'apidojo-yahoo-finance-v1.p.rapidapi.com',
                'x-rapidapi-key' : '807803f5d0msh30ebe2386bcb87bp1d620djsnd4f62f748453',
                'Content-Type': 'application/json' 
            }
        }).then(response =>{
        // Once we get a response and store data, let's change the loading state
        // .then(result => {
          this.setState({
            markets: response.data,
            isLoading: false
          });
          console.log("Got data: ", response.data)
        })
        // If we catch any errors connecting, let's update accordingly
        .catch(error => {
            console.log("Error: " + error)
        });
    }
    // Let's our app know we're ready to render the data
    componentDidMount() {
      this.getPosts();
    }
    // Putting that data to use
    render() {
      const { errors, isLoading, markets } = this.state;
      if (isLoading) {
        return (
          <div className="col">
            Loading...
          </div>
        );}
        else { 
            return (
        <React.Fragment>    
          <h2>Today's Market Summary</h2>
          
          <div>
              <div> Exchange Name: {markets.marketSummaryResponse.result[0].fullExchangeName}</div>
              <div> Time Zone: {markets.marketSummaryResponse.result[0].exchangeTimezoneName}</div>
              <div> Symbol: {markets.marketSummaryResponse.result[0].symbol}</div>
              <div> Market Change: {markets.marketSummaryResponse.result[0].regularMarketChange.fmt}</div>
              <div> Market Time: {markets.marketSummaryResponse.result[0].regularMarketTime.fmt}</div>
              <div> Market Change Percent: {markets.marketSummaryResponse.result[0].regularMarketChangePercent.fmt}</div>
              <div> Quote Type: {markets.marketSummaryResponse.result[0].quoteType}</div>
              <div> Market State: {markets.marketSummaryResponse.result[0].marketState}</div>
              <div> Market Price: {markets.marketSummaryResponse.result[0].regularMarketPrice.fmt}</div>
              <div> Exchange: {markets.marketSummaryResponse.result[0].exchange}</div>
              <div> Short Name: {markets.marketSummaryResponse.result[0].shortName}</div>
              <div> Market Previous Close: {markets.marketSummaryResponse.result[0].regularMarketPreviousClose.fmt}</div>
              
              
              {/* {markets.marketSummaryResponse.map(result => <div>{result.fullExchangeName}</div>)} */}
          {/* <Results markets={this.state.markets} /> */}
          </div>
        </React.Fragment>
      );
        }
    }
}