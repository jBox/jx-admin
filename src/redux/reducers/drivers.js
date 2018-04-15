import { combineReducers } from "redux";
import {
    MANAGE_GET_DRIVERS_SUCCESS,
    MANAGE_ADD_DRIVER_SUCCESS,
    MANAGE_UPDATE_DRIVER_REQUEST,
    MANAGE_UPDATE_DRIVER_SUCCESS,
    MANAGE_UPDATE_DRIVER_FAILURE,
    MANAGE_UPDATE_DRIVER_STATUS_RESET,
    MANAGE_DEL_DRIVER_SUCCESS
} from "../actions/ActionTypes";

const data = (state = [], action) => {
    switch (action.type) {
        case MANAGE_GET_DRIVERS_SUCCESS:
            return action.data;
        case MANAGE_ADD_DRIVER_SUCCESS: {
            const { driver } = action;
            return [{ ...driver, status: "new" }, ...state];
        }
        case MANAGE_UPDATE_DRIVER_SUCCESS: {
            const { driver: { mobile, nickname, title } } = action;
            const drivers = [];
            for (let item of state) {
                if (item.mobile === mobile) {
                    drivers.push({ mobile, nickname, title });
                } else {
                    drivers.push({ ...item });
                }
            }
            return drivers;
        }
        case MANAGE_DEL_DRIVER_SUCCESS: {
            const drivers = [...state];
            const { driver: { mobile } } = action;
            const index = drivers.findIndex(x => x.mobile === mobile);
            if (index !== -1) {
                drivers.splice(index, 1);
            }

            return drivers;
        }
        default:
            return state;
    }
};

const status = (state = {}, action) => {
    const { driver } = action;
    switch (action.type) {
        case MANAGE_UPDATE_DRIVER_REQUEST:
            return { ...state, [driver.mobile]: "request" };
        case MANAGE_UPDATE_DRIVER_SUCCESS:
            return { ...state, [driver.mobile]: "success" };
        case MANAGE_UPDATE_DRIVER_FAILURE:
            return { ...state, [driver.mobile]: "failure" };
        case MANAGE_UPDATE_DRIVER_STATUS_RESET:
            return { ...state, [driver.mobile]: undefined };
        default:
            return state;
    }
};


export default combineReducers({
    data,
    status
});