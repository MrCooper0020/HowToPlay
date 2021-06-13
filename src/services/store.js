import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import login from "./reducers/loginReducer";
import games from "./reducers/gamesReducer";
import game from "./reducers/gameReducer";

const rootReducer = combineReducers({
    login,
    games,
    game,
});

const store = createStore(rootReducer, applyMiddleware(thunk));
export default store;