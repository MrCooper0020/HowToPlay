import * as UserAction from "../actions/userAction";

const initialState = {};

export default function user(state = initialState, action) {
    switch (action.type) {
        case UserAction.SET_USER_DATA: {
            return {
                ...action.payload,
            };
        }
        case UserAction.CLEAR_USER_DATA: {
            return {};
        }
        default: {
            return state;
        }
    }
}
