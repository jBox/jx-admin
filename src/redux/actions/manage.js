import {
    API,
    MANAGE_GET_DRIVERS_SUCCESS,
    MANAGE_GET_REGISTERS_SUCCESS,
    MANAGE_CONFIRM_REGISTEG_REQUEST,
    MANAGE_CONFIRM_REGISTEG_SUCCESS,
    MANAGE_CONFIRM_REGISTEG_FAILURE,
    MANAGE_ADD_DRIVER_SUCCESS,
    MANAGE_LOAD_USERS_REQUEST,
    MANAGE_LOAD_USERS_FAILURE,
    MANAGE_LOAD_USERS_SUCCESS,
    MANAGE_LOADED_ROLES,
    MANAGE_LOADED_MODELS,
    MANAGE_LOAD_VEHICLES_SUCCESS
} from "./ActionTypes";

import isEmpty from "lodash/isEmpty";
import { callout } from "./notifications";

export const loadModels = () => {
    return {
        type: API,
        endpoint: "/api/vehicles/models",
        success: ({ data, dispatch }) => dispatch({ data, type: MANAGE_LOADED_MODELS })
    };
};

export const loadRoles = () => (dispatch, getState) => {
    const { manage } = getState();
    if (isEmpty(manage.roles)) {
        dispatch({
            type: API,
            endpoint: "/api/roles",
            success: ({ data, dispatch }) => dispatch({ data, type: MANAGE_LOADED_ROLES })
        })
    }
}

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

export const vehiclesInitialLoad = () => {
    return {
        type: API,
        endpoint: { url: `/api/vehicles` },
        success: ({ data, dispatch }) => {
            dispatch({
                data,
                type: MANAGE_LOAD_VEHICLES_SUCCESS
            });
        }
    };
};

export const createDriver = (driver) => {
    return {
        type: API,
        endpoint: { url: `/api/users/drivers`, method: "POST", body: driver },
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

export const usersInitialLoad = () => {
    return {
        type: API,
        endpoint: { url: `/api/users` },
        before: ({ dispatch }) => dispatch({ type: MANAGE_LOAD_USERS_REQUEST }),
        error: ({ dispatch, error }) => dispatch({ type: MANAGE_LOAD_USERS_FAILURE }),
        success: ({ data, dispatch }) => {
            dispatch({
                data,
                type: MANAGE_LOAD_USERS_SUCCESS
            });
        }
    };
};

export const deleteUser = (userId) => {
    return {
        type: API,
        endpoint: { url: `/api/users/${userId}`, method: "DELETE" }
    };
};