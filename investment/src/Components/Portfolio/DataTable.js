import React, { Component } from 'react'
import './DataTable.css'

class Table extends Component {
   constructor(props) {
      super(props) 
      this.state = {
         options: [
            { Symbol:'GOOG', Name:  'Google', Price: '$1219.73', percentchange: '+9.40165%', Change: '+$104.81995', Shares: 10, Avg_cost: '$1200' , Total_cost:'$12000', Market_value: '$12197.3', Return:'+$197.3'}
         ]
      }
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

