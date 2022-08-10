const Screen = require("./screen");

class Cursor {

  constructor(numRows, numCols) {
    this.numRows = numRows;
    this.numCols = numCols;

    this.row = 0;
    this.col = 0;

    this.gridColor = 'black';
    this.cursorColor = 'yellow';

  }

  resetBackgroundColor() {
    Screen.setBackgroundColor(this.row, this.col, this.gridColor);
  }

  setBackgroundColor() {
    Screen.setBackgroundColor(this.row, this.col, this.cursorColor);
  }

  up() {
    // Move cursor up
    if (this.row > 0) {
      this.row -= 1;
    };
  }

  down() {
    // Move cursor down
    if (this.row < 2) {
      this.row += 1;
    }
  }

  left() {
    // Move cursor left
    if (this.col > 0) {
      this.col -= 1;
    };
  }

  right() {
    // Move cursor right
    if (this.col < 2) {
      this.col += 1;
    }
  }

}


module.exports = Cursor;
