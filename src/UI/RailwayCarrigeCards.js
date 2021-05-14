import { useDispatch, useSelector } from "react-redux";
import { getCardFromDeckToPlayer, getCardFromTableToPlayer, tooManyLocomotives } from "../Redux/Actions/gamestateAction";

const RailwayCarrigeCards = (props) => {
    const dispatch = useDispatch();

    const storage = props.cards;
    const cardsOnTable = props.cardsOnTable;

    const players = useSelector((state) => state.players);
    const gamestate = useSelector((state) => state.gamestate);
    const backlog = useSelector((state) => state.gamestate.backlog);

    let locomotiveNum = 0;
    for(const card in cardsOnTable) {
        if(cardsOnTable[card].image.props.alt === "Mozdony") {
            locomotiveNum++;
        } 
    }
    if(locomotiveNum >= 3) {
        dispatch(tooManyLocomotives({cardsOnTable, storage}));
    }



    let actualPlayer = players.player1;
    if(gamestate.state !== "INITAL") {
        actualPlayer = players.player1.isSelected ? players.player1 : players.player2;
    }

    const cardsClickHandlerer = (e) => {

        if(e.target.alt === "Kártyapakli" && gamestate.state !== "INITAL") {
            dispatch(getCardFromDeckToPlayer({actualPlayer, cardsOnTable, storage, backlog}));
        }
        if(e.target.tagName === 'IMG' && gamestate.state !== "INITAL") {
            console.log(e.target.alt);
            for(const card in cardsOnTable) {
                if(cardsOnTable[card].image.props.alt === e.target.alt) {
                    const chosedCard = e.target.alt;
                    dispatch(getCardFromTableToPlayer({actualPlayer, players, cardsOnTable, storage, chosedCard, backlog}));
                    break;
                }
            }
        }
    }

    return (
        <div onClick={cardsClickHandlerer}>
            {cardsOnTable.map((c, i) => <p key={i}>{c.image}</p>)}
            <h6>Vasútkocsik kártyák paklija (<strong>{storage.length}</strong> / 110)</h6>
            <img src="https://static.thenounproject.com/png/219525-200.png" height="90" width="200" alt="Kártyapakli"/>
        </div>
    );
};
export default RailwayCarrigeCards;