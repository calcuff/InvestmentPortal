import React, { Component } from 'react'
import Title from '../Common/Title'
import {Link} from 'react-router-dom'
import chicago from '../../images/chicago.jpg'
import NavBar from '../Common/NavBar'

export default class Home extends Component {
    render() {
        return (
            <React.Fragment>
                <div   style={{ backgroundImage:`url(${chicago})`, backgroundSize: "cover" }}>
                    <NavBar/>
                    <div className="py-5" >
                        <div className="container" style={{color:"rgba(52, 52, 52, .8)"}}> 
                        <h1 bold style={{fontFamily: "typold extended"}}>INVEST IN YOURSELF.</h1>
                       <br/><br/><br/>
                        </div>
                    </div>
                    <div className="container"  style={{width: "700px", backgroundColor:"rgba(0,0,0,0.3)"}}>
                        <Link color="white" to="/quotes">
                            <Title name="Get Quotes"/>
                        </Link>
                    </div>
                    <div className="container" style={{width: "700px", backgroundColor:"rgba(0,0,0,0.3)"}}>
                        <Link to="/portfolio">
                            <Title name="Portfolio"/>
                        </Link>
                    </div>
                    <div className="container" style={{width: "700px", backgroundColor:"rgba(0,0,0,0.3)"}}>
                        <Link to="/summary">
                            <Title name="Market Summary"/>
                        </Link>
                    </div>
                    <div className="container" style={{width: "700px", backgroundColor:"rgba(0,0,0,0.3)"}}>
                        <Link to="/movers">
                            <Title name="Market Movers"/>
                        </Link>
                        <br/>
                    </div>
                    <br/><br/><br/><br/><br/><br/><br/>
                </div>
            </React.Fragment>
        );
    }
}