import {
    API,
    INIT_LOGIN,
    LANDING_LOGIN,
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAILURE,
    LOGIN_CAP_REQUEST,
    LOGIN_CAP_SUCCESS,
    LOGIN_CAP_FAILURE,
    RESET_LOGIN
} from "./ActionTypes";

import Jwt from "../common/Jwt";

import isEmpty from "lodash/isEmpty";

export const initialLogin = (isLanding) => (dispatch) => {
    const token = Jwt.verify();
    if (token) {
        Jwt.refresh().catch(() => {/* ignore */ });
        return dispatch({
            type: INIT_LOGIN,
            data: token
        });
    } else {
        Jwt.refresh().then((data) => {
            return dispatch({
                type: INIT_LOGIN,
                data
            })
        }).catch(() => {
            /* ignore */
            if (isLanding) {
                dispatch({ type: LANDING_LOGIN });
            }
        });
    }
};

export const login = (formData) => {

    return {
        type: API,
        endpoint: { url: "/oauth/token", method: "POST", body: formData },
        before: ({ dispatch }) => dispatch({ type: LOGIN_REQUEST }),
        error: ({ dispatch, error }) => dispatch({ type: LOGIN_FAILURE, error }),
        success: ({ data, dispatch }) => {
            Jwt.save(data, formData.remember);
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
