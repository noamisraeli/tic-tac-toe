import React, { Component } from 'react';
import './App.css';
import Table from './components/Table/Table'
import TableHistory from './components/TableHistory/TableHistory';
import { getEmptyTable } from './utils';


class App extends Component {
    getInitialState = () => {
        return {
            tableState: getEmptyTable(),
            turns: [],
            gameOver: false,
            currentPlayer: 'X'
        }
    };

    state = this.getInitialState();

    resetTable() {
        this.setState(this.getInitialState());
    }

    onCellClick = (cell, cellIndex, rowIndex) => {
        if (cell !== '') {
            return
        }
        let isGameOver = false;
        
        const currentPlayer = this.state.currentPlayer;
        const currentTurn = {rowIndex, cellIndex, currentPlayer};
        
        const turns = this.state.turns.slice();
        let newTableState = this.state.tableState.slice();

        newTableState[rowIndex][cellIndex] = currentPlayer;
        
        if (this.hasWon(newTableState)) {
            alert(`And the winner is: ${currentPlayer}!`);
            isGameOver = true;
        } else if (this.isTableFull(newTableState)) {
            alert(`No one wons.. you both losers!`);
            isGameOver = true;
        }

        this.setState({
            tableState: newTableState, 
            turns: turns.concat(currentTurn),
            gameOver: isGameOver,
            currentPlayer: this.getNextPlayer(currentPlayer)
        });
    } 

    onSnapshotClick = (tableSnapshot, snapshotTurns) => {
        const currentPlayer = this.state.currentPlayer;
        let nextPlayer = currentPlayer;
        const lastTurnInSnapshot = snapshotTurns[snapshotTurns.length - 1];
        if (lastTurnInSnapshot.currentPlayer === this.state.currentPlayer) {
            nextPlayer = this.getNextPlayer(this.state.currentPlayer)
        }
        this.setState({
            turns: snapshotTurns, 
            tableState: tableSnapshot, 
            gameOver: false,
            currentPlayer: nextPlayer
        });
    }

    getNextPlayer(currentPlayer) {
        return currentPlayer === 'X' ? 'O' : 'X';
    }
    
    hasWon = (rows) => {
        const slants = this.getSlants(rows);
        const columns = this.getColumns(rows);
        return rows.some(this.validateCombination) || columns.some(this.validateCombination) || slants.some(this.validateCombination);
    }

    validateCombination(combination) {
        return combination.every(cell => {
            return combination[0] === cell && cell !== '';
        })
    }

    isTableFull(rows) {
        return rows.every(row => row.every(cell => cell !== ''))
    }

    getColumns(rows) {
        return rows.map((_, index) => rows.map(row => row[index]));
    }

    getSlants(rows) {
        return [rows.map((row, i) => row[i]), rows.map((row, i) => row[row.length - 1 - i])];
    }

    
    render() {
        const {turns, tableState, gameOver, currentPlayer} = this.state;
        return (
        <div className="App">
            <h1 className="turn-display">Current turn: {currentPlayer}</h1>
            <div className="board-container">
            <Table 
                withOverlay={gameOver}
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