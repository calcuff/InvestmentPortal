import React, { Component } from 'react'
import Button from 'react-bootstrap/Button';
import axios from "axios";

export default class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            portfolioCost: 0,
            marketValue : 0,
            dollarReturn: 0,
            percentReturn: 0,
            isLoading: true,
            balance: 0,
            gotBalance: 0
        }
    }

    calcHeaders(){
        let  pCost = 0, marketVal = 0, dolReturn = 0, percReturn = 0
        this.props.portfolioData.data.map((option, index) => {
            pCost += option.total_cost
            marketVal += option.market_value
        }) 
        
        dolReturn = marketVal - pCost
        percReturn = ( marketVal - pCost)/pCost *100

        this.setState({
            portfolioCost: parseFloat(pCost.toFixed(2)),
            marketValue: parseFloat(marketVal.toFixed(2)),
            dollarReturn: parseFloat(dolReturn.toFixed(2)),
            percentReturn: parseFloat(percReturn.toFixed(2)),
            isLoading: false
          });
         
    }

    getBalance = async () => {
        const creds = {
          email: this.props.user,
          password: '',
        };

        const headers = {'Content-Type': 'application/json' }

        axios.get('http://localhost:8080/balance/' + creds.email, 
        {headers: headers}).then(response =>{
          this.setState({
            balance: response.data.data,
            gotBalance: 1,
          });
          console.log("Got balance: ", this.state.balance)
        })
        .catch(error => {
            console.log("Error: " + error)
        })

  }

    componentDidMount() {
        this.calcHeaders();
      }

    render() {
        if (this.state.isLoading) {
            return (
              <div className="col">
                Loading...
              </div>
            );}
            else { 
        return (
            <React.Fragment>
                 <div className="row">
                        <div className="col-sm-3">
                            <div className="card text-white bg-success mb-3" style={{marginLeft:"50px", maxWidth:"20rem",height:"150px"}}>
                                <div className="card-header"> $ {this.state.dollarReturn}</div>
                                <div className="card-body">
                                    <p className="card-text">Overall Return</p>
                                    <h5 className="card-title">{this.state.percentReturn}%</h5>
                                </div>
                            </div>
                        </div>

                        <div className="col-sm-3">
                            <div className="card bg-light mb-3 border-dark" style={{maxWidth:"20rem", height:"150px"}}>
                                <div className="card-header">Portfolio Cost</div>
                                <div className="card-body">
                                    <p className="card-text"> </p>
                                    <h5 className="card-title" id="portfolioCost">$ {this.state.portfolioCost}</h5>
                                </div>
                            </div>
                        </div>

                        <div className="col-sm-3">
                            <div className="card text-white bg-dark mb-3" style={{maxWidth:"20rem", height:"150px"}}>
                                <div className="card-header">Portfolio Value</div>
                                <div className="card-body">
                                    <p className="card-text"> </p>
                                    <h5 className="card-title">$ {this.state.marketValue}</h5>
                                </div>
                            </div>
                        </div>

                        <div className="col-sm-3">
                            <div className="card bg-light mb-3 border-primary" style={{marginRight:"50px", maxWidth:"20rem", height:"150px"}}>
                                <div className="card-header">Account Balance</div>
                                <div className="card-body">
                                    <p className="card-text"> </p>
                                    { this.state.gotBalance === 1 && <p>$ {this.state.balance}</p>}
                                    { this.state.gotBalance === 0 &&<Button onClick={() => this.getBalance()}  variant="primary">View Account Balance</Button>}
                                </div>
                            </div>
                        </div>
                    </div>
            </React.Fragment>
        );
    }
}
}