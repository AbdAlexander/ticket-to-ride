import {Container, Form } from "react-bootstrap";
import { Link } from "react-router-dom";

const CreateNewGame = () => {
    
    return (
        <Container fluid>
            <h1>Játék készítése</h1>
            <Form>
                <Form.Group controlId="exampleForm.SelectCustomSizeSm">
                    <Form.Label>Hány játékos legyen a szobában?</Form.Label>
                    <Form.Control as="select" size="sm" custom>
                        <option>2</option>
                        <option>3</option>
                        <option>4</option>
                        <option>5</option>
                    </Form.Control>

                    <Form.Label>A Te neved?</Form.Label>
                    <Form.Control placeholder="Név" required/> <br/>

                    <Link to="/waiting" className="btn btn-primary">Játék kezdése</Link>
                
                </Form.Group>
            </Form>
        </Container>
    );
};
export default CreateNewGame;