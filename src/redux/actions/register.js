import {
    API,
    SUBMIT_REG_REQUEST,
    SUBMIT_REG_SUCCESS,
    SUBMIT_REG_FAILURE,
    VALIDATE_REQUEST,
    VALIDATE_SUCCESS,
    VALIDATE_FAILURE,
    GET_CAP_SUCCESS,
    GET_CAP_FAILURE,
    GET_CAP_REQUEST,
    RESET_SUBMIT
} from "./ActionTypes";
import isEmpty from "lodash/isEmpty";

export const submit = (formData) => {

    return {
        type: API,
        endpoint: { url: "/api/register", method: "POST", body: formData },
        before: ({ dispatch }) => dispatch({ type: SUBMIT_REG_REQUEST }),
        error: ({ dispatch, error }) => dispatch({ type: SUBMIT_REG_FAILURE, error }),
        success: ({ data, dispatch }) => {
            dispatch({
                profile: data,
                type: SUBMIT_REG_SUCCESS
            });
        }
    };
};

export const resetSubmission = () => ({
    type: RESET_SUBMIT
});


export const validateIdentity = (category, identity) => {

    return {
        type: API,
        endpoint: { url: `/api/register/verify/${identity}` },
        before: ({ dispatch }) => dispatch({ type: VALIDATE_REQUEST, category, identity }),
        error: ({ dispatch, error }) => dispatch({ type: VALIDATE_FAILURE, category, identity, error }),
        success: ({ data, dispatch }) => {
            dispatch({
                verified: data.success,
                category,
                identity,
                type: VALIDATE_SUCCESS
            });
        }
    };
};

export const obtainCaptcha = (mobile) => {
    const identity = mobile;
    const category = "mobile";
    return {
        type: API,
        endpoint: { url: `/api/captchas/register/${identity}`, method: "POST" },
        before: ({ dispatch }) => dispatch({ type: GET_CAP_REQUEST, category, identity }),
        error: ({ dispatch, error }) => dispatch({ type: GET_CAP_FAILURE, category, identity, error }),
        success: ({ dispatch }) => dispatch({
            category,
            identity,
            type: GET_CAP_SUCCESS
        })
    };
};
