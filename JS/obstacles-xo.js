document.getElementById("obstacles-xo").onclick = function () {
  document.getElementById("hello").textContent =
    "Welcome In Obstacles Tic-Tac-Toe";
  document.getElementsByClassName("main-page")[0].style.display = "none";
  document.getElementsByClassName("main-game")[0].style.display = "grid";
  console.log("obstacles");
  new Obstacles_XO(6, 6, "Obstacles", 0, 0);
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};
class Obstacles_XO extends Board {
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
          // Set Obstacles 🛑
          if (n_moves % 2 == 0) {
            console.log("test");
            this.set_obstacles();
            this.set_obstacles();
            n_moves += 2;
          }
          // Draw
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
      new Obstacles_XO(6, 6, "Obstacles", p1, p2);
    };
    // Choosing PvP
    document.getElementById("player2").onclick = () => {
      new Obstacles_XO(6, 6, "Obstacles", 0, 0);
    };
    // Choosing PvC
    document.getElementById("computer").onclick = () => {
      new Obstacles_XO(6, 6, "Obstacles", 0, 0);
    };
    // Rules
    let rulesList = document.querySelector("#rules ul");
    rulesList.innerHTML = `
            <li>Board size: 6x6 grid</li>
            <li>Players take turns placing their symbol (X or O)</li>
            <li><strong>Special Rule:</strong> After every round (one turn for each player), 
                two new obstacle cells 🛑
                are randomly added to the board</li>
            <li>Obstacle cells cannot be used by either player</li>
            <li><strong>Winning Condition:</strong> The first player to align 
                four of their marks in a row (horizontally, vertically, or diagonally) wins</li>
            <li>The game is a draw if the board fills without a winner</li>
        `;
  }

  is_win(sym) {
    for (let i = 0; i < 6; i++) {
      for (let j = 0; j < 6; j++) {
        // Row Checking
        if (
          j < 3 &&
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
          j < 3 &&
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
    return n_moves == 36 && !this.is_win("x") && !this.is_win("o");
  }
  stopAll() {
    let s = this.board.children;
    Array.from(s).forEach((ele) => {
      ele.className = "";
    });
    this.gameOver = true;
  }
  set_obstacles() {
    let collection = document.getElementsByClassName("main-board")[0].children;
    let x1;
    let y1;
    while (true) {
      x1 = Math.floor(Math.random() * 6);
      y1 = Math.floor(Math.random() * 6);
      if (this.checkingBoard[x1][y1] === 0) break;
    }
    collection[y1 + x1 * 6].innerHTML = "#";
    collection[y1 + x1 * 6].style.color = "orange";
    collection[y1 + x1 * 6].className = "";
    this.checkingBoard[x1][y1] = "#";
  }
}
