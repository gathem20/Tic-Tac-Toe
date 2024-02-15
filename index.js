const cells = document.querySelectorAll(".cell");
const statusText = document.getElementById("statustext");
const ResetBtn = document.getElementById("reset");

const winConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

let options = ["", "", "", "", "", "", "", "", ""];

let CurrentPlayer = "X";

let running = false;

InitializeGame();


function InitializeGame() {
  cells.forEach(cell=> cell.addEventListener("click", cellClicked));
  ResetBtn.addEventListener("click", RestartGame);
  statusText.textContent = `${CurrentPlayer} 's turn`;
  running = true;
}
function cellClicked() {
  const cellIndex = this.getAttribute("cellIndex");
  if (options[cellIndex] != "" || !running) {
    return;
  }
  updateCell(this, cellIndex);
  checkWinner();
}

function updateCell(cell, index) {
  options[index] = CurrentPlayer;
  cell.textContent = CurrentPlayer;
  
}

function changeplayer() {
    CurrentPlayer = (CurrentPlayer == "X") ? "O": "X"
    statusText.textContent = `${CurrentPlayer} 's turn`
}

function checkWinner() {
  let roundwon =false
  for(let i =0 ; i < winConditions.length ; i++){
    const condition = winConditions[i];
    const cellA =options[condition[0]]
    const cellB =options[condition[1]]
    const cellC =options[condition[2]]
    if(cellA == ""|| cellB == "" ||cellC == ""){
      continue
    }if(cellA == cellB && cellB == cellC){
      roundwon = true
      break
    }
  }
  if(roundwon){
    statusText.textContent =`${CurrentPlayer} !WINS`;
    running =false;
  }else if(!  options.includes("")) {
    statusText.textContent =`${CurrentPlayer} !DRAW`;
    running =false ;
  }else{
    changeplayer()
  }
  
}

function RestartGame() {
  CurrentPlayer ="X"
  options =["", "", "", "", "", "", "", "", ""];
  statusText.textContent =`${CurrentPlayer} s Turn`
  cells.forEach( cell => cell.textContent ="")
  running =true

}
