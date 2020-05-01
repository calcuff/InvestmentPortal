import React, {Component } from 'react'
import {Link} from 'react-router-dom';
import styled from 'styled-components'
import {ButtonContainer} from './Button'
import Dropdown from 'react-bootstrap/DropDown'
import DropdownButton from 'react-bootstrap/DropDownButton'
import UserProfile from './UserProfile';
import Button from 'react-bootstrap/Button'


export default class NavBar extends Component{

    logout(){
        UserProfile.setName('');
        alert("Logged out successfully")
    }

    render() {
        return (
           <NavWrapper className="navbar navbar-expand-sm navbar-dark px-sm-5">
               <Link to="/" className="nav-link">
                    CUFFSTOCK
               </Link>
                <DropdownButton  className="ml-auto"  id="dropdown-basic-button" title="Login" drop="left" >
                    <Dropdown.Item href="/login">Login</Dropdown.Item>
                    <Dropdown.Item href="/register">SignUp</Dropdown.Item>
                    <button  transparent="true" onClick={this.logout}>Logout </button>
                </DropdownButton>
           </NavWrapper>
        )
    }
}

const NavWrapper = styled.nav`
background:rgba(52, 52, 52, 0);
.nav-link{
    color:var(--mainWhite) !important;
    font-size:1.3rem;
    text-transform:capitalize;
}
`;

// "rgba(0,0,0,0.3)"
// background:var(--lightBlue);
//background:rgba(52, 52, 52, 0.8);