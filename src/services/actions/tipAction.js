import * as DataService from "../DataService";
import * as tipsAction from "./tipsAction";

export const SET_TIP_DATA = "SET_TIP_DATA";
export const CLEAR_TIP_DATA = "CLEAR_TIP_DATA";
const colletion = "Tips";

export const get = (id) => async (dispatch, getState) => {
    try {
        let data = await DataService.getDataWithId(id);

        return dispatch({
            type: SET_TIP_DATA,
            payload: Object.assign({}, data.data(), { id: data.id }),
        });
    } catch (error) {
        throw error.message;
    }
};

export const clear = () => async (dispatch, getState) => {
    return dispatch({
        type: CLEAR_TIP_DATA,
    });
};

export const save = (data) => async (dispatch, getState) => {
    try {
        await DataService.saveData(colletion, data);

        return dispatch(tipsAction.getAll());
    } catch (error) {
        throw error.message;
    }
};

export const remove = (id) => async (dispatch, getState) => {
    try {
        await DataService.deleteData(colletion, id);

        return dispatch(tipsAction.getAll());
    } catch (error) {
        throw error.message;
    }
};
