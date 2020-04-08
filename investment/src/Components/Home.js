import React, { Component } from 'react'
import Title from './Title'
import {Link} from 'react-router-dom'
import UserProfile from './UserProfile';

export default class Home extends Component {
    render() {
        return (
            <React.Fragment>
                
                <div className="py-5">
                <div className="container">
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
            </React.Fragment>
        );
    }
}