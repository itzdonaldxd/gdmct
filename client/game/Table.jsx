import React from 'react';
import "./Table.css";

export default class Table extends React.Component {
  render(){
    const { action1, action2, result1, result2, a1r1, a1r2, a2r1, a2r2} = this.props;

    return(
        <table>
        <tbody>
        <tr>
            <th><u>RESULTS</u></th>
            <th>{result1}</th>
            <th>{result2}</th>
        </tr> 
        <tr>
            <th>{action1}</th>
            <td>{a1r1}</td>
            <td>{a1r2}</td>
        </tr> 
        <tr>
            <th>{action2}</th>
            <td>{a2r1}</td>
            <td>{a2r2}</td>
        </tr> 
        </tbody>
        </table> 
    )
  }
}