var candies = ["Blue", "Orange", "Green", "Yellow", "Red", "Purple"];
//2d array of candies
var board = [];
//since our board is 9x9
var row = 9;
var col = 9;
var score = 0;

//tracking two candies
var currTile;
var newTile;

//initialize the board
window.onload = function () {
  startGame();
  window.setInterval(function () {
    crushCandy();
    slideCandy();
    generateCandy()
  }, 100);
};

function randomCandy() {
  return candies[Math.floor(Math.random() * candies.length)];
}

function startGame() {
  for (let i = 0; i < row; i++) {
    let row = [];
    for (let j = 0; j < col; j++) {
      //create an img tag
      let tiles = document.createElement("img");
      // asssigning the image tag an id
      tiles.id = i.toString() + "-" + j.toString();
      // src= red.png, white.png etc etc
      tiles.src = "./images/" + randomCandy() + ".png";

      //event listener for swapping candies
      // the ones inside the " " are predefined drag and drop api
      tiles.addEventListener("dragstart", dragStart); //click a candy,initialized drag process
      tiles.addEventListener("dragover", dragOver); //moving the candy clicking on it
      tiles.addEventListener("dragenter", dragEnter); //initial candy touch another cnady
      tiles.addEventListener("dragleave", dragLeave); // drop on top of another candy
      tiles.addEventListener("drop", dragDrop); //dropping candy over another cnady
      tiles.addEventListener("dragend", dragEnd); // after drag process complete, we swap candies

      document.getElementById("gameBoard").append(tiles);
      row.push(tiles);
    }
    board.push(row);
  }
  console.log(board);
}

function dragStart() {
  //referes to current candy clicked rn
  currTile = this;
}

function dragOver(e) {
  e.preventDefault();
}

function dragEnter(e) {
  e.preventDefault();
}

function dragLeave() {}

function dragDrop() {
  //this refers to new tile where we dripped it
  newTile = this;
}

function dragEnd() {
    if (newTile.src.includes("blank") || currTile.src.includes("blank")) {
      return;
    }
    
    let currCords = currTile.id.split("-");
    let r = parseInt(currCords[0]);
    let c = parseInt(currCords[1]);
  
    let newCords = newTile.id.split("-");
    let r2 = parseInt(newCords[0]);
    let c2 = parseInt(newCords[1]);
  
    let moveLeft = c2 == c - 1 && r == r2;
    let moveRight = c2 == c + 1 && r == r2;
    let moveUp = r2 == r - 1 && c == c2;
    let moveDown = r2 == r + 1 && c == c2;
  
    let isAdjacent = moveLeft || moveRight || moveUp || moveDown;
  
    if (isAdjacent) {
      // Temporarily swap the tiles
      let currImg = currTile.src;
      let newImg = newTile.src;
      currTile.src = newImg;
      newTile.src = currImg;
  
      // Check if the move is valid
      let validMove = checkValid();
  
      if (!validMove) {
        // If not valid, revert the swap
        let currImg = currTile.src
        let newImg = newTile.src
        currTile.src = newImg;
        newTile.src = currImg;
      }
    }
    currTile = null;
    newTile = null;
  }
  

function crushCandy() {
  crushThree();
  document.getElementById("scoreUpdate").innerText = score
}

function crushThree() {
  for (let i = 0; i < row; i++) {
    for (let j = 0; j < col - 2; j++) {
      let candy1 = board[i][j];
      let candy2 = board[i][j + 1];
      let candy3 = board[i][j + 2];
      if (
        candy1.src == candy2.src &&
        candy2.src == candy3.src &&
        !candy1.src.includes("blank")
      ) {
        candy1.src = "./images/blank.png";
        candy2.src = "./images/blank.png";
        candy3.src = "./images/blank.png";
        score+=10
      }
    }
  }

  for (let j = 0; j < col; j++) {
    for (let i = 0; i < row - 2; i++) {
      let candy1 = board[i][j];
      let candy2 = board[i + 1][j];
      let candy3 = board[i + 2][j];
      if (
        candy1.src == candy2.src &&
        candy2.src == candy3.src &&
        !candy1.src.includes("blank")
      ) {
        candy1.src = "./images/blank.png";
        candy2.src = "./images/blank.png";
        candy3.src = "./images/blank.png";
        score+=10
      }
    }
  }
}

function checkValid() {

    //checking rows
    for (let i = 0; i < row; i++) {
      for (let j = 0; j < col - 2; j++) {
        let candy1 = board[i][j];
        let candy2 = board[i][j + 1];
        let candy3 = board[i][j + 2];
        if (
          candy1.src == candy2.src &&
          candy2.src == candy3.src &&
          !candy1.src.includes("blank")
        ) {
          return true;
        }
      }
    }

    //checking columns
    for (let j = 0; j < col; j++) {
      for (let i = 0; i < row - 2; i++) {
        let candy1 = board[i][j];
        let candy2 = board[i + 1][j];
        let candy3 = board[i + 2][j];
        if (
          candy1.src == candy2.src &&
          candy2.src == candy3.src &&
          !candy1.src.includes("blank")
        ) {
          return true;
        }
      }
    }
    return false;
  }
  

function slideCandy() {
    for (let j = 0; j < col; j++) {
        let ind = row - 1; // Start from the bottom of the column

        // Slide candies down
        for (let i = row - 1; i >= 0; i--) {
            if (!board[i][j].src.includes("blank")) {
                board[ind][j].src = board[i][j].src;
                ind -= 1;
            }
        }

        // Fill the remaining empty spaces with blank images
        for (let i = ind; i >= 0; i--) {
            board[i][j].src = "./images/blank.png";
        }
    }
}

function generateCandy(){
    for(let j=0;j<col;j++){
        if (board[0][j].src.includes("blank")){
            board[0][j].src = "./images/"+ randomCandy()+".png"
        }
    }
}
