import destinations from "../Utilities/Images/destinations.png"

const DestinationCards = () => {
    const destinationCardsStyle = {

    }
    

    return (
        <div>
            <h6>Célkártyák paklija</h6>
            <img src={destinations} style={{mixBlendMode: "darken", opacity:'07', height:125}} alt="Menetjegyek kártyapaklija"></img>
        </div>
    )
}
export default DestinationCards;

//<img src={destinations} style={{opacity:0.5, zIndex:'-0.5', position:'relative'}} alt="Menetjegyek kártyapaklija"></img>