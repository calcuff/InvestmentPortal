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
          
          <div className="container">
            {markets.marketSummaryResponse.result.map((result => 
            <div className="card">
                   <div className="card-body" key={result.fullExchangeName} >
                   <h5 className="card-title">{result.fullExchangeName}</h5>
                   <h6 className="card-subtitle mb-2 text-muted">Time Zone: {result.exchangeTimezoneName}</h6>
                   <h6 className="card-subtitle mb-2 text-muted">Symbol: {result.symbol}</h6>
                   <h6 className="card-subtitle mb-2 text-muted">Market Change: {result.regularMarketChange.fmt}</h6>
                   <h6 className="card-subtitle mb-2 text-muted"> Market Time: {result.regularMarketTime.fmt}</h6>
                   <h6 className="card-subtitle mb-2 text-muted"> Market Change Percent: {result.regularMarketChangePercent.fmt}</h6>
                   <h6 className="card-subtitle mb-2 text-muted"> Quote Type: {result.quoteType}</h6>
                   <h6 className="card-subtitle mb-2 text-muted"> Market State: {result.marketState}</h6>
                   <h6 className="card-subtitle mb-2 text-muted"> Market Price: {result.regularMarketPrice.fmt}</h6>
                   <h6 className="card-subtitle mb-2 text-muted"> Exchange: {result.exchange}</h6>
                   <h6 className="card-subtitle mb-2 text-muted"> Short Name: {result.shortName}</h6>
                   <h6 className="card-subtitle mb-2 text-muted"> Market Previous Close: {result.regularMarketPreviousClose.fmt}</h6>
                   </div>
            </div>))}
        </div>
        </React.Fragment>
      );
        }
    }
}