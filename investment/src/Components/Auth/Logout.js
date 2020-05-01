import React, { Component } from 'react'
import {Link} from 'react-router-dom';
import axios from "axios";
import { Redirect } from "react-router-dom";
import UserProfile from '../UserProfile';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

export default class Logout extends Component {
    state = {
        redirect: ''
      }

      logout = () => {
        var name = UserProfile.getName();
        console.log("name " + name)
        UserProfile.setName('');
        this.setState({ redirect: "/"});
      }

      stayLoggedIn = () => {
        this.setState({ redirect: "/"});
      }
      

      render() {

        if (this.state.redirect) {
          return <Redirect to={this.state.redirect} />
      }
        return (
            <React.Fragment>
          <div align="center">
               <p> Welcome {UserProfile.getName()}</p>
                 <h5 className="card-body" align="center">{' '}</h5>
                 
            

            <Card style={{ width: '18rem' }}>
                <Card.Body>
                    <Card.Title>Are you sure you want to logout?</Card.Title>
                    <Card.Text>
                    You could be missing out on a lot of money if you do.
                    </Card.Text>
                    <Button variant="outline-dark" onClick={this.logout}>Yes  </Button> {' '}
                    <Button variant="dark" onClick={this.stayLoggedIn}>No</Button>
                </Card.Body>
            </Card>
           
          </div>
          </React.Fragment>
        );
      }
    }

