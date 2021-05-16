const initalState = {
    player1: {
        name: "Alex",
        points: 0,
        vagons: 0,
        cards: [],
        cardsVarrierty: {
            yellow: 0,
            red: 0,
            purple: 0,
            orange: 0,
            green: 0,
            blue: 0,
            black: 0,
            white: 0,
            joker: 0,
        },
        longDestinations: [],
        normalDestinations: [],
        doneConnections: [],
        turns: 0,
        drawCount: 0,
        color: 'green',
        isSelected: false
    },
    player2: {
        name: "Gabi",
        points: 0,
        vagons: 0,
        cards: [],
        cardsVarrierty: {
            yellow: 0,
            red: 0,
            purple: 0,
            orange: 0,
            green: 0,
            blue: 0,
            black: 0,
            white: 0,
            joker: 0,
        },
        longDestinations: [],
        normalDestinations: [],
        doneConnections: [],
        turns: 0,
        drawCount: 0,
        color: 'red',
        isSelected: false
    }
}

const playerReducer = (state = initalState, action) => { 
    //let copyState = Object.assign({}, state);

    return state;
};

export default playerReducer;