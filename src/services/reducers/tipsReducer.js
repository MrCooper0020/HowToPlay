import * as TipsAction from "../actions/tipsAction";

const initialState = [];

export default function tips(state = initialState, action) {
    switch (action.type) {
        case TipsAction.SET_TIPS_DATA: {
            return [...initialState, ...action.payload];
        }
        default: {
            return state;
        }
    }
}
