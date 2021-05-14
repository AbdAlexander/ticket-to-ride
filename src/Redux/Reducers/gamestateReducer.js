import { ticketToRideData } from "../../Utilities/Data/ticket-to-ride-data";

const initalState = { 
    state: "INITAL", 
    players: {
            player1: {
                name: "Alex",
                points: 0,
                vagons: 0,
                cards: [],
                longDestinations: [],
                normalDestinations: [],
                turns: 0,
                drawCount: 0,
                isSelected: false
            },
            player2: {
                name: "Gabi",
                points: 0,
                vagons: 0,
                cards: [],
                longDestinations: [],
                normalDestinations: [],
                turns: 0,
                drawCount: 0,
                isSelected: false
            }
        }, 
    cards: [], 
    cardsOnTable: [],
    backlog: [],
    gamedata: ticketToRideData,
};

const gamestateReducer = (state = initalState, action) => { 
    let copyState = Object.assign({},state);

    if(action.type === "START_GAME") {
        copyState.state = action.payload?.newGameState;
        copyState.backlog.push("A játék elkezdődött");
        return copyState;

    } else if(action.type === "INIT_GAME") {
        copyState.players = action.payload.players;
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
        for(const player in copyState.players) {
            for(let i=0; i<4; i++) {
                copyState.players[player].cards.push(copyState.cards.cardsStorage.pop());
                copyState.players[player].normalDestinations.push(destinations.pop());
            }
            copyState.players[player].vagons = 45;
            copyState.players[player].longDestinations.push(longDestinations.pop());
        }
        copyState.players.player1.isSelected = true;
        //----------------------------------------------------------------------
        copyState.state = "Alex köre";
        return copyState;
    } else if(action.type === "CHANGE_TO_PLAYER1") {
        copyState.players = action.payload.players;

        copyState.players.player1.isSelected = true;
        copyState.players.player2.isSelected = false;

        return copyState;

    } else if(action.type === "CHANGE_TO_PLAYER2") {
        copyState.players = action.payload.players;

        copyState.players.player1.isSelected = false;
        copyState.players.player2.isSelected = true;

        return copyState;

    } else if(action.type === "GET_CARD_FROM_DECK_TO_PLAYER") {
        copyState = action.payload;
        copyState.actualPlayer.cards.push(copyState.storage.pop()); 
        
        //VÁLTÁS
        return copyState;
    } else if(action.type === "GET_CARD_FROM_TABLE_TO_PLAYER") {
        copyState = action.payload;
        console.log(copyState.backlog);

        for(const card in copyState.cardsOnTable) {
            if(copyState.cardsOnTable[card].image.props.alt === copyState.chosedCard) { //váltás ha 2x húzott
                copyState.state = copyState.players.player1.isSelected ? "Alex köre" : "Gabi köre";
                if(copyState.actualPlayer.drawCount < 2) {
                    if(copyState.chosedCard === "Mozdony" && copyState.actualPlayer.drawCount === 0) {
                        copyState.actualPlayer.cards.push(copyState.cardsOnTable[card]);
                        copyState.cardsOnTable[card] = copyState.storage.pop();
                        copyState.backlog.push(copyState.actualPlayer.name + " húzott egy mozdonyt");

                        copyState.actualPlayer.turns++;
                        copyState.actualPlayer.drawCount = 0;

                        if(copyState.players.player1.isSelected) {
                            copyState.players.player1.isSelected = false;
                            copyState.players.player2.isSelected = true;
                            copyState.state = "Gabi köre";
                        } else {
                            copyState.players.player1.isSelected = true;
                            copyState.players.player2.isSelected = false;
                            copyState.state = "Alex köre";
                        }
                        break;
                    } else if(copyState.chosedCard === "Mozdony" && copyState.actualPlayer.drawCount !== 0) { 
                        alert("Már húztál egy lapot! Nem húzhatsz mozdonyt!");
                        break;
                    } else {
                        copyState.actualPlayer.cards.push(copyState.cardsOnTable[card]);
                        copyState.cardsOnTable[card] = copyState.storage.pop();
                        copyState.backlog.push(copyState.actualPlayer.name + " húzott egy vasútkocsi-kártyát");

                        copyState.actualPlayer.drawCount++;
                        if(copyState.actualPlayer.drawCount === 2) { // Váltás
                            copyState.actualPlayer.turns++;
                            copyState.actualPlayer.drawCount = 0;
                            if(copyState.players.player1.isSelected) {
                                copyState.players.player1.isSelected = false;
                                copyState.players.player2.isSelected = true;
                                copyState.state = "Gabi köre";
                            } else {
                                copyState.players.player1.isSelected = true;
                                copyState.players.player2.isSelected = false;
                                copyState.state = "Alex köre";
                            }
                        }
                        break;
                    }
                }
            }
        }
        console.log(copyState.backlog)
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
    }
    return state;
};

export default gamestateReducer;