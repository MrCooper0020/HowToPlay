import * as DataService from "../DataService";
import * as UsersAction from "./usersAction";

export const SET_USER_DATA = "SET_USER_DATA";
export const CLEAR_USER_DATA = "CLEAR_USER_DATA";
const colletion = "UserDetails";

export const get = (id) => async (dispatch, getState) => {
    try {
        let data = await DataService.getDataWithId(id);

        return dispatch({
            type: SET_USER_DATA,
            payload: Object.assign({}, data.data(), { id: data.id }),
        });
    } catch (error) {
        throw error.message;
    }
};

export const clear = () => async (dispatch, getState) => {
    return dispatch({
        type: CLEAR_USER_DATA,
    });
};

export const save = (data) => async (dispatch, getState) => {
    try {
        await DataService.saveData(colletion, data);

        return dispatch(UsersAction.getAll());
    } catch (error) {
        throw error.message;
    }
};

export const remove = (id) => async (dispatch, getState) => {
    try {
        await DataService.deleteData(colletion, id);

        return dispatch(UsersAction.getAll());
    } catch (error) {
        throw error.message;
    }
};
