const createPlayer = function (name) { 
    
    let score = 0;
    const incrementScore = () => ++score;
    const getScore = () => score;

    return {name, incrementScore, getScore};
};


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
                playsBoard[0][reference%3] = e.target.textContent;

            } else if (reference <= 5) {
                playsBoard[1][reference%3] = e.target.textContent;

            } else {                                                                                //comes here if its 6, 7 or 8
                playsBoard[2][reference%3] = e.target.textContent;
            }
            console.log(isGameOver());
        }

        });
    });

    function isGameOver() {

        nextLine: for (let i = 0; i <= 2; i++) {                                                              
            for (let j = 0; j <= 2; j++){
                
                if (playsBoard[i][0] === playsBoard[i][1] && playsBoard[i][1] === playsBoard[i][2]) {                       // checks rows
                    
                    if(playsBoard[i][j].length == 0) continue nextLine                                                      // if text content is empty, jump to next row/column since it's impossible to be game over
                    return true;

                } else if (playsBoard[0][i] === playsBoard[1][i] && playsBoard[1][i] === playsBoard[2][i]) {                // checks columns
            
                    if(playsBoard[j][i].length == 0) continue nextLine      
                    return true;

                } else if (playsBoard[0][0] === playsBoard[1][1] && playsBoard[1][1] === playsBoard[2][2]) {                // checks main diagonal
                    
                    if(playsBoard[j][j].length == 0) continue nextLine  
                    return true;

                } else if (playsBoard[2][0] === playsBoard[1][1] && playsBoard[1][1] === playsBoard[0][2]) {                // checks secondary diagonal
                    
                    if(playsBoard[2-j][j].length == 0) continue nextLine
                    return true;

                } else {
                    continue nextLine;
                }
            }
        }
        return false;                                                                               //if all checks on the loop failed, returns false
    }

})();