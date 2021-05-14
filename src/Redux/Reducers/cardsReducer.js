import Card from "../../Classes/Card";

const storage = [];
const setCards = () => {
    for(let i=0; i<8; i++) { //Vasútkocsi
        for(let j=0; j<12; j++) {
            storage.push(new Card(i));
        } 
    }
    for(let i=0; i<14; i++) { //Mozdony
        storage.push(new Card(8));
    }
}
const shuffleCards = () => {
    for (let i = storage.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = storage[i];
        storage[i] = storage[j];
        storage[j] = temp;
    }
}

setCards();
shuffleCards();


const initalState = {cardsStorage: storage};
const cardsReducer = (state = initalState, action) => { 
    //let copyState = Object.assign({}, state);

    return state;
};

export default cardsReducer;