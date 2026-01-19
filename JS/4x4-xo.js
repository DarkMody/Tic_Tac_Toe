document.getElementById("chess-xo").onclick = function () {
  document.getElementById("hello").textContent = "Welcome In Chess Tic-Tac-Toe";
  document.getElementsByClassName("main-page")[0].style.display = "none";
  document.getElementsByClassName("main-game")[0].style.display = "grid";
  new Chess_XO(4, 4, "Chess", 0, 0);
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};

class Chess_XO extends Board {
  constructor(x, y, gn, p1, p2) {
    super(x, y, gn, p1, p2);
    this.gameOver = false;
    this.collection = document.getElementsByClassName("main-board")[0].children;
    this.dx = [-1, 1, 0, 0];
    this.dy = [0, 0, 1, -1];
    this.savePosition = [-1, -1];
    // Blank Symbol
    this.checkingBoard = [];
    for (let i = 0; i < x; i++) {
      this.checkingBoard[i] = [];
      for (let j = 0; j < y; j++) {
        this.checkingBoard[i][j] = 0;
      }
    }
    // To make Computer Play
    this.possibleSteps = [];

    // Set Symbols in the Starting Positions
    for (let i = 0; i < y; i++) {
      if (i % 2 == 0) {
        this.checkingBoard[0][i] = "o";
        this.checkingBoard[x - 1][i] = "x";
        this.collection[i].innerHTML = "O";
        this.collection[i].style.color = "#3742fa";
        this.collection[12 + i].innerHTML = "X";
        this.collection[12 + i].style.color = "#e74c3c";
      } else {
        this.checkingBoard[0][i] = "x";
        this.checkingBoard[x - 1][i] = "o";
        this.collection[i + 12].innerHTML = "O";
        this.collection[i + 12].style.color = "#3742fa";
        this.collection[i].innerHTML = "X";
        this.collection[i].style.color = "#e74c3c";
      }
    }

    // Onclick Effect
    Array.from(this.board.children).forEach((ele) => {
      ele.onclick = () => {
        if (ele.innerHTML == "X" && n_moves % 2 == 0 && !this.gameOver) {
          this.checkAround(
            ele.getAttribute("x") - 1,
            ele.getAttribute("y") - 1,
            ele.style.color,
          );
        } else if (ele.innerHTML == "O" && n_moves % 2 == 1 && !this.gameOver) {
          this.checkAround(
            ele.getAttribute("x") - 1,
            ele.getAttribute("y") - 1,
            ele.style.color,
          );
        }
        if (ele.style.backgroundColor != "rgb(25, 26, 47)") {
          let s = this.savePosition[0] * y + this.savePosition[1];
          ele.innerHTML = this.collection[s].innerHTML;
          ele.style.color = this.collection[s].style.color;
          this.checkingBoard[this.savePosition[0]][this.savePosition[1]] = 0;
          this.checkingBoard[ele.getAttribute("x") - 1][
            ele.getAttribute("y") - 1
          ] = ele.innerHTML.toLowerCase();
          this.reset();
          this.collection[s].innerHTML = "";
          if (this.is_win(ele.innerHTML.toLowerCase())) {
            if (ele.innerHTML == "X") {
              state.innerHTML = "Player X Wins ❤";
              state.style.color = "#e74c3c";
              p1++;
              document.getElementById("points1").innerHTML = parseInt(p1);
            } else {
              state.innerHTML = "Player O Wins 💙";
              state.style.color = "#3742fa";
              p2++;
              document.getElementById("points2").innerHTML = parseInt(p2);
            }
            this.stopAll();
          } else {
            if (ele.innerHTML == "X") {
              state.innerHTML = "Player O Turn";
              state.style.color = "#3742fa";
              // Computer Turn
              if (
                document.getElementById("computer").checked &&
                !this.gameOver
              ) {
                let x1;
                let y1;
                let idx;
                while (true) {
                  x1 = Math.floor(Math.random() * x);
                  y1 = Math.floor(Math.random() * y);
                  if (this.checkingBoard[x1][y1] === "o") {
                    this.possibleSteps = [];
                    this.checkAround(x1, y1, "#3742fa");
                    if (this.possibleSteps.length != 0) break;
                  }
                }
                idx = Math.floor(Math.random() * this.possibleSteps.length);
                let use = this.possibleSteps[idx];
                this.collection[use[0] * y + use[1]].innerHTML = "O";
                this.collection[use[0] * y + use[1]].style.color = "#3742fa";
                this.collection[x1 * y + y1].innerHTML = "";
                this.checkingBoard[x1][y1] = 0;
                this.checkingBoard[use[0]][use[1]] = "o";
                this.reset();
                if (this.is_win("o")) {
                  state.innerHTML = "Player O Wins 💙";
                  state.style.color = "#3742fa";
                  p2++;
                  document.getElementById("points2").innerHTML = parseInt(p2);
                  this.stopAll();
                } else {
                  state.innerHTML = "Player X Turn";
                  state.style.color = "#e74c3c";
                }
                n_moves++;
              }
            } else {
              state.innerHTML = "Player X Turn";
              state.style.color = "#e74c3c";
            }
            n_moves++;
          }
        }
      };
    });

    // New Game Button
    document.getElementById("new-game").onclick = () => {
      new Chess_XO(4, 4, "Chess", p1, p2);
    };
    // Choosing PvP
    document.getElementById("player2").onclick = () => {
      new Chess_XO(4, 4, "Chess", 0, 0);
    };
    // Choosing PvC
    document.getElementById("computer").onclick = () => {
      new Chess_XO(4, 4, "Chess", 0, 0);
    };
    // Rules
    let rulesList = document.querySelector("#rules ul");
    rulesList.innerHTML = `
            <li><strong>Board:</strong> 4x4 grid with specific starting positions</li>
            <li>
              <strong>Starting Setup:</strong>
            </li>
            <li><div style="background: rgba(255,255,255,0.1); padding: 10px; margin: 10px 0; border-radius: 5px; font-family: monospace; text-align: center;">
                Initial Board:<br>
                O X O X<br>
                . . . .<br>
                . . . .<br>
                X O X O
            </div></li>
            <li><strong style="color: var(--secondColor)">Movement Rules:</strong></li>
            <li>Players take turns <span style="color: #f39c12">moving one of their tokens</span> to an adjacent empty square</li>
            <li><strong>Valid Moves:</strong>
                <ul style="margin-left: 20px; margin-top: 5px;">
                    <li>Horizontal: Left or right to adjacent cell</li>
                    <li>Vertical: Up or down to adjacent cell</li>
                    <li><span style="color: #e74c3c">Cannot move diagonally</span></li>
                    <li><span style="color: #e74c3c">Cannot jump over other tokens</span></li>
                    <li>Cannot move off the board</li>
                </ul>
            </li>
            <li><strong>Movement Process:</strong>
                <ol style="margin-left: 20px; margin-top: 5px;">
                    <li>Click on one of your tokens to select it</li>
                    <li>Valid move positions will be highlighted</li>
                    <li>Click on a highlighted cell to move your token there</li>
                    <li>The original cell becomes empty</li>
                </ol>
            </li>
            <li><strong style="color: var(--secondColor)">Winning Condition:</strong> The first player to align 
                <span style="color: #f39c12; font-weight: bold">three of their tokens in a row</span> 
                horizontally, vertically, or diagonally wins</li>
            <li><strong>Winning Patterns:</strong>
                <ul style="margin-left: 20px; margin-top: 5px;">
                    <li>Horizontal line (any row)</li>
                    <li>Vertical line (any column)</li>
                    <li>Diagonal line (either direction)</li>
                </ul>
            </li>
            <li>The game ends immediately when any player forms a line of three</li>
        `;
  }

