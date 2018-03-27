import {
    API,
    MANAGE_GET_DRIVERS_SUCCESS,
    MANAGE_GET_REGISTERS_SUCCESS,
    MANAGE_CONFIRM_REGISTEG_REQUEST,
    MANAGE_CONFIRM_REGISTEG_SUCCESS,
    MANAGE_CONFIRM_REGISTEG_FAILURE
} from "./ActionTypes";
import isEmpty from "lodash/isEmpty";

export const passRegister = (mobile, roles) => {
    const action = "pass";
    return {
        type: API,
        endpoint: {
            url: "/api/users/registers/confirm", method: "POST", body: {
                action,
                mobile,
                roles
            }
        },
        before: ({ dispatch }) => dispatch({ type: MANAGE_CONFIRM_REGISTEG_REQUEST, action, mobile }),
        error: ({ dispatch, error }) => dispatch({ type: MANAGE_CONFIRM_REGISTEG_FAILURE, action, mobile, error }),
        success: ({ data, dispatch }) => {
            dispatch({
                action, mobile,
                type: MANAGE_CONFIRM_REGISTEG_SUCCESS
            });
        }
    };
};

export const rejectRegister = (mobile, reason) => {
    const action = "reject";
    return {
        type: API,
        endpoint: {
            url: "/api/users/registers/confirm", method: "POST", body: {
                action,
                mobile,
                reason
            }
        },
        before: ({ dispatch }) => dispatch({ type: MANAGE_CONFIRM_REGISTEG_REQUEST, action, mobile }),
        error: ({ dispatch, error }) => dispatch({ type: MANAGE_CONFIRM_REGISTEG_FAILURE, action, mobile, error }),
        success: ({ data, dispatch }) => {
            dispatch({
                action, mobile,
                type: MANAGE_CONFIRM_REGISTEG_SUCCESS
            });
        }
    };
};

export const registersInitialLoad = () => {
    return {
        type: API,
        endpoint: { url: `/api/users/registers` },
        success: ({ data, dispatch }) => {
            dispatch({
                data,
                type: MANAGE_GET_REGISTERS_SUCCESS
            });
        }
    };
};

export const driversInitialLoad = () => {
    return {
        type: API,
        endpoint: { url: `/api/users/drivers` },
        success: ({ data, dispatch }) => {
            dispatch({
                data,
                type: MANAGE_GET_DRIVERS_SUCCESS
            });
        }
    };
};
