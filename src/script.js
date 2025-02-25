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

function gameWon() {
    return isVerticalWin() || isHorizontalWin() || isDiagonalWin()
}

function isVerticalWin() {
    const column1Cells = Array.from(document.querySelectorAll("[data-column = '1']"))
    const column2Cells = Array.from(document.querySelectorAll("[data-column = '2']"))
    const column3Cells = Array.from(document.querySelectorAll("[data-column = '3']"))
    for (let column of [column1Cells, column2Cells, column3Cells]) {
        if (column.every(cell => cell.classList.contains("placed") && cell.dataset.symbol == column[0].dataset.symbol)) {
            column.forEach(cell => cell.classList.add("winning-cells"))
            winner = ""
            return true
        }
    }
    return false
}

function isHorizontalWin() {
    const row1= Array.from(document.querySelectorAll("[data-row = '1']"))
    const row2 = Array.from(document.querySelectorAll("[data-row = '2']"))
    const row3 = Array.from(document.querySelectorAll("[data-row = '3']"))
    for (let row of [row1, row2, row3]) {
        if (row.every(cell => cell.classList.contains("placed") && cell.dataset.symbol == row[0].dataset.symbol)) {
            row.forEach(cell => cell.classList.add("winning-cells"))
            winner = ""
            return true
        }
    }
    return false
}

function isDiagonalWin() {
    let diagonal1 = [document.getElementById("1"), document.getElementById("5"), document.getElementById("9")];
    let diagonal2 = [document.getElementById("7"), document.getElementById("5"), document.getElementById("3")];
    for (let diagonal of  [diagonal1, diagonal2])  {
        if (diagonal.every(cell => cell.classList.contains("placed") && cell.dataset.symbol == diagonal1[0].dataset.symbol)) {
            diagonal.forEach(cell => cell.classList.add("winning-cells"));
            return true
        }
    }
    return false
}

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
    if (gameWon()) {
        winner = currPlayer;
        console.log(`${currPlayer.name} won!`);
        gameOver = true;
        messageDisplay.innerText = `${currPlayer.name} won!`;
        return
    }
    if (!gameWon() && isBoardFull()) {
        gameOver = true;
        console.log("It was a draw");
        messageDisplay.innerText = "It's a draw";
        return
    }
    switchPlayer();
}

function isBoardFull() {
    return cells.every((cell) => cell.dataset.symbol);
}
