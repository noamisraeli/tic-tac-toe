export function createTableFromTurns(turns) {
    let newTable = getEmptyTable()
    turns.forEach(turn => {
        newTable[turn[0]][turn[1]].value = turn[2]
    });
    return newTable; 
}

export function getEmptyTable() {
    return [
        [{value: "", className: "cell left top"}, {value: "", className: "cell center top"}, {value: "", className: "cell right top"}],
        [{value: "", className: "cell left midium"}, {value: "", className: "cell center midium"}, {value: "", className: "cell right midium"}],
        [{value: "", className: "cell left bottom"}, {value: "", className: "cell center bottom"}, {value: "", className: "cell right bottom"}],
    ]
}
