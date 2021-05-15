export const startGame = (newGameState) => ({
    type: 'START_GAME',
    payload: {
        newGameState
    },
});
export const initGame = ({players, cards, cardsOnTable}) => ({
    type: 'INIT_GAME',
    payload: {players: players, cards: cards, cardsOnTable: cardsOnTable}
    
});
export const changeToPlayer1 = ({players}) => ({
    type: 'CHANGE_TO_PLAYER1',
    payload: {players: players}
});
export const changeToPlayer2 = ({players}) => ({
    type: 'CHANGE_TO_PLAYER2',
    payload: {players: players}
});
export const getCardFromDeckToPlayer = ({actualPlayer, cardsOnTable, storage, backlog}) => ({
    type: 'GET_CARD_FROM_DECK_TO_PLAYER',
    payload: {actualPlayer: actualPlayer, cardsOnTable: cardsOnTable, storage:storage, backlog:backlog}
});
export const getCardFromTableToPlayer = ({actualPlayer, players, cardsOnTable, storage, chosedCard, backlog}) => ({
    type: 'GET_CARD_FROM_TABLE_TO_PLAYER',
    payload: {actualPlayer: actualPlayer, players:players, cardsOnTable: cardsOnTable, storage:storage, chosedCard:chosedCard, backlog:backlog}
});
export const tooManyLocomotives = ({cardsOnTable, storage}) => ({
    type: 'TOO_MANY_LOCOMOTIVES',
    payload: {cardsOnTable: cardsOnTable, storage: storage}
});
export const destinationMouseEnter = ({dest}) => ({
    type: 'DESTINATION_MOUSE_ENTER',
    payload: {dest: dest}
});
export const destinationMouseLeave = () => ({
    type: 'DESTINATION_MOUSE_LEAVE',
    payload: {}
});