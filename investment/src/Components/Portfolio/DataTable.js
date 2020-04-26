import React, { Component } from 'react'
import './DataTable.css'
import Button from 'react-bootstrap/Button'
import Dialog from 'react-dialog'
import Modal from 'react-bootstrap/Modal'


class Table extends Component {
   constructor(props) {
      super(props) 
      this.state = {
         quantity: 1,
         isDialogOpen: false,
         options: [
            { Symbol:'GOOG', Name:  'Google', Price: '$1219.73', percentchange: '+9.40165%', Change: '+$104.81995', Shares: 10, Avg_cost: '$1200' , Total_cost:'$12000', Market_value: '$12197.3', Return:'+$197.3', Sell:''}
         ]
      }
   }

   // openDialog = () => this.setState({ isDialogOpen: true })
   openDialog(name, price, shares) {
      alert(`hello, ${price}`); 
      this.setState({ isDialogOpen: true });
   }
 
   handleClose = () => this.setState({ isDialogOpen: false })


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
                {/* <Button onClick={this.openDialog}>SELL</Button> */}
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
                           },
                           {
                                text: "Close",
                                onClick: () => this.handleClose()
                            }]
                        }
                        >
                        <h1>{option.name}</h1>
                        <h2>Sell Price: ${option.price}</h2>
                        <p>Quantity</p>
                        <div>
                           <button onClick={this.DecreaseItem}>-</button>
                           <input type="number" name="quantity" value={this.state.quantity} style={{textAlign:"center",width:"50px"}} onChange={e => this.onChange(e)} id={option.symbol} max={option.shares}/>
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

