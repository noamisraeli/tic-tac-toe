import React from 'react';
import Cell from '../Cell/Cell';


const Row = ({index, cells, verticalValue, size, onCellClick = () => null}) => {
    return (
        <tr>
            {cells.map((cell, cellIndex) => {
                let horizontalValue;
                if (cellIndex === 0) {
                    horizontalValue = 'left';
                } else if (cellIndex === cells.length - 1) {
                    horizontalValue ='right';
                } else {
                    horizontalValue = 'center';
                }
                return <Cell 
                        key={cellIndex}
                        className={`cell ${verticalValue} ${horizontalValue}`}
                        value={cell}
                        size={size / cells.length}
                        onCellClick={() => onCellClick(cell, cellIndex, index)}/>
            })}
        </tr>
    )
}

export default Row;