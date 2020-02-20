import React, { Component } from 'react'
import Title from './Title'
import {Link} from 'react-router-dom'

export default class Quotes extends Component {

    render() {
        return (
            <React.Fragment>
                <div className="py-5">
                <div className="container">
                    <Title name="Quotes go here"/>
                </div>
                </div>
            </React.Fragment>
        );
    }
}