import {
    API,
    MANAGE_GET_DRIVERS_SUCCESS,
    MANAGE_GET_REGISTERS_SUCCESS,
    MANAGE_CONFIRM_REGISTEG_REQUEST,
    MANAGE_CONFIRM_REGISTEG_SUCCESS,
    MANAGE_CONFIRM_REGISTEG_FAILURE
} from "./ActionTypes";
import isEmpty from "lodash/isEmpty";

export const confirmRegister = (formData) => {

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
