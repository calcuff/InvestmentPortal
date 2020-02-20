import React, { Component } from 'react';
import {Switch,Route} from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import NavBar from './Components/NavBar'
import Home from './Components/Home'
import Cart from './Components/Cart'
import ProductList from './Components/ProductList'
import Details from './Components/Details'
import Default from './Components/Default'
import Quotes from './Components/Quotes'
import Portfolio from './Components/Portfolio'
import Summary from './Components/Summary'
import Movers from './Components/Movers'


class App extends Component{
  render() {
    return (
      <React.Fragment>
        <NavBar/>
        <Switch>
          <Route exact path="/" component={Home}/>
          <Route exact path="/quotes" component={Quotes}/>
          <Route exact path="/portfolio" component={Portfolio}/>
          <Route exact path="/summary" component={Summary}/>
          <Route exact path="/movers" component={Movers}/>
          {/*<Route exact path="/" component={ProductList}/>*/}
          <Route path="/details" component={Details}/>
          <Route path="/cart" component={Cart}/>
          <Route component={Default}/>
          </Switch>  
      </React.Fragment>
    );
  }
}


export default App;
