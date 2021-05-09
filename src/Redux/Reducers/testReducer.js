const initalState = { 
    text: 'Setup-Game-State',
};

const testReducer = (state = initalState, action) => { 
    let copyState = Object.assign({},state);

    if(action.type === "CHANGE_TEXT") {
        copyState.text = action.payload?.newText;
        return copyState;
    }
    return state;
};

export default testReducer;