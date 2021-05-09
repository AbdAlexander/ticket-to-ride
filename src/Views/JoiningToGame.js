import {Container, Form } from "react-bootstrap";
import { Link } from "react-router-dom";

const JoiningToGame = () => {
    
    return (
        <Container fluid>
            <h1>Csatlakozás egy játékszobához</h1>
            <Form>
                <Form.Group controlId="exampleForm.SelectCustomSizeSm">
                    <Form.Label>Játékszoba ID-ja?</Form.Label>
                    <Form.Control placeholder="Játékszoba ID" required/> <br/>

                    <Form.Label>A Te neved?</Form.Label>
                    <Form.Control placeholder="Név" required/> <br/>

                    <Link to="/waiting" className="btn btn-primary">Játék kezdése</Link>
                </Form.Group>
            </Form>
        </Container>
    );
};
export default JoiningToGame;