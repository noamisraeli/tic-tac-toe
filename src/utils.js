export function createTableFromTurns(turns) {
    let newTable = getEmptyTable();
    turns.forEach(turn => {
        newTable[turn.rowIndex][turn.cellIndex].value = turn.currentPlayer;
    });
    return newTable; 
}

export function getEmptyTable() {
    return [
        [{value: "", className: "cell left top"}, {value: "", className: "cell center top"}, {value: "", className: "cell right top"}],
        [{value: "", className: "cell left medium"}, {value: "", className: "cell center medium"}, {value: "", className: "cell right medium"}],
        [{value: "", className: "cell left bottom"}, {value: "", className: "cell center bottom"}, {value: "", className: "cell right bottom"}],
    ]
}
