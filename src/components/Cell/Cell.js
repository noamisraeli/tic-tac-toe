import React from 'react'
import './Cell.css'

const Cell = ({onCellClick, className, size, value}) => {
    return ( 
    <td className={className} 
        onClick={onCellClick} 
        style={{width: size, height: size, fontSize: size / 2}}>
        {value}
    </td>
    )
}

export default Cell;