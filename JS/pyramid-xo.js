document.getElementById("pyramid-xo").onclick = function () {
  document.getElementById("hello").textContent =
    "Welcome In Pyramid Tic-Tac-Toe";
  document.getElementsByClassName("main-page")[0].style.display = "none";
  document.getElementsByClassName("main-game")[0].style.display = "grid";
  new Pyramid_XO(3, 5, "Pyramid", 0, 0);
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};

class Pyramid_XO extends Board {
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

    // Edit Board
    for (let i = 0; i < 2; i++) {
      let collection =
        document.getElementsByClassName("main-board")[0].children;
      let s = (5 - i * 2 - 1) / 2;
      for (let j = 0; j < s; j++) {
        collection[i * y + j].className = "stuck";
        collection[i * y + 4 - j].className = "stuck";
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
            collection[y1 + x1 * y].innerHTML = "O";
            collection[y1 + x1 * y].style.color = "#3742fa";
            collection[y1 + x1 * y].className = "";
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
      new Pyramid_XO(3, 5, "Pyramid", p1, p2);
    };
    // Choosing PvP
    document.getElementById("player2").onclick = () => {
      new Pyramid_XO(3, 5, "Pyramid", 0, 0);
    };
    // Choosing PvC
    document.getElementById("computer").onclick = () => {
      new Pyramid_XO(3, 5, "Pyramid", 0, 0);
    };
    // Rules
    let rulesList = document.querySelector("#rules ul");
    rulesList.innerHTML = `
            <li><strong>Unique Board:</strong> Pyramid-shaped game board with triangular layout</li>
            <li><strong>Board Structure:</strong>
                <ul style="margin-left: 20px; margin-top: 5px;">
                    <li>Base row: 5 squares</li>
                    <li>Middle row: 3 squares</li>
                    <li>Top row: 1 square</li>
                    <li>Total: 9 playable cells arranged in pyramid formation</li>
                </ul>
            </li>
            <li>Players take turns placing their 'X' or 'O' marks in empty squares</li>
            <li>Click on any empty cell within the pyramid to place your piece</li>
            <li><strong style="color: var(--secondColor)">Winning Condition:</strong> The first player to align 
                <span style="color: #f39c12; font-weight: bold">three of their marks</span> 
                horizontally, vertically, or diagonally wins</li>
            <li>Winning lines can be formed in any of these directions:
                <ul style="margin-left: 20px; margin-top: 5px;">
                    <li>Horizontal (straight across a row)</li>
                    <li>Vertical (straight down a column)</li>
                    <li>Diagonal (following pyramid edges)</li>
                </ul>
            </li>
            <li><strong>Pyramid-Specific Rules:</strong>
                <ul style="margin-left: 20px; margin-top: 5px;">
                    <li>Only cells within the pyramid shape are playable</li>
                    <li>Diagonal wins follow the pyramid's slanted edges</li>
                    <li>Each row is centered under the row above</li>
                </ul>
            </li>
            <li>The game is a draw if all 9 cells are filled with no winner</li>
        `;
  }

  is_win(sym) {
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 5; j++) {
        // Row Checking
        if (
          j < 3 &&
          this.checkingBoard[i][j] == sym &&
          this.checkingBoard[i][j + 1] == sym &&
          this.checkingBoard[i][j + 2] == sym
        ) {
          return true;
        }
        // Column Checking
        if (
          i < 1 &&
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
          i < 1 &&
          j < 3 &&
          this.checkingBoard[i][j] == sym &&
          this.checkingBoard[i + 1][j + 1] == sym &&
          this.checkingBoard[i + 2][j + 2] == sym
        ) {
          return true;
        }
        // Left Diagonal Checking
        if (
          i < 1 &&
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
  is_draw() {
    return n_moves == 8 && !this.is_win("x") && !this.is_win("o");
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
}
