const initalState = {
    player1: {
        name: "Alex",
        points: 0,
        vagons: 0,
        cards: 0,
        longDestinations: 0,
        normalDestinations: 0,
        turns: 0,
        isSelected: "false",
    },
    player2: {
        name: "Gabi",
        points: 0,
        vagons: 0,
        cards: 0,
        longDestinations: 0,
        normalDestinations: 0,
        turns: 0,
        isSelected: "false"
    }
};

const playerReducer = (state = initalState, action) => { 
    let copyState = Object.assign({}, state);

    return state;
};

export default playerReducer;