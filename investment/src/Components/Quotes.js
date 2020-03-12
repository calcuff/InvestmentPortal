import React, { Component } from 'react'
import Title from './Title'
import {Link} from 'react-router-dom'
import Button from 'react-bootstrap/Button';
import axios from "axios";
import UserProfile from './UserProfile';
import { Redirect } from "react-router-dom";
import QuoteResults from './QuoteResults'
import {Route} from 'react-router-dom';


export default class Quotes extends Component {
    state = {
        symbols: '',
        query: '',
        completed: '',
        isQueryLoading: true,
        isTickerLoading: true,
        queried: 0,
        tickered: 0,
        redirect: null
    }

    onChange = (e) => {
        this.setState({
          [e.target.name]: e.target.value,
        });
      }

    onTickerSubmit = async () => {

        console.log(this.state.symbols);
        var tickers = this.parseTicker();
        console.log("Before call, Tickers: ", tickers);
        
        UserProfile.setTickers(tickers);
        
        if (tickers != ''){
            this.setState({ redirect: "/quoteResults", queried: 1});
        }
    }

    onQuerySubmit = async () => {
        console.log(this.state.query);
        var company = this.parseQuery();
        console.log("Before call, Company:", company);

        axios.get("https://apidojo-yahoo-finance-v1.p.rapidapi.com/market/auto-complete?lang=en&region=US&query="+company, {
            headers: {
                'x-rapidapi-host': 'apidojo-yahoo-finance-v1.p.rapidapi.com',
                'x-rapidapi-key' : '807803f5d0msh30ebe2386bcb87bp1d620djsnd4f62f748453',
                'Content-Type': 'application/json' 
            }
        }).then(response =>{
          this.setState({
            completed: response.data,
            isQueryLoading: false,
            queried: 1
          });
          console.log("Got data: ", response.data)
          console.log("Symbol1: ", this.state.completed.ResultSet.Result[0].symbol, this.state.completed.ResultSet.Result[0].name ); 
        })
        .catch(error => {
            console.log("Error: " + error)
        });
    }

    parseTicker = () =>{
        var string = this.state.symbols;
        string = string.split(',');
        var tickers = '';
        for( var i=0; i < string.length; i++){
            tickers += string[i];
            if(i != string.length-1){
                tickers += "%252C";
            }
        }
        return tickers;

    }
    parseQuery = () => {
        var string = this.state.query;
        string = string.split(' ');
        var company = '';
        for( var i=0; i < string.length; i++){
            company += string[i];
            if(i != string.length-1){
                company += "%20";
            }
        }
        return company;
    }

    validate = function(tickers)  {
        return {
            tickers: tickers.length === 0
        }
    }

    render() {
        if (this.state.redirect) {
            return <Redirect to={this.state.redirect} />
        }
        const errors = this.validate(this.state.symbols);
        const isDisabled = Object.keys(errors).some(x => errors[x]);

        if (this.state.tickered == 0){
        return (
            <React.Fragment>
                <div className="py-5">
                    <div className="container">
                        <Title name="Quotes"/>  
                    </div>
                </div>
                <div style={{display: "flex",justifyContent: "center",}}>
                    <label >
                        Enter comma separated stock symbols to get quotes
                    </label>
                </div>
                <div style={{display: "flex",justifyContent: "center",}}>
                    <input
                        name='symbols'
                        placeholder='Tickers'
                        style={{ width: "300px" }}
                        onChange={e => this.onChange(e)}
                        value={this.state.symbols} />
                </div>
                <br></br>
                <div style={{display: "flex",justifyContent: "center",}}>
                    <Button onClick={() => this.onTickerSubmit()} type="primary">Get Quotes</Button>
                </div>
                <br></br>
                <div style={{display: "flex",justifyContent: "center",}}>
                    <label >
                       Search by company name to get auto-complete results for trading symbols
                    </label>
                </div>
                <div style={{display: "flex",justifyContent: "center",}}>
                    <input
                        name='query'
                        placeholder='Company name or symbol'
                        style={{ width: "300px" }}
                        onChange={e => this.onChange(e)}
                        value={this.state.query} />
                </div>
                <br></br>
                <div style={{display: "flex",justifyContent: "center",}}>
                    <Button variant="secondary" onClick={() => this.onQuerySubmit()} type="primary">Auto-complete</Button>
                </div>

                { this.state.queried === 1 && this.state.isQueryLoading == false && <div className="container">
                    <div>Possible companies you were searching for:</div>
                        {this.state.completed.ResultSet.Result.map((result => 
                        <div className="card bg-info text-white" >
                            <div className="card-body" key={result.symbol} ></div>
                            <h6 className="card-title">{result.symbol}</h6>
                            <h6 className="card-title">{result.name}</h6>
                        </div>))}
                    </div>}
            </React.Fragment>
        );
        }
    }
}