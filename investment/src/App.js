import React, { Component } from 'react';
import {Switch,Route} from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import NavBar from './Components/NavBar'
import Cart from './Components/Cart'
import ProductList from './Components/ProductList'
import Details from './Components/Details'
import Default from './Components/Default'


class App extends Component{
  render() {
    return (
      <React.Fragment>
        <NavBar/>
        <Switch>
          <Route exact path="/" component={ProductList}/>
          <Route path="/details" component={Details}/>
          <Route path="/cart" component={Cart}/>
          <Route component={Default}/>
          </Switch>  
      </React.Fragment>
    );
  }
}


export default App;
