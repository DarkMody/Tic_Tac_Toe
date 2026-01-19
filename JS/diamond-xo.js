document.getElementById("diamond-xo").onclick = function () {
  document.getElementById("hello").textContent =
    "Welcome In Diamond Tic-Tac-Toe";
  document.getElementsByClassName("main-page")[0].style.display = "none";
  document.getElementsByClassName("main-game")[0].style.display = "grid";
  new Diamond_XO(7, 7, "Diamond", 0, 0);
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};

class Diamond_XO extends Board {
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

    // Helpful for winning check
    this.diagonal = false;
    this.antiDiagonal = false;
    this.vertical = false;
    this.horizontal = false;

    // Edit Board
    for (let i = 0; i < 3; i++) {
      let collection =
        document.getElementsByClassName("main-board")[0].children;
      let s = (7 - i * 2 - 1) / 2;
      for (let j = 0; j < s; j++) {
        collection[i * x + j].className = "stuck";
        collection[i * x + 6 - j].className = "stuck";
        collection[x * (6 - i) + j].className = "stuck";
        collection[x * (6 - i) + 6 - j].className = "stuck";
      }
    }
    // Onclick Effect
    Array.from(this.board.children).forEach((ele) => {
      ele.onclick = () => {
        ele.style.background = "rgb(25, 26, 47)";
        if (ele.classList.contains("active")) {
          if (n_moves % 2 == 0) {
            ele.innerHTML = "X";
            ele.style.color = "#e74c3c";
            this.checkingBoard[ele.getAttribute("x") - 1][
              ele.getAttribute("y") - 1
            ] = "x";
            if (this.is_win("x")) {
              state.innerHTML = "Player X Wins ❤";
              state.style.color = "#e74c3c";
              p1++;
              document.getElementById("points1").innerHTML = parseInt(p1);
              this.stopAll();
            } else {
              state.innerHTML = "Player O Turn";
              state.style.color = "#3742fa";
              this.reset();
            }
          } else {
            ele.innerHTML = "O";
            ele.style.color = "#3742fa";
            this.checkingBoard[ele.getAttribute("x") - 1][
              ele.getAttribute("y") - 1
            ] = "o";
            if (this.is_win("o")) {
              state.innerHTML = "Player O Wins 💙";
              state.style.color = "#3742fa";
              p2++;
              document.getElementById("points2").innerHTML = parseInt(p2);
              this.stopAll();
            } else {
              state.innerHTML = "Player X Turn";
              state.style.color = "#e74c3c";
              this.reset();
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
              if (
                this.checkingBoard[x1][y1] === 0 &&
                collection[y1 + x1 * y].className == "active"
              )
                break;
            }
            collection[y1 + x1 * x].innerHTML = "O";
            collection[y1 + x1 * x].style.color = "#3742fa";
            collection[y1 + x1 * x].className = "";
            this.checkingBoard[x1][y1] = "o";
            if (this.is_win("o")) {
              state.innerHTML = "Player O Wins 💙";
              state.style.color = "#3742fa";
              p2++;
              document.getElementById("points2").innerHTML = parseInt(p2);
              this.stopAll();
            } else {
              state.innerHTML = "Player X Turn";
              state.style.color = "#e74c3c";
              this.reset();
            }
            n_moves++;
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
      new Diamond_XO(7, 7, "Diamond", p1, p2);
    };
    // Choosing PvP
    document.getElementById("player2").onclick = () => {
      new Diamond_XO(7, 7, "Diamond", 0, 0);
    };
    // Choosing PvC
    document.getElementById("computer").onclick = () => {
      new Diamond_XO(7, 7, "Diamond", 0, 0);
    };
    // Rules
    let rulesList = document.querySelector("#rules ul");
    rulesList.innerHTML = `
            <li><strong>Unique Board:</strong> Diamond-shaped board with 25 playable cells arranged in a 5×5 grid</li>
            <li>Players take turns placing their symbol (X or O) in empty cells</li>
            <li><strong style="color: var(--secondColor)">Special Win Condition:</strong> You must achieve <span style="color: #f39c12">BOTH</span> conditions to win:</li>
            <li style="margin-left: 20px;">
                1. Get 4 of your symbols in a row (horizontal, vertical, or diagonal)
            </li>
            <li style="margin-left: 20px;">
                2. Get 3 of your symbols in a row (horizontal, vertical, or diagonal)
            </li>
            <li><strong style="color: #e74c3c">IMPORTANT:</strong> The 4-in-a-row and 3-in-a-row MUST be in <span style="color: #e74c3c">DIFFERENT directions!</span></li>
            <li style="margin-left: 20px;">
                • Example: 4 horizontal + 3 vertical = <span style="color: #2ecc71">WIN ✅</span>
            </li>
            <li style="margin-left: 20px;">
                • Example: 4 horizontal + 3 horizontal = <span style="color: #e74c3c">NO WIN ❌</span>
            </li>
            <li>The two lines can intersect at one cell maximum</li>
            <li>Game ends in a draw if all 25 cells are filled with no winner</li>
            <li>Click on any empty cell within the diamond to place your piece</li>
            <li><strong>Strategy tip:</strong> Plan for multiple lines in different directions simultaneously</li>
            <li><strong>Valid Directions:</strong> Horizontal (→), Vertical (↓), Diagonal (↘), Anti-diagonal (↙)</li>
        `;
  }

  is_win(sym) {
    return this.fourCheck(sym) && this.threeCheck(sym);
  }
  fourCheck(sym) {
    for (let i = 0; i < 7; i++) {
      for (let j = 0; j < 7; j++) {
        // Row Checking
        if (
          j < 4 &&
          this.checkingBoard[i][j] == sym &&
          this.checkingBoard[i][j + 1] == sym &&
          this.checkingBoard[i][j + 2] == sym &&
          this.checkingBoard[i][j + 3] == sym
        ) {
          this.horizontal = true;
          return true;
        }
        // Column Checking
        if (
          i < 4 &&
          this.checkingBoard[i][j] == sym &&
          this.checkingBoard[i + 1][j] == sym &&
          this.checkingBoard[i + 2][j] == sym &&
          this.checkingBoard[i + 3][j] == sym
        ) {
          {
            this.vertical = true;
            return true;
          }
        }
        // Right Diagonal Checking
        if (
          i < 4 &&
          j < 4 &&
          this.checkingBoard[i][j] == sym &&
          this.checkingBoard[i + 1][j + 1] == sym &&
          this.checkingBoard[i + 2][j + 2] == sym &&
          this.checkingBoard[i + 3][j + 3] == sym
        ) {
          this.diagonal = true;
          return true;
        }
        // Left Diagonal Checking
        if (
          i < 4 &&
          j >= 3 &&
          this.checkingBoard[i][j] == sym &&
          this.checkingBoard[i + 1][j - 1] == sym &&
          this.checkingBoard[i + 2][j - 2] == sym &&
          this.checkingBoard[i + 3][j - 3] == sym
        ) {
          this.antiDiagonal = true;
          return true;
        }
      }
    }
    return false;
  }
  threeCheck(sym) {
    for (let i = 0; i < 7; i++) {
      for (let j = 0; j < 7; j++) {
        // Row Checking
        if (
          j < 5 &&
          this.checkingBoard[i][j] == sym &&
          this.checkingBoard[i][j + 1] == sym &&
          this.checkingBoard[i][j + 2] == sym &&
          !this.horizontal
        ) {
          return true;
        }
        // Column Checking
        if (
          i < 5 &&
          this.checkingBoard[i][j] == sym &&
          this.checkingBoard[i + 1][j] == sym &&
          this.checkingBoard[i + 2][j] == sym &&
          !this.vertical
        ) {
          {
            return true;
          }
        }
        // Right Diagonal Checking
        if (
          i < 5 &&
          j < 5 &&
          this.checkingBoard[i][j] == sym &&
          this.checkingBoard[i + 1][j + 1] == sym &&
          this.checkingBoard[i + 2][j + 2] == sym &&
          !this.diagonal
        ) {
          return true;
        }
        // Left Diagonal Checking
        if (
          i < 5 &&
          j >= 2 &&
          this.checkingBoard[i][j] == sym &&
          this.checkingBoard[i + 1][j - 1] == sym &&
          this.checkingBoard[i + 2][j - 2] == sym &&
          !this.antiDiagonal
        ) {
          return true;
        }
      }
    }
    return false;
  }
  is_draw() {
    return n_moves == 24 && !this.is_win("x") && !this.is_win("o");
  }
  stopAll() {
    let s = this.board.children;
    Array.from(s).forEach((ele) => {
      if (ele.className != "stuck") {
        ele.className = "";
      }
    });
    this.gameOver = true;
  }
  reset() {
    this.diagonal = false;
    this.horizontal = false;
    this.vertical = false;
    this.antiDiagonal = false;
  }
}
