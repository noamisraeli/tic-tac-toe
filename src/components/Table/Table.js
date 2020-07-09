import React from 'react';
import './Table.css';
import Row from '../Row/Row';

const Table = ({
    size = 300, 
    state, 
    className = "board", 
    onCellClick,
    withOverlay = false}) => {
    const overlay = withOverlay ? <div className="overlay"></div> : null;
    return (
        <div className="table-container">
            {overlay}
            <table className={className}>
                <tbody>
                    {state.map((row, rowIndex) => {
                        let verticalValue;
                        if (rowIndex === 0) {
                            verticalValue = 'top';
                        } else if (rowIndex === state.length - 1) {
                            verticalValue = 'bottom';
                        } else {
                            verticalValue = 'middle';
                        }
                        return (
                            <Row 
                                key={rowIndex} 
                                index={rowIndex}
                                cells={row} 
                                verticalValue={verticalValue}
                                size={size}
                                onCellClick={onCellClick}/>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}

export default Table;