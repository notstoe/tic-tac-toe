const createPlayer = function (name) { 
    
    let score = 0;
    const incrementScore = () => ++score;
    const getScore = () => score;

    return {name, incrementScore, getScore};
};


const gameBoard = (function () {
    
    let turnCounter = 0;
    let playsBoard = [['','',''],['','',''],['','','']];                     /* represents game board - x x x
                                                                                                        x x x
                                                                                                        x x x */

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
        }

        });
    });




    // function renderBoard(arrGame){

    // }

})();