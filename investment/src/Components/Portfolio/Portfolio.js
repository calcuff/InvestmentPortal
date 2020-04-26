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
            user: null,
            isLoading: true,
            portfolioData : null,
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
            isLoading: false,
            user: creds.email,
          });
          console.log("The user is ", this.state.user)
          console.log("Got data: ", this.state.portfolioData)
          console.log("Symbol1: ", this.state.portfolioData.data[0].symbol, this.state.portfolioData.data[0].name ); 
        })
        .catch(error => {
            console.log("Error: " + error)
        })
    }

    componentDidMount() {
        this.onSubmit();
      }


    render() {
        const { isLoading, portfolioData} = this.state;
        if (isLoading) {
            return (
              <div className="col">
                Loading...
              </div>
            );}
            else { 
        return (
            <React.Fragment>
                <div  style={{ backgroundImage:`url(${data})`, backgroundSize:"cover"}}>
                    <div className="py-5">
                        <div className="container">
                            <Title name="Portfolio"/>
                        </div>
                        {/* {this.onSubmit} */}
                        <Headers user={this.state.user} portfolioData={this.state.portfolioData}/>
                    
                    </div> 
                    <DataTable portfolioData={this.state.portfolioData}/>
                </div>
            </React.Fragment>
        );
            }
        
    }
}