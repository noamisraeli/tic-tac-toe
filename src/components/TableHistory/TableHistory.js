import React from 'react';
import Table from '../Table/Table';
import './TableHistory.css';
import { createTableFromTurns } from '../../utils';

const TableHistory = ({turns, onSnapshotClick}) => {
    console.log(turns);
    return (
        <div className="table-history-container">
            <h2>Game history:</h2>
                
            <div className="table-history">
                {turns.map((_, index) => {
                    const snapshotTurns = turns.slice(0, index + 1) 
                    const tableSnapshot = createTableFromTurns(snapshotTurns)
                    return (
                        <div 
                            key={index}
                            onClick={() => onSnapshotClick(tableSnapshot, snapshotTurns)}
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