import 'bootstrap/dist/css/bootstrap.min.css';
import { Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Main = () => {
    return (
        <div>
            <Container fluid>
                <br/> 
                <Link to="/create" className="btn btn-primary">Új játék indítása</Link>
                <Link to="/joining" className="btn btn-primary">Csatlakozás egy meglévő szobához</Link> <br/>
                <a href="https://tarsasjatekrendeles.hu/shop_ordered/7237/pic/Compaya/Ticket_To_Ride_Europe.pdf" target="_blank" rel="noopener noreferrer">Játékszabályzat</a>
            </Container>
        </div>
    );
};
export default Main;