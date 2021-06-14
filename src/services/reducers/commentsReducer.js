import * as CommentsAction from "../actions/commentsAction";

const initialState = [];

export default function comments(state = initialState, action) {
    switch (action.type) {
        case CommentsAction.SET_COMMENTS_DATA: {
            return [...initialState, ...action.payload];
        }
        default: {
            return state;
        }
    }
}
