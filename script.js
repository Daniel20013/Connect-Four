const nrLines = 6;
const nrColumns = 7;
const cell = document.getElementById("cell");
let player = 1;
let buttonState = [];

function blockTheButtons() {
    let buttons = document.querySelectorAll("button");
    for (let i = 0; i < buttons.length; ++i) {
        buttons[i].disabled = true;
    }
    document.querySelector(".endGame").style.display = "block";
}

function startGame() {
    for (let i = 0; i < nrLines; ++i) {
        buttonState[i] = [];
        for (let j = 0; j < nrColumns; ++j) {
            buttonState[i][j] = 0;
        }
    }
    let start = document.getElementById("start");
    start.style.display = "none";
    let column = 0, line = 0;
    for (let i = 0; i < nrLines; ++i) {
        line = 0;
        for (let j = 0; j < nrColumns; ++j) {
            const button = document.createElement("button");
            button.classList.add("cell");
            button.dataset.line = i;
            button.dataset.col = j;
            button.innerHTML = " ";
            button.addEventListener("click", buttonColoring);
            button.style.top = (2.5 + column) + "%";
            button.style.left = (5 + line) + "%";
            button.style.display = "block";
            line += 13;
            cell.appendChild(button);
        }
        column += 16;
    }
}

function buttonColoring() {
    const col = this.dataset.col;
    let line;
    for (let i = nrLines - 1; i >= 0; i--) {
        if (buttonState[i][col] === 0) {
            line = i;
            buttonState[i][col] = player;
            break;
        }
    }
    const button = document.querySelector(`[data-line="${line}"][data-col="${col}"]`);
    button.style.backgroundColor = (player === 1) ? "red" : "yellow";
    player = (player === 1) ? 2 : 1;
    checkItOut(line, col);
}

function theMainDiagonal(i, j, currentPlayer) {
    if (i >= 0 && j >= 0 && i < nrLines && j < nrColumns && buttonState[i][j] === currentPlayer && currentPlayer != 0) {
        return 1;
    }
    return 0;
}

function checkItOut(line, col) {
    const currentPlayer = buttonState[line][col];
    const THREE = 3, FOUR = 4;
    const lineInt = parseInt(line);
    const colInt = parseInt(col);
    let win = 0;
    for (let i = lineInt - THREE, j = colInt - THREE; i <= lineInt + THREE; ++i, ++j) {
        if (theMainDiagonal(i, j, currentPlayer)) {
            ++win;
            if (win === FOUR) {
                blockTheButtons();
                return;
            }
        } else {
            win = 0;
        }
    }
    win = 0;
    for (let i = lineInt - THREE; i <= lineInt + THREE; ++i) {
        if (i >= 0 && i < nrLines && buttonState[i][colInt] === currentPlayer && currentPlayer != 0) {
            ++win;
            if (win === FOUR) {
                blockTheButtons();
                return;
            }
        } else {
            win = 0;
        }
    }
    win = 0;
    for (let i = colInt - THREE; i <= colInt + THREE; ++i) {
        if (i >= 0 && i < nrColumns && buttonState[lineInt][i] === currentPlayer && currentPlayer != 0) {
            ++win;
            if (win === FOUR) {
                blockTheButtons();
                return;
            }
        } else {
            win = 0;
        }
    }
    win = 0;
    for (let i = lineInt - THREE, j = colInt + THREE; i <= lineInt + THREE; ++i, --j) {
        if (i >= 0 && j >= 0 && i < nrLines && j < nrColumns && buttonState[i][j] === currentPlayer && currentPlayer != 0) {
            ++win;
            if (win === FOUR) {
                blockTheButtons();
                return;
            }
        } else {
            win = 0;
        }
    }   
}

function restart() {
    alert("da");
    for (let i = 0; i < nrLines; ++i) {
        buttonState[i] = [];
        for (let j = 0; j < nrColumns; ++j) {
            buttonState[i][j] = 0;
        }
    }
    document.querySelector(".endGame").style.display = "none";
}
