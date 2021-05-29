import { applyMiddleware, combineReducers, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { createLogger } from "redux-logger";
import thunk from "redux-thunk";

import cardsReducer from "./Reducers/cardsReducer";
import gamedataReducer from "./Reducers/gamedataReducer";
import playerReducer from "./Reducers/playerReducer";
import gamestateReducer from "./Reducers/gamestateReducer";
import clientnameReducer from "./Reducers/clientnameReducer";

const reducers = combineReducers({
    gamestate: gamestateReducer,
    gamedata: gamedataReducer,
    players: playerReducer,
    cards: cardsReducer,
    clientname: clientnameReducer,
});
const logger = createLogger({ collapsed: true  });

export default createStore(reducers, composeWithDevTools(applyMiddleware(thunk, logger)));