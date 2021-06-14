import * as DataService from "../DataService";

export const SET_COMMENTS_DATA = "SET_COMMENTS_DATA";
const colletion = "Comments";

export const getAll = () => async (dispatch, getState) => {
    try {
        let data = [];

        await DataService.getData(colletion).then((res) => {
            data = res;
        });

        return dispatch({
            type: SET_COMMENTS_DATA,
            payload: data,
        });
    } catch (error) {
        throw error.message;
    }
};
