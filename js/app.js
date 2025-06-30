//1) Define the required variables used to track the state of the game.

//2) Store cached element references.

//3) Upon loading, the game state should be initialized, and a function should 
//   be called to render this game state.

//4) The state of the game should be rendered to the user.

//5) Define the required constants.

//6) Handle a player clicking a square with a `handleClick` function.

//7) Create Reset functionality.


/*-------------------------------- Constants --------------------------------*/
const values = ['X','0',''];
const index = ['0','1','2','3','4','5','6','7','8'];
const winningCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

/*---------------------------- Variables (state) ----------------------------*/
let board ;
let turn ;
let winner ;
let tie ;

/*------------------------ Cached Element References ------------------------*/
const squreEls = document.querySelectorAll(".sqr");
const messageEl = document.querySelector("#message");

const resetBtnEl = document.querySelector("#reset-button");

/*-------------------------------- Functions --------------------------------*/

function init() {
    board = ['','','','','','','','',''];
    turn = 'X';
    winner = false;
    tie = false;

    render()
}

init()

function render(){
    updateBoard();
    updateMessage();

}

function updateBoard(){
    board.forEach((value,index) => {
        let square = squreEls[index];

        if ( value === 'X' || value === '0' || value === '' )
        square.textContent = value;
 
    })
}

function updateMessage(){
    if( winner === false && tie === false ){
        messageEl.textContent =`It's ${turn}'s turn`
    } else if ( winner === false && tie === true ) {
        messageEl.textContent = `It is a tie!`;
    } else if ( winner === true ){
        messageEl.textContent = `Congrats, ${turn} wins!`;
    }

}

function handleClick(event){
    const squareIndex = Number(event.target.id);

    if( board[squareIndex] === 'X' || board[squareIndex] === '0' || winner ){
        return;
    } 
    
    placePiece(squareIndex);
    checkForWinner();
    checkForTie();
    switchPlayerTurn();
    render();
}

function placePiece(index){
    board[index] = turn;
}

function checkForWinner() {
  for (let combo of winningCombos) {
    const [a, b, c] = combo;
    if (
      board[a] !== '' &&
      board[a] === board[b] &&
      board[a] === board[c]
    ) {
      winner = true;
    }
  }
}


function checkForTie(){
    if(winner) return;
    tie = board.every((square) => square !== '');
}

function switchPlayerTurn() {
    if (winner) return;       

    if (turn === 'X') {
        turn = '0';             
    } else {
        turn = 'X';             
    }
}


/*----------------------------- Event Listeners -----------------------------*/

for( let i=0 ; i < squreEls.length ; i++ ){
    squreEls[i].addEventListener('click', handleClick);
}; 

resetBtnEl.addEventListener('click', init);


