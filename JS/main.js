n_moves = 0;
let state = document.getElementById("state");
document.getElementById("back").onclick = function () {
  document.getElementsByClassName("main-page")[0].style.display = "grid";
  document.getElementsByClassName("main-game")[0].style.display = "none";
  document.getElementsByClassName("main-board")[0].innerHTML = "";
  document.getElementById("current-points").style.display = "none";
  document.getElementById("score-board").nextElementSibling.style.display =
    "none";
  document.getElementById("choose").style.display = "none";
  document.getElementById("choose").innerHTML = "";
  document.getElementById("sub-board").style.display = "none";
  document.getElementById("sub-board").innerHTML = "";
};
class Board {
  constructor(x, y, gn, p1, p2) {
    n_moves = 0;
    // Board Style
    this.board = document.getElementsByClassName("main-board")[0];
    this.board.innerHTML = "";
    if (
      gn == "Connect4" ||
      gn == "Obstacles" ||
      gn == "Diamond" ||
      gn == "Ultimate"
    ) {
      this.board.style.gridTemplateRows = `repeat(${x}, ${60}px)`;
      this.board.style.gridTemplateColumns = `repeat(${y}, ${60}px)`;
      this.board.style.height = `${x * 60 + (x - 1) * 4}px `;
      this.board.style.width = `${y * 60 + (y - 1) * 4}px `;
      document.documentElement.style.setProperty("--btnSize", "60px");
      document.documentElement.style.setProperty("--fontSize", "40px");
      document.documentElement.style.setProperty("--gap", "4px");
    } else {
      this.board.style.gridTemplateRows = `repeat(${x}, ${90}px)`;
      this.board.style.gridTemplateColumns = `repeat(${y}, ${90}px)`;
      this.board.style.height = `${x * 90 + (x - 1) * 5}px `;
      this.board.style.width = `${y * 90 + (y - 1) * 5}px `;
      document.documentElement.style.setProperty("--btnSize", "90px");
      document.documentElement.style.setProperty("--fontSize", "50px");
      document.documentElement.style.setProperty("--gap", "5px");
    }
    for (let i = 1; i <= x; i++) {
      for (let j = 1; j <= y; j++) {
        let s = document.createElement("button");
        s.setAttribute("x", i);
        s.setAttribute("y", j);
        s.className = `active`;
        this.board.appendChild(s);
      }
    }
    // Points Counter
    if (gn == "5x5" || gn == "SUS") {
      document.getElementById("current-points").style.display = "grid";
      document.getElementById("current-points").style.backgroundColor =
        "rgb(25, 26, 47)";
      document.getElementById("current-points").style.marginBottom = "-20px";
      pp1.innerHTML = pp2.innerHTML = 0;
      document.getElementById("score-board").nextElementSibling.style.color =
        "white";
      document.getElementById(
        "score-board",
      ).nextElementSibling.style.textAlign = "center";
      document.getElementById("score-board").nextElementSibling.style.display =
        "block";
    }
    // Additional Feature
    if (gn == "Numerical" || gn == "Word" || gn == "Infinity") {
      document.getElementById("choose").style.display = "grid";
    }
    if (gn == "Ultimate") {
      document.getElementById("sub-board").style.display = "grid";
    }
    document.getElementById("points1").innerHTML = parseInt(p1);
    document.getElementById("points2").innerHTML = parseInt(p2);
    state.innerHTML = "Player X Turn";
    state.style.color = "#e74c3c";
  }
}
