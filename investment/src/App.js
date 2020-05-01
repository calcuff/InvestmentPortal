import React, { Component } from 'react';
import {Switch,Route} from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import Home from './Components/Pages/Home'
import Login from './Components/Auth/Login'
import Logout from './Components/Auth/Logout'
import Details from './Components/Details'
import Default from './Components/Common/Default'
import Quotes from './Components/Pages/Quotes'
import Portfolio from './Components/Portfolio/Portfolio'
import Summary from './Components/Pages/Summary'
import Movers from './Components/Pages/Movers'
import Register from './Components/Auth/Register'
import QuoteResults from './Components/Pages/QuoteResults';

class App extends Component{
  render() {
    return (
      <React.Fragment>
        <Switch> 
          <div>
            <Route exact path="/" component={Home}/>
            <Route exact path="/quotes" component={Quotes}/>
            <Route exact path="/portfolio" component={Portfolio}/>
            <Route exact path="/summary" component={Summary}/>
            <Route exact path="/movers" component={Movers}/>
            <Route path="/details" component={Details}/>
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
            <Route path="/logout" component={Logout} />
            <Route path="/quoteResults" component={QuoteResults}/>
            <Route component={Default}/>
          </div>
        </Switch>  
      </React.Fragment>
    );
  }
}


export default App;
