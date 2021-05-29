import { useEffect, useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import {useDispatch, useSelector, useStore } from "react-redux";
import { useHistory } from "react-router";
import { initGame, lastRound } from "../Redux/Actions/gamestateAction";
import Backlog from "../UI/Backlog";
import DestinationCards from "../UI/DestinitionCards";
import GameTable from "../UI/GameTable";
import Player from "../UI/Player";
import PlayerHand from "../UI/PlayerHand";
import RailwayCarrigeCards from "../UI/RailwayCarrigeCards";


const Game = () => {
    const store = useStore();
    const dispatch = useDispatch();
    const cards = useSelector((state) => state.cards);
    const gamestate = useSelector((state) => state.gamestate);
    const [display,setDisplay] = useState('block');
    const [stopper, setStopper] = useState(true);
    const [endGameTable, setEndGameTable] = useState('none');
    const [endGameDisplay, setEndGameDisplay] = useState('block');
    const [winner, setWinner] = useState(gamestate.players.player1);
    const history = useHistory();

    useEffect(() => {
        if(gamestate) {
            if(gamestate.lastRoundCounter <= 0) {
                setEndGameDisplay('none');
                setEndGameTable('block');

                let maxGainedPoint = 0;
                for(const playerIndex in gamestate.onlinePlayers) {
                    if(gamestate.onlinePlayers[playerIndex].points > maxGainedPoint) {
                        maxGainedPoint = gamestate.onlinePlayers[playerIndex].points;
                        setWinner(gamestate.onlinePlayers[playerIndex]);
                    }
                }
            }
            if(gamestate.lastRound && stopper) {
                dispatch(lastRound({gamestate}));
                setStopper(false);
            }
            if(gamestate.roomSettings.gameStarted) {
                setDisplay('none');
            }
        }
    }, [store, stopper, gamestate, setDisplay, dispatch]);
    
    
    const startTheGame = () => {
        const onlinePlayers = gamestate.onlinePlayers;
        dispatch(initGame({onlinePlayers, cards, cardsOnTable}))
        setDisplay('none');
    }
    
    const cardsOnTable = [];
    return (
        <div>
        <Container fluid style={{display: endGameDisplay}}>
            <h1>{gamestate?.state}</h1>
            <Button variant="success" size="lg" block onClick={startTheGame} style={{display: display}}>Játék kezdése</Button> <br></br>
            <div>
                <Row>
                    <Col>
                        <h4>Játékosok</h4>
                        <div>
                            {gamestate?.onlinePlayers?.map((playerData,key) => <div key={key}> <Player data={playerData}/> <br></br> </div>)}
                        </div>
                    </Col>
                    <Col> <GameTable cities={gamestate.gamedata.cities}/> </Col>
                    <Col> {<RailwayCarrigeCards 
                            cards={gamestate.cards.cardsStorage} 
                            cardsOnTable={gamestate?.cardsOnTable} 
                            players={gamestate.onlinePlayers} 
                            style={{display:'block'}}/>}
                    </Col>
                </Row>
                
                <Row>
                    <Col> <Backlog/> </Col>
                    <Col> {<PlayerHand style={{display: endGameDisplay}} gamestate={gamestate} />} </Col>
                    <Col><DestinationCards style={{display: endGameDisplay}}/></Col>
                </Row>
            </div>
        </Container>

        <Container fluid style={{display: endGameTable}}>
            <h1>Ez itt a játék vége!</h1>
            <div style={{border:'2px solid', backgroundColor:"#F9F25C", opacity:0.93, borderRadius:10}}>
                <h2>Győztes: {winner.name}</h2>
                <h3>Játékosok: </h3>
                {gamestate?.onlinePlayers?.map((playerData,key) => <div key={key}> <Player data={playerData}/> </div>)}
                <h2>Leghosszabb megépített út: {winner.longestRoad} egység hosszú volt, amit {winner.name} épített</h2> 
                <br></br>
                <Button variant="success" size="lg" block onClick={() => history.push('/')}>Vissza a főoldalra</Button>

            </div>
        </Container>
    </div>
    );
};
export default Game;
