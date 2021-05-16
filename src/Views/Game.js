import { useEffect, useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import {useDispatch, useSelector, useStore } from "react-redux";
import { Link } from "react-router-dom";
import { changeToPlayer1, changeToPlayer2, initGame, startGame, lastRound } from "../Redux/Actions/gamestateAction";
import Backlog from "../UI/Backlog";
import DestinationCards from "../UI/DestinitionCards";
import GameTable from "../UI/GameTable";
import Player from "../UI/Player";
import PlayerHand from "../UI/PlayerHand";
import RailwayCarrigeCards from "../UI/RailwayCarrigeCards";


const Game = () => {
    const store = useStore();
    const dispatch = useDispatch();
    
    const players = useSelector((state) => state.players);
    const gameData = useSelector((state) => state.gamedata);
    const cards = useSelector((state) => state.cards);
    const gamestate = useSelector((state) => state.gamestate);

    const [display,setDisplay] = useState('block');
    const [endGameDisplay,setEndGameDisplay] = useState('block');
    const [endGameTable,setEndGameTable] = useState('none');
    const [stopper, setStopper] = useState(true);

    useEffect(() => {
        if(gamestate) {
            console.log("Last Round Counter: ", gamestate.lastRoundCounter , " boolean: ", gamestate.lastRound);
            if(gamestate.lastRoundCounter <= 0) {
                console.log("Itt a játék vége!!");
                setEndGameDisplay('none');
                setEndGameTable('block');
            }
            if(gamestate.lastRound && stopper) {
                dispatch(lastRound({gamestate}));
                setStopper(false);
            }
        }
    }, [store, gamestate, stopper]);
    
    

    const cardsOnTable = [];
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
        <div>
        <Container fluid style={{display: endGameDisplay}}>
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
                    <Col> <RailwayCarrigeCards cards={cards.cardsStorage} cardsOnTable={gamestate.cardsOnTable} players={players} style={{display: endGameDisplay}}/> </Col>
                </Row>
                
                <Row>
                    <Col> <Backlog/> </Col>
                    <Col> <PlayerHand style={{display: endGameDisplay}} /> </Col>
                    <Col><DestinationCards style={{display: endGameDisplay}}/></Col>
                </Row>
            </div>
        </Container>

        <Container fluid style={{display: endGameTable}}>
            <h1>Ez itt a játék vége!</h1>
            <div style={{border:'2px solid', backgroundColor:"#F9F25C"}}>
                <h2>Győztes: {players?.player1?.points > players?.player2?.points ? players?.player1?.name : players?.player2?.name}</h2>
                <h3>Játékosok: </h3>
                <Player data={players?.player1}/>
                <Player data={players?.player2}/>
                <h2>Leghosszabb megépített út: {players.player1?.longestRoad > players.player2?.longestRoad ? players.player2?.longestRoad : players.player2?.longestRoad} egység hosszú volt, amit {players.player1.longestRoad > players.player2.longestRoad ? players.player1.name : players.player2.name} épített</h2> 
                <br></br>
                <h4>{players.player1.name} céljai</h4>
                <ol>
                   <li style={{color: players.player1.longDestinations[0]?.done ? "green" : "red"}}>Hosszú: {players.player1.longDestinations[0]?.fromCity} - {players.player1.longDestinations[0]?.toCity}</li>
                   {players.player1?.normalDestinations?.map((d,i) =>
                        <li key={i} style={{color: players.player1.longDestinations[0]?.done ? "green" : "red"}}>
                            Rövid: {d?.fromCity} - {d?.toCity}
                        </li>)
                    }
                </ol>
                <h4>{players.player2.name} céljai</h4>
                <ol>
                   <li style={{color: players.player2.longDestinations[0]?.done ? "green" : "red"}}>Hosszú: {players.player2.longDestinations[0]?.fromCity} - {players.player2.longDestinations[0]?.toCity}</li>
                   {players.player2.normalDestinations?.map((d,i) =>
                        <li key={i} style={{color: players.player2.longDestinations[0]?.done ? "green" : "red"}}>
                            Rövid: {d?.fromCity} - {d?.toCity}
                        </li>)
                    }
                </ol>
                <Link to="/" className="btn btn-primary" onClick={() => window.location.reload(false)}>Új játék indítása</Link>

            </div>
        </Container>
        </div>
    );
};
export default Game;
