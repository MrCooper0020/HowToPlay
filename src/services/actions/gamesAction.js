import * as DataService from "../DataService";

export const SET_GAMES_DATA = "SET_GAMES_DATA";
const colletion = "Games";

export const getAll = () => async (dispatch, getState) => {
    try {
        let data = [];

        await DataService.getData(colletion).then((res) => {
            data = res;
        });

        return dispatch({
            type: SET_GAMES_DATA,
            payload: data,
        });
    } catch (error) {
        throw error.message;
    }
};
