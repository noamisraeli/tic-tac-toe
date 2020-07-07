import React, { Component } from 'react';
import './App.css';
import Table from './components/Table/Table'
import TableHistory from './components/TableHistory/TableHistory';
import { createTableFromTurns, getEmptyTable } from './utils';


class App extends Component {
    state = {
        turns: [],
        xTurn: true,
        tableState: getEmptyTable(),
        gameEnded: false,
    }

    switchTurn(){
        this.setState({xTurn: !this.state.xTurn}); 
    }

    resetTable() {
        this.setState({
            tableState: getEmptyTable(),
            turns: [],
            gameEnded: false
        });
    }

    onCellClick = (cellIndex, rowIndex) => {
        let turns = this.state.turns;
        let currentTurn = [];
        const newState = this.state.tableState.map((row, i) => {
            if (i === rowIndex) {
                return row.map((cell, index) => {
                    if (index === cellIndex && cell.value === '') {
                        cell.value = this.currentPlayer();
                        currentTurn = [[rowIndex, cellIndex, this.currentPlayer()]];
                    };
                    return cell;
                });
            };
            return row;
        });
        if (this.state.tableState !== newState){    
            this.setState({tableState: newState, turns: turns.concat(currentTurn)}, () => {
                this.validateTable();
                this.switchTurn();
            });
            
        }
    } 

    onSnapshotClick = (snapIndex) => {
        const turns = this.state.turns.slice(0, snapIndex + 1);
        const tableState = createTableFromTurns(turns);
        if (turns[snapIndex][2] === this.currentPlayer()) { // switch turn to the currect player.
            this.switchTurn();
        }
        this.setState({turns, tableState, gameEnded: false});
    }

    currentPlayer() {
        return this.state.xTurn ? 'X' : 'O';
    }

    validateTable() {
        const rows = this.state.tableState;
        const columns = this.getColumns(rows);
        const slants = this.getSlants(rows);
        const someoneWon = rows.some(this.validateCombination) || columns.some(this.validateCombination) || slants.some(this.validateCombination);
        const gameEnded =  this.isTableFull(rows) || someoneWon;
        if (gameEnded) {
            if (someoneWon) {
                alert(`And the winner is: ${this.currentPlayer()}!`)
            } else {
                alert(`No on wons.. you both losers!`)
            }
            this.setState({gameEnded})
        }
        
    }

    validateCombination(combination) {
        return combination.every(cell => {
            return combination[0].value === cell.value && cell.value !== '';
        })
    }

    isTableFull(rows) {
        return rows.every(row => row.every(cell => cell.value !== ''))
    }

    getColumns(rows) {
        return rows.map((_, index) => rows.map(row => row[index]));
    }

    getSlants(rows) {
        return [rows.map((row, i) => row[i]), rows.map((row, i) => row[row.length - 1 - i])];
    }

    
    render() {
        const {turns, tableState, gameEnded} = this.state;
        return (
        <div className="App">
            <h1 className="turn-display">Current turn: {this.currentPlayer()}</h1>
            <div className="board-container">
            <Table 
                withOverlay={gameEnded}
                state={tableState}
                onCellClick={this.onCellClick}/>
            <TableHistory 
                turns={turns} 
                onSnapshotClick={this.onSnapshotClick} />
            </div>
            <button className="reset-button" onClick={() => this.resetTable()}>Reset game</button>
        </div>
        );
    }
}

export default App;