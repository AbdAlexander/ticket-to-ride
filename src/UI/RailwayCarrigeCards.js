import { useDispatch, useSelector } from "react-redux";
import { getCardFromDeckToPlayer, getCardFromTableToPlayer, tooManyLocomotives, updateGameState } from "../Redux/Actions/gamestateAction";

const RailwayCarrigeCards = (props) => {
    const dispatch = useDispatch();

    const storage = props.cards;
    const cardsOnTable = props.cardsOnTable;

    const players = useSelector((state) => state.gamestate.onlinePlayers);
    const gamestate = useSelector((state) => state.gamestate);
    const backlog = useSelector((state) => state.gamestate.backlog);
    const clientName = useSelector((state) => state.clientname.name);

    let locomotiveNum = 0;
    for(const card in cardsOnTable) {
        if(cardsOnTable[card].image.props.alt === "Mozdony") {
            locomotiveNum++;
        } 
    }
    if(locomotiveNum >= 3) {
        dispatch(tooManyLocomotives({cardsOnTable, storage}));
    }

    let actualPlayer = gamestate.players.player1;
    for(const playerIndex in players) {
        if(players[playerIndex].name === clientName) {
            actualPlayer = players[playerIndex];
            break;
        }
    }

    const cardsClickHandlerer = (e) => {
        if(!actualPlayer.isSelected) {
            alert("Most nem a te köröd van, így nem húzhatsz kártyát!");
            return;
        }
        if(gamestate.state === `${actualPlayer.name} köre - Építkezési fázis I. (Válaszd ki a szomszédos célt!`
            || gamestate.state === `${actualPlayer.name} köre Építkezési fázis II. (Építés befejezéséhez nyomd meg a gombot)`) {
                alert("Építési fázisban nem lehet kártyát húzni!");
                return;
        }

        if(e.target.alt === "Kártyapakli" && gamestate.state !== "INITAL") {
            dispatch(getCardFromDeckToPlayer({actualPlayer, cardsOnTable, storage, backlog, players}));
        }
        if(e.target.tagName === 'IMG' && gamestate.state !== "INITAL") {
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
            {cardsOnTable.map((c, i) => 
                <p key={i}>
                    <img src={c.image.props.src} style={{width:180, height: 90}} alt={c.image.props.alt}></img>
                </p>)}
            <h6>Vasútkocsik kártyák paklija (<strong>{gamestate?.cards?.cardsStorage?.length}</strong> / 110)</h6>
            <img src="https://static.thenounproject.com/png/219525-200.png" height="90" width="200" alt="Kártyapakli"/>
        </div>
    );
};
export default RailwayCarrigeCards;