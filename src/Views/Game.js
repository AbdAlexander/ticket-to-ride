import { useEffect, useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import {useDispatch, useSelector, useStore } from "react-redux";
import { changeText, startGame } from "../Redux/Actions/gamestateAction";
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

    const startTheGame = () => {
        dispatch(startGame("STARTED"));
        setDisplay('none');

        console.log("Játék kezdés")

        //dispatch(gameStartint());
    }
    
    return (
        <Container fluid>
            <h1>{gamestate?.state}</h1>
            <Button variant="success" size="lg" block onClick={startTheGame} style={{display: display}}>Játék kezdése</Button> <br></br>
            <div>
                <Row>
                    <Col>
                        <h4>Játékosok</h4>
                        <Player 
                            name={players.player1.name} 
                            points={players.player1.points}
                            vagons={players.player1.vagons}
                            cards={players.player1.cards}
                            goals={players.player1.longDestinations + players.player1.normalDestinations}
                            turns={players.player1.turns}
                            isSelected={players.player1.isSelected}>
                        </Player>
                        <br></br>
                        <Player 
                            name={players.player2.name} 
                            points={players.player2.points}
                            vagons={players.player2.vagons}
                            cards={players.player2.cards}
                            goals={players.player2.longDestinations + players.player2.normalDestinations}
                            turns={players.player2.turns}
                            isSelected={players.player2.isSelected}>
                        </Player>
                    </Col>
                    <Col> <GameTable cities={gameData.cities}/> </Col>
                    <Col> <RailwayCarrigeCards cards={cards.cardsStorage}/> </Col>
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
