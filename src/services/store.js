import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import login from "./reducers/loginReducer";
import games from "./reducers/gamesReducer";
import game from "./reducers/gameReducer";
import comments from "./reducers/commentsReducer";
import tips from "./reducers/tipsReducer";
import comment from "./reducers/commentReducer";
import tip from "./reducers/tipReducer";
import users from "./reducers/usersReducer";
import user from "./reducers/userReducer";

const rootReducer = combineReducers({
    login,
    games,
    game,
    comments,
    tips,
    comment,
    tip,
    users,
    user,
});

const store = createStore(rootReducer, applyMiddleware(thunk));
export default store;
