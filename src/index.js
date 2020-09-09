import "./styles.css";

var player = 1;
var winner = 0;

if (document.readyState !== "loading") {
  // Document ready, executing
  console.log("Document ready, executing");
  initializeCode();
} else {
  document.addEventListener("DOMContentLoaded", function () {
    // Document was not ready, executing when loaded
    console.log("Document ready, executing after a wait");
    initializeCode();
  });
}

function initializeCode() {
  console.log("Initializing");
  createtable();
}

function createtable() {
  const table = document.getElementById("board");
  var counter = 0;
  for (let i = 0; i < 5; i++) {
    let tr = document.createElement("tr");

    for (let x = 0; x < 5; x++) {
      let td = document.createElement("td");
      tr.appendChild(td);
      td.id = counter;
      counter++;
    }
    table.appendChild(tr);
  }

  table.addEventListener("mousedown", (event) => {
    boxclicked(event);
    event.stopPropagation();
  });
}

function boxclicked(event) {
  //console.log("Table clicked");
  var cell = event.target.closest("td").id;
  //console.log(cell);
  var element = document.getElementById(cell);
  if (!isNaN(element.innerHTML)) {
    if (player === 1) {
      element.innerHTML = "X";
      document.getElementById("playerid").innerHTML = "Player 2";
    } else if (player === 2) {
      element.innerHTML = "O";
      document.getElementById("playerid").innerHTML = "Player 1";
    }
  }

  if (winner === 0) {
    if (checkwin() !== 0) {
      alert("Player " + winner + " won!");
    }
  } else {
    alert("Player " + winner + " won!");
  }
  if (player === 1) {
    player = 2;
  } else {
    player = 1;
  }
}

function checkwin() {
  const table = document.getElementById("board");
  var row,
    rows = table.rows;
  var cells;
  var counter;

  //Loop throw rows
  for (var i = 0, iLen = rows.length; i < iLen; i++) {
    counter = 0;
    row = rows[i];
    cells = row.cells;

    //Check if win in the row
    for (var k = 1, kLen = cells.length; k < kLen; k++) {
      if (!isNaN(cells[0].innerHTML)) {
        break;
      } else {
        if (cells[0].innerHTML === cells[k].innerHTML) {
          counter++;
          continue;
        }
      }
    }
    if (counter === 4) {
      //row
      winner = player;
    }
  }

  //Check if win in columns, loop throw cells in first row
  var firstrowcells = rows[0].cells;
  for (var i2 = 0, iLen2 = firstrowcells.length; i2 < iLen2; i2++) {
    var counter2 = 0;
    for (var rownb = 1; rownb < rows.length; rownb++) {
      var rowcells = rows[rownb].cells;
      if (!isNaN(firstrowcells[i2].innerHTML)) {
        break;
      } else {
        if (rowcells[i2].innerHTML === firstrowcells[i2].innerHTML) {
          counter2++;
          continue;
        }
      }
    }
    if (counter2 === 4) {
      winner = player;
    }
  }

  //Check diagonals
  var counter3 = 0;
  var counter4 = 0;
  for (var d = 0; d < rows.length - 1; d++) {
    var rowd = rows[d];
    var rowd2 = rows[d + 1];
    var lastcell = rowd.cells.length - d - 1;
    if (!isNaN(rowd.cells[d].innerHTML)) {
    } else if (rowd.cells[d].innerHTML === rowd2.cells[d + 1].innerHTML) {
      counter3++;
    }
    if (!isNaN(rowd.cells[lastcell].innerHTML)) {
    } else if (
      rowd.cells[lastcell].innerHTML === rowd2.cells[lastcell - 1].innerHTML
    ) {
      counter4++;
    }
  }

  if (counter3 === 4) {
    //diagonal 1
    winner = player;
  }
  if (counter4 === 4) {
    //diafonal 2
    winner = player;
  }

  return winner;
}
