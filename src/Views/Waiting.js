import { useEffect, useState } from "react";
import { Button, Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { startGameFromRoom } from "../Redux/Actions/gamestateAction";
import socket from "../Utilities/Socket/socket";

const Waiting = () => {
    const gamestate = useSelector((state) => state.gamestate);
    const [playerNames, setPlayerNames] = useState(gamestate.roomSettings.playersInRoom);
    const history = useHistory();
    const dispatch = useDispatch();

    useEffect(() => {
        if(gamestate) {
            setPlayerNames(gamestate.roomSettings.playersInRoom);
            if(gamestate.roomSettings.isRoomFull) {
                history.push('game');
            }
        }
    }, [gamestate, history]);

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