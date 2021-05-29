import Card from "../../Classes/Card";
import socket from "../../Utilities/Socket/socket";
import { ticketToRideData } from "../../Utilities/Data/ticket-to-ride-data";

const initalState = { 
    state: "INITAL", 
    players: {
            player1: {
                name: "Player1",
                points: 0,
                vagons: 0,
                cards: [],
                cardsVarrierty: {
                    yellow: 0,
                    red: 0,
                    purple: 0,
                    orange: 0,
                    green: 0,
                    blue: 0,
                    black: 0,
                    white: 0,
                    joker: 0,
                },
                longDestinations: [],
                normalDestinations: [],
                doneConnections: [],
                turns: 0,
                drawCount: 0,
                longestRoad: 0,
                color: 'green',
                isSelected: false
            },
            player2: {
                name: "Player2",
                points: 0,
                vagons: 0,
                cards: [],
                cardsVarrierty: {
                    yellow: 0,
                    red: 0,
                    purple: 0,
                    orange: 0,
                    green: 0,
                    blue: 0,
                    black: 0,
                    white: 0,
                    joker: 0,
                },
                longDestinations: [],
                normalDestinations: [],
                doneConnections: [],
                turns: 0,
                drawCount: 0,
                longestRoad: 0,
                color: 'red',
                isSelected: false
            }
        }, 
    cards: [], 
    cardsOnTable: [],
    backlog: [],
    gamedata: ticketToRideData,
    ldPair: [],
    lastRound: false,
    lastRoundCounter: 2,

    roomSettings: {
        roomID: 0,
        roomSize: 0,
        playersInRoom: [],
        isRoomFull: false,
        gameStarted: false
    },
    onlinePlayers: [],
};

function removeItem(arr, value, times) {
    var index = arr.indexOf(value);
    if (index > -1) {
      arr.splice(index, times);
    }
    return arr;
}

