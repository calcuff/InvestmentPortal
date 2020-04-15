import React, { Component } from 'react'
import Title from '../Title'
import {Link} from 'react-router-dom'
import Headers from './Headers'
import DataTable from './DataTable'
import data from '../../images/dater.jpg'
import UserProfile from '../UserProfile';
import axios from "axios";

export default class Portfolio extends Component {
    constructor(props){
        super(props);
        this.state = {
            queried: false,
            portfolioData : null,
            color: 'red'
        }
    }

    onSubmit = async () => {
        const creds = {
            email: UserProfile.getName(),
            password: ''
          };

        console.log("Getting portfolio..", creds)
        const headers = {'Content-Type': 'application/json' }

        axios.get('http://localhost:8080/portfolio/' + creds.email, 
        {headers: headers}).then(response =>{
          this.setState({
            portfolioData: response.data,
            queried: true,
          });
          console.log("Got data: ", this.state.portfolioData)
          console.log("Symbol1: ", this.state.portfolioData.data[0].symbol, this.state.portfolioData.data[0].name ); 
        })
        .catch(error => {
            console.log("Error: " + error)
        })
    }


    render() {
        if (!this.state.queried){
            this.onSubmit()
        }
        return (
            <React.Fragment>
                <div  style={{ backgroundImage:`url(${data})`, backgroundSize:"cover"}}>
                    <div className="py-5">
                        <div className="container">
                            <Title name="Portfolio"/>
                        </div>
                        {/* {this.onSubmit} */}
                        <Headers />
                    
                    </div> 
                    <DataTable portfolioData={this.state.portfolioData}/>
                </div>
            </React.Fragment>
        );
    }
}