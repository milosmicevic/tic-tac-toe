const boardContainer = document.querySelector("#board-container");
const fields = document.querySelectorAll(".field");

let eksIndexes = [];
let oksIndexes = [];

let turnCounter = 1;

boardContainer.addEventListener("click", (e) => {
  if (e.target.innerHTML === "") {
    const fieldIndex = e.target.id;
    e.target.appendChild(
      turnCounter % 2 !== 0 ? eksSign(fieldIndex) : oksSign(fieldIndex)
    );
    turnCounter++;
    checkWinner();
  }

  if (turnCounter > 9) {
    alert("Its Tie!");
  }
});

function eksSign(fieldIndex) {
  const eks = document.createElement("span");
  eks.classList.add("eks");

  eksIndexes.push(fieldIndex);

  return eks;
}

function oksSign(fieldIndex) {
  const oks = document.createElement("span");
  oks.classList.add("oks");

  oksIndexes.push(fieldIndex);

  return oks;
}

function checkWinner() {
  const winCombos = [
    ["0", "1", "2"],
    ["3", "4", "5"],
    ["6", "7", "8"],
    ["0", "3", "6"],
    ["1", "4", "7"],
    ["2", "5", "8"],
    ["0", "4", "8"],
    ["2", "4", "6"],
  ];

  winCombos.forEach((combo) => {
    if (combo.every((index) => eksIndexes.includes(index))) {
      alert("X has Won!");
      resetGame();
    } else if (combo.every((index) => oksIndexes.includes(index))) {
      alert("O has Won!");
      resetGame();
    }
  });
}

function resetGame() {
  eksIndexes = [];
  oksIndexes = [];
  turnCounter = 1;
  fields.forEach((field) => (field.innerHTML = ""));
}
