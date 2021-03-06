//PLAYER FACTORY

const createPlayer = function (name) { 
    
    let score = 0;                                                               
    const incrementScore = () => ++score;
    const getScore = () => score;
    const getName = () => name;

    return {getName, incrementScore, getScore};
};

// BUTTONS HANDLING

const buttonsController = (function(){ 
    
    let selectPlayer1 = document.querySelector('#name1');                                      
    let selectPlayer2 = document.querySelector('#name2');

    const actionBtns = document.querySelectorAll('.actionButton');
    
    actionBtns.forEach((btn) => { btn.addEventListener('click', (e) => {
        
        switch (e.target.id) {
            case 'changePlayers':
        
                modal.style.display = "block";                 
            
            break;
            
            case 'resetGame':
                
                gameBoard.resetBoard(-1, true, [selectPlayer1.textContent, selectPlayer2.textContent]);
                
            break;
        }
        });
    });
        
    // LOGIC FOR MODAL HANDLING
        
        const modal = document.querySelector('.changePlayersModal');                            
        const spanClose = document.querySelector('#close');
        const inputNames = document.querySelectorAll('.playersInput');
        const modalBtns = document.querySelectorAll('.modalBtn');
        
        spanClose.addEventListener('click', () => modal.style.display = "none");                                //x closes the modal
        window.addEventListener('click', (e) => {if(e.target == modal) modal.style.display = "none"});          //clicking outside also
        modalBtns.forEach((btn) => { btn.addEventListener('click', (e) => {
            
            switch (e.target.id) {
                case 'applyBtn':
                    
                    if (inputNames[0].value.length != 0) selectPlayer1.textContent = inputNames[0].value;                   //doesnt change if input value is empty
                    if (inputNames[1].value.length != 0) selectPlayer2.textContent = inputNames[1].value;

                    gameBoard.resetBoard(-1, true, [selectPlayer1.textContent, selectPlayer2.textContent]);                
                    modal.style.display = "none";

                break;
            
                case 'cancelBtn':

                    modal.style.display = "none";

                break;
            }
            });
        });

})();

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
                             
    let player = [createPlayer('Player 1'), createPlayer('Player 2')];                           //default Players
                      
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

    function resetBoard(champion, gameState, playersNames){                                         //playersNames is an optional parameter
        
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
                    alert('It\'s a tie on this round!');

                break;
                    
                case -1:                                                                                              //case for when clicked on the button, resets everything
                    
                player = [createPlayer(playersNames[0]), createPlayer(playersNames[1])];                                    //creating brand new players, which means 0 score on objects and new names
                displayController.resetScore();
                
                break;
            }
        }
    }

    return {resetBoard};

})(); 
