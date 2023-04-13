const nrLine = 6;
const nrColumn = 7;
const cell = document.getElementById("cell");
let player = 1;
let buttonState = [];

for (let i = 0; i < nrLine; ++i) {
    buttonState[i] =[];
    for (let j = 0; j < nrColumn; ++j) {
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
    for (let i = 0; i < nrLine; ++i) {
        line = 0;
        for (let j = 0; j < nrColumn; ++j) {
            const button = document.createElement("button");
            button.classList.add("cell");
            button.dataset.line = i;
            button.dataset.col = j;
            button.addEventListener("click", function() {
                const line = this.dataset.line;
                const col = this.dataset.col;

                if (buttonState[line][col] === 0) {
                    buttonState[line][col] = player;
                    this.style.backgroundColor = (player === 1) ? "red" : "yellow";
                    player = (player === 1) ? 2 : 1;
                }
            });
            button.innerHTML = " ";
            button.addEventListener("click", checkItOut);
            button.style.position = "absolute";
            button.style.top = (110 + column) + "px";
            button.style.left = (300 + line) + "px";
            button.style.padding = "2em";
            button.style.backgroundColor = "white";
            button.style.cursor = "pointer";
            button.style.borderRadius = "5%";
            button.style.border = "none";
            button.style.width = "100px";
            button.style.height = "100px";
            line += 110;
            cell.appendChild(button);
        }
        column += 110;
    }
}

function checkItOut() {
    const line = this.dataset.line;
    const col = this.dataset.col;
    const currentPlayer = buttonState[line][col];
    const THREE = 3, FOUR = 4;
    const lineInt = parseInt(line);
    const colInt = parseInt(col);
    let win = 0;

    for (let i = lineInt - THREE, j = colInt - THREE; i <= lineInt + THREE; ++i, ++j) {
        if (i >= 0 && j >= 0 && i < nrLine && j < nrColumn && buttonState[i][j] === currentPlayer) {
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
        if (i >= 0 && i < nrLine && buttonState[i][colInt] === currentPlayer) {
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
        if (i >= 0 && i < nrColumn && buttonState[lineInt][i] === currentPlayer) {
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
        if (i >= 0 && j >= 0 && i < nrLine && j < nrColumn && buttonState[i][j] === currentPlayer) {
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
