import { useEffect } from "react";
import { Col, Container, Row, Button } from "react-bootstrap";
import { connect, useDispatch, useSelector, useStore } from "react-redux";
import { changeText } from "../Redux/Actions/testAction";
import Backlog from "../UI/Backlog";
import DestinationCards from "../UI/DestinitionCards";
import GameTable from "../UI/GameTable";
import Player from "../UI/Player";
import PlayerHand from "../UI/PlayerHand";
import RailwayCarrigeCards from "../UI/RailwayCarrigeCards";

const Game = () => {

    const gameState = useSelector((state) => state.test);

    const store = useStore();
    const dispatch = useDispatch();

    useEffect(() => {
        console.log(store.getState());
    }, [store]);

    const changeTextButton = () => {
        dispatch(changeText("Megváltozás"));
    }
    
    return (
        <Container fluid style={{backgroundColor:"#FFD181", width: "100%", height:900}}>
            <h1>{gameState?.text}</h1>
            <div>
                <Row>
                    <Col onClick={changeTextButton}>
                        <h4>Játékosok</h4>
                        <Player name="Alex" points="0" vagons="0" cards="0" goals="0" turns="0" isSelected="false"></Player>
                        <br></br>
                        <Player name="Gabi" points="0" vagons="0" cards="0" goals="0" turns="0" isSelected="true"></Player>
                    </Col>
                    <Col> <GameTable/> </Col>
                    <Col> <RailwayCarrigeCards/> </Col>
                </Row>
                
                <Row>
                    <Col> <Backlog/> </Col>
                    <Col> <PlayerHand/> </Col>
                    <Col><DestinationCards/></Col>
                </Row>
            </div>
        </Container>
    );
};
export default Game;
