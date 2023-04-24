const nrLines = 6;
const nrColumns = 7;
const cell = document.getElementById("cell");
let player = 1;
let buttonState = [];

for (let i = 0; i < nrLines; ++i) {
    buttonState[i] = [];
    for (let j = 0; j < nrColumns; ++j) {
        buttonState[i][j] = 0;
    }
}

function blockTheButtons() {
    let buttons = document.querySelectorAll("button");
    for (let i = 0; i < buttons.length; ++i) {
        buttons[i].disabled = true;
    }
}

function startGame() {
    let start = document.getElementById("start");
    start.style.display = "none";
    let blueImage = document.getElementById("blueImage");
    blueImage.style.display = "block";

    let column = 0, line = 0;
    buttonState[line][column]
    for (let i = 0; i < nrLines; ++i) {
        line = 0;
        for (let j = 0; j < nrColumns; ++j) {
            const button = document.createElement("button");
            button.classList.add("cell");
            button.dataset.line = i;
            button.dataset.col = j;
            button.innerHTML = " ";
            button.addEventListener("click", buttonColoring);
            button.style.position = "absolute";
            button.style.top = (2.5 + column) + "%";
            button.style.left = (5 + line) + "%";
            button.style.padding = "2em";
            button.style.backgroundColor = "white";
            button.style.cursor = "pointer";
            button.style.borderRadius = "5%";
            button.style.border = "none";
            button.style.width = "12%";
            button.style.height = "15%";
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

function checkItOut(line, col) {
    const currentPlayer = buttonState[line][col];
    const THREE = 3, FOUR = 4;
    const lineInt = parseInt(line);
    const colInt = parseInt(col);
    let win = 0;

    for (let i = lineInt - THREE, j = colInt - THREE; i <= lineInt + THREE; ++i, ++j) {
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
