const RailwayCarrigeCards = (props) => {
    const storage = props.cards;
    //let cardsOnTable = [];


    return (
        <div>
            <h6>Vasútkocsik kártyák paklija (<strong>{storage.length}</strong> / 110)</h6>
            <img src="https://static.thenounproject.com/png/219525-200.png" height="90" width="200" alt=""/>
        </div>
    );
};
export default RailwayCarrigeCards;