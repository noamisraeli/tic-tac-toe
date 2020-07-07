import React, { Component } from 'react'
import './Cell.css'

export default class Cell extends Component {

    render() {
        return ( 
        <td className={this.props.className} 
            onClick={this.props.onCellClick} 
            style={{width: this.props.size, height: this.props.size, fontSize: this.props.size / 2}}>
            {this.props.value}
        </td>
        )
    }
}