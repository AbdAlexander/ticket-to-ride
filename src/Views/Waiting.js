import { useEffect, useState } from "react";
import { Button, Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { startGameFromRoom, updateGameState } from "../Redux/Actions/gamestateAction";
import socket from "../Utilities/Socket/socket";

const Waiting = () => {
    //const [roomsInfo, setRoomsInfo] = useState(useSelector((state) => state.gamestate.roomSettings));
    const gamestate = useSelector((state) => state.gamestate);
    const [playerNames, setPlayerNames] = useState(gamestate.roomSettings.playersInRoom);
    const [syncGameState, setSyncGameState] = useState(gamestate);
    const [stopper, setStopper] = useState(false);

    const history = useHistory();
    const dispatch = useDispatch();

    useEffect(() => {
        if(gamestate) {
            setPlayerNames(gamestate.roomSettings.playersInRoom);

            if(gamestate.roomSettings.isRoomFull) {
                history.push('game');
                console.log("Átirányítás");
            }
        }
    }, [gamestate]);

    /*socket.on('state-changed', (msg) => {
        let mounted = true;
        if(msg.state.roomSettings.isRoomFull) {
            if(msg.state.state === "INITAL") {
                const syncState = msg.state;
                //if(mounted) {
                    dispatch(updateGameState({syncState}));
                //}
                console.log("\n\nWAITING ROOM STATE CHANGED\n\n ", stopper);
                //setSyncGameState(msg.state);
                history.push('game');
            } else return;
        } else {
            setPlayerNames(msg.state.roomSettings.playersInRoom);
            setSyncGameState(msg.state);
        }
        return () => mounted = false;
    });*/

    const startGameListener = () => {
        if(!(playerNames.length === parseInt(gamestate.roomSettings.roomSize))) {
            alert("Még várunk a játékosok csatlakozására....");
            return;
        }
        socket.emit('get-state', gamestate.roomSettings.roomID, (ack) => {
            if(ack.status === "ok") {
                const state = JSON.parse(ack.state);
                const syncRoomInfo = state.roomSettings;
                dispatch(startGameFromRoom({syncRoomInfo}));
            } else {
                alert("Hiba történt szerverre való kommunikáció során!\nHibaüzenet: "+ ack.message);
            }
        });
    }


    return (
        <Container fluid>
            <div style={{padding:'10px'}}>
                <div style={{border:'1px solid', borderRadius: 20, padding: 10, background: '#E1E561', opacity:'0.9'}}>
                    <h1>Várakozás a játékosokra: {playerNames.length} / {gamestate.roomSettings.roomSize}</h1>
                    <h2>A szoba azonosítója: <i>{gamestate.roomSettings.roomID}</i></h2> <br></br>
                    <h5>A szoba azonosítóját elküldheted a barátaidnak, hogy tudjanak csatlakozni a játékba.</h5>
                    <h5>Amint betelik a szoba, a játék kezdetét veszi!</h5>
                    <br></br>
                    <h3>A szobában lévő játékosok:</h3>
                    <ol>
                        {playerNames.map((name, i) =>
                            <li key={i}>{name}</li>
                        )}
                    </ol>
                </div>
            </div>
            <Button variant="success" size="lg" block onClick={startGameListener}>Játék kezdése</Button>
        </Container>
    );
};
export default Waiting;