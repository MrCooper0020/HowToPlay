import * as DataService from "../DataService";

export const SET_GAMES_DATA = "SET_GAMES_DATA";
const colletion = "Games";

export const getAll = () => async (dispatch, getState) => {
    try {
        let data = [];
        let tempList = [];

        await DataService.getData(colletion).then((res) => {
            data = res;
        });

        data.forEach((item) =>
            tempList.push(Object.assign({}, item.data(), { id: item.id }))
        );
        return dispatch({
            type: SET_GAMES_DATA,
            payload: tempList,
        });
    } catch (error) {
        throw error.message;
    }
};
