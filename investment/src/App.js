import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import NavBar from './Components/NavBar'
import ProductList from './Components/ProductList'
import Details from './Components/Details'
import Cart from './Components/Cart'
import Default from './Components/Default'


class App extends Component{
  render() {
    return (
      <React.Fragment>
        <NavBar></NavBar>
        <ProductList></ProductList>
        <Details></Details>
        <Cart></Cart>
        <Default></Default>
      </React.Fragment>
    );
  }
}


export default App;
