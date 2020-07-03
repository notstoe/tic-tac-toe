//PLAYER FACTORY

const createPlayer = function (name) { 
    
    let score = 0;                                                               
    const incrementScore = () => ++score;
    const getScore = () => score;
    const getName = () => name;

    return {getName, incrementScore, getScore};
};

// BUTTONS HANDLING

    // TODO - ADD LISTENERS FOR CHANGING PLAYERS AND RESETTING BOARD BUTTON

// const buttonsController = (function(){

//     const btnResetBoard = document.querySelector('')

// })();

// DISPLAY HANDLING

const displayController = (function (){

    const scorePlayer1 = document.querySelector('#score1');
    const scorePlayer2 = document.querySelector('#score2');

    function updateScore(player, score) {
        
        if (player == 1) scorePlayer1.textContent = score;
        
        if (player == 2) scorePlayer2.textContent = score;
    }

    function resetScore(){
        scorePlayer1.textContent = '0';
        scorePlayer2.textContent = '0';
    }

    return {updateScore, resetScore};

})();

// GAME HANDLING

const gameBoard = (function () {
    
    let turnCounter = 0;
    let playsBoard = [['','',''],                                                              // represents game board - x x x
                      ['','',''],                                                              //                         o x o
                      ['','','']];                                                             //                         x o o
                             
    let selectPlayer1 = document.querySelector('#name1');                                      //default Players
    let selectPlayer2 = document.querySelector('#name2');
    let player = [createPlayer(selectPlayer1.textContent), createPlayer(selectPlayer2.textContent)];
                      
    const playableSqs = document.querySelectorAll('.playableSquare');
    playableSqs.forEach(playableSq => { playableSq.addEventListener('click', (e) => {
        
        if (!e.target.textContent) {                                                            //prevents from playing in an already played spot
            if (turnCounter%2 == 0) {
                
                e.target.textContent = 'X';
                turnCounter++;
                
            } else {
                
                e.target.textContent = 'O';
                turnCounter++;
            }

            arrReference = Number((e.target.id).replace('square',''));                              //saves move on the Arr
            updatePlaysBoard(arrReference, e);

        }
        
        function updatePlaysBoard(reference) {
            
            if (reference <= 2) {
                playsBoard[0][reference%3] = e.target.textContent;                                  //ties #number on sq id to position on array

            } else if (reference <= 5) {
                playsBoard[1][reference%3] = e.target.textContent;

            } else {                                                                                //comes here if its 6, 7 or 8
                playsBoard[2][reference%3] = e.target.textContent;
            }

            let checkGameOver = isGameOver();
            resetBoard(checkGameOver.winner, checkGameOver.gameOver);
        }

        });
    });

    function isGameOver() {

        let gameOver;
        let winner;                                                                                                         //player1 is always X (1, 2, 0 - tie, -1 - not over yet)

        nextLine: for (let i = 0; i <= 2; i++) {                                                              
            for (let j = 0; j <= 2; j++){
                
                if (playsBoard[i][0] === playsBoard[i][1] && playsBoard[i][1] === playsBoard[i][2]) {                       // checks rows
                    
                    if(playsBoard[i][j].length == 0) continue nextLine                                                      // if text content is empty, jump to next row/column since it's impossible to be game over
                    
                    playsBoard[i][0] === 'X' ? winner = 1 : winner = 2;
                    gameOver = true;
                                       
                    return {winner, gameOver};

                } else if (playsBoard[0][i] === playsBoard[1][i] && playsBoard[1][i] === playsBoard[2][i]) {                // checks columns
            
                    if(playsBoard[j][i].length == 0) continue nextLine      

                    playsBoard[0][i] === 'X' ? winner = 1 : winner = 2;
                    gameOver = true;
                                       
                    return {winner, gameOver};

                } else if (playsBoard[0][0] === playsBoard[1][1] && playsBoard[1][1] === playsBoard[2][2]) {                // checks main diagonal
                    
                    if(playsBoard[j][j].length == 0) continue nextLine  

                    playsBoard[0][0] === 'X' ? winner = 1 : winner = 2;
                    gameOver = true;
                                       
                    return {winner, gameOver};

                } else if (playsBoard[2][0] === playsBoard[1][1] && playsBoard[1][1] === playsBoard[0][2]) {                // checks secondary diagonal
                    
                    if(playsBoard[2-j][j].length == 0) continue nextLine

                    playsBoard[2][0] === 'X' ? winner = 1 : winner = 2;
                    gameOver = true;
                                       
                    return {winner, gameOver};

                } else {
                   
                    if (turnCounter == 9) return {winner: 0, gameOver: true};                                               //tie condition 

                    continue nextLine;
                }
            }
        }
        return {winner: -1, gameOver: false};                                                                               //if all checks on the loop failed, game not over and no winner yet, hence -1
    }

    function resetBoard(champion, gameState){
        
        if (gameState){
            
            turnCounter = 0;
            playsBoard = [['','',''],                                                  
                          ['','',''],                                                  
                          ['','','']];

            playableSqs.forEach(playableSq => playableSq.textContent = '');
            
            switch (champion) {
                case 1:
                case 2:

                    alert(`${player[champion-1].getName()} is the winner!`)
                    player[champion-1].incrementScore();
                    displayController.updateScore(champion, player[champion-1].getScore());
                    
                break;
                
                case 0:
                    alert('Its a tie on this round!');

                break;
                    
                case -1:                                                        //case for when clicked on the button, resets everything
                    
                    player1 = createPlayer(getPlayer1.textContent);
                    player2 = createPlayer(getPlayer2.textContent);
                    displayController.resetScore();
                
                break;
            }
        }
    }

})(); 
// TODO - gameBoard module must return resetBoard to call for a button later