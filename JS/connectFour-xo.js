document.getElementById("connect4-xo").onclick = function () {
  document.getElementById("hello").textContent =
    "Welcome In Connect 4 Tic-Tac-Toe";
  document.getElementsByClassName("main-page")[0].style.display = "none";
  document.getElementsByClassName("main-game")[0].style.display = "grid";
  new Connect4_XO(6, 7, "Connect4", 0, 0);
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};

class Connect4_XO extends Board {
  constructor(x, y, gn, p1, p2) {
    super(x, y, gn, p1, p2);
    this.gameOver = false;

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
        if (ele.classList.contains("active")) {
          if (n_moves % 2 == 0) {
            this.emptyCell(ele.getAttribute("y") - 1, "x", "#e74c3c");
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
            this.emptyCell(ele.getAttribute("y") - 1, "o", "#3742fa");
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
            this.emptyCell(y1, "o", "#3742fa");
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
        ele.style.background = "rgb(25, 26, 47)";
      });
    });

    // New Game Button
    document.getElementById("new-game").onclick = () => {
      new Connect4_XO(6, 7, "Connect4", p1, p2);
    };
    // Choosing PvP
    document.getElementById("player2").onclick = () => {
      new Connect4_XO(6, 7, "Connect4", 0, 0);
    };
    // Choosing PvC
    document.getElementById("computer").onclick = () => {
      new Connect4_XO(6, 7, "Connect4", 0, 0);
    };
    // Rules
    let rulesList = document.querySelector("#rules ul");
    rulesList.innerHTML = `
            <li>Board size: 6 rows × 7 columns</li>
            <li>Players take turns dropping their symbol (X or O) into columns</li>
            <li><strong>Special Rule:</strong> Each player places their mark in the 
                <span style="color: var(--secondColor)">bottom-most available square</span> 
                in the chosen column</li>
            <li>Marks "fall" to the lowest empty position in the column</li>
            <li><strong>Winning Condition:</strong> The first player to get 
                four of their marks
                in a row (horizontally, vertically, or diagonally) wins</li>
            <li>The game ends in a draw if the board fills without a winner</li>
        `;
  }

  is_win(sym) {
    for (let i = 0; i < 6; i++) {
      for (let j = 0; j < 7; j++) {
        // Row Checking
        if (
          j < 4 &&
          this.checkingBoard[i][j] == sym &&
          this.checkingBoard[i][j + 1] == sym &&
          this.checkingBoard[i][j + 2] == sym &&
          this.checkingBoard[i][j + 3] == sym
        ) {
          return true;
        }
        // Column Checking
        if (
          i < 3 &&
          this.checkingBoard[i][j] == sym &&
          this.checkingBoard[i + 1][j] == sym &&
          this.checkingBoard[i + 2][j] == sym &&
          this.checkingBoard[i + 3][j] == sym
        ) {
          {
            return true;
          }
        }
        // Right Diagonal Checking
        if (
          i < 3 &&
          j < 4 &&
          this.checkingBoard[i][j] == sym &&
          this.checkingBoard[i + 1][j + 1] == sym &&
          this.checkingBoard[i + 2][j + 2] == sym &&
          this.checkingBoard[i + 3][j + 3] == sym
        ) {
          return true;
        }
        // Left Diagonal Checking
        if (
          i < 3 &&
          j >= 3 &&
          this.checkingBoard[i][j] == sym &&
          this.checkingBoard[i + 1][j - 1] == sym &&
          this.checkingBoard[i + 2][j - 2] == sym &&
          this.checkingBoard[i + 3][j - 3] == sym
        ) {
          return true;
        }
      }
    }
    return false;
  }
  is_draw() {
    return n_moves == 42 && !this.is_win("x") && !this.is_win("o");
  }
  stopAll() {
    let s = this.board.children;
    Array.from(s).forEach((ele) => {
      ele.className = "";
    });
    this.gameOver = true;
  }
  emptyCell(yy, sym, col) {
    let collection = document.getElementsByClassName("main-board")[0].children;
    for (let i = 5; i >= 0; i--) {
      if (this.checkingBoard[i][yy] == 0) {
        collection[i * 7 + yy].innerHTML = sym.toUpperCase();
        collection[i * 7 + yy].style.color = col;
        collection[i * 7 + yy].className = "";
        this.checkingBoard[i][yy] = sym;
        console.log(this.checkingBoard);
        break;
      }
    }
  }
}
