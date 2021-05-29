const initalState = {
    name: null
};

const clientnameReducer = (state = initalState, action) => { 
    let copyState = Object.assign({}, state);
    if(action.type === "INIT_PLAYER") {
        copyState.name = action.payload.name;
        console.log("INIT PLAYER");
        return copyState;
    }

    return state;
};

export default clientnameReducer;