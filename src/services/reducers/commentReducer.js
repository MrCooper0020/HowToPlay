import * as CommentAction from "../actions/commentAction";

const initialState = {};

export default function comment(state = initialState, action) {
    switch (action.type) {
        case CommentAction.SET_COMMENT_DATA: {
            return {
                ...action.payload,
            };
        }
        case CommentAction.CLEAR_COMMENT_DATA: {
            return {};
        }
        default: {
            return state;
        }
    }
}
