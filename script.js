const boardContainer = document.querySelector("#board-container");
const fields = document.querySelectorAll(".field");
const message = document.querySelector("#message");
const playButton = document.querySelector("#play-button");

let eksIndexes = [];
let oksIndexes = [];

let turnCounter = 1;

function setPlayerNames() {
  const dialogBox = document.querySelector("#dialog-box");
  const darkBackground = document.querySelector("#dark-background");
  const playerOneInput = dialogBox.querySelector("#player-one-input");
  const playerTwoInput = dialogBox.querySelector("#player-two-input");
  const errorMessage = dialogBox.querySelector(".error-message");

  if (playerOneInput.value !== "" && playerTwoInput.value !== "") {
    const playerOneName = document.querySelector("#player-one-name");
    const playerTwoName = document.querySelector("#player-two-name");

    playerOneName.innerText = playerOneInput.value;
    playerTwoName.innerText = playerTwoInput.value;

    dialogBox.style.display = "none";
    darkBackground.style.display = "none";
  } else {
    errorMessage.innerText = "You must enter both Names";
    return;
  }
}

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
  const playerOneName = document.querySelector("#player-one-name").innerText;
  const playerTwoName = document.querySelector("#player-two-name").innerText;

  winCombos.forEach((combo) => {
    if (combo.every((index) => eksIndexes.includes(index))) {
      message.innerText = `${playerOneName} Won! 🏆`;
      setTimeout(() => {
        resetGame();
      }, 500);
    } else if (combo.every((index) => oksIndexes.includes(index))) {
      message.innerText = `${playerTwoName} Won! 🏆`;
      setTimeout(() => {
        resetGame();
      }, 500);
    }
  });
}

function resetGame() {
  eksIndexes = [];
  oksIndexes = [];
  turnCounter = 1;
  fields.forEach((field) => (field.innerHTML = ""));
}

playButton.addEventListener("click", setPlayerNames);

boardContainer.addEventListener("click", (e) => {
  message.innerText = "";
  if (e.target.innerHTML === "") {
    const fieldIndex = e.target.id;

    e.target.appendChild(
      turnCounter % 2 !== 0 ? eksSign(fieldIndex) : oksSign(fieldIndex)
    );
    turnCounter++;
    checkWinner();
  }

  if (turnCounter > 9) {
    message.innerText = "Its Tie 😬";
    resetGame();
  }
});
