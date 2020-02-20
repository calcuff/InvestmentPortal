import React, { Component } from 'react'
import Title from './Title'
import {Link} from 'react-router-dom'

export default class Summary extends Component {

    render() {
        return (
            <React.Fragment>
                <div className="py-5">
                <div className="container">
                    <Title name="Market Summary"/>
                </div>
                </div>
            </React.Fragment>
        );
    }
}