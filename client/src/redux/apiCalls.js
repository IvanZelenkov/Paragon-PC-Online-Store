import { publicRequest } from "../requestMethods.js";
import { loginStart, loginSuccess, loginFailure, registerStart, registerSuccess, registerFailure } from "./userSlice.js";

export const login = async (dispatch, user) => {
    dispatch(loginStart());
    try {
        const response = await publicRequest.post('/auth/login', user);
        dispatch(loginSuccess(response.data));
    } catch (error) {
        dispatch(loginFailure());
    }
};

export const register = async (dispatch, user) => {
    dispatch(registerStart());
    try {
        const response = await publicRequest.post('/auth/register', user);
        dispatch(registerSuccess(response.data));
    } catch (error) {
        dispatch(registerFailure());
    }
};