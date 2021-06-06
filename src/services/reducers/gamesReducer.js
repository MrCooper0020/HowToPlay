import * as Actions from "../actions";

const initialState = [];

export default function games(state = initialState, action) {
    switch (action.type) {
        case Actions.SET_GAMES_DATA: {
            return [...initialState, ...action.payload];
        }
        default: {
            return state;
        }
    }
}
