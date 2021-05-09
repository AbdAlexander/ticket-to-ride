import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";

const Waiting = () => {
    const roomID = 147963; // Ez majd egy randomszám generátorral lesz megoldva
    const maxPlayers = 5;
    const joinedPlayers = 3;

    return (
        <Container fluid>
            <h1>Várakozás a játékosokra: {joinedPlayers} / {maxPlayers}</h1>
            <h2>A szoba azonosítója: {roomID}</h2>
            <Link to="/" className="btn btn-primary">Vissza</Link>
            <Link to="/game" className="btn btn-primary">A játékba!</Link>

        </Container>
    );
};
export default Waiting;