import React, { Component } from 'react'
import Title from '../Title'
import {Link} from 'react-router-dom'
import Headers from './Headers'
import DataTable from './DataTable'
import data from '../../images/dater.jpg'
import UserProfile from '../UserProfile';
import axios from "axios";

export default class Portfolio extends Component {
    state = {
        queried: false
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
            completed: response.data,
            queried: true,
          });
          console.log("Got data: ", this.state.completed)
          console.log("Symbol1: ", this.state.completed.data[0].symbol, this.state.completed.data[0].name ); 
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
                        <Headers></Headers>
                    
                    </div> 
                    <DataTable/>
                </div>
            </React.Fragment>
        );
    }
}