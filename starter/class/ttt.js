const Screen = require("./screen");
const Cursor = require("./cursor");

class TTT {

  constructor() {

    this.playerTurn = "X";

    this.grid = [[' ',' ',' '],
                 [' ',' ',' '],
                 [' ',' ',' ']]

    this.cursor = new Cursor(3, 3);


    // Initialize a 3x3 tic-tac-toe grid
    Screen.initialize(3, 3);
    Screen.setGridlines(true);
    this.cursor.setBackgroundColor();

    // Replace this with real commands
    //Screen.addCommand('t', 'test command (remove)', TTT.testCommand);
    Screen.addCommand('up', 'move cursor up', this.cursor.up.bind(this.cursor) )
    Screen.addCommand('down', 'move cursor down', this.cursor.down.bind(this.cursor) )
    Screen.addCommand('left', 'move cursor left', this.cursor.left.bind(this.cursor) )
    Screen.addCommand('right', 'move cursor right', this.cursor.right.bind(this.cursor) )
    Screen.addCommand('return', 'place move at cursor position', this.placeMove.bind(this));

    Screen.render();
  }

  // Remove this
  //static testCommand() {
  //  console.log("TEST COMMAND");
  //}

  placeMove() {
    // set grid of current cursor position to current player token
    console.log(`It is currently ${this.playerTurn}' move:`)

    let row = this.cursor.row;
    let col = this.cursor.col;
    let gridContents = this.grid[row][col];

    if (gridContents === ' ') {
      this.grid[row][col] = this.playerTurn;
      Screen.setGrid(this.cursor.row, this.cursor.col, this.playerTurn);

      // if we have successfully made a turn, swap player turn;
      if (this.playerTurn === "O") {
        this.playerTurn = "X"
      } else {
        this.playerTurn = "O"
      }
    } else {
      console.log("You cannot overwrite another player's square!");

    }

    // render the new screen with the new token added
    Screen.render();

    let winner = TTT.checkWin(this.grid);

    if (winner != false) {
      TTT.endGame(winner)
    }
  }

  static checkWin(grid) {

    // Return 'X' if player X wins
    // Return 'O' if player O wins
    // Return 'T' if the game is a tie
    // Return false if the game has not ended

    const checkedRows = TTT.checkRows(grid);

    if (checkedRows != false) {
      return checkedRows[0].toUpperCase();
    };

    const checkedCols = TTT.checkCols(grid);

    if (checkedCols != false) {
      return checkedCols[0].toUpperCase();
    }

    const checkedDiags = TTT.checkDiags(grid);

    if (checkedDiags != false) {
      return checkedDiags[0].toUpperCase();
    }

    if (TTT.checkFull(grid) === true) {
      return "T";
    }


    return false;
  }

  static checkRows(grid) {

    for (let i = 0; i < grid.length; i++) {
      let row = grid[i];
      if (row.every((val, i, arr) => ((val === arr[0]) && (val != " ")))) {
        return row;
      }
    }

    return false;
  }

  static checkCols(grid) {

    const transpose = (matrix) => {
      return Object.keys(matrix[0]).map(function(c) {
        return matrix.map(function(r) {
          return r[c];
        });
      });
    };

    const cols = transpose(grid);

    for (let i = 0; i < cols.length; i++) {
      let col = cols[i];
      if (col.every((val, i, arr) => ((val === arr[0]) && (val != " ")))) {
        return col;
      }
    }

    return false;
  }

  static checkDiags(grid) {
    const diags = TTT.getDiagonals(grid);

    for (let i = 0; i < diags.length; i++) {
      let diag = diags[i];
      if (diag.every((val, i, arr) => ((val === arr[0]) && (val != " ")))) {
        return diag;
      }
    }


    return false;
  }

  static getDiagonals(grid) {
    let diags = [];
    let diag = [];

    for (let i = 0; i < grid.length; i++) {
      let ele = grid[i][i];
      diag.push(ele)
    }

    diags.push(diag);
    diag = [];

    let i = grid.length - 1;
    let j = 0;

    while (i >= 0) {
      let ele = grid[i][j];
      diag.push(ele);
      i--;
      j++;
    }


    diags.push(diag);
    return diags;
  }

  static checkFull(grid) {
    for (let i = 0; i < grid.length; i++) {
      for (let j = 0; j < grid.length; j++) {
        let ele = grid[i][j];
        if (ele === " ") {
          return false;
        }
      }
    }
    return true;
  }



  static endGame(winner) {
    if (winner === 'O' || winner === 'X') {
      Screen.setMessage(`Player ${winner} wins!`);
    } else if (winner === 'T') {
      Screen.setMessage(`Tie game!`);
    } else {
      Screen.setMessage(`Game Over`);
    }
    Screen.render();
    Screen.quit();
  }

}

module.exports = TTT;
