let WIDTH = 7
let HEIGHT = 6

let currPlayer = 1
// Source: new Array (5/6/2021): https://javascript.plainenglish.io/javascript-multi-dimensional-arrays-7186e8edd03 
const board = new Array(HEIGHT) 

function makeBoard() {
  for (let i = 0; i < HEIGHT; i++) {
    board[i] = []
    for (let j = 0; j < WIDTH; j++) {
      board[i][j] += null
    }
  }
}

function makeHtmlBoard() {
  const htmlBoard = document.getElementById('board')

  // creates and appends clickable table head to HTML Page
  const top = document.createElement("tr")
  top.setAttribute("id", "column-top")
  top.addEventListener("click", handleClick)

  for (let x = 0; x < WIDTH; x++) {
    const headCell = document.createElement("td")
    headCell.setAttribute("id", x)
    top.append(headCell)
  }
  htmlBoard.append(top)

  // Creates and appends game board's table body to HTML page
  for (let y = 0; y < HEIGHT; y++) {
    const row = document.createElement("tr")
    for (let x = 0; x < WIDTH; x++) {
      const cell = document.createElement("td")
      cell.setAttribute("id", `${y}-${x}`)
      row.append(cell)
    }
    htmlBoard.append(row)
  }
}

function findSpotForCol(col) {
  for (let row = HEIGHT - 1; row >= 0; row--){
    if (!board[row][col]) {
      return row;
    }
  }
  return null
}

function placeInTable(row, col) {
  const checker = document.createElement('div')
  checker.classList.add('checker', `player${currPlayer}`)

  const square = document.getElementById(`${row}-${col}`)
  square.append(checker)
}

function endGame(msg) {
  alert(msg)
}

function switchPlayer() {
  if (currPlayer === 1) {
    currPlayer = 2
  } else {
   currPlayer = 1
  }
}

function handleClick(event) {
  const col = event.target.id

  const row = findSpotForCol(col)
  if (row === null) {
    return ""
  }

  board[row][col] = currPlayer;
  placeInTable(row, col)

  if (checkForWin()) {
    return endGame(`Player ${currPlayer} won!`)
  }

  if (checkForTie()) {
    return endGame("It's a tie!")
  }
  
  switchPlayer()
}

function checkForTie() {
  return board.every(function(row) {
    return row.every(function(cell) {
      return cell
    })
  }
)}

function checkForWin() {
  function _win(cells) {
    return cells.every(
      ([y, x]) =>
        y >= 0 &&
        y < HEIGHT &&
        x >= 0 &&
        x < WIDTH &&
        board[y][x] === currPlayer
    )
  }

  // Checks board locations for a winning pattern 
  for (let y = 0; y < HEIGHT; y++) {
    for (let x = 0; x < WIDTH; x++) {
      let horiz = [[y, x], [y, x + 1], [y, x + 2], [y, x + 3]]
      let vert = [[y, x], [y + 1, x], [y + 2, x], [y + 3, x]]
      let diagDR = [[y, x], [y + 1, x + 1], [y + 2, x + 2], [y + 3, x + 3]]
      let diagDL = [[y, x], [y + 1, x - 1], [y + 2, x - 2], [y + 3, x - 3]]

      if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) {
        return true;
      }
    }
  }
}

makeBoard()
makeHtmlBoard()