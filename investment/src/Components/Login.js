import React, { Component } from 'react'
import {Link} from 'react-router-dom';
import axios from "axios";
import { Redirect } from "react-router-dom";

export default class Login extends Component {

    state = {
        email: '',
        password: '',
        redirect: null,
        loggedin: 0
      }

      
      onChange = (e) => {
        this.setState({
          [e.target.name]: e.target.value,
        });
      }

      onSubmit = async () => {
          const creds = {
            email: this.state.email,
            password: this.state.password
          };

          const headers = {'Content-Type': 'application/json' }

          console.log("Logging in...", creds)
          axios.post('http://localhost:8080/login', 
            {
                email: this.state.email,
                password: this.state.password
            },{headers: headers})
          .then(res =>{
            console.log("Data :", res.data)
            if ( res.data === true){
              this.setState({ redirect: "/", loggedin: 1});
            }else {
                this.setState({loggedin: -1});
              }
          }
          ).catch((error) => 
            console.log("Errs", error)
        );
    }

      render() {
        if (this.state.redirect) {
          return <Redirect to={this.state.redirect} />
      }
        return (
          <div align="center">
               <div className="card"> </div>
                 <h5 className="card-body" align="center">Welcome Back</h5>
                 <h6 className="card-subtitle mb-2 text-muted"> New users register below
                    <Link to="/register" className="nav-link">
                            CREATE ACCOUNT
                    </Link>
                 </h6>
            <table>
                <tbody>
                    <tr>
                        <td>
                            <label style={{marginRight: "10px", marginLeft:"23px"}}>Email:</label>
                            <input
                                name='email'
                                placeholder='Email'
                                onChange={e => this.onChange(e)}
                                value={this.state.email} />
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <label style={{marginRight: "10px"}}>Password:</label>
                            <input
                                name='password'
                                placeholder='Password'
                                type='password'
                                onChange={e => this.onChange(e)}
                                value={this.state.password} />
                        </td>
                    </tr>
                </tbody>
            </table>
            <br />
            { this.state.loggedin === -1 && <p>Your login credentials could not be verified, please try again.</p>}
            <button onClick={() => this.onSubmit()} type="primary">Login</button>
          </div>
        );
      }
    }

