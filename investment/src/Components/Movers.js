import React, { Component } from 'react'
import axios from "axios";
import chicago from '../images/chicago.jpg'
import NavBar from './NavBar'


export default class Movers extends React.Component {
    state = {
      stocks: [],
      isLoading: true,
      errors: null
    };

    getPosts() {
        console.log("Before call")
      axios.get("https://apidojo-yahoo-finance-v1.p.rapidapi.com/market/get-movers?region=US&lang=en", {
            headers: {
                'x-rapidapi-host': 'apidojo-yahoo-finance-v1.p.rapidapi.com',
                'x-rapidapi-key' : '807803f5d0msh30ebe2386bcb87bp1d620djsnd4f62f748453',
                'Content-Type': 'application/json' 
            }
        }).then(response =>{
          this.setState({
            stocks: response.data,
            isLoading: false
          });
          console.log("Got data: ", response.data)
        })
        .catch(error => {
            console.log("Error: " + error)
        });
    }

    // Let's our app know we're ready to render the data
    componentDidMount() {
      this.getPosts();
    }

    render() {
      const { errors, isLoading, stocks } = this.state;
      if (isLoading) {
        return (
          <div style={{ backgroundImage:`url(${chicago})`, backgroundSize: "cover" }}>
          <NavBar/>
            <div className="col">
              Loading...
            </div>
          </div>
        );}
        else { 
            return (
            <React.Fragment>   
              <div style={{ backgroundImage:`url(${chicago})`, backgroundSize: "cover" }}>
                <NavBar/> 
               
                <h2>Market Movers</h2>
                <div className="container">
                {stocks.finance.result.map((result => 
                <div className="card">
                  <div className="card-body" key={result.id} >
                    <h5 className="card-title">{result.title}</h5>
                    <h6 className="card-subtitle mb-2 text-muted">{result.description}</h6>
                      {result.quotes.map((stock => 
                      <div >
                        <h5 className="card-subtitle mb-2"> {stock.fullExchangeName}</h5>
                        <h5 className="card-subtitle mb-2"> {stock.symbol}</h5>
                      </div>))}
                  </div>
                </div>))}
              </div>
            </div>
            </React.Fragment>
          );
        }
    }
}