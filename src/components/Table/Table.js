import React from 'react';
import Cell from '../Cell/Cell';
import './Table.css';

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
                        return (
                            <tr key={rowIndex}>
                                {row.map((cell, i) => {
                                    return <Cell 
                                                key={i} 
                                                className={cell.className} 
                                                value={cell.value}
                                                size={size / row.length}
                                                onCellClick={() => onCellClick(cell, i, rowIndex)} />;
                                })}
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}

export default Table;