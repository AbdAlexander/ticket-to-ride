
import { useState } from "react";
import {Container, Form, Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { joinRoom } from "../Redux/Actions/gamestateAction";
import { initPlayer } from "../Redux/Actions/playerAction";
import socket from "../Utilities/Socket/socket";
//import { useSelector } from "react-redux";
//import { Link } from "react-router-dom";

const JoiningToGame = () => {
    const [name, setName] = useState(null);
    const [roomID, setRoomID] = useState(null);
    //const roomSize = useSelector((state) => state.gamestate.roomSettings.roomSize);

    const dispatch = useDispatch();
    const history = useHistory();
    
    const joiningToGameListener = () => {
        if(!name || name === "" || !roomID || roomID === "") {
            alert("A név és szoba azonosító mező kitöltése kötelező!");
            return;
        }

        socket.emit('join-room', roomID, (ack) => {
            if(ack.status === "ok") {
                socket.emit('get-state', roomID, (stateAck) => {
                    if(stateAck.status === "ok") {
                        const state = JSON.parse(stateAck.state);
                        const syncRoomInfo = state.roomSettings;
                        dispatch(joinRoom({syncRoomInfo, name}));
                        dispatch(initPlayer({name}))
                        history.push('waiting');
                    } else {
                        alert("Hiba történt szerverre való kommunikáció során!\nHibaüzenet: "+ ack.message);
                    }
                });
            } else { 
                alert("Hiba keletkezett, nem lehetett csatlakozni a szobához!\nHibaüzenet: " + ack.message);
            }
        })
        console.log("RoomID: "+ roomID +"\nName: " + name);
    }

    return (
        <Container fluid>
            <h1>Csatlakozás egy játékszobához</h1>
            <Form>
                <Form.Group controlId="exampleForm.SelectCustomSizeSm">
                    <Form.Label style={{paddingTop: 30, fontSize: 24}}><strong>Játékszoba azonosítója?</strong></Form.Label>
                    <Form.Control placeholder="Játékszoba ID" onChange={(e) => setRoomID(e.target.value)} required/> <br/>

                    <Form.Label style={{fontSize: 24}}><strong>A Te neved?</strong></Form.Label>
                    <Form.Control placeholder="Név" onChange={(e) => setName(e.target.value)} required/> <br/>

                    <Button variant="success" size="lg" block onClick={joiningToGameListener}>Csatlakozás a szobához</Button>
                    {/*<Link to="/waiting" className="btn btn-primary">Játék kezdése</Link>*/}
                </Form.Group>
            </Form>
        </Container>
    );
};
export default JoiningToGame;