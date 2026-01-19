document.getElementById("sus-xo").onclick = function () {
  document.getElementById("hello").textContent = "Welcome In SUS Tic-Tac-Toe";
  document.getElementsByClassName("main-page")[0].style.display = "none";
  document.getElementsByClassName("main-game")[0].style.display = "grid";
  new SUS_XO(3, 3, "SUS", 0, 0);
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};

class SUS_XO extends Board {
  constructor(x, y, gn, p1, p2) {
    super(x, y, gn, p1, p2);
    this.gameOver = false;
    this.pp1 = 0;
    this.pp2 = 0;
    // Blank Symbol
    this.checkingBoard = [];
    this.done = [];
    for (let i = 0; i < x; i++) {
      this.checkingBoard[i] = [];
      this.done[i] = [];
      for (let j = 0; j < y; j++) {
        this.checkingBoard[i][j] = 0;
        this.done[i][j] = false;
      }
    }

    // Onclick Effect
    Array.from(this.board.children).forEach((ele) => {
      ele.onclick = () => {
        ele.style.background = "rgb(25, 26, 47)";
        if (ele.classList.contains("active")) {
          if (n_moves % 2 == 0) {
            ele.innerHTML = "S";
            ele.style.color = "#e74c3c";
            this.checkingBoard[ele.getAttribute("x") - 1][
              ele.getAttribute("y") - 1
            ] = "s";
            this.points("s");
            state.innerHTML = "Player O Turn";
            state.style.color = "#3742fa";
          } else {
            ele.innerHTML = "U";
            ele.style.color = "#3742fa";
            this.checkingBoard[ele.getAttribute("x") - 1][
              ele.getAttribute("y") - 1
            ] = "u";
            this.points("u");
            state.innerHTML = "Player X Turn";
            state.style.color = "#e74c3c";
          }
          ele.className = "";
          n_moves++;
          if (n_moves == 9) {
            if (this.pp1 > this.pp2) {
              state.innerHTML = "Player X Wins ❤";
              state.style.color = "#e74c3c";
              p1++;
              document.getElementById("points1").innerHTML = parseInt(p1);
            } else if (this.pp1 < this.pp2) {
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
            collection[y1 + x1 * y].innerHTML = "U";
            collection[y1 + x1 * y].style.color = "#3742fa";
            collection[y1 + x1 * y].className = "";
            this.checkingBoard[x1][y1] = "u";
            state.innerHTML = "Player X Turn";
            state.style.color = "#e74c3c";
            this.points("u");
            n_moves++;
          }
          document.getElementById("pp1").innerHTML = this.pp1;
          document.getElementById("pp2").innerHTML = this.pp2;
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
      new SUS_XO(3, 3, "SUS", p1, p2);
    };
    // Choosing PvP
    document.getElementById("player2").onclick = () => {
      new SUS_XO(3, 3, "SUS", 0, 0);
    };
    // Choosing PvC
    document.getElementById("computer").onclick = () => {
      new SUS_XO(3, 3, "SUS", 0, 0);
    };
    // Rules
    let rulesList = document.querySelector("#rules ul");
    rulesList.innerHTML = `
            <li>Player X places 'S', Player O places 'U'</li> 
            <li>Players take turns placing their letter on the 3x3 board</li> 
            <li>Scoring: Form "SUS" sequences to earn points</li> 
            <li>A SUS sequence = S-U-S in a row (horizontal, vertical, or diagonal)</li> 
            <li>Win Condition: Player with most SUS sequences when board is full</li> 
        `;
  }

  points(sym) {
    let save = [];
    for (let i = 0; i < 3; i++) {
      // Horizontally
      if (this.checkingCase(i, 0, i, 1, i, 2)) {
        if (sym == "s") this.pp1++;
        else this.pp2++;
        save = [i, 0, i, 1, i, 2];
      }

      // Vertically
      if (this.checkingCase(0, i, 1, i, 2, i)) {
        if (sym == "s") this.pp1++;
        else this.pp2++;
        save = [0, i, 1, i, 2, i];
      }
    }
    if (this.checkingCase(0, 0, 1, 1, 2, 2)) {
      if (sym == "s") this.pp1++;
      else this.pp2++;
      save = [0, 0, 1, 1, 2, 2];
    }
    if (this.checkingCase(0, 2, 1, 1, 2, 0)) {
      if (sym == "s") this.pp1++;
      else this.pp2++;
      save = [0, 2, 1, 1, 2, 0];
    }

    // For Enabling multible points collecting with the same choosen cell
    if (save.length != 0) {
      this.done[save[0]][save[1]] = true;
      this.done[save[2]][save[3]] = true;
      this.done[save[4]][save[5]] = true;
    }
  }
  stopAll() {
    let s = this.board.children;
    Array.from(s).forEach((ele) => {
      ele.className = "";
    });
    this.gameOver = true;
  }
  checkingCase(xi, yi, xj, yj, xk, yk) {
    if (
      this.checkingBoard[xi][yi] == "s" &&
      this.checkingBoard[xj][yj] == "u" &&
      this.checkingBoard[xk][yk] == "s" &&
      (!this.done[xi][yi] || !this.done[xj][yj] || !this.done[xk][yk])
    ) {
      return true;
    }
    return false;
  }
}
