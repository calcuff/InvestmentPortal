import React, { Component } from 'react'
import axios from "axios";
import Title from './Title'
import UserProfile from './UserProfile';
import Button from 'react-bootstrap/Button';

export default class QuoteResults extends React.Component {
    // State will apply to the posts object which is set to loading by default
    state = {
      quotes: null,
      isLoading: true,
      errors: null,
      rendered: false,
      tickers: '',
      quantity: 1
    };

    getQuotes = async () =>{

      var tickers = UserProfile.getTickers()
      console.log("Got tickers in results: ", tickers);
      console.log("Before call")
        
        axios.get("https://apidojo-yahoo-finance-v1.p.rapidapi.com/market/get-quotes?region=US&lang=en&symbols="+tickers, {
            headers: {
                'x-rapidapi-host': 'apidojo-yahoo-finance-v1.p.rapidapi.com',
                'x-rapidapi-key' : '807803f5d0msh30ebe2386bcb87bp1d620djsnd4f62f748453',
                'Content-Type': 'application/json' 
            }
        }).then(response =>{
          this.setState({
            quotes: response.data,
            isLoading: false,
            rendered: true
          });
          console.log("Got data: ", response.data)
          console.log("Symbol1: ", this.state.quotes.quoteResponse.result[0].symbol);
          //, this.state.completed.ResultSet.Result[0].name ); 
        })
        .catch(error => {
            console.log("Error: " + error)
        });
    
    }

    

    onSubmit(name, symbol, price )  {
      var date = new Date().toDateString()

      console.log("Buying...", name)
      console.log("User: ", UserProfile.getName())

      const headers = {'Content-Type': 'application/json' }
            axios.post('http://localhost:8080/buy', 
                {   name: name,
                    symbol: symbol,
                    price: price,
                    quantity: 1,
                    holder: UserProfile.getName(),
                    purchaseDate: date
                },{headers: headers})
            .then(res =>{
                console.log("Data :", res.data)
                if ( res.data == true){
                    console.log("Success you bought a stock!")
                }else {
                  console.log("Error you don't have enough funds!")
                  }
            }).catch((error) => console.log("Errs", error));
    }

    IncrementItem = () => {
          this.setState({
              quantity: this.state.quantity + 1 
          });
    }

    DecreaseItem = () => {
          this.setState({ 
            quantiy: this.state.quantity - 1 
          });
    }

    render() {
        var tickers = UserProfile.getTickers()
        if (this.state.isLoading) {
            {this.getQuotes()}
            return (
              <div className="col">
                Loading...
              </div>
            );}else if (tickers == ''){
                return (
                    <div className="col">
                      No Symbols were inputted  ... Return to previous screen
                    </div>
                )
            }
            else { 
        return (
            <React.Fragment>
               <Title name="Quote Results"/>
                <div className="py-5" style={{textAlign:"center"}}>
                <div>Quotes for your companies:</div>
                    {this.state.quotes.quoteResponse.result.map((result => 
                    <div className="card bg-info text-white" style={{width:"300px", alignItems:"center", margin:"0 auto"}}>
                    <div className="card-body" key={result.symbol} ></div>
                    <h6 className="card-title">{result.symbol}</h6>
                    <h6 className="card-title">{result.longName}</h6>
                    <h6 className="card-title">${result.regularMarketPrice}</h6>
                      <div>
                          <button onClick={this.DecreaseItem}>-</button>
                          <input className="inputne" value={this.state.quantity} style={{textAlign:"center",width:"50px"}}/>
                          <button onClick={this.IncrementItem}>+</button>
                      </div>
                    <Button className="btn btn-dark"  onClick={() => this.onSubmit(result.longName, result.symbol, result.regularMarketPrice)}>BUY
                    </Button>
                    </div>))}
                </div>
            </React.Fragment>
        );
                }
    }
}