  is_win(sym) {
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 4; j++) {
        // Row Checking
        if (
          j < 2 &&
          this.checkingBoard[i][j] == sym &&
          this.checkingBoard[i][j + 1] == sym &&
          this.checkingBoard[i][j + 2] == sym
        ) {
          return true;
        }
        // Column Checking
        if (
          i < 2 &&
          this.checkingBoard[i][j] == sym &&
          this.checkingBoard[i + 1][j] == sym &&
          this.checkingBoard[i + 2][j] == sym
        ) {
          {
            return true;
          }
        }
        // Right Diagonal Checking
        if (
          i < 2 &&
          j < 2 &&
          this.checkingBoard[i][j] == sym &&
          this.checkingBoard[i + 1][j + 1] == sym &&
          this.checkingBoard[i + 2][j + 2] == sym
        ) {
          return true;
        }
        // Left Diagonal Checking
        if (
          i < 2 &&
          j >= 2 &&
          this.checkingBoard[i][j] == sym &&
          this.checkingBoard[i + 1][j - 1] == sym &&
          this.checkingBoard[i + 2][j - 2] == sym
        ) {
          return true;
        }
      }
    }
    return false;
  }
  stopAll() {
    let s = this.board.children;
    Array.from(s).forEach((ele) => {
      ele.className = "";
    });
    this.gameOver = true;
  }
  checkAround(x1, y1, color) {
    this.reset();
    this.savePosition = [x1, y1];
    for (let i = 0; i < 4; i++) {
      let nx = x1 + this.dx[i],
        ny = y1 + this.dy[i];
      if (this.fastCheck(nx, ny)) {
        this.collection[nx * 4 + ny].style.backgroundColor = color;
        this.possibleSteps.push([nx, ny]);
      }
    }
  }
  fastCheck(nx, ny) {
    return (
      nx >= 0 && nx < 4 && ny >= 0 && ny < 4 && this.checkingBoard[nx][ny] == 0
    );
  }
  reset() {
    Array.from(this.board.children).forEach((el) => {
      el.style.backgroundColor = "rgb(25, 26, 47)";
    });
  }
}
