import {Button, Container, Form } from "react-bootstrap";
import socket from '../Utilities/Socket/socket';
import { useHistory } from "react-router-dom";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { createRoom } from "../Redux/Actions/gamestateAction";
import { initPlayer } from "../Redux/Actions/playerAction";


const CreateNewGame = () => {
    const [roomSize, setRoomSize] = useState(2);
    const [name, setName] = useState(null);

    const dispatch = useDispatch();
    const history = useHistory();

    const createRoomListener = () => {
        if(!name || name === "") {
            alert("A név mező kitöltése kötelező!");
            return;
        }

        socket.emit('create-room',roomSize, (ack) => {
            if(ack.status === "ok") {
                const roomid = ack.roomId;
                
                dispatch(createRoom({roomid, roomSize, name}));
                dispatch(initPlayer({name}))
                history.push('waiting');

                console.log("Sikeres szoba létrehozás\nroomID: " + ack.roomId + "\nroomSize: " + roomSize +"\nPlayerName: " + name);
            } else { 
                alert("Hiba keletkezett, nem lehetett létrehozni a szobát!\nHibaüzenet: " + ack.message);
            }
        })
    }
    
    return (
        <Container fluid>
            <h1>Játék készítése</h1>
            <Form>
                <Form.Group controlId="exampleForm.SelectCustomSizeSm">
                    <Form.Label style={{paddingTop: 30, fontSize: 24}}><strong>Hány férőhelyes legyen a szoba?</strong></Form.Label>
                    <br></br>
                    <select style={{width: '100%', height:'40px'}} value={roomSize} onChange={(e) => setRoomSize(e.target.value)}>
                        <option value="2">2 férőhely</option>
                        <option value="3">3 férőhely</option>
                        <option value="4">4 férőhely</option>
                        <option value="5">5 férőhely</option>
                    </select>
                    <br></br>

                    <Form.Label style={{paddingTop: 30, fontSize: 24}}><strong>A Te neved?</strong></Form.Label>
                    <Form.Control placeholder="Név" onChange={(e) => setName(e.target.value)} required/> <br/>

                    <Button variant="success" size="lg" block onClick={createRoomListener}>Új szoba létrehozása</Button>
                </Form.Group>
            </Form>
        </Container>
    );
};
export default CreateNewGame;