import * as DataService from "../DataService";
import * as CommentsAction from "./commentsAction";

export const SET_COMMENT_DATA = "SET_COMMENT_DATA";
export const CLEAR_COMMENT_DATA = "CLEAR_COMMENT_DATA";
const colletion = "Comments";

export const get = (id) => async (dispatch, getState) => {
    try {
        let data = await DataService.getDataWithId(id);

        return dispatch({
            type: SET_COMMENT_DATA,
            payload: Object.assign({}, data.data(), { id: data.id }),
        });
    } catch (error) {
        throw error.message;
    }
};

export const clear = () => async (dispatch, getState) => {
    return dispatch({
        type: CLEAR_COMMENT_DATA,
    });
};

export const save = (data) => async (dispatch, getState) => {
    try {
        await DataService.saveData(colletion, data);

        return dispatch(CommentsAction.getAll());
    } catch (error) {
        throw error.message;
    }
};

export const remove = (id) => async (dispatch, getState) => {
    try {
        await DataService.deleteData(colletion, id);

        return dispatch(CommentsAction.getAll());
    } catch (error) {
        throw error.message;
    }
};
