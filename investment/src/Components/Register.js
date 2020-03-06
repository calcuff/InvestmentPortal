import React, { Component } from 'react'
import Title from './Title'
import {Link} from 'react-router-dom'
import axios from "axios";
import { Redirect } from "react-router-dom";

function validate(name, email, password, confpass){
    return {
        name: name.length === 0,
        email: email.length === 0,
        password: password.length === 0,
        confpass: confpass.length === 0
      };
  }

export default class Register extends Component {
    state = {
        name: '',
        email: '',
        role: '',
        phone: '',
        password: '',
        confpass: '',
        redirect: null,
        loggedin: 0,
        goodpassword: 0
      }

      onChange = (e) => {
        this.setState({
          [e.target.name]: e.target.value,
        });
      }

      onSubmit = async () => {
          if ( this.state.password != this.state.confpass){
            this.setState({goodpassword: -1});
          }else{
            console.log("Registering...", this.state)
            
            const headers = {'Content-Type': 'application/json' }
            axios.post('http://localhost:8080/register', 
                {   name: this.state.name,
                    email: this.state.email,
                    role: this.state.role,
                    phone: this.state.phone,
                    password: this.state.password
                },{headers: headers})
            .then(res =>{
                console.log("Data :", res.data)
                if ( res.data == true){
                    this.setState({ redirect: "/", loggedin: 1});
                }else {
                    this.setState({loggedin: -1});}
            }).catch((error) => console.log("Errs", error));
          }
        } // end of onSubmit

    render() {
        if (this.state.redirect) {
            return <Redirect to={this.state.redirect} />
        }

        const errors = validate(this.state.name, this.state.email, this.state.password, this.state.confpass);
        const isDisabled = Object.keys(errors).some(x => errors[x]);

        return( 
        <div align="center">
        <div className="card"> </div>
          <h5 className="card-body" align="center">Create an Account</h5>
          <h6 className="card-subtitle mb-2 text-muted"> Fill out the information below:
          </h6>
     <table>
         <tbody>
            <tr>
                 <td>
                     <label style={{marginRight: "10px", marginLeft:"73px"}}>Name:</label>
                     <input
                         name='name'
                         placeholder='Name'
                         onChange={e => this.onChange(e)}
                         value={this.state.name} />
                </td>
            </tr>
             <tr>
                 <td>
                     <label style={{marginRight: "10px", marginLeft:"73px"}}>Email:</label>
                     <input
                         name='email'
                         placeholder='Email'
                         onChange={e => this.onChange(e)}
                         value={this.state.email} />
                 </td>
             </tr>
             <tr>
                 <td>
                     <label style={{marginRight: "10px", marginLeft:"79px"}}>Role:</label>
                     <input
                         name='role'
                         placeholder='Role'
                         onChange={e => this.onChange(e)}
                         value={this.state.role} />
                 </td>
             </tr>
             <tr>
                 <td>
                     <label style={{marginRight: "10px", marginLeft:"21px"}}>Phone number:</label>
                     <input
                         name='phone'
                         placeholder='Phone'
                         onChange={e => this.onChange(e)}
                         value={this.state.phone} />
                 </td>
             </tr>
             <tr>
                 <td>
                     <label style={{marginRight: "10px", marginLeft:"49px"}}>Password:</label>
                     <input
                         name='password'
                         placeholder='Password'
                         type='password'
                         onChange={e => this.onChange(e)}
                         value={this.state.password} />
                 </td>
             </tr>
             <tr>
                 <td>
                     <label style={{marginRight: "10px"}}>Confirm password:</label>
                     <input
                         name='confpass'
                         placeholder='Password'
                         type='password'
                         onChange={e => this.onChange(e)}
                         value={this.state.confpass} />
                 </td>
             </tr>
         </tbody>
        </table>
        <br />
        { this.state.loggedin === -1 && <p>Your credentials could not be verified, please try again or use another email address.</p>}
        { this.state.goodpassword === -1 && <p>Password does not match.</p>}
        <button disabled={isDisabled} onClick={() => this.onSubmit()} type="primary">Register</button>
    </div>
    );
    }
}
