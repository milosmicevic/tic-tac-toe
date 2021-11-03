const boardContainer = document.querySelector("#board-container");
const fields = document.querySelectorAll(".field");
const message = document.querySelector("#message");

const playButton = document.querySelector("#play-button");
const restartButton = document.querySelector("#restart-button");

let eksIndexes = [];
let oksIndexes = [];

let moveCounter = 1;

let isGameDone = false;

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

function setEksSign(fieldIndex) {
  const eks = document.createElement("span");
  eks.classList.add("eks");

  eksIndexes.push(fieldIndex);

  return eks;
}

function setOksSign(fieldIndex) {
  const oks = document.createElement("span");
  oks.classList.add("oks");

  oksIndexes.push(fieldIndex);

  return oks;
}

function playMove(event) {
  if (isGameDone) {
    return;
  } else if (event.target.innerHTML === "") {
    const fieldIndex = event.target.id;

    event.target.appendChild(
      moveCounter % 2 !== 0 ? setEksSign(fieldIndex) : setOksSign(fieldIndex)
    );

    moveCounter++;
    checkWinner();
  }
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
      isGameDone = true;
    } else if (combo.every((index) => oksIndexes.includes(index))) {
      message.innerText = `${playerTwoName} Won! 🏆`;
      isGameDone = true;
    } else if (moveCounter > 9) {
      message.innerText = "Its Tie 😬";
      isGameDone = true;
    }
  });
}

function resetGame() {
  eksIndexes = [];
  oksIndexes = [];
  moveCounter = 1;
  isGameDone = false;
  fields.forEach((field) => (field.innerHTML = ""));
}

playButton.addEventListener("click", setPlayerNames);

boardContainer.addEventListener("click", (e) => {
  playMove(e);
});

restartButton.addEventListener("click", resetGame);
