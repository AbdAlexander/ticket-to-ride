import { Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import socket from '../Utilities/Socket/socket';
import { updateGameState } from '../Redux/Actions/gamestateAction';

const Main = () => {
    const dispatch = useDispatch();
    const gamestate = useSelector((state) => state.gamestate);
    

    socket.on('state-changed', (msg) => {
        const syncState = msg.state;
        dispatch(updateGameState({syncState}));
    });

    return (
        <Container fluid>
            <br/> 
            <Link to="/create" className="btn btn-primary">Új szoba létrehozása</Link>
            <Link to="/joining" className="btn btn-primary">Csatlakozás egy meglévő szobához</Link> <br/>
            <a href="https://tarsasjatekrendeles.hu/shop_ordered/7237/pic/Compaya/Ticket_To_Ride_Europe.pdf" target="_blank" rel="noopener noreferrer">Játékszabályzat</a>
        </Container>
    );
};
export default Main;