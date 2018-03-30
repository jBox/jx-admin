import {
    API,
    MANAGE_GET_DRIVERS_SUCCESS,
    MANAGE_GET_REGISTERS_SUCCESS,
    MANAGE_CONFIRM_REGISTEG_REQUEST,
    MANAGE_CONFIRM_REGISTEG_SUCCESS,
    MANAGE_CONFIRM_REGISTEG_FAILURE,
    MANAGE_ADD_DRIVER_SUCCESS
} from "./ActionTypes";

import { callout } from "./notifications";

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

export const createDriver = (driver) => {
    return {
        type: API,
        endpoint: { url: `/api/users/drivers`, method: "POST", body: driver },
        before: ({ dispatch }) => dispatch(callout({ message: "正在添加司机...", duration: 1 })),
        error: ({ dispatch, error }) => dispatch(callout({ subject: "添加司机失败", message: error, type: "error", duration: 8 })),
        success: ({ data, dispatch }) => {
            dispatch(callout({ message: "司机添加成功！", type: "success" }));
            dispatch({
                driver: data,
                type: MANAGE_ADD_DRIVER_SUCCESS
            });
        }
    };
};
