import React, { Component } from 'react'
import './DataTable.css'

class Table extends Component {
   constructor(props) {
      super(props) 
      this.state = {
         options: [
            { Symbol:'GOOG', Name:  'Google', Price: '$1219.73', percentchange: '+9.40165%', Change: '+$104.81995', Shares: 10, Avg_cost: '$1200' , Total_cost:'$12000', Market_value: '$12197.3', Gain: '+$197.3', Days_gain:'-$25', Return:'+10.3%'}
         ]
      }
   }

   renderTableData() {
    return this.state.options.map((option, index) => {
       const { Symbol, Name, Price, percentchange, Change, Shares, Avg_cost, Total_cost, Market_value, Gain, Days_gain, Return  } = option //destructuring
       return (
          <tr key={Symbol}>
             <td>{Symbol}</td>
             <td>{Name}</td>
             <td>{Price}</td>
             <td>{percentchange}</td>
             <td>{Change}</td>
             <td>{Shares}</td>
             <td>{Avg_cost}</td>
             <td>{Total_cost}</td>
             <td>{Market_value}</td>
             <td>{Gain}</td>
             <td>{Days_gain}</td>
             <td>{Return}</td>
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
            <table id='options'>
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

