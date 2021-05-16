import { ticketToRideData } from "../../Utilities/Data/ticket-to-ride-data";

const initalState = { 
    state: "INITAL", 
    players: {
            player1: {
                name: "Alex",
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
                color: 'green',
                isSelected: false
            },
            player2: {
                name: "Gabi",
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
                color: 'red',
                isSelected: false
            }
        }, 
    cards: [], 
    cardsOnTable: [],
    backlog: [],
    gamedata: ticketToRideData,
    ldPair: [],
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
                const popedCard = copyState.cards.cardsStorage.pop();

                if(popedCard.color === "yellow")          { copyState.players[player].cardsVarrierty.yellow++; }
                else if(popedCard.color === "red")        { copyState.players[player].cardsVarrierty.red++; }
                else if(popedCard.color === "white")      { copyState.players[player].cardsVarrierty.white++; }
                else if(popedCard.color === "purple")     { copyState.players[player].cardsVarrierty.purple++; }
                else if(popedCard.color === "orange")     { copyState.players[player].cardsVarrierty.orange++; }
                else if(popedCard.color === "green")      { copyState.players[player].cardsVarrierty.green++; }
                else if(popedCard.color === "blue")       { copyState.players[player].cardsVarrierty.blue++; }
                else if(popedCard.color === "black")      { copyState.players[player].cardsVarrierty.black++; }
                else if(popedCard.color === "joker")      { copyState.players[player].cardsVarrierty.joker++; }

                copyState.players[player].cards.push(popedCard);
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
        copyState.actualPlayer = action.payload.actualPlayer;
        copyState.storage = action.payload.storage;
        copyState.backlog = action.payload.backlog;
        copyState.players = action.payload.players;

        
        if(copyState.actualPlayer.drawCount < 2) {
            const popedCard = copyState.storage.pop();
            
            if(popedCard.color === "yellow")          { copyState.actualPlayer.cardsVarrierty.yellow++; }
            else if(popedCard.color === "red")        { copyState.actualPlayer.cardsVarrierty.red++; }
            else if(popedCard.color === "white")      { copyState.actualPlayer.cardsVarrierty.white++; }
            else if(popedCard.color === "purple")     { copyState.actualPlayer.cardsVarrierty.purple++; }
            else if(popedCard.color === "orange")     { copyState.actualPlayer.cardsVarrierty.orange++; }
            else if(popedCard.color === "green")      { copyState.actualPlayer.cardsVarrierty.green++; }
            else if(popedCard.color === "blue")       { copyState.actualPlayer.cardsVarrierty.blue++; }
            else if(popedCard.color === "black")      { copyState.actualPlayer.cardsVarrierty.black++; }
            else if(popedCard.color === "joker")      { copyState.actualPlayer.cardsVarrierty.joker++; }
            
            copyState.actualPlayer.cards.push(popedCard); 
            copyState.actualPlayer.drawCount++;
            copyState.backlog.push(copyState.actualPlayer.name + " húzott a pakliból");

            if(copyState.actualPlayer.drawCount === 2) {
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
        }
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
                        copyState.actualPlayer.cardsVarrierty.joker++;
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

                        const popedCard = copyState.cardsOnTable[card];
                        if(popedCard.color === "yellow")          { copyState.actualPlayer.cardsVarrierty.yellow++; }
                        else if(popedCard.color === "red")        { copyState.actualPlayer.cardsVarrierty.red++; }
                        else if(popedCard.color === "white")      { copyState.actualPlayer.cardsVarrierty.white++; }
                        else if(popedCard.color === "purple")     { copyState.actualPlayer.cardsVarrierty.purple++; }
                        else if(popedCard.color === "orange")     { copyState.actualPlayer.cardsVarrierty.orange++; }
                        else if(popedCard.color === "green")      { copyState.actualPlayer.cardsVarrierty.green++; }
                        else if(popedCard.color === "blue")       { copyState.actualPlayer.cardsVarrierty.blue++; }
                        else if(popedCard.color === "black")      { copyState.actualPlayer.cardsVarrierty.black++; }
                        else if(popedCard.color === "joker")      { copyState.actualPlayer.cardsVarrierty.joker++; }

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
        copyState.players = action.payload.players;

        if(copyState.players.player1.isSelected) {
            if(copyState.players.player1.drawCount > 0) { 
                alert("Már húztál egy lapot, nem kezdhetsz neki építkezésnek!");
                return state;
            }
            copyState.state = "Alex köre - Építkezési fázis I. (Válaszd ki a szomszédos célt!)";
        } else {
            if(copyState.players.player1.drawCount > 0) { 
                alert("Már húztál egy lapot, nem kezdhetsz neki építkezésnek!");
                return state;
            }
            copyState.state = "Gabi köre - Építkezési fázis I. (Válaszd ki a szomszédos célt!)";
        }
        return copyState;
    } else if(action.type === "FINISH_BUILDING") {
        copyState.players = action.payload.players;

        if(copyState.players.player1.isSelected) {
            copyState.state = "Alex köre - Építkezési fázis II. (Építés befejezéséhez nyomd meg a gombot)";
        } else {
            copyState.state = "Gabi köre - Építkezési fázis II. (Építés befejezéséhez nyomd meg a gombot)";
        }
        return copyState;
    } else if(action.type === "FINISH_BUILDING_PERIOD") {
        copyState.players = action.payload.players;
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

        if(copyState.players.player1.isSelected) {
            copyState.backlog.push(`Alex sikeresen épített egy utat (+${gotPoints} pont)`);
            copyState.players.player1.turns++;
            copyState.players.player1.doneConnections.push(copyState.connection);
            copyState.players.player1.points += gotPoints;
            copyState.players.player1.vagons -= copyState.neededVagons;
  
            for(const card in copyState.players.player1.cards) {
                if(copyState.players.player1.cards[card].color === copyState.neededColor) {
                    //const index = copyState.players.player1.cards.indexOf(card);
                    //copyState.players.player1.cards.splice(copyState.players.player1.cards[card],1);
                    copyState.players.player1.cards = removeItem(copyState.players.player1.cards, copyState.players.player1.cards[card], copyState.neededVagons);
                }
            }


            copyState.players.player1.isSelected = false;
            copyState.players.player2.isSelected = true;
            copyState.state = "Gabi Köre";
        } else {
            copyState.backlog.push("Gabi sikeresen épített egy utat");
            copyState.players.player2.turns++;
            copyState.players.player2.doneConnections.push(copyState.connection);
            copyState.players.player2.points += gotPoints;
            copyState.players.player2.vagons -= copyState.neededVagons;
  
            for(const card in copyState.players.player2.cards) {
                if(copyState.players.player2.cards[card].color === copyState.neededColor) {
                    //const index = copyState.players.player1.cards.indexOf(card);
                    //copyState.players.player1.cards.splice(copyState.players.player1.cards[card],1);
                    //Itt vanak bajok
                    copyState.players.player2.cards = removeItem(copyState.players.player2.cards, copyState.players.player2.cards[card], copyState.neededVagons);
                }
            }

            copyState.players.player1.isSelected = true;
            copyState.players.player2.isSelected = false;
            copyState.state = "Alex köre";
        }
        return copyState;
    } else if(action.type === "FAILED_BUILD") {
        copyState.backlog = action.payload.backlog;
        copyState.actualPlayer = action.payload.actualPlayer;
        

        copyState.backlog.push(copyState.actualPlayer.name + "(-nak/-nek) nem sikerül megépítenie az utat!");
        copyState.state = `${copyState.actualPlayer.name} köre`;

        return copyState;
    }
    return state;
};

export default gamestateReducer;