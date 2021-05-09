const initalState = { state: 'NOT_STARTED' };

const gamestateReducer = (state = initalState, action) => { 
    let copyState = Object.assign({},state);

    if(action.type === "START_GAME") {
        copyState.state = action.payload?.newGameState;
        return copyState;
    }
    return state;
};

export default gamestateReducer;