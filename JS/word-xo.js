document.getElementById("word-xo").onclick = function () {
  document.getElementById("hello").textContent = "Welcome In Word Tic-Tac-Toe";
  document.getElementsByClassName("main-page")[0].style.display = "none";
  document.getElementsByClassName("main-game")[0].style.display = "grid";
  new Word_XO(3, 3, "Word", 0, 0);
  document.getElementById("choose").style.gridTemplateColumns = "none";
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};

class Word_XO extends Board {
  constructor(x, y, gn, p1, p2) {
    super(x, y, gn, p1, p2);
    this.gameOver = false;
    // Input Letter
    document.getElementById("choose").innerHTML = "";
    let inp = document.createElement("input");
    inp.type = "text";
    inp.id = "inp";
    inp.setAttribute("maxlength", "1");
    inp.addEventListener("input", () => {
      inp.value = inp.value.replace(/[^a-z]/gi, "").slice(0, 1);
      inp.value = inp.value.toUpperCase();
    });
    document.getElementById("choose").appendChild(inp);
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
        if (ele.classList.contains("active") && inp.value.length == 1) {
          if (n_moves % 2 == 0) {
            ele.innerHTML = inp.value;
            ele.style.color = "#e74c3c";
            this.checkingBoard[ele.getAttribute("x") - 1][
              ele.getAttribute("y") - 1
            ] = inp.value;
            if (this.is_win()) {
              state.innerHTML = "Player X Wins ❤";
              state.style.color = "#e74c3c";
              p1++;
              document.getElementById("points1").innerHTML = parseInt(p1);
              this.stopAll();
            } else {
              state.innerHTML = "Player O Turn";
              state.style.color = "#3742fa";
              document.querySelector("#choose #inp").value = "";
              document.querySelector("#choose #inp").focus();
            }
          } else {
            ele.innerHTML = inp.value;
            ele.style.color = "#3742fa";
            this.checkingBoard[ele.getAttribute("x") - 1][
              ele.getAttribute("y") - 1
            ] = inp.value;
            if (this.is_win()) {
              state.innerHTML = "Player O Wins 💙";
              state.style.color = "#3742fa";
              p2++;
              document.getElementById("points2").innerHTML = parseInt(p2);
              this.stopAll();
            } else {
              state.innerHTML = "Player X Turn";
              state.style.color = "#e74c3c";
              document.querySelector("#choose #inp").value = "";
              document.querySelector("#choose #inp").focus();
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
            let s = String.fromCharCode(Math.floor(Math.random() * 26) + 65);
            collection[y1 + x1 * y].innerHTML = s;
            collection[y1 + x1 * y].style.color = "#3742fa";
            collection[y1 + x1 * y].className = "";
            this.checkingBoard[x1][y1] = s;
            if (this.is_win()) {
              state.innerHTML = "Player O Wins 💙";
              state.style.color = "#3742fa";
              p2++;
              document.getElementById("points2").innerHTML = parseInt(p2);
              this.stopAll();
            } else {
              state.innerHTML = "Player X Turn";
              state.style.color = "#e74c3c";
              document.querySelector("#choose #inp").value = "";
              document.querySelector("#choose #inp").focus();
            }
            n_moves++;
          }
        } else if (inp.value.length != 1) {
          alert("Plz Enter A Letter in input Field");
          document.querySelector("#choose #inp").focus();
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
      new Word_XO(3, 3, "Word", p1, p2);
    };
    // Choosing PvP
    document.getElementById("player2").onclick = () => {
      new Word_XO(3, 3, "Word", 0, 0);
    };
    // Choosing PvC
    document.getElementById("computer").onclick = () => {
      new Word_XO(3, 3, "Word", 0, 0);
    };
    // Rules
    let rulesList = document.querySelector("#rules ul");
    rulesList.innerHTML = `
            <li>Board size: 3x3 grid</li>
            <li><strong>Game Objective:</strong> Form valid three-letter words on the board</li>
            <li>Players take turns placing <span style="color: var(--secondColor)">one letter</span> on the board</li>
            <li><strong>Special Rule:</strong> Players can build upon letters already on the board</li>
            <li>Each turn, place one letter in any empty cell</li>
            <li><strong style="color: var(--secondColor)">Winning Condition:</strong> The first player to form a 
                <span style="color: #f39c12; font-weight: bold">valid three-letter word</span> 
                horizontally, vertically, or diagonally wins</li>
            <li>Words can be formed in any of these directions:
                <ul style="margin-left: 20px; margin-top: 5px;">
                    <li>Horizontal (left to right)</li>
                    <li>Vertical (top to bottom)</li>
                    <li>Diagonal (top-left to bottom-right)</li>
                    <li>Anti-diagonal (top-right to bottom-left)</li>
                </ul>
            </li>
            <li><strong>Word Formation Examples:</strong>
                <div style="background: rgba(255,255,255,0.1); padding: 10px; margin: 10px 0; border-radius: 5px; font-family: monospace;">
                    C A T   (horizontal)<br>
                    <br>
                    D<br>
                    O   (vertical = DOG)<br>
                    G<br>
                    <br>
                    B    (diagonal)<br>
                    #  A<br>
                    #  # D
                </div>
            </li>
            <li>The game is a draw if the board is filled without a valid word being formed</li>
        `;
  }

  is_win() {
    for (let j = 0; j < words.length; j++) {
      for (let i = 0; i < 3; i++) {
        // Horizontally
        if (
          this.checkingBoard[i][0] == words[j][0] &&
          this.checkingBoard[i][1] == words[j][1] &&
          this.checkingBoard[i][2] == words[j][2]
        ) {
          return true;
        }

        // Vertically
        if (
          this.checkingBoard[0][i] == words[j][0] &&
          this.checkingBoard[1][i] == words[j][1] &&
          this.checkingBoard[2][i] == words[j][2]
        ) {
          return true;
        }
      }
      if (
        this.checkingBoard[0][0] == words[j][0] &&
        this.checkingBoard[1][1] == words[j][1] &&
        this.checkingBoard[2][2] == words[j][2]
      ) {
        return true;
      }
      if (
        this.checkingBoard[0][2] == words[j][0] &&
        this.checkingBoard[1][1] == words[j][1] &&
        this.checkingBoard[2][0] == words[j][2]
      ) {
        return true;
      }
    }
    return false;
  }
  is_draw() {
    return n_moves == 8 && !this.is_win();
  }
  stopAll() {
    let s = this.board.children;
    Array.from(s).forEach((ele) => {
      ele.className = "";
    });
    this.gameOver = true;
  }
}
