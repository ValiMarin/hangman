const hiddenWord = document.getElementById("hiddenWord");
const buttonsContainer = document.getElementById("buttonsContainer");
const lives = document.getElementById("lives");
const message = document.getElementById("message");

const words = [
  "VALI",
  "MARIN",
  "WELLCODE",
  "CODE",
  "JAVASCRIPT",
  "FRONTEND",
  "BACKEND",
];

const buttons = [];

let currentStateHiddenWord = [],
  indexWordRandomSlected = 0,
  wordRandomSlected = "",
  nrLives = 0;

function newGame(time) {
  setTimeout(() => {
    indexWordRandomSlected = Math.floor(Math.random() * words.length);
    wordRandomSlected = words[indexWordRandomSlected];
    currentStateHiddenWord = [];
    nrLives = 7;

    buttons.forEach((button) => {
      button.remove();
    });

    for (let i = 0; i < wordRandomSlected.length; ++i) {
      currentStateHiddenWord.push("_");
    }

    hiddenWord.textContent = currentStateHiddenWord.join(" ");
    message.textContent = "";
    lives.textContent = "7";

    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
    for (const letter of letters) {
      const button = document.createElement("button");
      button.textContent = letter;
      button.id = letter;
      button.classList.add("btn", "btn-primary");
      buttonsContainer.appendChild(button);
      button.addEventListener("click", (e) => {
        chooseLetter(e.target.id);
      });
      buttons.push(button);
    }
  }, time);
}

function chooseLetter(letter) {
  const pressedButton = document.getElementById(letter);
  pressedButton.disabled = true;
  let goodLetter = false;

  for (let i = 0; i < wordRandomSlected.length; ++i) {
    if (letter === wordRandomSlected[i]) {
      currentStateHiddenWord[i] = wordRandomSlected[i];
      goodLetter = true;
    }
  }

  if (!goodLetter) {
    --nrLives;

    if (nrLives === 0) {
      message.textContent = "GAME OVER - YOU LOST!";
      newGame(3000);
    }
  } else if (currentStateHiddenWord.join("") === wordRandomSlected) {
    message.textContent = "GAME OVER - YOU WON!";
    newGame(3000);
  }

  lives.textContent = nrLives;
  hiddenWord.textContent = currentStateHiddenWord.join(" ");
}

newGame(0);
