document.getElementById("real-ultimate-xo").onclick = function () {
  document.getElementById("hello").textContent =
    "Welcome In Real Ultimate Tic-Tac-Toe";
  document.getElementsByClassName("main-page")[0].style.display = "none";
  document.getElementsByClassName("main-game")[0].style.display = "grid";
  new RealUltimate_XO(9, 9, "Ultimate", 0, 0);
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};

class RealUltimate_XO extends Board {
  constructor(x, y, gn, p1, p2) {
    super(x, y, gn, p1, p2);
    this.gameOver = false;
    // To But Something Like walls to know which is the board u are in now
    let collection = document.getElementsByClassName("main-board")[0].children;
    for (let i = 0; i < x; i++) {
      // Column Walls
      collection[2 + x * i].style.borderRight = "var(--gap) solid orange";
      collection[5 + x * i].style.borderRight = "var(--gap) solid orange";
      // Row Walls
      collection[x * 2 + i].style.borderBottom = "var(--gap) solid orange";
      collection[x * 5 + i].style.borderBottom = "var(--gap) solid orange";
    }
    // Making The subBoard Ready
    document.getElementById("sub-board").innerHTML = "";
    this.upper = document.getElementById("sub-board");
    this.subBoard = [];
    this.subBoardMoves = 0;
    for (let i = 0; i < 3; i++) {
      this.subBoard[i] = [];
      for (let j = 0; j < 3; j++) {
        this.subBoard[i][j] = 0;
      }
    }
    this.upper.style.gridTemplateRows = `repeat(${3}, ${60}px)`;
    this.upper.style.gridTemplateColumns = `repeat(${3}, ${60}px)`;
    this.upper.style.height = `${3 * 60 + (3 - 1) * 4}px `;
    this.upper.style.width = `${3 * 60 + (3 - 1) * 4}px `;
    for (let i = 1; i <= 3; i++) {
      for (let j = 1; j <= 3; j++) {
        let s = document.createElement("button");
        this.upper.appendChild(s);
      }
    }

    // Blank Symbol
    this.checkingBoard = [];
    for (let i = 0; i < x; i++) {
      this.checkingBoard[i] = [];
      for (let j = 0; j < y; j++) {
        this.checkingBoard[i][j] = 0;
      }
    }

    // Onclick Effect
    Array.from(this.board.children).forEach((ele) => {
      ele.onclick = () => {
        ele.style.background = "rgb(25, 26, 47)";
        if (
          ele.classList.contains("active") &&
          !ele.classList.contains("done")
        ) {
          if (n_moves % 2 == 0) {
            ele.innerHTML = "X";
            ele.style.color = "#e74c3c";
            this.checkingBoard[ele.getAttribute("x") - 1][
              ele.getAttribute("y") - 1
            ] = "x";
            this.is_winSub(
              "x",
              ele.getAttribute("x") - 1,
              ele.getAttribute("y") - 1,
            );
            if (this.is_win("x")) {
              state.innerHTML = "Player X Wins ❤";
              state.style.color = "#e74c3c";
              p1++;
              document.getElementById("points1").innerHTML = parseInt(p1);
              this.stopAll();
            } else {
              state.innerHTML = "Player O Turn";
              state.style.color = "#3742fa";
              this.nextPlayBoard(
                ele.getAttribute("x") - 1,
                ele.getAttribute("y") - 1,
              );
            }
          } else {
            ele.innerHTML = "O";
            ele.style.color = "#3742fa";
            this.checkingBoard[ele.getAttribute("x") - 1][
              ele.getAttribute("y") - 1
            ] = "o";
            this.is_winSub(
              "o",
              ele.getAttribute("x") - 1,
              ele.getAttribute("y") - 1,
            );
            if (this.is_win("o")) {
              state.innerHTML = "Player O Wins 💙";
              state.style.color = "#3742fa";
              p2++;
              document.getElementById("points2").innerHTML = parseInt(p2);
              this.stopAll();
            } else {
              state.innerHTML = "Player X Turn";
              state.style.color = "#e74c3c";
              this.nextPlayBoard(
                ele.getAttribute("x") - 1,
                ele.getAttribute("y") - 1,
              );
            }
          }
          if (this.is_draw()) {
            state.innerHTML = "Draw 🧡";
            state.style.color = "orange";
            this.stopAll();
          }
          ele.classList.remove("active");
          n_moves++;

          // Computer Turn
          if (document.getElementById("computer").checked && !this.gameOver) {
            let x1;
            let y1;
            while (true) {
              x1 = Math.floor(Math.random() * x);
              y1 = Math.floor(Math.random() * y);
              if (
                this.checkingBoard[x1][y1] === 0 &&
                collection[y1 + x1 * y].classList.contains("active") &&
                !collection[y1 + x1 * y].classList.contains("done")
              )
                break;
            }
            collection[y1 + x1 * y].innerHTML = "O";
            collection[y1 + x1 * y].style.color = "#3742fa";
            collection[y1 + x1 * y].classList.remove("active");
            this.checkingBoard[x1][y1] = "o";
            this.is_winSub("o", x1, y1);
            if (this.is_win("o")) {
              state.innerHTML = "Player O Wins 💙";
              state.style.color = "#3742fa";
              p2++;
              document.getElementById("points2").innerHTML = parseInt(p2);
              this.stopAll();
            } else {
              state.innerHTML = "Player X Turn";
              state.style.color = "#e74c3c";
              this.nextPlayBoard(x1, y1);
            }
            n_moves++;
          }
          if (this.is_draw()) {
            state.innerHTML = "Draw 🧡";
            state.style.color = "orange";
            this.stopAll();
          }
        }
      };

      // For Hover Effect
      ele.addEventListener("mouseover", () => {
        if (ele.classList.contains("active")) {
          if (n_moves % 2 == 0) {
            ele.style.background = "#e74c3c";
          } else {
            ele.style.background = "#3742fa";
          }
        }
      });
      ele.addEventListener("mouseout", () => {
        if (!ele.classList.contains("save"))
          ele.style.background = "rgb(25, 26, 47)";
        else ele.style.background = "orange";
      });
    });

    // New Game Button
    document.getElementById("new-game").onclick = () => {
      new RealUltimate_XO(9, 9, "Ultimate", p1, p2);
    };
    // Choosing PvP
    document.getElementById("player2").onclick = () => {
      new RealUltimate_XO(9, 9, "Ultimate", 0, 0);
    };
    // Choosing PvC
    document.getElementById("computer").onclick = () => {
      new RealUltimate_XO(9, 9, "Ultimate", 0, 0);
    };
    // Rules
    let rulesList = document.querySelector("#rules ul");
    rulesList.innerHTML = `
            <li><strong>Board Structure:</strong> 9×9 grid divided into 9 smaller 3×3 boards</li>
            <li><strong>Basic Rules:</strong> Players take turns placing X or O in any empty cell</li>
            <li><strong style="color: var(--secondColor)">Special Rule - Forced Sub-Board:</strong>
                <ul style="margin-left: 20px; margin-top: 5px;">
                    <li>Your move determines where your opponent plays next</li>
                    <li>If you play in cell (row, col) of a mini-board, your opponent must play in the mini-board at position (row, col) on the main board</li>
                    <li>Example: If you play in the center of a mini-board, opponent must play in the center mini-board</li>
                </ul>
            </li>
            <li><strong>Sub-Board Completion:</strong>
                <ul style="margin-left: 20px; margin-top: 5px;">
                    <li>If you win a 3×3 mini-board, you claim that square on the main board</li>
                    <li>Once a mini-board is won, no more moves can be played in it</li>
                    <li>If a mini-board is full with no winner, it's a draw (blocked)</li>
                </ul>
            </li>
            <li><strong>Forced Move Exceptions:</strong>
                <ul style="margin-left: 20px; margin-top: 5px;">
                    <li>If your opponent sends you to a completed/full mini-board, you can play in ANY open mini-board</li>
                    <li>This is called a "free move"</li>
                </ul>
            </li>
            <li><strong style="color: var(--secondColor)">Winning Condition:</strong> Win the main 3×3 board by getting three mini-board wins in a row (horizontally, vertically, or diagonally)</li>
            <li><strong>Game Flow:</strong>
                <ol style="margin-left: 20px; margin-top: 5px;">
                    <li>First move can be anywhere (free move)</li>
                    <li>Each move determines which mini-board the opponent must play in next</li>
                    <li>Win mini-boards to claim squares on the main board</li>
                    <li>Win three mini-boards in a row on the main board to win the game</li>
                </ol>
            </li>
            <li><strong>Visual Indicators:</strong>
                <ul style="margin-left: 20px; margin-top: 5px;">
                    <li><span style="color: #f39c12">Highlighted mini-board</span>: Where you must play next</li>
                    <li>Red X: Mini-board won by Player 1</li>
                    <li>Blue O: Mini-board won by Player 2</li>
                    <li><span style="color: orange">Orange ( # )</span>: Draw/Blocked mini-board</li>
                </ul>
            </li>
            <li>The game continues until someone wins the main board or all mini-boards are completed</li>
        `;
  }

