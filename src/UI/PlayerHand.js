import { useState } from "react";
import { Col, Row } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux";
import Card from "../Classes/Card";
import { updateGameState } from "../Redux/Actions/gamestateAction";
import socket from "../Utilities/Socket/socket";
import PlayerHandDestinations from "./PlayerHandDestinations"

const PlayerHand = (props) => {
    //const gamestate = useSelector((state) => state.gamestate);
    const gamestate = props.gamestate;
    const clientName = useSelector((state) => state.clientname.name);
    //const syncGamestate = props.gamestate;
    const players = gamestate.onlinePlayers;
    
    /*const dispatch = useDispatch();

    const [syncGamestate, setSyncGameState] = useState(gamestate);
    socket.on('state-changed', (msg) => {
        const syncState = msg.state;
        setSyncGameState(syncState);
        //dispatch(updateGameState({syncState}));
        console.log("Game State frissült!");
        console.log(msg.state);
    })*/


    //const [actualPlayer, setActualPlayer] = useState(syncGamestate.players.player1);

    let actualPlayer = gamestate.players.player1;
    for(const playerIndex in players) {
        if(players[playerIndex].name === clientName) {
            actualPlayer = players[playerIndex];
            break;
        }
    }
    console.log(actualPlayer);

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
                                <img src={c.image.props.src} style={{width:200, height: 140}}></img>
                            </div>)}
                    </div>
                </Col>
            </Row>
        </div>
    )
}
export default PlayerHand;