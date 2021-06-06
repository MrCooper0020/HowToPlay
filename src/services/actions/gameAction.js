import * as DataService from "../DataService";
import * as GamesAction from "./gamesAction";

export const SET_GAME_DATA = "SET_GAME_DATA";
export const CLEAR_GAME_DATA = "CLEAR_GAME_DATA";
const colletion = "Games";

export const get = (id) => async (dispatch, getState) => {
    try {
        let data = await DataService.getDataWithId(id);

        return dispatch({
            type: SET_GAME_DATA,
            payload: Object.assign({}, data.data(), { id: data.id }),
        });
    } catch (error) {
        throw error.message;
    }
};

export const clear = () => async (dispatch, getState) => {
    return dispatch({
        type: CLEAR_GAME_DATA,
    });
};

export const save = (data) => async (dispatch, getState) => {
    try {
        await DataService.saveData(colletion, data);

        return dispatch(GamesAction.getAll());
    } catch (error) {
        throw error.message;
    }
};

export const remove = (id) => async (dispatch, getState) => {
    try {
        await DataService.deleteData(colletion, id);

        return dispatch(GamesAction.getAll());
    } catch (error) {
        throw error.message;
    }
};
