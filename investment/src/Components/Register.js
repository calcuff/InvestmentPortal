import React, { Component } from 'react'
import Title from './Title'
import {Link} from 'react-router-dom'
import axios from "axios";

export default class Register extends Component {
    state = {
        name: '',
        email: '',
        role: '',
        phone: '',
        password: '',
        confpass: ''
      }

      onChange = (e) => {
        this.setState({
          [e.target.name]: e.target.value,
        });
      }

      onSubmit = async () => {
        const user = {
            name: this.state.name,
            email: this.state.email,
            role: this.state.role,
            phone: this.state.phone,
            password: this.state.password
          };

          const headers = {'Content-Type': 'application/json' }

          console.log("Registering...", user)
          axios.post('http://localhost:8080/register', 
            {
                name: this.state.name,
                email: this.state.email,
                role: this.state.role,
                phone: this.state.phone,
                password: this.state.password
            },{headers: headers})
          .then(res =>
            console.log("Data :", res.data)
          ).catch((error) => 
            console.log("Errs", error)
        );
      }
    

    render() {
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
     <button onClick={() => this.onSubmit()} type="primary">Register</button>
   </div>
 );
}
}
