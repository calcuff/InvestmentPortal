import React, { Component } from 'react'
import Title from '../Title'

export default class Header extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
           
            <React.Fragment>
                {/* {this.props.portfolioData} */}
                 <div className="row">
                        <div className="col-sm-3">
                            <div className="card text-white bg-success mb-3" style={{marginLeft:"50px", maxWidth:"20rem",height:"150px"}}>
                                <div className="card-header">+ $10000.00</div>
                                <div className="card-body">
                                    <p className="card-text">Overall Return</p>
                                    <h5 className="card-title">+ 17.5%</h5>
                                </div>
                            </div>
                        </div>

                        <div className="col-sm-3">
                            <div className="card bg-light mb-3 border-dark" style={{maxWidth:"20rem", height:"150px"}}>
                                <div className="card-header">Portfolio Cost</div>
                                <div className="card-body">
                                    <p className="card-text"> </p>
                                    <h5 className="card-title" id="portfolioCost">$109253.65</h5>
                                </div>
                            </div>
                        </div>

                        <div className="col-sm-3">
                            <div className="card text-white bg-dark mb-3" style={{maxWidth:"20rem", height:"150px"}}>
                                <div className="card-header">Portfolio Value</div>
                                <div className="card-body">
                                    <p className="card-text"> </p>
                                    <h5 className="card-title">$128,373.03</h5>
                                </div>
                            </div>
                        </div>

                        <div className="col-sm-3">
                            <div className="card bg-light mb-3 border-primary" style={{marginRight:"50px", maxWidth:"20rem", height:"150px"}}>
                                <div className="card-header">Account Balance</div>
                                <div className="card-body">
                                    <p className="card-text"> </p>
                                    <h5 className="card-title">$128,373.03</h5>
                                </div>
                            </div>
                        </div>


                    </div>

            </React.Fragment>
        );
    }
}