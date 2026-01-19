document.getElementById("infinity-xo").onclick = function () {
  document.getElementById("hello").textContent =
    "Welcome In Infinity Tic-Tac-Toe";
  document.getElementsByClassName("main-page")[0].style.display = "none";
  document.getElementsByClassName("main-game")[0].style.display = "grid";
  new Infinity_XO(3, 3, "Infinity", 0, 0);
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};

class Infinity_XO extends Board {
  constructor(x, y, gn, p1, p2) {
    super(x, y, gn, p1, p2);
    this.gameOver = false;
    this.changeBack;
    this.moves = [];
    this.edit = 0;
    this.delete = 0;
    // Blank Symbol
    this.checkingBoard = [];
    for (let i = 0; i < x; i++) {
      this.checkingBoard[i] = [];
      for (let j = 0; j < y; j++) {
        this.checkingBoard[i][j] = 0;
      }
    }

    // Display the Queue design
    document.getElementById("choose").innerHTML = "";
    document.getElementById(
      "choose"
    ).style.gridTemplateColumns = `repeat(3 , 100px)`;

    // Onclick Effect
    Array.from(this.board.children).forEach((ele) => {
      ele.onclick = () => {
        ele.style.background = "rgb(25, 26, 47)";
        if (ele.classList.contains("active")) {
          if ((n_moves + this.edit) % 2 == 0) {
            ele.innerHTML = "X";
            ele.style.color = "#e74c3c";
            this.checkingBoard[ele.getAttribute("x") - 1][
              ele.getAttribute("y") - 1
            ] = "x";
            this.moveOperations(
              ele.getAttribute("x") - 1,
              ele.getAttribute("y") - 1,
              "#e74c3c"
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
            }
          } else {
            ele.innerHTML = "O";
            ele.style.color = "#3742fa";
            this.checkingBoard[ele.getAttribute("x") - 1][
              ele.getAttribute("y") - 1
            ] = "o";
            this.moveOperations(
              ele.getAttribute("x") - 1,
              ele.getAttribute("y") - 1,
              "#3742fa"
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
            }
          }
          if (this.is_draw()) {
            state.innerHTML = "Draw 🧡";
            state.style.color = "orange";
            this.stopAll();
          }
          ele.className = "";
          n_moves++;

          // Computer Turn
          if (document.getElementById("computer").checked && !this.gameOver) {
            let collection =
              document.getElementsByClassName("main-board")[0].children;
            let x1;
            let y1;
            while (true) {
              x1 = Math.floor(Math.random() * x);
              y1 = Math.floor(Math.random() * y);
              if (this.checkingBoard[x1][y1] === 0) break;
            }
            collection[y1 + x1 * y].innerHTML = "O";
            collection[y1 + x1 * y].style.color = "#3742fa";
            collection[y1 + x1 * y].className = "";
            this.checkingBoard[x1][y1] = "o";
            this.moveOperations(x1, y1, "#3742fa");
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
        }
      };

      // For Hover Effect
      ele.addEventListener("mouseover", () => {
        if (ele.classList.contains("active")) {
          if ((n_moves + this.edit) % 2 == 0) {
            ele.style.background = "#e74c3c";
          } else {
            ele.style.background = "#3742fa";
          }
        }
      });
      ele.addEventListener("mouseout", () => {
        ele.style.background = "rgb(25, 26, 47)";
      });
    });

    // New Game Button
    document.getElementById("new-game").onclick = () => {
      clearInterval(this.changeBack);
      new Infinity_XO(3, 3, "Infinity", p1, p2);
    };
    // Choosing PvP
    document.getElementById("player2").onclick = () => {
      clearInterval(this.changeBack);
      new Infinity_XO(3, 3, "Infinity", 0, 0);
    };
    // Choosing PvC
    document.getElementById("computer").onclick = () => {
      clearInterval(this.changeBack);
      new Infinity_XO(3, 3, "Infinity", 0, 0);
    };
    // Rules
    let rulesList = document.querySelector("#rules ul");
    rulesList.innerHTML = `
            <li>Board size: 3x3 grid (standard Tic-Tac-Toe board)</li>
            <li>Players take turns placing their 'X' or 'O' marks in empty cells</li>
            <li><strong style="color: var(--secondColor)">Special Rule:</strong> After every 
                <span style="color: #f39c12; font-weight: bold">three moves</span>, the 
                <span style="color: #e74c3c">oldest mark on the board disappears</span></li>
            <li><div style="background: rgba(255,255,255,0.1); padding: 10px; margin: 10px 0; border-radius: 5px; font-family: monospace;">
                Example Sequence:<br>
                Move 1: X at (0,0)<br>
                Move 2: O at (1,1)<br>
                Move 3: X at (2,2)<br>
                → Oldest mark (X at (0,0)) disappears!<br>
                Move 4: O at (0,1)<br>
                Move 5: X at (1,0)<br>
                Move 6: O at (2,1)<br>
                → Oldest mark (O at (1,1)) disappears!
            </div></li>
            <li><strong style="color: var(--secondColor)">Winning Condition:</strong> The first player to align 
                <span style="color: #f39c12; font-weight: bold">three marks in a row</span> 
                (horizontally, vertically, or diagonally) 
                <span style="color: orange">before any of those marks vanish</span> wins the game</li>
            <li><strong>Important Timing:</strong>
                <ul style="margin-left: 20px; margin-top: 5px;">
                    <li>Wins are checked <span style="color: var(--secondColor)">immediately after each move</span></li>
                    <li>Disappearance happens <span style="color: #e74c3c">after every 3 moves</span></li>
                    <li>If you form a winning line but one of those marks disappears before you check, you don't win!</li>
                </ul>
            </li>
            <li><strong>Disappearance Rules:</strong>
                <ul style="margin-left: 20px; margin-top: 5px;">
                    <li>Only one mark disappears every 3 moves</li>
                    <li>Disappears in First-In-First-Out (FIFO) order</li>
                    <li>Disappearance happens automatically</li>
                </ul>
            </li>
            <li><strong>Visual Indicators:</strong>
                <ul style="margin-left: 20px; margin-top: 5px;">
                    <li><span style="color: #f39c12">Move counter</span> shows when next disappearance will occur</li>
                    <li><span style="color: #e74c3c">Oldest marks</span> are highlighted before they disappear</li>
                    <li>Disappearing marks have a special animation</li>
                </ul>
            </li>
            <li>If all cells are filled then It's Draw</li>
        `;
  }

  is_win(sym) {
    for (let i = 0; i < 3; i++) {
      // Horizontally
      if (
        this.checkingBoard[i][0] == sym &&
        this.checkingBoard[i][1] == sym &&
        this.checkingBoard[i][2] == sym
      ) {
        return true;
      }

      // Vertically
      if (
        this.checkingBoard[0][i] == sym &&
        this.checkingBoard[1][i] == sym &&
        this.checkingBoard[2][i] == sym
      ) {
        return true;
      }
    }
    if (
      this.checkingBoard[0][0] == sym &&
      this.checkingBoard[1][1] == sym &&
      this.checkingBoard[2][2] == sym
    ) {
      return true;
    }
    if (
      this.checkingBoard[0][2] == sym &&
      this.checkingBoard[1][1] == sym &&
      this.checkingBoard[2][0] == sym
    ) {
      return true;
    }
    return false;
  }
  is_draw() {
    return n_moves == 8 && !this.is_win("x") && !this.is_win("o");
  }
  stopAll() {
    let s = this.board.children;
    Array.from(s).forEach((ele) => {
      ele.className = "";
    });
    this.gameOver = true;
    clearInterval(this.changeBack);
  }
  moveOperations(x1, y1, color) {
    this.delete++;
    if (this.delete == 3) {
      this.delete = 0;
      let s =
        document.getElementsByClassName("main-board")[0].children[
          this.moves[0][0] * 3 + this.moves[0][1]
        ];
      s.innerHTML = "";
      s.className = "active";
      clearInterval(this.changeBack);
      this.checkingBoard[this.moves[0][0]][this.moves[0][1]] = 0;
      document.getElementsByClassName("main-board")[0].children[
        this.moves[0][0] * 3 + this.moves[0][1]
      ].style.background = "rgb(25, 26, 47)";
      this.moves.shift();
      n_moves--;
      this.edit++;
      document.getElementById("choose").children[0].remove();
    }
    if (this.delete == 2) {
      this.changeBack = setInterval(() => {
        this.changeBackground(this.moves[0][0] * 3 + this.moves[0][1]);
      }, 400);
    }
    this.moves.push([x1, y1]);
    let s = document.createElement("div");
    s.innerHTML = `${x1} , ${y1}`;
    s.style.borderColor = color;
    document.getElementById("choose").appendChild(s);
    document.getElementById("choose").children[0].style.background =
      document.getElementById("choose").children[0].style.borderColor;
  }
  changeBackground(idx) {
    const board = document.getElementsByClassName("main-board")[0];
    const cell = board?.children[idx];

    if (!cell) {
      clearInterval(this.changeBack); // stop broken interval
      return;
    }
    cell.style.background =
      cell.style.background === "var(--secondColor)"
        ? "rgb(25, 26, 47)"
        : "var(--secondColor)";
  }
}
