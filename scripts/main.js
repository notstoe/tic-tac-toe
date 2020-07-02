const createPlayer = function (name) { 
    
    let score = 0;
    let won = false;                                                               //loser by default... harsh
    const incrementScore = () => ++score;
    const getScore = () => score;
    const makeChampion = () => won = true;
    const isWinner = () => won;

    return {name, incrementScore, getScore, isWinner, makeChampion};
};

// GAME HANDLING

const gameBoard = (function () {
    
    let turnCounter = 0;
    let playsBoard = [['','',''],                                                  // represents game board - x x x
                      ['','',''],                                                  //                         x x x
                      ['','','']];                                                 //                         x x x
                                                                                                       
    const playableSqs = document.querySelectorAll('.playableSquare');
    playableSqs.forEach(playableSq => { playableSq.addEventListener('click', (e) => {
        
        if (!e.target.textContent) {                                                        //prevents from playing in an already played spot
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

            const gameOverCondition = isGameOver();
            console.log(gameOverCondition.gameOver, gameOverCondition.winner);
            // TODO - Add isGameOver() check and call to a resetBoard() function
        }

        });
    });

    function isGameOver() {

        let gameOver;
        let winner;                                                                                                         //player1 is always X

        if (turnCounter == 9) {                                                                                             //tie condition
            gameOver = true;
            winner = 0;
            return {winner, gameOver};
        }                                                                                  

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
                    continue nextLine;
                }
            }
        }
        return {winner: -1, gameOver: false};                                                                               //if all checks on the loop failed, game not over and no winner yet, hence -1
    }

    // function resetBoard(){}

})(); 
// module must return resetBoard to call for a button later