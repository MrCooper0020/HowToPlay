import * as DataService from "../DataService";

export const SET_TIPS_DATA = "SET_TIPS_DATA";
const colletion = "Tips";

export const getAll = () => async (dispatch, getState) => {
    try {
        let data = [];

        await DataService.getData(colletion).then((res) => {
            data = res;
        });

        return dispatch({
            type: SET_TIPS_DATA,
            payload: data,
        });
    } catch (error) {
        throw error.message;
    }
};
