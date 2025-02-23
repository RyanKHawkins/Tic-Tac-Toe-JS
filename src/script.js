const cells = Array.from(document.querySelectorAll(".cell"));
const message = document.getElementById("message");
const startButton = document.querySelector("#start-button");
startButton.addEventListener("click", newGame);
const messageDisplay = document.querySelector("#message-display");
const h2 = document.querySelector("h2");
h2.addEventListener("click", () => {
    return;
});

let player1 = { name: "Player 1", symbol: "X" };
let player2 = { name: "Player 2", symbol: "O" };
let currPlayer = player1;
let winner = "";
let gameOver = false;
function switchPlayer() {
    currPlayer = currPlayer == player1 ? player2 : player1;
    messageDisplay.innerText = `Player:  ${currPlayer.symbol}`;
}
function gameWon() {}

for (i = 0; i < cells.length; i++) {
    cells[i].addEventListener("click", (event) => {
        placeSymbol(event.target);
        if (gameOver) {
            startButton.classList.add("alert-button");
            setTimeout(() => {
                startButton.classList.remove("alert-button");
            }, 500);
        }
    });
}

function newGame() {
    if (winner) {
        currPlayer = player1 == winner ? player2 : player1
    }
    cells.forEach((cell) => {
        cell.removeAttribute("data-symbol");
        cell.innerText = "";
        cell.classList = "cell";
    });
    startButton.classList.remove("alert-button");
    messageDisplay.innerText = `Player:  ${currPlayer.symbol}`;
    gameOver = false;
    winner = "";
}

function placeSymbol(cell) {
    if (gameOver) {
        return;
    }
    if (cell.dataset.symbol) {
        return;
    }
    cell.dataset.symbol = currPlayer.symbol;
    cell.innerText = currPlayer.symbol;
    cell.classList.add("placed");
    if (gameWon() || isBoardFull()) {
        startButton.classList.add("alert-button");
        setTimeout(() => {
            startButton.classList.remove("alert-button");
        }, 500);
    }
    switchPlayer();
    if (gameWon()) {
        winner = currPlayer;
        console.log(`${currPlayer.name} won!`);
        gameOver = true;
        messageDisplay.innerText = `${currPlayer.name} won!`;
    }
    if (!gameWon() && isBoardFull()) {
        gameOver = true;
        console.log("It was a draw");
        messageDisplay.innerText = "It's a draw";
    }
}

function isBoardFull() {
    return cells.every((cell) => cell.dataset.symbol);
}
