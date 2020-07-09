const createTableFromTurns = (turns, numberOfCellsInRow) => {
    console.log(JSON.stringify(turns))
    let newTable = getEmptyTable(numberOfCellsInRow);
    turns.forEach(turn => {
        newTable[turn.rowIndex][turn.cellIndex] = turn.currentPlayer;
    });
    return newTable; 
}

const getEmptyTable = (numberOfCellsInRow) => {
    return fillArray(fillArray('', numberOfCellsInRow), numberOfCellsInRow)
}

const fillArray = (value, len) => {
    let arr = [];
    for (let i = 0; i < len; i++) {
        let newValue = value;
        if (Array.isArray(value)) {
            newValue = Object.assign([], value);
        }
        arr.push(newValue);
    }
    return arr;
}

export {getEmptyTable, createTableFromTurns}
