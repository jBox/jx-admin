import {
    API,
    MANAGE_GET_DRIVERS_SUCCESS,
    MANAGE_GET_REGISTERS_SUCCESS,
    MANAGE_CONFIRM_REGISTEG_REQUEST,
    MANAGE_CONFIRM_REGISTEG_SUCCESS,
    MANAGE_CONFIRM_REGISTEG_FAILURE,
    MANAGE_LOAD_USERS_REQUEST,
    MANAGE_LOAD_USERS_FAILURE,
    MANAGE_LOAD_USERS_SUCCESS,
    MANAGE_LOADED_ROLES,
    MANAGE_LOADED_MODELS,
    MANAGE_LOADED_ORDER_STATUS,
    MANAGE_LOAD_VEHICLES_SUCCESS,
    MANAGE_ADD_VEHICLE_SUCCESS,
    MANAGE_DEL_VEHICLE_SUCCESS,
    MANAGE_LOAD_ORDERS_REQUEST,
    MANAGE_LOAD_ORDERS_SUCCESS,
    MANAGE_LOAD_ORDERS_FAILURE,
    MANAGE_DEL_USER_SUCCESS,
    MANAGE_UPD_USER_REQUEST,
    MANAGE_UPD_USER_SUCCESS,
    MANAGE_UPD_USER_FAILURE
} from "../ActionTypes";

import isEmpty from "lodash/isEmpty";
import { callout } from "../notifications";

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

export const createVehicle = (vehicle) => {
    return {
        type: API,
        endpoint: { url: `/api/vehicles`, method: "POST", body: vehicle },
        error: ({ dispatch, error }) => dispatch(callout({ subject: "添加车辆失败", message: error, type: "error", duration: 8 })),
        success: ({ data, dispatch }) => {
            dispatch(callout({ message: "车辆添加成功！", type: "success" }));
            dispatch({
                vehicle: data,
                type: MANAGE_ADD_VEHICLE_SUCCESS
            });
        }
    };
};

export const removeVehicle = (vehicle) => {
    return {
        type: API,
        endpoint: { url: `/api/vehicles/${vehicle.id}`, method: "DELETE" },
        error: ({ dispatch, error }) => dispatch(callout({ subject: "删除车辆失败", message: error, type: "error", duration: 8 })),
        success: ({ data, dispatch }) => {
            dispatch(callout({ message: `车辆${vehicle.number}已删除！`, type: "success" }));
            dispatch({
                type: MANAGE_DEL_VEHICLE_SUCCESS,
                vehicle
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

export const deleteUser = (user) => {
    return {
        type: API,
        endpoint: { url: `/api/users/${user.id}`, method: "DELETE" },
        error: ({ dispatch, error }) => dispatch(callout({ subject: "删除用户失败", message: error, type: "error", duration: 8 })),
        success: ({ data, dispatch }) => {
            dispatch(callout({ message: `用户${user.nickname}已删除！`, type: "success" }));
            dispatch({
                type: MANAGE_DEL_USER_SUCCESS,
                user
            });
        }
    };
};

export const updateUserRole = (user, role, action) => {
    return {
        type: API,
        endpoint: { url: `/api/users/${user.id}/roles/${role}`, method: action.toUpperCase() },
        error: ({ dispatch, error }) => dispatch(callout({ subject: `用户${user.nickname}的角色更新失败`, message: error, type: "error", duration: 8 })),
        success: ({ data, dispatch }) => {
            dispatch(callout({ message: `用户${user.nickname}的角色已更新！`, type: "success" }));
            dispatch({
                type: MANAGE_UPD_USER_SUCCESS,
                user: data
            });
        }
    };
};