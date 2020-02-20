import React, { Component } from 'react'
import Title from './Title'
import {Link} from 'react-router-dom'
import axios from "axios";

let endpoint = "http://localhost:8080";

export default class Quotes extends Component {
    constructor(props) {
        super(props);
        this.state = {
          error: null,
          isLoaded: false,
          items: []
        };
      }

      componentDidMount() {
        console.log("BEFORE CALL")
        fetch("http://localhost:8080/Quotes")
        //   .then(res => res.json()) 
          .then(
            (result) => {
            console.log("AFTER CALL: ", result)
              this.setState({
                isLoaded: true,
                items: result.items
              });
            },

            (error) => {
                console.log("ERROR: ",error)
              this.setState({
                isLoaded: true,
                error
              });
            }
          )
      }

    render() {
        return (
            
            <React.Fragment>
                <div className="py-5">
                <div className="container">
                    <Title name="Quotes go here"/>
                    
                </div>
                </div>
            </React.Fragment>
        );
    }
}