  is_win(sym) {
    for (let i = 0; i < 3; i++) {
      // Horizontally
      if (
        this.subBoard[i][0] == sym &&
        this.subBoard[i][1] == sym &&
        this.subBoard[i][2] == sym
      ) {
        return true;
      }

      // Vertically
      if (
        this.subBoard[0][i] == sym &&
        this.subBoard[1][i] == sym &&
        this.subBoard[2][i] == sym
      ) {
        return true;
      }
    }
    if (
      this.subBoard[0][0] == sym &&
      this.subBoard[1][1] == sym &&
      this.subBoard[2][2] == sym
    ) {
      return true;
    }
    if (
      this.subBoard[0][2] == sym &&
      this.subBoard[1][1] == sym &&
      this.subBoard[2][0] == sym
    ) {
      return true;
    }
    return false;
  }
  is_draw() {
    return this.subBoardMoves == 9 && !this.is_win("x") && !this.is_win("o");
  }
  stopAll() {
    let s = this.board.children;
    Array.from(s).forEach((ele) => {
      ele.className = "";
    });
    this.gameOver = true;
  }
  is_winSub(sym, x1, y1) {
    // The Start Index of Every subBoard
    let idxx = [0, 3, 6, 9];
    let idxy = [0, 3, 6, 9];
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (
          x1 >= idxx[i] &&
          x1 < idxx[i + 1] &&
          y1 >= idxy[j] &&
          y1 < idxy[j + 1]
        ) {
          if (this.almostWin(sym, idxx[i], idxy[j])) {
            this.upper.children[i * 3 + j].innerHTML = sym.toUpperCase();
            if (sym == "x") {
              this.upper.children[i * 3 + j].style.color = "#e74c3c";
              this.subBoard[i][j] = "x";
            } else {
              this.upper.children[i * 3 + j].style.color = "#3742fa";
              this.subBoard[i][j] = "o";
            }
            this.subBoardMoves++;
            // Delete The activation from the remaining buttons in this board
            let collection =
              document.getElementsByClassName("main-board")[0].children;
            for (let k = 0; k < 3; k++) {
              for (let f = 0; f < 3; f++) {
                collection[idxy[j] + idxx[i] * 9 + f + k * 9].classList.add(
                  "done",
                );
                collection[idxy[j] + idxx[i] * 9 + f + k * 9].classList.remove(
                  "active",
                );
              }
            }
          } else if (this.littleDraw(idxx[i], idxy[j])) {
            this.upper.children[i * 3 + j].innerHTML = "#";
            this.upper.children[i * 3 + j].style.color = "orange";
            this.subBoard[i][j] = "#";
            this.subBoardMoves++;
          }
        }
      }
    }
  }
  // Checking the winner for this subBoard
  almostWin(sym, x1, y1) {
    for (let i = 0; i < 3; i++) {
      // Horizontally
      if (
        this.checkingBoard[i + x1][0 + y1] == sym &&
        this.checkingBoard[i + x1][1 + y1] == sym &&
        this.checkingBoard[i + x1][2 + y1] == sym
      ) {
        return true;
      }

      // Vertically
      if (
        this.checkingBoard[0 + x1][i + y1] == sym &&
        this.checkingBoard[1 + x1][i + y1] == sym &&
        this.checkingBoard[2 + x1][i + y1] == sym
      ) {
        return true;
      }
    }
    if (
      this.checkingBoard[0 + x1][0 + y1] == sym &&
      this.checkingBoard[1 + x1][1 + y1] == sym &&
      this.checkingBoard[2 + x1][2 + y1] == sym
    ) {
      return true;
    }
    if (
      this.checkingBoard[0 + x1][2 + y1] == sym &&
      this.checkingBoard[1 + x1][1 + y1] == sym &&
      this.checkingBoard[2 + x1][0 + y1] == sym
    ) {
      return true;
    }
    return false;
  }

  // No Moves are available in this subBoard
  littleDraw(x1, y1) {
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (this.checkingBoard[x1 + i][y1 + j] == 0) return false;
      }
    }
    return true;
  }

  nextPlayBoard(x1, y1) {
    let idxx = [0, 3, 6, 9];
    let idxy = [0, 3, 6, 9];
    let collection = document.getElementsByClassName("main-board")[0].children;
    // Clear and Return Classes
    for (let k = 0; k < 9; k++) {
      for (let f = 0; f < 9; f++) {
        if (
          !collection[k * 9 + f].classList.contains("done") &&
          collection[k * 9 + f].innerHTML == ""
        ) {
          collection[k * 9 + f].classList.add("active");
        }
        collection[k * 9 + f].classList.remove("save");
        collection[k * 9 + f].style.background = "var(--mainBlack)";
      }
    }
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (
          x1 >= idxx[i] &&
          x1 < idxx[i + 1] &&
          y1 >= idxy[j] &&
          y1 < idxy[j + 1]
        ) {
          // Check if Playing there still available

          if (this.subBoard[x1 - idxx[i]][y1 - idxy[j]] == 0) {
            for (let k = 0; k < 3; k++) {
              for (let f = 0; f < 3; f++) {
                let s = idxy[y1 - idxy[j]] + idxx[x1 - idxx[i]] * 9 + f + k * 9;
                collection[s].classList.add("save");
                collection[s].style.backgroundColor = "orange";
              }
            }
            for (let k = 0; k < 9; k++) {
              for (let f = 0; f < 9; f++) {
                if (!collection[k * 9 + f].classList.contains("save"))
                  collection[k * 9 + f].classList.remove("active");
              }
            }
          }
        }
      }
    }
  }
}
