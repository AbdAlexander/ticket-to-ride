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
        height:190,
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
            <Row style={{width:'100%', height:'100%'}}>
                <Col style={{paddingLeft: 25}}> <PlayerHandDestinations longD={actualPlayer.longDestinations} normalD={actualPlayer.normalDestinations}/> </Col>
                <Col style={{}}>
                    {/*<table style={{}}>
                        <tr style={{}}>
                            {actualPlayer.cards.map((c,i) => <th style={{}}>{c.image}</th>)}  
                        </tr>
                    </table>*/}
                </Col>
            </Row>
        </div>
    )
}
export default PlayerHand;