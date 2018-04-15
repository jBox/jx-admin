import {
    API,
    MANAGE_ADD_DRIVER_SUCCESS,
    MANAGE_UPDATE_DRIVER_REQUEST,
    MANAGE_UPDATE_DRIVER_SUCCESS,
    MANAGE_UPDATE_DRIVER_FAILURE,
    MANAGE_DEL_DRIVER_REQUEST,
    MANAGE_DEL_DRIVER_SUCCESS,
    MANAGE_DEL_DRIVER_FAILURE
} from "../ActionTypes";

import isEmpty from "lodash/isEmpty";
import { callout } from "../notifications";

export const createDriver = (driver) => {
    return {
        type: API,
        endpoint: { url: `/api/users/drivers`, method: "POST", body: driver },
        error: ({ dispatch, error }) => dispatch(callout({ subject: "添加司机失败", message: error, type: "error", duration: 8 })),
        success: ({ data, dispatch }) => {
            dispatch(callout({ message: "司机添加成功！", type: "success" }));
            dispatch({
                type: MANAGE_ADD_DRIVER_SUCCESS,
                driver: data
            });
        }
    };
};

export const updateDriver = (driver) => {
    return {
        type: API,
        endpoint: { url: `/api/users/drivers/${driver.mobile}`, method: "PUT", body: driver },
        before: ({ dispatch }) => dispatch({ type: MANAGE_UPDATE_DRIVER_REQUEST, driver }),
        error: ({ dispatch, error }) => {
            dispatch({ type: MANAGE_UPDATE_DRIVER_FAILURE, error, driver });
            dispatch(callout({ subject: "更新司机信息失败", message: error, type: "error", duration: 8 }));
        },
        success: ({ data, dispatch }) => {
            dispatch(callout({ message: "司机信息更新成功！", type: "success" }));
            dispatch({
                type: MANAGE_UPDATE_DRIVER_SUCCESS,
                driver: data
            });
        }
    };
};

export const removeDriver = (driver) => {
    return {
        type: API,
        endpoint: { url: `/api/users/drivers/${driver.mobile}`, method: "DELETE" },
        before: ({ dispatch }) => dispatch({ type: MANAGE_DEL_DRIVER_REQUEST, driver }),
        error: ({ dispatch, error }) => {
            dispatch({ type: MANAGE_DEL_DRIVER_FAILURE, error, driver });
            dispatch(callout({ subject: "删除司机失败", message: error, type: "error", duration: 8 }));
        },
        success: ({ data, dispatch }) => {
            dispatch(callout({ message: "司机已成功删除！", type: "success" }));
            dispatch({
                type: MANAGE_DEL_DRIVER_SUCCESS,
                driver: data
            });
        }
    };
}; 