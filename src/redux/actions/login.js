import {
    API,
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAILURE,
    LOGIN_CAP_REQUEST,
    LOGIN_CAP_SUCCESS,
    LOGIN_CAP_FAILURE,
    RESET_LOGIN
} from "./ActionTypes";

import isEmpty from "lodash/isEmpty";

export const login = (formData) => {

    return {
        type: API,
        endpoint: { url: "/oauth/token", method: "POST", body: formData },
        before: ({ dispatch }) => dispatch({ type: LOGIN_REQUEST }),
        error: ({ dispatch, error }) => dispatch({ type: LOGIN_FAILURE, error }),
        success: ({ data, dispatch }) => {
            dispatch({
                data,
                type: LOGIN_SUCCESS
            });
        }
    };
};

export const resetLogin = () => ({
    type: RESET_LOGIN
});

export const obtainCaptcha = (mobile) => {
    const identity = mobile;
    const category = "mobile";
    return {
        type: API,
        endpoint: { url: `/api/captchas/login/${identity}`, method: "POST" },
        before: ({ dispatch }) => dispatch({ type: LOGIN_CAP_REQUEST, category, identity }),
        error: ({ dispatch, error }) => dispatch({ type: LOGIN_CAP_FAILURE, category, identity, error }),
        success: ({ dispatch }) => dispatch({
            category,
            identity,
            type: LOGIN_CAP_SUCCESS
        })
    };
};
