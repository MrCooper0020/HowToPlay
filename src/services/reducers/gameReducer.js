import * as Actions from "../actions";

const initialState = {};

export default function game(state = initialState, action) {
    switch (action.type) {
        case Actions.SET_GAME_DATA: {
            return {
                ...action.payload,
            };
        }
        case Actions.CLEAR_GAME_DATA: {
            return {};
        }
        default: {
            return state;
        }
    }
}
