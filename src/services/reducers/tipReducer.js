import * as TipAction from "../actions/tipAction";

const initialState = {};

export default function tip(state = initialState, action) {
    switch (action.type) {
        case TipAction.SET_TIP_DATA: {
            return {
                ...action.payload,
            };
        }
        case TipAction.CLEAR_TIP_DATA: {
            return {};
        }
        default: {
            return state;
        }
    }
}
