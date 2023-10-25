// Data, application state
const theWord = words[random(0, words.length - 1)];
const letters = "abcdefghijklmnopqrstuvwxyz";
const guesses = [];
let gameState = 0; // 0 in-game, 1 win, 2 lose

function getNoWrongGuesses() {
  return guesses.filter(g => !theWord.includes(g)).length;
}
function isWin() {
  return Array.from(theWord).every(l => guesses.includes(l));
}
function isLose() {
  return getNoWrongGuesses() >= 9;
}

// Utility
function random(a, b) {
  return Math.floor(Math.random() * (b - a + 1)) + a;
}

// Elements
const divWord = document.querySelector("#the-word");
const divLetters = document.querySelector("#letters");
const divScore = document.querySelector("#score");
const divWinLose = document.querySelector("#end-of-game");

// Event listeners
divLetters.addEventListener("click", onGuess);
function onGuess(e) {
  if (e.target.matches("button")) {
    const button = e.target;
    // read input
    const letter = button.innerHTML;
    // processing
    guesses.push(letter); //push, pop, shift, unshift
    if (isWin()) {
      gameState = 1;
    }
    else if (isLose()) {
      gameState = 2;
    } 
    // write output
    renderWord();
    renderLetters(); // declarative, replacing
    // button.disabled = true; // imperative, changing
    renderScore();
    renderWinLose();
    renderSVG();
  }
}

// Render
function renderWord() {
  divWord.innerHTML = Array.from(theWord)
    .map(l => `<span
      ${gameState === 2 && !guesses.includes(l) ? 'class="missing"' : ""} 
    >${guesses.includes(l) || gameState === 2 ? l : ""}</span>`)
    .join("");
}
function renderLetters() {
  divLetters.innerHTML = Array.from(letters)
    .map(l => `<button ${guesses.includes(l) ? "disabled" : ""}>${l}</button>`)
    .join("");
}
function renderScore() {
  divScore.innerHTML = `Score: ${getNoWrongGuesses()}/9`;
}
function renderWinLose() {
  if (gameState > 0) {
    divWinLose.hidden = false;
  }
  if (gameState === 1) {
    divWinLose.innerHTML = `
      <span>You won!</span>
      <button>Play again!</button>
    `;
    divWord.classList.add("won");
  }
  if (gameState === 2) {
    divWinLose.innerHTML = `
      <span>You lost!</span>
      <button>Play again!</button>
    `;
  }
}
function renderSVG() {
  const c = getNoWrongGuesses();
  for (let i = 1; i <= c; i++) {
    document.querySelector(`svg > *:nth-child(${i})`)
      .classList.add("show");
  }
}

// Start
renderWord();
renderLetters();
renderScore();