
const Player = (props) => {
    let userData = props;
    let cards = {};

    const isSelected = userData.isSelected === "true" ? true : false;
    const playerBackgroundColor = isSelected ? '#FF8D3E' : '#FFC13E';

    
    const playerStyle = {
        border: "1px solid", 
        textAlign:"center", 
        fontSize: 14, 
        borderRadius: 20,
        backgroundColor: playerBackgroundColor,
    }

    return (
        <div style={playerStyle}>
            <h3>{userData.name}</h3>
            <p>
                <strong>Pontszám:</strong> {userData.points} |    <strong> Vagonok:</strong> {userData.vagons} |
                <strong> Kártyák:</strong> {userData.cards} |      <strong> Célok:</strong> {userData.goals} |
                <strong> Körök száma:</strong> {userData.turns}
            </p>
        </div>
    );
};
export default Player;