const gamestateReducer = (state = initalState, action) => { 
    let copyState = Object.assign({},state);

    if(action.type === "START_GAME") {
        copyState.state = action.payload?.newGameState;
        copyState.backlog.push("A játék elkezdődött");
        return copyState;

    } else if(action.type === "INIT_GAME") {
        copyState.onlinePlayers = action.payload.onlinePlayers;
        copyState.cards = action.payload.cards;
        copyState.cardsOnTable = action.payload.cardsOnTable;

        //Init and shuffle Destination & Long destionation array from object-----
        const destinations = [];
        const longDestinations = [];
        for(const d in copyState.gamedata.destinations) {
            destinations.push(copyState.gamedata.destinations[d]);
        }
        for(const ld in copyState.gamedata.longDestinations) {
            longDestinations.push(copyState.gamedata.longDestinations[ld]);
        }
        for (let i = destinations.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            const temp = destinations[i];
            destinations[i] = destinations[j];
            destinations[j] = temp;
        }
        for (let i = longDestinations.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            const temp = longDestinations[i];
            longDestinations[i] = longDestinations[j];
            longDestinations[j] = temp;
        }
        //----------------------------------------------------------------------
        
        //Init players----------------------------------------------------------
        for(let i=0; i<5; i++) {
            copyState.cardsOnTable.push(copyState.cards.cardsStorage.pop());
        }
        for(const playerIndex in copyState.onlinePlayers) {
            for(let i=0; i<4; i++) {
                const popedCard = copyState.cards.cardsStorage.pop();

                copyState.onlinePlayers[playerIndex].cards.push(popedCard);
                copyState.onlinePlayers[playerIndex].normalDestinations.push(destinations.pop());
            }
            copyState.onlinePlayers[playerIndex].vagons = 45;
            copyState.onlinePlayers[playerIndex].longDestinations.push(longDestinations.pop());
            copyState.lastRoundCounter = 2;
        }
        copyState.onlinePlayers[0].isSelected = true;
        //----------------------------------------------------------------------
        copyState.state = `${copyState.onlinePlayers[0].name} köre`;
        copyState.roomSettings.gameStarted = true;
        copyState.backlog.push("A játék elkezdődött");


        socket.emit('sync-state', copyState.roomSettings.roomID, copyState, false, (ack) => {})
        return copyState;
    } else if(action.type === "GET_CARD_FROM_DECK_TO_PLAYER") {
        const actualPlayer = action.payload.actualPlayer;
        copyState.storage = action.payload.storage;
        copyState.backlog = action.payload.backlog;
        copyState.onlinePlayers = action.payload.players;

        
        if(actualPlayer.drawCount < 2) {
            const popedCard = copyState.storage.pop();
            
            actualPlayer.cards.push(popedCard); 
            actualPlayer.drawCount++;
            copyState.backlog.push(actualPlayer.name + " húzott a pakliból");
            for(const playerIndex in copyState.onlinePlayers) {
                if(actualPlayer.name === copyState.onlinePlayers[playerIndex].name) {
                    copyState.onlinePlayers[playerIndex] = actualPlayer;
                    break;
                }
            }

            if(actualPlayer.drawCount === 2) {
                actualPlayer.turns++;
                actualPlayer.drawCount = 0;
                actualPlayer.isSelected = false;

                for(let playerIndex in copyState.onlinePlayers) {
                    if(actualPlayer.name === copyState.onlinePlayers[playerIndex].name) {
                        copyState.onlinePlayers[playerIndex] = actualPlayer;

                        let nextPlayer = ++playerIndex;
                        if(parseInt(nextPlayer) >= copyState.onlinePlayers.length) {
                            nextPlayer = 0;
                        }
                        copyState.onlinePlayers[nextPlayer].isSelected = true;
                        copyState.state = `${copyState.onlinePlayers[nextPlayer].name} köre`;
                        if(copyState.lastRound) copyState.lastRoundCounter--;
                        break;
                    }
                }
            }
        }
        socket.emit('sync-state', copyState.roomSettings.roomID, copyState, false, (ack) => {})
        return copyState;
    } else if(action.type === "GET_CARD_FROM_TABLE_TO_PLAYER") {
        const actualPlayer = action.payload.actualPlayer;
        copyState.cardsOnTable = action.payload.cardsOnTable;
        copyState.players = action.payload.players;
        copyState.storage = action.payload.storage;
        copyState.chosedCard = action.payload.chosedCard;
        copyState.backlog = action.payload.backlog;
        
        for(const card in copyState.cardsOnTable) {
            if(copyState.cardsOnTable[card].image.props.alt === copyState.chosedCard) { //váltás ha 2x húzott
                //copyState.state = copyState.players.player1.isSelected ? "Alex köre" : "Gabi köre";
                if(actualPlayer.drawCount < 2) {
                    if(copyState.chosedCard === "Mozdony" && actualPlayer.drawCount === 0) {
                        actualPlayer.cards.push(copyState.cardsOnTable[card]);
                        copyState.cardsOnTable[card] = copyState.storage.pop();
                        copyState.backlog.push(actualPlayer.name + " húzott egy mozdonyt");

                        actualPlayer.turns++;
                        actualPlayer.drawCount = 0;
                        actualPlayer.isSelected = false;

                        for(let playerIndex in copyState.onlinePlayers) {
                            if(actualPlayer.name === copyState.onlinePlayers[playerIndex].name) {
                                copyState.onlinePlayers[playerIndex] = actualPlayer;

                                let nextPlayer = ++playerIndex;
                                if(parseInt(nextPlayer) >= copyState.onlinePlayers.length) {
                                    nextPlayer = 0;
                                }
                                copyState.onlinePlayers[nextPlayer].isSelected = true;
                                copyState.state = `${copyState.onlinePlayers[nextPlayer].name} köre`;
                                if(copyState.lastRound) copyState.lastRoundCounter--;
                                break;
                            }
                        }
                        break;
                    } else if(copyState.chosedCard === "Mozdony" && actualPlayer.drawCount !== 0) { 
                        alert("Már húztál egy lapot! Nem húzhatsz mozdonyt!");
                        break;
                    } else {
                        actualPlayer.cards.push(copyState.cardsOnTable[card]);
                        copyState.cardsOnTable[card] = copyState.storage.pop();
                        copyState.backlog.push(actualPlayer.name + " húzott egy vasútkocsi-kártyát");

                        actualPlayer.drawCount++;
                        if(actualPlayer.drawCount === 2) { // Váltás
                            actualPlayer.turns++;
                            actualPlayer.drawCount = 0;
                            actualPlayer.isSelected = false;

                            for(let playerIndex in copyState.onlinePlayers) {
                                if(actualPlayer.name === copyState.onlinePlayers[playerIndex].name) {
                                    copyState.onlinePlayers[playerIndex] = actualPlayer;
    
                                    let nextPlayer = ++playerIndex;
                                    if(parseInt(nextPlayer) >= copyState.onlinePlayers.length) {
                                        nextPlayer = 0;
                                    }
                                    copyState.onlinePlayers[nextPlayer].isSelected = true;
                                    copyState.state = `${copyState.onlinePlayers[nextPlayer].name} köre`;
                                    if(copyState.lastRound) copyState.lastRoundCounter--;
                                    break;
                                }
                            }
                        }
                        break;
                    }
                }
            }
        }
        socket.emit('sync-state', copyState.roomSettings.roomID, copyState, false, (ack) => {})
        return copyState;
    } else if(action.type === "TOO_MANY_LOCOMOTIVES") {
        copyState.storage = action.payload.storage;
        copyState.cardsOnTable = action.payload.cardsOnTable;
        copyState.backlog.push("Kártyacsere történt, mivel 3 mozdony volt az asztalon");

        for(let i=0; i<5; i++) {
            copyState.storage.push(copyState.cardsOnTable.pop());
        }
        for (let i = copyState.storage.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            const temp = copyState.storage[i];
            copyState.storage[i] = copyState.storage[j];
            copyState.storage[j] = temp;
        }
        for(let i=0; i<5; i++) {
            copyState.cardsOnTable.push(copyState.storage.pop());
        }

        return copyState;
    } else if(action.type === "DESTINATION_MOUSE_ENTER") {
        copyState.ld = action.payload.dest;
        copyState.ldPair = [];
        copyState.ldPair.push(copyState.ld?.from);
        copyState.ldPair.push(copyState.ld?.to);
        return copyState;
    } else if(action.type === "DESTINATION_MOUSE_LEAVE") {
        copyState.ldPair = [];
        return copyState;
    } else if(action.type === "START_BUILDING") {
        const actualPlayer = action.payload.actualPlayer;
        
        if(actualPlayer.isSelected) {
            if(actualPlayer.drawCount > 0) {
                alert("Már húztál egy lapot, nem kezdhetsz neki építkezésnek!");
                return copyState;
            }
            copyState.state = `${actualPlayer.name} köre - Építkezési fázis I. (Válaszd ki a szomszédos célt!)`;
        }
        socket.emit('sync-state', copyState.roomSettings.roomID, copyState, false, (ack) => {})
        return copyState;
    } else if(action.type === "FINISH_BUILDING") {
        const actualPlayer = action.payload.actualPlayer;

        if(actualPlayer.isSelected) {
            copyState.state = `${actualPlayer.name} köre - Építkezési fázis II. (Építés befejezéséhez nyomd meg a gombot)`;
        }
        socket.emit('sync-state', copyState.roomSettings.roomID, copyState, false, (ack) => {})
        return copyState;
    } else if(action.type === "FINISH_BUILDING_PERIOD") {
        const actualPlayer = action.payload.actualPlayer;
        copyState.onlinePlayers = action.payload.players;
        copyState.backlog = action.payload.backlog;
        copyState.connection = action.payload.TMPtotalConnectionsFromCity;
        copyState.neededColor = action.payload.neededColor;
        copyState.neededVagons = action.payload.neededVagons;
        copyState.neededLocomotives = action.payload.neededLocomotives;
        copyState.gamedata = action.payload.gamedata;

        for(const c in copyState.gamedata.connections) {
            if(copyState.connection[0] === copyState.gamedata.connections[c]) {
                copyState.gamedata.connections[c].done = true;
                break;
            }
        }

        let gotPoints;
        if(copyState.neededVagons === 1) gotPoints = 1;
        else if(copyState.neededVagons === 2) gotPoints = 2;
        else if(copyState.neededVagons === 3) gotPoints = 4;
        else if(copyState.neededVagons === 4) gotPoints = 7;
        else if(copyState.neededVagons === 6) gotPoints = 15;
        else if(copyState.neededVagons === 7) gotPoints = 21;
        else if(copyState.neededVagons >= 8) gotPoints = 15+copyState.neededVagons;

        console.log(actualPlayer);
        if(actualPlayer.isSelected) {
            copyState.backlog.push(`${actualPlayer.name} sikeresen épített egy utat (+${gotPoints} pont)`);
            actualPlayer.turns++;
            actualPlayer.doneConnections.push(copyState.connection);
            actualPlayer.points += gotPoints;
            actualPlayer.vagons -= copyState.neededVagons;

            for(const card in actualPlayer.cards) { // Elhasznált kártyák kivétele
                if(actualPlayer.cards[card].color === copyState.neededColor) {
                    actualPlayer.cards = removeItem(actualPlayer.cards, actualPlayer.cards[card], copyState.neededVagons);
                    break;
                }
            }
            if(copyState.neededLocomotives > 0) { // Mozdonyok kitörlése
                for(const card in actualPlayer.cards) {
                    if(actualPlayer.cards[card].color === "joker") {
                        actualPlayer.cards = removeItem(actualPlayer.cards, actualPlayer.cards[card], copyState.neededLocomotives);
                        break;
                    }
                }
            }
            if(actualPlayer.longestRoad < copyState.neededVagons)   actualPlayer.longestRoad = copyState.neededVagons;
            if(actualPlayer.vagons <= 2)                            copyState.lastRound = true;

            actualPlayer.isSelected = false;
            for(let playerIndex in copyState.onlinePlayers) {
                if(actualPlayer.name === copyState.onlinePlayers[playerIndex].name) {
                    copyState.onlinePlayers[playerIndex] = actualPlayer;

                    let nextPlayer = ++playerIndex;
                    if(parseInt(nextPlayer) >= copyState.onlinePlayers.length) {
                        nextPlayer = 0;
                    }
                    copyState.onlinePlayers[nextPlayer].isSelected = true;
                    copyState.state = `${copyState.onlinePlayers[nextPlayer].name} köre`;
                    if(copyState.lastRound) copyState.lastRoundCounter--;
                    break;
                }
            }
        }
        if(copyState.lastRound) copyState.lastRoundCounter--;

        socket.emit('sync-state', copyState.roomSettings.roomID, copyState, false, (ack) => {})
        return copyState;
    } else if(action.type === "FAILED_BUILD") {
        copyState.backlog = action.payload.backlog;
        const actualPlayer = action.payload.actualPlayer;
        

        copyState.backlog.push(actualPlayer.name + "(-nak/-nek) nem sikerült megépítenie az utat!");
        copyState.state = `${actualPlayer.name} köre`;

        socket.emit('sync-state', copyState.roomSettings.roomID, copyState, false, (ack) => {})
        return copyState;
    } else if(action.type === "CHANGE_LOCOMOTIVE_TO_RAILWAY_CARRIGE_CARD") {
        const actualPlayer = action.payload.actualPlayer;
        copyState.color = action.payload.color;
        copyState.answer = action.payload.answer;

        for(const card in actualPlayer.cards) {
            if(actualPlayer.cards[card].color === "joker") {
                actualPlayer.cards = removeItem(actualPlayer.cards, actualPlayer.cards[card], copyState.answer);
                break;
            }
        }
        let type;
        if(copyState.color==="yellow") type = 0;
        else if(copyState.color==="red") type = 1;
        else if(copyState.color==="white") type = 2;
        else if(copyState.color==="purple") type = 3;
        else if(copyState.color==="orange") type = 4;
        else if(copyState.color==="green") type = 5;
        else if(copyState.color==="blue") type = 6;
        else if(copyState.color==="black") type = 7;

        for(let i=0; i<copyState.answer; i++) {
            actualPlayer.cards.push(new Card(type));
        }
        for(let playerIndex in copyState.onlinePlayers) {
            if(actualPlayer.name === copyState.onlinePlayers[playerIndex].name) {
                copyState.onlinePlayers[playerIndex] = actualPlayer;
                break;
            }
        }
        socket.emit('sync-state', copyState.roomSettings.roomID, copyState, false, (ack) => {})
        return copyState;
    } else if(action.type === "LAST_ROUND") {
        copyState.gamestate = action.payload.gamestate;
        copyState.gamestate.state = "UTOLSÓ KÖR KÖVETKEZIK";

        socket.emit('sync-state', copyState.roomSettings.roomID, copyState, false, (ack) => {})
        return copyState;
    } else if(action.type === "CREATE_ROOM") {
        copyState.roomSettings.roomID = action.payload.roomid;
        copyState.roomSettings.roomSize = action.payload.roomSize;
        copyState.roomSettings.playersInRoom.push(action.payload.name);

        socket.emit('sync-state', copyState.roomSettings.roomID, copyState, true, (ack) => {})
        return copyState;
    } else if(action.type === "JOIN_ROOM") {
        copyState.roomSettings = action.payload.syncRoomInfo;
        copyState.roomSettings.playersInRoom.push(action.payload.name);

        socket.emit('sync-state', copyState.roomSettings.roomID, copyState, true, (ack) => {})
        return copyState;
    } else if(action.type === "START_GAME_FROM_ROOM") {
        copyState.roomSettings = action.payload.syncRoomInfo;
        copyState.roomSettings.isRoomFull = true;
        
        const colors = ['red','green','yellow','black','blue'];
        for(const playerIndex in copyState.roomSettings.playersInRoom) {
            const player = {
                name: copyState.roomSettings.playersInRoom[playerIndex],
                points: 0,
                vagons: 0,
                cards: [],
                longDestinations: [],
                normalDestinations: [],
                doneConnections: [],
                turns: 0,
                drawCount: 0,
                longestRoad: 0,
                color: colors[playerIndex],
                isSelected: false
            }
            copyState.onlinePlayers.push(player);
        }
        socket.emit('sync-state', copyState.roomSettings.roomID, copyState, false, (ack) => {})
        return copyState;
    } else if(action.type === "UPDATE_GAME_STATE") {
        copyState = action.payload.syncState;
        return copyState;
    }
    return state;
};

export default gamestateReducer;