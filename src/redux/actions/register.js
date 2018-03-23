import {
    API,
    SUBMIT_REG_REQUEST,
    SUBMIT_REG_SUCCESS,
    SUBMIT_REG_FAILURE,
    VALIDATE_REQUEST,
    VALIDATE_SUCCESS,
    VALIDATE_FAILURE,
    GET_CAP_SUCCESS,
    GET_CAP_FAILURE
} from "./ActionTypes";
import isEmpty from "lodash/isEmpty";

export const submit = (formData) => {

    return {
        type: API,
        endpoint: { url: "/oauth/register", method: "POST", body: formData },
        before: ({ dispatch }) => dispatch({ type: QUERY_PROFILE_REQUEST }),
        error: ({ dispatch, error }) => dispatch({ type: QUERY_PROFILE_FAILURE, error }),
        success: ({ data, dispatch }) => {
            dispatch({
                profile: data,
                type: QUERY_PROFILE_SUCCESS
            });
        }
    };
};


export const validateIdentity = (category, identity) => {

    return {
        type: API,
        endpoint: { url: `/oauth/verification/${category}/${identity}`, method: "POST" },
        before: ({ dispatch }) => dispatch({ type: VALIDATE_REQUEST, category, identity }),
        error: ({ dispatch, error }) => dispatch({ type: VALIDATE_FAILURE, category, identity, error }),
        success: ({ data, dispatch }) => {
            dispatch({
                verified: data.verified,
                category,
                identity,
                type: VALIDATE_SUCCESS
            });
        }
    };
};


export const getCaptcha = (mobile) => {

    return {
        type: API,
        endpoint: { url: `/oauth/captcha/register/${mobile}` },
        before: ({ dispatch }) => dispatch({ type: GET_CAP_SUCCESS }),
        error: ({ dispatch, error }) => dispatch({ type: GET_CAP_FAILURE, error }),
        success: ({ dispatch }) => {
            dispatch({
                success: true,
                type: GET_CAP_SUCCESS
            });
        }
    };
};
