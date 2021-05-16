import { Col, Row } from "react-bootstrap"
import { useSelector } from "react-redux";
import PlayerHandDestinations from "./PlayerHandDestinations"

const PlayerHand = (props) => {
    const players = useSelector((state) => state.players);
    const gamestate = useSelector((state) => state.gamestate);

    let actualPlayer = players.player1;
    if(gamestate.state !== "INITAL") {
        actualPlayer = players.player1.isSelected ? players.player1 : players.player2;
    }

    const handStyle = {
        height:225,
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
            <Row>
                <Col style={{padding:0}}> <PlayerHandDestinations longD={actualPlayer.longDestinations} normalD={actualPlayer.normalDestinations}/> </Col>
                <Col style={{display: 'flex'}}>
                    <div style={{width: '100%', display: 'flex'}}>
                        {actualPlayer.cards.map((c,i) => <div key={i} style={{float: 'left', width:"8%"}}>{c?.getSrc(c.type)}</div>)}
                    </div>
                </Col>
            </Row>
        </div>
    )
}
export default PlayerHand;