import React, { Component } from 'react'
import {Link} from 'react-router-dom';
import axios from "axios";

export default class Login extends Component {
    state = {
        email: '',
        password: '',
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
          .then(res =>
            console.log("Data :", res.data)
          ).catch((error) => 
            console.log("Errs", error)
        );
    }

      render() {
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
            <button onClick={() => this.onSubmit()} type="primary">Login</button>
          </div>
        );
      }
    }

