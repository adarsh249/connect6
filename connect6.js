var playerRed = "R";
var playerYellow = "Y";
var currPlayer = playerRed;

var gameOver = false;
var board;
var currColums;

var rows = 7;
var columns = 9;

window.onload = function(){
    setGame();
}
/*
FEATURES TO ADD: 
- TEXT SHOWING WHO'S TURN IT IS  
- A HOVER PIECE WHERE USER CAN HOVER TOKEN ABOVE EACH COLUMN
- ANIMATION TO MAKE BAORD MORE REALISTIC
- GAME WINDOW SHOWING WINNER AND REPLAY
- FINISH ABOVE BY FRIDAY
- TRY TO INCORPORATE MULTIPLAYER STUFF BY NEXT WEEK

*/
function setGame(){
    board = [];
    currColums = [6, 6, 6, 6, 6, 6, 6, 6, 6];
    for(let r = 0; r < rows; r++){
        let row = [];
        for(let c = 0; c < columns; c++)
        {
            //JS
            row.push(' ');

            //HTML
            //<div id="0-0" class = "tile"><\div>
            let tile = document.createElement("div");
            tile.id = r.toString() + "-" + c.toString();
            tile.classList.add("tile");
            tile.addEventListener("click", setPiece);
            tile.addEventListener("contextmenu", removePiece);
            tile.onmouseenter = () =>{
                onMouseEntered(c);
            }
            document.getElementById("board").append(tile);
        }
        board.push(row);
    }

}

function onMouseEntered(c){
    console.log(c);
    
}

function removePiece(){
    if(gameOver)
        return;
    let coords = this.id.split("-");
    let r = parseInt(coords[0]);
    let c = parseInt(coords[1]);
    //only let user right click the bottom row (Row 6)
    if(r != 6)
        return;

    let tile = document.getElementById(r.toString() + "-" + c.toString());

    //only let players delete their specific token
    if(currPlayer == playerRed && tile.classList.contains("red-piece"))
        currPlayer = playerYellow;
    else if(currPlayer == playerYellow && tile.classList.contains("yellow-piece"))
        currPlayer = playerRed;
    else
        return;

    r = currColums[c];

    for(let i = 6; i >= r; i--)
    {
        tile = document.getElementById(i.toString() + "-" + c.toString());

        //set the next row's color to prev's row's color
        if(i == 0)
        {
            board[i][c] = ' ';
            const classes = tile.classList;
            if(classes.contains("red-piece") || classes.contains("yellow-piece"))
            {
                const tileColor = classes.item(1);
                classes.remove(tileColor);
            }
            break;
        }

        board[i][c] = board[i - 1][c];

        //if statements to replace the css color of the token
        if(board[i - 1][c] == "Y")
        {
            const classes = tile.classList;
            const tileColor = classes.item(1);
            classes.replace(tileColor, "yellow-piece");
        }
        else if(board[i - 1][c] == "R")
        {
            const classes = tile.classList;
            const tileColor = classes.item(1);
            classes.replace(tileColor, "red-piece");           
        }
        else if(board[i - 1][c] == ' ')
        {
            const classes = tile.classList;
            if(classes.contains("red-piece") || classes.contains("yellow-piece"))
            {
                const tileColor = classes.item(1);
                classes.remove(tileColor);
            }
            
        }
    }

    r += 1; //add a row bc now theres a new space to add a token
    currColums[c] = r; //update that new space
    checkWinner();
}

function setPiece(){
    if(gameOver)
        return;
    let coords = this.id.split("-"); //"0-0" = ["0", "0"]
    let r = parseInt(coords[0]);
    let c = parseInt(coords[1]);
    r = currColums[c];
    if(r < 0)
        return;
    
    board[r][c] = currPlayer;
    let tile = document.getElementById(r.toString() + "-" + c.toString());
    if(currPlayer == playerRed)
    {
        tile.classList.add("red-piece");
        currPlayer = playerYellow; 
    }
    else
    {
        tile.classList.add("yellow-piece");
        currPlayer = playerRed;
    }

    r -= 1; //updating the row height for the column
    currColums[c] = r; //update the array
    checkWinner();
}

function checkWinner()
{
    //horizontally
    for(let r = 0; r < rows; r++){
        for(let c = 0; c < columns - 3; c++)
        {
            if(board[r][c] != ' ')
                if(board[r][c] == board[r][c + 1] && board[r][c + 1] == board[r][c + 2] && board[r][c + 2] == board[r][c +3] &&
                   board[r][c + 3] == board[r][c + 4] && board[r][c + 4] == board[r][c + 5])
                {
                    setWinner(r, c, " Horizontally");
                    return;
                }
        }
    }

    //vertically
    for(let c = 0; c < columns; c++)
    {
        for(let r = 0; r < rows - 3; r++)
        {
            if(board[r][c] != ' ')
            {
                if(board[r][c] == board[r + 1][c] && board[r + 1][c] == board[r + 2][c] && board[r + 2][c] == board[r + 3][c] &&
                   board[r + 3][c] == board[r + 4][c] && board[r + 4][c] == board[r + 5][c])
                {
                    setWinner(r ,c, " Vertically");
                    return;
                }
            }
        }
    }

    //anti-diagnolly
    for(let r = 0; r < rows - 5; r++)
    {
        for(let c = 0; c < columns - 5; c++)
        {
            if(board[r][c] != ' ')
            {
                if(board[r][c] == board[r + 1][c + 1] && board[r + 1][c + 1] == board[r + 2][c + 2] && board[r + 2][c + 2] == board[r + 3][c + 3] &&
                   board[r + 3][c + 3] == board[r + 4][c + 4] && board[r + 4][c + 4] == board[r + 5][c + 5])
                {
                    setWinner(r, c, " Diagnolly");
                    return;
                }
            }
        }
    }

    //diagnolly
    for(let r = 6; r < rows; r++)
    {
        for(let c = 0; c < columns - 3; c++)
        {
            if(board[r][c] != ' ')
            {
                if(board[r][c] == board[r - 1][c + 1] && board[r - 1][c + 1] == board[r - 2][c + 2] && board[r - 2][c + 2] == board[r - 3][c + 3] &&
                   board[r - 3][c + 3] == board[r - 4][c + 4] && board[r - 4][c + 4] == board[r - 5][c + 5])
                {
                    setWinner(r, c, " Diagnolly");
                    return;
                }
            }

        }
    }
}

function setWinner(r, c, s)
{
    let winner = document.getElementById("winner");
    if(board[r][c] == playerRed)
        winner.innerText = "Red Wins" + s;
    else if (board[r][c] == playerYellow)
        winner.innerText = "Yellow Wins" + s;
    else
        winner.innerText = s;
    
    gameOver = true;
}
