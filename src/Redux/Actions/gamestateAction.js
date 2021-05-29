export const startGame = (newGameState) => ({
    type: 'START_GAME',
    payload: {
        newGameState
    },
});
export const initGame = ({onlinePlayers, cards, cardsOnTable}) => ({
    type: 'INIT_GAME',
    payload: {onlinePlayers: onlinePlayers, cards: cards, cardsOnTable: cardsOnTable}
    
});
export const changeToPlayer1 = ({players}) => ({
    type: 'CHANGE_TO_PLAYER1',
    payload: {players: players}
});
export const changeToPlayer2 = ({players}) => ({
    type: 'CHANGE_TO_PLAYER2',
    payload: {players: players}
});
export const getCardFromDeckToPlayer = ({actualPlayer, cardsOnTable, storage, backlog, players}) => ({
    type: 'GET_CARD_FROM_DECK_TO_PLAYER',
    payload: {actualPlayer: actualPlayer, cardsOnTable: cardsOnTable, storage:storage, backlog:backlog, players:players}
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
export const startBuilding = ({actualPlayer}) => ({
    type: 'START_BUILDING',
    payload: {actualPlayer:actualPlayer}
});
export const finishBuilding = ({actualPlayer}) => ({
    type: 'FINISH_BUILDING',
    payload: {actualPlayer:actualPlayer}
});
export const finishBuildingPeriod = ({players, actualPlayer, backlog, TMPtotalConnectionsFromCity, neededColor, neededVagons, neededLocomotives, gamedata}) => ({
    type: 'FINISH_BUILDING_PERIOD',
    payload: {
        players:players, 
        actualPlayer:actualPlayer,
        backlog: backlog, 
        TMPtotalConnectionsFromCity:TMPtotalConnectionsFromCity, 
        neededColor:neededColor, 
        neededVagons:neededVagons, 
        neededLocomotives:neededLocomotives,
        gamedata:gamedata
    }
});
export const failedBuild = ({backlog, actualPlayer}) => ({
    type: 'FAILED_BUILD',
    payload: {backlog: backlog, actualPlayer: actualPlayer}
});

export const changeLocomotiveToRailwayCarrigeCard = ({color,actualPlayer,answer}) => ({
    type: 'CHANGE_LOCOMOTIVE_TO_RAILWAY_CARRIGE_CARD',
    payload: {color:color, actualPlayer:actualPlayer, answer:answer}
});

export const lastRound = ({gamestate}) => ({
    type: 'LAST_ROUND',
    payload: {gamestate:gamestate}
});
export const createRoom = ({roomid, roomSize, name}) => ({
    type: 'CREATE_ROOM',
    payload: {roomid: roomid, roomSize: roomSize, name: name}
});
export const joinRoom = ({syncRoomInfo, name}) => ({
    type: 'JOIN_ROOM',
    payload: {syncRoomInfo: syncRoomInfo, name:name}
});
export const startGameFromRoom = ({syncRoomInfo}) => ({
    type: 'START_GAME_FROM_ROOM',
    payload: {syncRoomInfo:syncRoomInfo}
})
export const updateGameState = ({syncState}) => ({
    type: 'UPDATE_GAME_STATE',
    payload: {syncState:syncState}
})

