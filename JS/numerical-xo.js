document.getElementById("numerical-xo").onclick = function () {
  document.getElementById("hello").textContent =
    "Welcome In Numerical Tic-Tac-Toe";
  document.getElementsByClassName("main-page")[0].style.display = "none";
  document.getElementsByClassName("main-game")[0].style.display = "grid";
  new Numerical_XO(3, 3, "Numerical", 0, 0);
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};

class Numerical_XO extends Board {
  constructor(x, y, gn, p1, p2) {
    super(x, y, gn, p1, p2);
    this.gameOver = false;
    this.p1Numbers = [1, 3, 5, 7, 9];
    this.p2Numbers = [2, 4, 6, 8];
    this.save = -1;
    this.swap(2);
    // Blank Symbol
    this.checkingBoard = [];
    for (let i = 0; i < x; i++) {
      this.checkingBoard[i] = [];
      for (let j = 0; j < y; j++) {
        this.checkingBoard[i][j] = -1000;
      }
    }

    // Onclick Effect
    Array.from(this.board.children).forEach((ele) => {
      ele.onclick = () => {
        ele.style.background = "rgb(25, 26, 47)";
        if (ele.classList.contains("active") && this.save != -1) {
          if (n_moves % 2 == 0) {
            ele.innerHTML = this.save;
            ele.style.color = "#e74c3c";
            this.checkingBoard[ele.getAttribute("x") - 1][
              ele.getAttribute("y") - 1
            ] = this.save;

            // Delete Number After Using It
            for (let i = 0; i < this.p1Numbers.length; i++) {
              if (this.p1Numbers[i] == this.save) delete this.p1Numbers[i];
            }
            this.save = -1;

            if (this.is_win()) {
              state.innerHTML = "Player X Wins ❤";
              state.style.color = "#e74c3c";
              p1++;
              document.getElementById("points1").innerHTML = parseInt(p1);
              this.stopAll();
            } else {
              state.innerHTML = "Player O Turn";
              state.style.color = "#3742fa";
              this.swap(1);
            }
          } else {
            ele.innerHTML = this.save;
            ele.style.color = "#3742fa";
            this.checkingBoard[ele.getAttribute("x") - 1][
              ele.getAttribute("y") - 1
            ] = this.save;

            // Delete Number After Using It
            for (let i = 0; i < this.p2Numbers.length; i++) {
              if (this.p2Numbers[i] == this.save) delete this.p2Numbers[i];
            }
            this.save = -1;

            if (this.is_win()) {
              state.innerHTML = "Player O Wins 💙";
              state.style.color = "#3742fa";
              p2++;
              document.getElementById("points2").innerHTML = parseInt(p2);
              this.stopAll();
            } else {
              state.innerHTML = "Player X Turn";
              state.style.color = "#e74c3c";
              this.swap(2);
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
            let num;
            while (true) {
              x1 = Math.floor(Math.random() * x);
              y1 = Math.floor(Math.random() * y);
              num = Math.floor(Math.random() * 4);
              this.save = this.p2Numbers[num];
              if (
                this.checkingBoard[x1][y1] === -1000 &&
                this.save != undefined
              )
                break;
            }
            collection[y1 + x1 * y].innerHTML = this.save;
            collection[y1 + x1 * y].style.color = "#3742fa";
            collection[y1 + x1 * y].className = "";
            this.checkingBoard[x1][y1] = this.save;
            delete this.p2Numbers[num];
            if (this.is_win()) {
              state.innerHTML = "Player O Wins 💙";
              state.style.color = "#3742fa";
              p2++;
              document.getElementById("points2").innerHTML = parseInt(p2);
              this.stopAll();
            } else {
              state.innerHTML = "Player X Turn";
              state.style.color = "#e74c3c";
              this.swap(2);
            }
            n_moves++;
          }
        } else if (this.save == -1 && !this.gameOver) {
          alert("Plz Choose Any Number");
        }
      };
      // Take the Value from user
      this.update();
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
      new Numerical_XO(3, 3, "Numerical", p1, p2);
    };
    // Choosing PvP
    document.getElementById("player2").onclick = () => {
      new Numerical_XO(3, 3, "Numerical", 0, 0);
    };
    // Choosing PvC
    document.getElementById("computer").onclick = () => {
      new Numerical_XO(3, 3, "Numerical", 0, 0);
    };
    // Rules
    let rulesList = document.querySelector("#rules ul");
    rulesList.innerHTML = `
            <li>Board size: 3x3 grid</li>
            <li><strong>Player Assignments:</strong>
                <ul style="margin-left: 20px; margin-top: 5px;">
                    <li>Player 1 (Odd): Uses numbers 1, 3, 5, 7, 9</li>
                    <li>Player 2 (Even): Uses numbers 2, 4, 6, 8</li>
                </ul>
            </li>
            <li><strong>Important Rule:</strong> Each number can only be used 
                <span style="color: var(--secondColor)">once per game</span></li>
            <li><strong>Winning Condition:</strong> A player wins by placing three numbers in a 
                row, column, or diagonal that add up to exactly 
                <span style="color: #f39c12; font-weight: bold">15</span></li>
            <li>You can win with:
                <ul style="margin-left: 20px; margin-top: 5px;">
                    <li>Horizontal line (row) summing to 15</li>
                    <li>Vertical line (column) summing to 15</li>
                    <li>Diagonal line summing to 15</li>
                </ul>
            </li>
            <li>If all 9 cells are filled and no line sums to 15, the game is a draw</li>
        `;
  }

  is_win() {
    for (let i = 0; i < 3; i++) {
      // Horizontally
      if (
        this.checkingBoard[i][0] +
          this.checkingBoard[i][1] +
          this.checkingBoard[i][2] ==
        15
      ) {
        return true;
      }

      // Vertically
      if (
        this.checkingBoard[0][i] +
          this.checkingBoard[1][i] +
          this.checkingBoard[2][i] ==
        15
      ) {
        return true;
      }
    }
    if (
      this.checkingBoard[0][0] +
        this.checkingBoard[1][1] +
        this.checkingBoard[2][2] ==
      15
    ) {
      return true;
    }
    if (
      this.checkingBoard[0][2] +
        this.checkingBoard[1][1] +
        this.checkingBoard[2][0] ==
      15
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
  update() {
    Array.from(document.getElementById("choose").children).forEach((ele) => {
      ele.onclick = () => {
        this.save = parseInt(ele.innerHTML);
        let s = document.getElementById("choose").children;
        for (let i = 0; i < s.length; i++) {
          s[i].className = "";
        }
        ele.className = "active";
      };
    });
  }

  swap(num) {
    document.getElementById("choose").innerHTML = "";
    if (num == 2) {
      for (let i = 0; i < this.p1Numbers.length; i++) {
        if (this.p1Numbers[i] != undefined) {
          let dummy = document.createElement("span");
          dummy.innerHTML = this.p1Numbers[i];
          document.getElementById("choose").appendChild(dummy);
        }
      }
    } else {
      for (let i = 0; i < this.p2Numbers.length; i++) {
        if (this.p2Numbers[i] != undefined) {
          let dummy = document.createElement("span");
          dummy.innerHTML = this.p2Numbers[i];
          document.getElementById("choose").appendChild(dummy);
          dummy.style.borderColor = "#3742fa";
        }
      }
    }
    document.getElementById("choose").style.gridTemplateColumns = `repeat(${
      document.getElementById("choose").children.length
    },${50}px)`;
    this.update();
  }
}
