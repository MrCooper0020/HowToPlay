import * as LoginService from "../LoginService";

export const SET_LOGIN_DATA = "SET_LOGIN_DATA";
export const CLEAR_LOGIN_DATA = "CLEAR_LOGIN_DATA";

export const login = (email, password) => async (dispatch, getState) => {
    try {
        await LoginService.login(email, password);
        const user = {
            email,
        };
        return dispatch({
            type: SET_LOGIN_DATA,
            payload: user,
        });
    } catch (error) {
        throw error.message;
    }
};

export const signOut = () => async (dispatch, getState) => {
    return dispatch({
        type: CLEAR_LOGIN_DATA,
    });
};

export const createAccount =
    (email, password) => async (dispatch, getState) => {
        try {
            await LoginService.createAccount(email, password);
        } catch (error) {
            throw error;
        }
    };
