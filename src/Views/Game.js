import { useEffect, useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import {useDispatch, useSelector, useStore } from "react-redux";
import { changeToPlayer1, changeToPlayer2, initGame, startGame } from "../Redux/Actions/gamestateAction";
import Backlog from "../UI/Backlog";
import DestinationCards from "../UI/DestinitionCards";
import GameTable from "../UI/GameTable";
import Player from "../UI/Player";
import PlayerHand from "../UI/PlayerHand";
import RailwayCarrigeCards from "../UI/RailwayCarrigeCards";

const Game = () => {
    const players = useSelector((state) => state.players);
    const gameData = useSelector((state) => state.gamedata);
    const cards = useSelector((state) => state.cards);
    const gamestate = useSelector((state) => state.gamestate);

    const store = useStore();
    const dispatch = useDispatch();

    useEffect(() => {
        console.log(store.getState());
    }, [store]);
    
    const [display,setDisplay] = useState('block');
    

    const cardsOnTable = [];
    console.log(cardsOnTable);
    const startTheGame = () => {
        dispatch(startGame("STARTED"));
        dispatch(initGame({players, cards, cardsOnTable}))

        setDisplay('none');
    }
    const clickOnPlayer1 = () => {
        dispatch(changeToPlayer1({players}));
    }
    const clickOnPlayer2 = () => {
        dispatch(changeToPlayer2({players}));
    }
    return (
        <Container fluid>
            <h1>{gamestate?.state}</h1>
            <Button variant="success" size="lg" block onClick={startTheGame} style={{display: display}}>Játék kezdése</Button> <br></br>
            <div>
                <Row>
                    <Col>
                        <h4>Játékosok</h4>
                        <div onClick={clickOnPlayer1}>
                            <Player data={players.player1}/>
                        </div>
                        <br></br>
                        <div onClick={clickOnPlayer2}>
                            <Player data={players.player2}/>
                        </div>
                    </Col>
                    <Col> <GameTable cities={gameData.cities}/> </Col>
                    <Col> <RailwayCarrigeCards cards={cards.cardsStorage} cardsOnTable={gamestate.cardsOnTable} players={players}/> </Col>
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
