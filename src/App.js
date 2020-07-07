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
              let [didWon, winningType] = this.validateTable();
              if (didWon) {
                  alert(`The player ${this.currentPlayer()} won! by a ${winningType} strick!`);
                  this.setState({gameEnded: true})
              }
              
          });
          this.switchTurn();
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

      switch(true) {
          case rows.some(this.validateRow):
              return [true, 'Row'];
          case columns.some(this.validateRow):
              return [true, 'Column'];
          case slants.some(this.validateRow):
              return [true, 'Slant'];
          default:
              return [false, ''];
      }
  }

  validateRow(row) {
      return row.every(cell => {
          return row[0].value === cell.value && cell.value !== '';
      })
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
