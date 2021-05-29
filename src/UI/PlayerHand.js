import { Col, Row } from "react-bootstrap"
import { useSelector } from "react-redux";
import PlayerHandDestinations from "./PlayerHandDestinations"

const PlayerHand = (props) => {
    const gamestate = props.gamestate;
    const clientName = useSelector((state) => state.clientname.name);
    const players = gamestate.onlinePlayers;

    let actualPlayer = gamestate.players.player1;
    for(const playerIndex in players) {
        if(players[playerIndex].name === clientName) {
            actualPlayer = players[playerIndex];
            break;
        }
    }

    const handStyle = {
        height:350,
        width:1050,
        backgroundColor: "#FF8D3E", 
        borderRadius:50,
    }
    const handDataStyle = {
        paddingLeft: 40,
        paddingTop: 10
    }

    return (
        <div style={handStyle}>
            <h3 style={handDataStyle}>{actualPlayer.name} asztala</h3>
            <Row style={{width:'90%'}}>
                <Col style={{width:'50%'}}> <PlayerHandDestinations longD={actualPlayer.longDestinations} normalD={actualPlayer.normalDestinations}/> </Col>
                <Col style={{display: 'inline-block'}}>
                    <div style={{width: '100%', display: 'block'}}>
                        {actualPlayer.cards.map((c,i) => 
                            <div key={i} style={{float: 'left', width:"15%"}}>  
                                <img src={c.image.props.src} style={{width:200, height: 140}} alt={c.image.props.alt}></img>
                            </div>)}
                    </div>
                </Col>
            </Row>
        </div>
    )
}
export default PlayerHand;