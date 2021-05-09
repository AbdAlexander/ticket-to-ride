import Card from "../Classes/Card";

const RailwayCarrigeCards = () => {
    let storage = [];
    let cardsOnTable = [];

    const makeCards = () => {
        for(let i=0; i<8; i++) {
            for(let j=0; j<12; j++) {
                storage.push(new Card(i));
            } 
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
    const takeCardsFromStorage = () => {
        for(let i=0; i<5; i++)
            cardsOnTable.push(storage.pop());
    }

    makeCards();
    shuffleCards();
    takeCardsFromStorage();

    return (
        <div>
            <p>{cardsOnTable[0].image}</p>
            <p>{cardsOnTable[1].image}</p>
            <p>{cardsOnTable[2].image}</p>
            <p>{cardsOnTable[3].image}</p>
            <p>{cardsOnTable[4].image}</p>
            <h6>Vasútkocsik kártyák paklija (<strong>{storage.length}</strong> / 96)</h6>
            <img src="https://static.thenounproject.com/png/219525-200.png" height="90" width="200" alt=""/>
        </div>
    );
};
export default RailwayCarrigeCards;