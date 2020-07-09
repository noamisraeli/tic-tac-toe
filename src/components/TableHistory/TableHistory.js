import React from 'react';
import Table from '../Table/Table';
import './TableHistory.css';
import { createTableFromTurns } from '../../utils';

const TableHistory = ({turns, onSnapshotClick}) => {
    return (
        <div className="table-history-container">
            <h2>Game history:</h2>
                
            <div className="table-history">
                {turns.map((_, index) => {
                    const tableSnapshot = createTableFromTurns(turns.slice(0, index + 1))
                    return (
                        <div 
                            key={index}
                            onClick={() => onSnapshotClick(index)}
                            style={{display: "inline-block"}}> 
                            {index + 1}
                            <Table    
                                className="snapshot"
                                state={tableSnapshot}
                                size={100} />
                        </div>)
                })}
            </div>
        </div>
    )
}


export default TableHistory;