import React, { Component } from 'react'
import axios from "axios";
import chicago from '../../images/chicago.jpg'
import NavBar from '../Common/NavBar'
import Card from 'react-bootstrap/Card'


export default class Summary extends React.Component {
    state = {
      markets: [],
      isLoading: true,
      errors: null
    };

    getPosts() {
        console.log("Before call")
      axios.get("https://apidojo-yahoo-finance-v1.p.rapidapi.com/market/get-summary?region=US&lang=en", {
            headers: {
                'x-rapidapi-host': 'apidojo-yahoo-finance-v1.p.rapidapi.com',
                'x-rapidapi-key' : '807803f5d0msh30ebe2386bcb87bp1d620djsnd4f62f748453',
                'Content-Type': 'application/json' 
            }
        }).then(response =>{
          this.setState({
            markets: response.data,
            isLoading: false
          });
          console.log("Got data: ", response.data)
        })
        .catch(error => {
            console.log("Error: " + error)
        });
    }

    componentDidMount() {
      this.getPosts();
    }

    render() {
      const { errors, isLoading, markets } = this.state;
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
           <div style={{ backgroundImage:`url(${chicago})` }}>
              <NavBar/> 
              <br/>
              <div style={{marginLeft:"100px",color:"white", fontSize:"24px", backgroundColor: "rgba(52, 52, 52, .4)", width:"300px"}} >
                <h2 >Today's Market Summary</h2>
              </div>
          <div  className="container" >
            {markets.marketSummaryResponse.result.map((result => 
            <div  style={{paddingLeft:"300px"}}>
             
              <Card bg="dark" text="white" style={{ width: '35rem' }}>
                <Card.Header as="h5">{result.shortName}</Card.Header>
                <Card.Body>
                <Card.Title>{result.fullExchangeName}</Card.Title>
                  <Card.Text>
                  <h6 className="card-subtitle mb-2"> Market Price:  $ {result.regularMarketPrice.fmt}</h6>
                  <h6 className="card-subtitle mb-2 ">Market Change:  $ {result.regularMarketChange.fmt}</h6>
                  <h6 className="card-subtitle mb-2"> Market Change Percent: {result.regularMarketChangePercent.fmt}</h6>
                  <h6 className="card-subtitle mb-2"> Market Previous Close: $ {result.regularMarketPreviousClose.fmt}</h6>
                  <h6 className="card-subtitle mb-2 text-muted"> Exchange: {result.exchange}</h6>
                  <h6 className="card-subtitle mb-2 text-muted"> Quote Type: {result.quoteType}</h6>
                  <h6 className="card-subtitle mb-2 text-muted"> Market State: {result.marketState}</h6>
                  <h6 className="card-subtitle mb-2 text-muted"> Market Time: {result.regularMarketTime.fmt}</h6>
                  <h6 className="card-subtitle mb-2 text-muted"> Time Zone: {result.exchangeTimezoneName}</h6>
                  <h6 className="card-subtitle mb-2 text-muted"> Symbol: {result.symbol}</h6>
                  </Card.Text>
                </Card.Body>
              </Card>
              
              
              <br/> <br/> <br/>
              </div>
              
            ))}
        </div>
        </div>
        </React.Fragment>
      );
        }
    }
}