const createPlayer = function (name) { 
    
    let score = 0;
    const incrementScore = () => ++score;
    const getScore = () => score;

    return {name, incrementScore, getScore};
};