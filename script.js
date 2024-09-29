const boardElement = document.getElementById("board");
const resetButton = document.getElementById("resetButton");
const statusElement = document.getElementById("status");

let board = Array(9).fill(null);
let currentPlayer = "X";
let gameActive = true;

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

function createBoard() {
    board.forEach((_, index) => {
        const cell = document.createElement("div");
        cell.classList.add("cell");
        cell.addEventListener("click", () => handleCellClick(index));
        boardElement.appendChild(cell);
    });
}

function handleCellClick(index) {
    if (board[index] || !gameActive) return;

    board[index] = currentPlayer;
    updateBoard();
    checkWinner();
}

function updateBoard() {
    const cells = document.querySelectorAll(".cell");
    cells.forEach((cell, index) => {
        cell.innerHTML = ""; // Clear previous marks
        if (board[index]) {
            const mark = document.createElement("div");
            mark.classList.add("mark");
            mark.textContent = board[index];
            cell.appendChild(mark);
        }
    });
}

function checkWinner() {
    let roundWon = false;

    winningConditions.forEach(condition => {
        const [a, b, c] = condition;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            roundWon = true;
        }
    });

    if (roundWon) {
        statusElement.textContent = `Player ${currentPlayer} wins!`;
        gameActive = false;
        return;
    }

    if (!board.includes(null)) {
        statusElement.textContent = "It's a draw!";
        gameActive = false;
    }

    currentPlayer = currentPlayer === "X" ? "O" : "X";
}

resetButton.addEventListener("click", resetGame);

function resetGame() {
    board.fill(null);
    gameActive = true;
    currentPlayer = "X";
    statusElement.textContent = "";
    updateBoard();
}

createBoard();
