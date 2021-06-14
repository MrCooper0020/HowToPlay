import * as UsersAction from "../actions/usersAction";

const initialState = [];

export default function users(state = initialState, action) {
    switch (action.type) {
        case UsersAction.SET_USERS_DATA: {
            return [...initialState, ...action.payload];
        }
        default: {
            return state;
        }
    }
}
