import React from 'react';
import Cell from '../Cell/Cell'
import './Table.css'
import { getEmptyTable } from '../../utils';


class Table extends React.Component {
    render() {
        const {
            size = 300, 
            state = getEmptyTable(), 
            className = "board", 
            onCellClick = () => null,
            withOverlay = false
        } = this.props;
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
                                                    onCellClick={() => onCellClick(i, rowIndex)} />;
                                    })}
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        )
    }
}

export default Table;