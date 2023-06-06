// Game module
const game = (() => {
  let board = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0]
  ];

  let playerTurn = 1;

  const validMove = (row, col) => {
    console.log(row, col);
    if (board[row][col] == 0){
      return true;
    }else{
      return false;
    }
  }

  const checkWin = (marker) => {
    for(let i = 0; i < 3; i++){
      const row = board[i];
      if (row.every((element) => element === marker)){
        return true;
      }
    }
    for(let j = 0; j < 3; j++){
      const col = [];
      for(let k = 0; k < 3; k++){
        col.push(board[k][j]);
      }
      if (col.every((element) => element === marker)){
        return true;
      }
    }
    const diag = [];
    for(let l = 0; l < 3; l++){
      diag.push(board[l][l]);
    }
    if (diag.every((element) => element === marker)){
      return true;
    }
    const diag2 = [];
    diag2.push(board[0][2]);
    diag2.push(board[1][1]);
    diag2.push(board[2][0]);
    if (diag2.every((element) => element === marker)){
      return true;
    }
    return false;
  }

  const changeBoard = (row, col) => {
    if(playerTurn == 1){
      board[row][col] = "X";
      playerTurn = 2;
    }else{
      board[row][col] = "O";
      playerTurn = 1;
    }
    if (checkWin("X")){
      console.log("x wins");
    }
  }

  return {
    board, validMove, changeBoard
  };
})();

const player = (number, marker, name) => {

  const playerNum = number;
  const playerMarker = marker;
  const playerName = name;
  
  return {playerNum, playerMarker, playerName};
}

function makeMove (event){

  const row = event.target.dataset.idx[0];
  const col = event.target.dataset.idx[2];
  if (game.validMove(row, col)){
    game.changeBoard(row, col);
    event.target.textContent = game.board[row][col];
  }

}

const board = document.querySelector(".board");
for (let i = 0; i < 3; i++){
  const row = document.createElement("div");
  row.className = "row";
  for (let j = 0; j < 3; j++){
    const cell = document.createElement("div");
    cell.className = "cell";
    cell.dataset.idx = [i, j];
    row.appendChild(cell);
  }
  board.appendChild(row);
}

const cells = document.querySelectorAll(".cell"); 
cells.forEach(function(element){
  element.addEventListener("click", makeMove);
});