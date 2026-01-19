document.getElementById("death-xo").onclick = function () {
  document.getElementById("hello").textContent =
    "Welcome In Misère Tic-Tac-Toe";
  document.getElementsByClassName("main-page")[0].style.display = "none";
  document.getElementsByClassName("main-game")[0].style.display = "grid";
  new Death_XO(3, 3, "Death", 0, 0);
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};

class Death_XO extends Board {
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
              state.innerHTML = "Player O Wins 💙";
              state.style.color = "#3742fa";
              p2++;
              document.getElementById("points2").innerHTML = parseInt(p2);
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
              state.innerHTML = "Player X Wins ❤";
              state.style.color = "#e74c3c";
              p1++;
              document.getElementById("points1").innerHTML = parseInt(p1);
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
            collection[y1 + x1 * x].innerHTML = "O";
            collection[y1 + x1 * x].style.color = "#3742fa";
            collection[y1 + x1 * x].className = "";
            this.checkingBoard[x1][y1] = "o";
            if (this.is_win("o")) {
              state.innerHTML = "Player X Wins ❤";
              state.style.color = "#e74c3c";
              p1++;
              document.getElementById("points1").innerHTML = parseInt(p1);
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
      new Death_XO(3, 3, "Death", p1, p2);
    };
    // Choosing PvP
    document.getElementById("player2").onclick = () => {
      new Death_XO(3, 3, "Death", 0, 0);
    };
    // Choosing PvC
    document.getElementById("computer").onclick = () => {
      new Death_XO(3, 3, "Death", 0, 0);
    };
    // Rules
    let rulesList = document.querySelector("#rules ul");
    rulesList.innerHTML = `
            <li>Board size: 3x3</li>
            <li>Do you know normal Tic-Tac-Toe ?</li>
            <li>Don't try to win here 💀</li>
            <li>The first player to align 3 of their tokens in a row, column, or diagonal Loses</li>
            <li>If all 9 cells are filled without a Loser, it's a draw</li>
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
  }
}
