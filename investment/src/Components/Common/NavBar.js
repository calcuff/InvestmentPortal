import React, {Component } from 'react'
import {Link} from 'react-router-dom';
import styled from 'styled-components'
import UserProfile from './UserProfile';


export default class NavBar extends Component{

    logout(){
        console.log("NAvbar " + UserProfile.getName())
        UserProfile.setName('');
        alert("Logged out successfully")
    }

    render() {
        return (
           <NavWrapper className="navbar navbar-expand-sm navbar-dark px-sm-5" >
               
               <Link to="/" className="nav-link" style={{fontSize:"32px", color:"black"}}>
                    CUFFSTOCK
               </Link>
               { UserProfile.getName() !== '' &&
                    <Link to="/logout" className="nav-link" style={{fontSize:"24px", color:"rgba(52, 52, 52, .8)",paddingLeft:"1000px"}}>
                    Logout {UserProfile.getName()}
                </Link>
                }

                { UserProfile.getName() === '' &&
                <ul className="navbar-nav align-items-right" style={{paddingLeft:"1000px"}}>
                     <li className="nav-item ml-5">
                         <Link to="/login" className="nav-link" style={{fontSize:"24px", color:"rgba(52, 52, 52, .8)"}}>
                             Login
                         </Link>
                     </li>
                     <li className="nav-item ml-5">
                         <Link to="/register" className="nav-link" style={{fontSize:"24px", color:"rgba(52, 52, 52, .8)"}}>
                             Signup
                         </Link>
                     </li>

                 </ul>
                    
                }
           </NavWrapper>
        )
    }
}

const NavWrapper = styled.nav`
background:rgba(52, 52, 52, 0);
.nav-link{
    color:rgba(52, 52, 52, .8);
    font-size:1.3rem;
    text-transform:capitalize;
}
`;
