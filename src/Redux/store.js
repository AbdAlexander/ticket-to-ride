import { applyMiddleware, combineReducers, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { createLogger } from "redux-logger";
import thunk from "redux-thunk";
import testReducer from "./Reducers/testReducer";

const reducers = combineReducers({
    test: testReducer
});
const logger = createLogger({ collapsed: true  });

export default createStore(reducers, composeWithDevTools(applyMiddleware(thunk, logger)));