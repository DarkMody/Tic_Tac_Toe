document.getElementById("5x5-xo").onclick = function () {
  document.getElementById("hello").textContent = "Welcome In 5X5 Tic-Tac-Toe";
  document.getElementsByClassName("main-page")[0].style.display = "none";
  document.getElementsByClassName("main-game")[0].style.display = "grid";
  new Fivex5_XO(5, 5, "5x5", 0, 0);
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};

class Fivex5_XO extends Board {
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
            state.innerHTML = "Player O Turn";
            state.style.color = "#3742fa";
          } else {
            ele.innerHTML = "O";
            ele.style.color = "#3742fa";
            this.checkingBoard[ele.getAttribute("x") - 1][
              ele.getAttribute("y") - 1
            ] = "o";
            state.innerHTML = "Player X Turn";
            state.style.color = "#e74c3c";
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
            state.innerHTML = "Player X Turn";
            state.style.color = "#e74c3c";
            n_moves++;
          }
          let save = this.pointsCollecting();
          document.getElementById("pp1").innerHTML = save[0];
          document.getElementById("pp2").innerHTML = save[1];

          // After Last Play Checking for the winner
          if (n_moves == 24) {
            let pp1 = parseInt(document.getElementById("pp1").innerHTML);
            let pp2 = parseInt(document.getElementById("pp2").innerHTML);
            if (pp1 > pp2) {
              state.innerHTML = "Player X Wins ❤";
              state.style.color = "#e74c3c";
              p1++;
              document.getElementById("points1").innerHTML = parseInt(p1);
            } else if (pp1 < pp2) {
              state.innerHTML = "Player O Wins 💙";
              state.style.color = "#3742fa";
              p2++;
              document.getElementById("points2").innerHTML = parseInt(p2);
            } else {
              state.innerHTML = "Draw 🧡";
              state.style.color = "orange";
            }
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
      new Fivex5_XO(5, 5, "5x5", p1, p2);
    };
    // Choosing PvP
    document.getElementById("player2").onclick = () => {
      new Fivex5_XO(5, 5, "5x5", 0, 0);
    };
    // Choosing PvC
    document.getElementById("computer").onclick = () => {
      new Fivex5_XO(5, 5, "5x5", 0, 0);
    };
    // Rules
    let rulesList = document.querySelector("#rules ul");
    rulesList.innerHTML = `
            <li>5x5 board - Game stops after exactly 24 moves (one cell remains empty)</li>
            <li>Players alternate placing X or O</li>
            <li>Win Condition: Player with the MOST 3-in-a-row sequences wins</li>
            <li>Sequences can be horizontal, vertical, or diagonal</li>
            <li>If both players have equal sequences, it's a draw</li>
        `;
  }

  pointsCollecting() {
    let pnt1 = 0,
      pnt2 = 0;
    for (let i = 0; i < 5; i++) {
      for (let j = 0; j < 5; j++) {
        let sym;
        if (this.checkingBoard[i][j] != 0) sym = this.checkingBoard[i][j];
        else continue;
        // Row Checking
        if (
          j < 3 &&
          this.checkingBoard[i][j] == sym &&
          this.checkingBoard[i][j + 1] == sym &&
          this.checkingBoard[i][j + 2] == sym
        ) {
          if (sym == "x") pnt1++;
          else pnt2++;
        }
        // Column Checking
        if (
          i < 3 &&
          this.checkingBoard[i][j] == sym &&
          this.checkingBoard[i + 1][j] == sym &&
          this.checkingBoard[i + 2][j] == sym
        ) {
          {
            if (sym == "x") pnt1++;
            else pnt2++;
          }
        }
        // Right Diagonal Checking
        if (
          i < 3 &&
          j < 3 &&
          this.checkingBoard[i][j] == sym &&
          this.checkingBoard[i + 1][j + 1] == sym &&
          this.checkingBoard[i + 2][j + 2] == sym
        ) {
          if (sym == "x") pnt1++;
          else pnt2++;
        }
        // Left Diagonal Checking
        if (
          i < 3 &&
          j >= 2 &&
          this.checkingBoard[i][j] == sym &&
          this.checkingBoard[i + 1][j - 1] == sym &&
          this.checkingBoard[i + 2][j - 2] == sym
        ) {
          if (sym == "x") pnt1++;
          else pnt2++;
        }
      }
    }
    return [pnt1, pnt2];
  }
  stopAll() {
    let s = this.board.children;
    Array.from(s).forEach((ele) => {
      ele.className = "";
    });
    this.gameOver = true;
  }
}
