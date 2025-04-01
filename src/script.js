function Gameboard() {
  const rows = 3;
  const columns = 3;
  const gameboard = [];

  // initialize gameboard with cells
  for (let i = 0; i < rows; i++) {
    gameboard[i] = [];
    for (let j = 0; j < columns; j++) {
      gameboard[i].push(Cell());
    }
  }

  const markCell = (player, row, col) => {
    gameboard[row][col].setCellValue(player);
  };

  const getBoard = () => {
    return gameboard;
  };

  const checkForFullBoard = () => {
    const currentBoard = getBoard();
    for (let i = 0; i < currentBoard.length; i++) {
      for (let j = 0; j < currentBoard[i].length; j++) {
        if (currentBoard[i][j].getCellValue() == "_") {
          return false;
        }
      }
    }
    return true;
  };

  const printBoard = () => {
    for (let m = 0; m < rows; m++) {
      let row = "";
      for (let n = 0; n < columns; n++) {
        row = row + gameboard[m][n].getCellValue();
        if (n == 0 || n == 1) {
          row = row + " ";
        }
      }
      console.log(row);
    }
  };

  const checkBoardForWinner = (player) => {
    if (
      checkRowsForWinner(player) ||
      checkColumnsForWinner(player) ||
      checkLeftDiagonalForWinner(player) ||
      checkRightDiagonalForWinner(player)
    ) {
      return true;
    } else {
      return false;
    }
  };

  const checkRowsForWinner = (player) => {
    const mark = player.getMarker();
    for (let i = 0; i < rows; i++) {
      let row_winner = true;
      for (let j = 0; j < columns; j++) {
        if (gameboard[i][j].getCellValue() != mark) {
          row_winner = false;
          break;
        }
      }
      if (row_winner == true) {
        return row_winner;
      }
    }
    return false;
  };

  const checkColumnsForWinner = (player) => {
    const mark = player.getMarker();
    for (let j = 0; j < columns; j++) {
      let col_winner = true;
      for (let i = 0; i < rows; i++) {
        if (gameboard[i][j].getCellValue() != mark) {
          col_winner = false;
          break;
        }
      }
      if (col_winner == true) {
        return col_winner;
      }
    }
    return false;
  };

  const checkLeftDiagonalForWinner = (player) => {
    const mark = player.getMarker();
    for (let i = 0; i < rows; i++) {
      let diag_winner = true;
      if (gameboard[i][i].getCellValue() != mark) {
        return false;
      }
    }
    return true;
  };

  const checkRightDiagonalForWinner = (player) => {
    const mark = player.getMarker();
    let i = 0;
    let j = columns - 1;
    while (i < rows && j >= 0) {
      if (gameboard[i][j].getCellValue() != mark) {
        return false;
      }
      i++;
      j--;
    }
    return true;
  };

  return {
    markCell,
    getBoard,
    checkForFullBoard,
    printBoard,
    checkBoardForWinner,
  };
}

function Cell() {
  let cellValue = "_";

  const setCellValue = (player) => {
    if (cellValue != "_") {
      return false;
    } else {
      cellValue = player.getMarker();
      return true;
    }
  };

  const getCellValue = () => {
    return cellValue;
  };

  return { setCellValue, getCellValue };
}

function Player(name, marker) {
  const playerName = name;
  const playerMarker = marker;

  const getMarker = () => {
    return playerMarker;
  };

  const getName = () => {
    return playerName;
  };

  return { getMarker, getName };
}

function GameController() {
  const gameboard = Gameboard();
  const player_1 = Player("Eduardo", "X");
  const player_2 = Player("Michael", "O");
  let currentPlayer = player_1;

  const switchPlayer = () => {
    currentPlayer = currentPlayer === player_1 ? player_2 : player_1;
  };

  const playRound = () => {
    console.log(`${currentPlayer.getName()}'s turn!`);
    gameboard.printBoard();
    while (true) {
      let selectedRow = parseInt(prompt("Select a row (0 - 2): "));
      let selectedCol = parseInt(prompt("Select a column (0 - 2): "));
      const board = gameboard.getBoard();
      let selectedCell = board[selectedRow][selectedCol];
      if (selectedCell.getCellValue() != "_") {
        continue;
      } else {
        gameboard.markCell(currentPlayer, selectedRow, selectedCol);
        console.log(
          `${currentPlayer.getName()} marks ${currentPlayer.getMarker()} in Row ${selectedRow} and Column ${selectedCol}.`,
        );
        break;
      }
    }

    if (gameboard.checkBoardForWinner(currentPlayer)) {
      console.log(`${currentPlayer.getName()} wins!`);
      gameboard.printBoard();
      return true;
    } else if (gameboard.checkForFullBoard()) {
      console.log("It's a tie!");
      return true;
    } else {
      switchPlayer();
      return false;
    }
  };

  return { switchPlayer, playRound };
}

gameController = GameController();
let winner = null;
while (winner != true) {
  winner = gameController.playRound();
}
