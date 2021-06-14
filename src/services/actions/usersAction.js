import * as DataService from "../DataService";

export const SET_USERS_DATA = "SET_USERS_DATA";
const colletion = "UserDetails";

export const getAll = () => async (dispatch, getState) => {
    try {
        let data = [];

        await DataService.getData(colletion).then((res) => {
            data = res;
        });

        return dispatch({
            type: SET_USERS_DATA,
            payload: data,
        });
    } catch (error) {
        throw error.message;
    }
};
