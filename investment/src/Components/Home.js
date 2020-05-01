import React, { Component } from 'react'
import Title from './Title'
import {Link} from 'react-router-dom'
import UserProfile from './UserProfile';
import chicago from '../images/chicago.jpg'
import NavBar from './NavBar'

export default class Home extends Component {
    render() {
        return (
            <React.Fragment>
               {/* <img src={chicago} alt="Logo" />; */}
                <div   style={{ backgroundImage:`url(${chicago})`, backgroundSize: "cover" }}>
                    <NavBar/>
                    <div className="py-5" >
                        <div className="container" style={{color:"white"}}> 
                        {/* , backgroundColor:"rgba(0,0,0,0.3)" */}
                            <h1 style={{fontFamily: "typold extended"}}>INVEST IN YOURSELF</h1>
                            {/* <h1 style={{fontFamily: "typold extended"}}>IN</h1>
                            <h1 style={{fontFamily: "typold extended"}}> YOURSELF</h1> */}
                        </div>
                    </div>
                    
                    <div className="py-5">
                        <div className="container" >
                            <p> Welcome {UserProfile.getName()}</p>
                            <Title name="EXPLORE"></Title>
                        </div>
                    </div>
                    <div className="container">
                        <Link to="/quotes">
                            <Title name="Get Quotes"/>
                        </Link>
                    </div>
                    <div className="container">
                        <Link to="/portfolio">
                            <Title name="Portfolio"/>
                        </Link>
                    </div>
                    <div className="container">
                        <Link to="/summary">
                            <Title name="Market Summary"/>
                        </Link>
                    </div>
                    <div className="container">
                        <Link to="/movers">
                            <Title name="Market Movers"/>
                        </Link>
                    </div>
                    <div className="py-5">
                        <div className="container" >
                            <Title name="Invest in yourself"></Title>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}