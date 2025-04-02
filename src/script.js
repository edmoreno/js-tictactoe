function Gameboard() {
  const rows = 3;
  const columns = 3;
  const gameboard = [];

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

  const resetBoard = () => {
    for (let i = 0; i < rows; i++) {
      gameboard[i] = [];
      for (let j = 0; j < columns; j++) {
        gameboard[i].push(Cell());
      }
    }
  };

  const checkForFullBoard = () => {
    const currentBoard = getBoard();
    for (let i = 0; i < currentBoard.length; i++) {
      for (let j = 0; j < currentBoard[i].length; j++) {
        if (currentBoard[i][j].getCellValue() == " ") {
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
    resetBoard,
    getBoard,
    checkForFullBoard,
    printBoard,
    checkBoardForWinner,
  };
}

function Cell() {
  let cellValue = " ";

  const setCellValue = (player) => {
    if (cellValue != " ") {
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
  let gameboard = Gameboard();
  const player_1_name = prompt("Input Player 1's Name:");
  const player_2_name = prompt("Input Player 2's Name: ");
  const player_1 = Player(player_1_name, "X");
  const player_2 = Player(player_2_name, "O");
  let currentPlayer = player_1;

  const switchPlayer = () => {
    currentPlayer = currentPlayer === player_1 ? player_2 : player_1;
  };

  const getBoard = () => {
    return gameboard.getBoard();
  };

  const playTurn = (row, col) => {
    const board = gameboard.getBoard();
    let selectedCell = board[row][col];
    if (
      selectedCell.getCellValue() == "X" ||
      selectedCell.getCellValue() == "O"
    ) {
      alert("This cell has already been marked! Pick a new one.");
      return false;
    } else {
      gameboard.markCell(currentPlayer, row, col);
      if (gameboard.checkBoardForWinner(currentPlayer)) {
        alert(`${currentPlayer.getName()} wins!`);
        gameboard = Gameboard();
      } else if (gameboard.checkForFullBoard()) {
        alert("It's a tie!");
        gameboard = Gameboard();
      } else {
        switchPlayer();
      }
      return true;
    }
  };

  return { getBoard, switchPlayer, playTurn };
}

const displayController = (function DisplayController() {
  const gameController = GameController();

  // event listeners
  const buttons = document.querySelectorAll("button");
  buttons.forEach((button) =>
    button.addEventListener("click", (event) => {
      handleClick(event.target.dataset.row, event.target.dataset.col);
    }),
  );

  const handleClick = (row, col) => {
    if (gameController.playTurn(row, col)) {
      updateDisplay();
    }
  };

  const updateDisplay = () => {
    const board = gameController.getBoard();
    buttons.forEach((button) => {
      button.textContent =
        board[button.dataset.row][button.dataset.col].getCellValue();
    });
  };
})();
