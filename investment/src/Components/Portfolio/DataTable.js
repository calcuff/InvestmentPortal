import React, { Component } from 'react'
import './DataTable.css'
import Button from 'react-bootstrap/Button'
import Dialog from 'react-dialog'
import Modal from 'react-bootstrap/Modal'
import UserProfile from '../UserProfile';
import axios from "axios";


class Table extends Component {
   constructor(props) {
      super(props) 
      this.state = {
         quantity: 1,
         isDialogOpen: false,
         options: [
            { Symbol:'GOOG', Name:  'Google', Price: '$1219.73', percentchange: '+9.40165%', Change: '+$104.81995', Shares: 10, Avg_cost: '$1200' , Total_cost:'$12000', Market_value: '$12197.3', Return:'+$197.3', Sell:''}
         ],
         name: 'test',
         shares: 0,
         price: 0
      }
   }

   openDialog(name, price, shares) {
      this.setState({ 
         isDialogOpen: true,
         name: name,
         shares: shares,
         price: price
       });        
   }
 
   handleClose = () => this.setState({ isDialogOpen: false })

   sell = async () => {
      const creds = {
         email: UserProfile.getName(),
         password: ''
       };

       console.log("Selling option by " + creds.email);

       const headers = {'Content-Type': 'application/json' }

       axios.post('http://localhost:8080/sell', 
       {
           email: this.state.email,
           password: this.state.password,
           company: this.state.name,
           shares: this.state.shares,
           price: this.state.price
       },{headers: headers})
     .then(res =>{
       console.log("Data :", res.data)
       if ( res.data === true){
         console.log("SOLD, do other stuff");
         // UserProfile.setName(this.state.email);
         // this.setState({ redirect: "/", loggedin: 1});
       }else {
         console.log("sold FAILED, do other stuff");
         //   this.setState({loggedin: -1});
         }
     }
     ).catch((error) => 
       console.log("Errs", error)
   );

   }


   renderTableData() {
      console.log("Data in DataTable: ", this.props.portfolioData)
      return this.props.portfolioData.data.map((option, index) => {

         return (
          <tr key={option.symbol}>
             <td>{option.symbol}</td>
             <td>{option.name}</td>
             <td>$ {option.price}</td>
             <td>{option.percentChange} %</td>
             <td>$ {option.change}</td>
             <td>{option.shares}</td>
             <td>$ {option.avg_cost}</td>
             <td>$ {option.total_cost}</td>
             <td>$ {option.market_value}</td>
             <td>$ {option.return}</td>
             <td>
                <Button onClick={() => this.openDialog(option.name, option.price, option.shares)}>SELL</Button>
                {
                    this.state.isDialogOpen &&
                    <Dialog
                        modal
                        onClose={this.handleClose}
                        buttons={
                            [{ 
                              text:"Sell",
                              className: "button",
                              onClick: () => this.sell()
                           },
                           {
                                text: "Close",
                                onClick: () => this.handleClose()
                            }]
                        }
                        >
                        <h2>{this.state.name}</h2>
                        <h3>Sell Price: ${this.state.price}</h3>
                        <p>Quantity</p>
                        <div>
                           <button onClick={this.DecreaseItem}>-</button>
                           <input type="number" name="quantity" value={this.state.quantity} style={{textAlign:"center",width:"50px"}} onChange={e => this.onChange(e)} id={option.symbol} max={this.state.shares}/>
                           <button onClick={this.IncrementItem}>+</button>
                        </div>
                    </Dialog>
                }
            </td>
          </tr>
          
       )
      })
    }

    renderTableHeader() {
        let header = Object.keys(this.state.options[0])
        return header.map((key, index) => {
           return <th key={index}>{key.toUpperCase()}</th>
        })
     }

     onChange = (e) => {
      if (e.target.value > -1){
        this.setState({
          [e.target.name]: parseInt(e.target.value),
        });
      }
    }
 
    IncrementItem = () => {
          this.setState({
              quantity: this.state.quantity + 1 
          });
    }

    DecreaseItem = () => {
       if (this.state.quantity > 0)
          this.setState({ 
            quantity: this.state.quantity - 1  
          }); 
    }

  

   render() { 
      return (
            <div>
            <h1 style={{marginLeft:"50px", color:"white"}}>My Portfolio</h1>
            <table id='options' style={{backgroundColor: "white"}}>
               <tbody>
               <tr>{this.renderTableHeader()}</tr>
                  {this.renderTableData()}
               </tbody>
            </table>          
         </div>  
      )
   }
}

export default Table

