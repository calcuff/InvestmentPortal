import React, { Component } from 'react'
import Title from './Title'
import {Link} from 'react-router-dom'

export default class Portfolio extends Component {

    render() {
        return (
            <React.Fragment>
                <div className="py-5">
                <div className="container">
                    <Title name="Portfolio"/>
                </div>
                </div>
            </React.Fragment>
        );
    }
}