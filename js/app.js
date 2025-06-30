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
const squreEls =document.querySelectorAll(".sqr");
const messageEl =document.querySelector("#message");


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
        messageEl.textContent = `It iss a tie!`;
    } else if ( winner === true ){
        messageEl.textContent = `Congrats, ${turn} wins!`;
    }

}

function handleClick(event){
    const squareIndex = Number(event.target.id);

    if( board[squareIndex] === 'X' || board[squareIndex] === '0' || winner ){
        return;
    } 

    console.log('cliicked square index',squareIndex)
    // placePiece(squareIndex );
    
    placePiece(squareIndex);
}

// function handleClick(event) {
//   const clickedEl = event.target;
//   if (!clickedEl.classList.contains('square')) return;

//   const squareIndex = parseInt(clickedEl.id.replace('square-', ''));

//   if (board[squareIndex] || winner) return;

//   placePiece(squareIndex); // ← هنا أضفنا السطر حسب الخطوة 6.1
// }


function placePiece(index){
    board[index] = turn;
    console.log(board);
}

function checkForWinner(board ,player){
    for (let combination of winningCombos){
        const [a, b, c] = combination;
        if ( board[a] === player && 
            board[b]=== player && 
            board[c] === player )
            return true;
    }
    {
        return true;
    }

}

function checkForTie(){
    if(winner) return;
    tie = board.every((square) => square !== '');
console.log(tie)
}
checkForTie();
/*----------------------------- Event Listeners -----------------------------*/

for( let i=0 ; i < squreEls.length ; i++ ){
    squreEls[i].addEventListener('click', handleClick);
}; 


