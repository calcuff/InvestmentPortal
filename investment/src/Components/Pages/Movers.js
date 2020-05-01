import React from 'react'
import axios from "axios";
import chicago from '../../images/chicago.jpg'
import NavBar from '../Common/NavBar'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import {Link} from 'react-router-dom'

export default class Movers extends React.Component {
    state = {
      stocks: [],
      isLoading: true,
      errors: null
    };

    getPosts() {
        console.log("Before call")
      axios.get("https://apidojo-yahoo-finance-v1.p.rapidapi.com/market/get-movers?region=US&lang=en", {
            headers: {
                'x-rapidapi-host': 'apidojo-yahoo-finance-v1.p.rapidapi.com',
                'x-rapidapi-key' : '807803f5d0msh30ebe2386bcb87bp1d620djsnd4f62f748453',
                'Content-Type': 'application/json' 
            }
        }).then(response =>{
          this.setState({
            stocks: response.data,
            isLoading: false
          });
          console.log("Got data: ", response.data)
        })
        .catch(error => {
            console.log("Error: " + error)
        });
    }

    componentDidMount() {
      this.getPosts();
    }

    render() {
      const { errors, isLoading, stocks } = this.state;
      if (isLoading) {
        return (
          <div style={{ backgroundImage:`url(${chicago})`, backgroundSize: "cover" }}>
          <NavBar/>
            <div className="col">
              Loading...
            </div>
          </div>
        );}
        else { 
            return (
            <React.Fragment>   
              <div style={{ backgroundImage:`url(${chicago})`, backgroundSize: "cover" }}>
                <NavBar/> 
               <br/><br/>
                <div style={{marginLeft:"700px",color:"white", fontSize:"24px", backgroundColor: "rgba(52, 52, 52, .4)", width:"300px"}} >
                  <h2 >  Market Movers</h2>
                </div>
                <div className="container">
                {stocks.finance.result.map((result => 
                <div  style={{paddingLeft:"300px"}}>
             
                <Card bg="primary" text="white" style={{ width: '40rem' }}>
                  <Card.Header as="h5">{result.title}</Card.Header>
                  <Card.Body>
                  <Card.Title>{result.description}</Card.Title>
                  <br/>
                    <Card.Text>

                    {result.quotes.map((stock,idx) => 
                      <div >
                        <h5 className="card-subtitle mb-2">{idx+1}. {stock.symbol}</h5>
                      </div>)}

                    </Card.Text>
                  </Card.Body>
                  <Button variant="light" color="white">
                  <Link color="white" to="/quotes">
                            Get Quotes Now!
                        </Link>
                  </Button>
                </Card>
                
                
                <br/> <br/> <br/>
                </div>







                // <div className="card">
                //   <div className="card-body" key={result.id} >
                //     <h5 className="card-title">{result.title}</h5>
                //     <h6 className="card-subtitle mb-2 text-muted">{result.description}</h6>
                //       {result.quotes.map((stock => 
                //       <div >
                //         <h5 className="card-subtitle mb-2"> {stock.fullExchangeName}</h5>
                //         <h5 className="card-subtitle mb-2"> {stock.symbol}</h5>
                //       </div>))}
                  
                ))}
              </div>
            </div>
            </React.Fragment>
          );
        }
    }
}