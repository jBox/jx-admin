import { combineReducers } from "redux";
import {
    MANAGE_GET_REGISTERS_SUCCESS,
    MANAGE_CONFIRM_REGISTEG_REQUEST,
    MANAGE_CONFIRM_REGISTEG_SUCCESS,
    MANAGE_CONFIRM_REGISTEG_FAILURE
} from "../actions/ActionTypes";

const registers = (state = [], action) => {
    switch (action.type) {
        case MANAGE_GET_REGISTERS_SUCCESS:
            return action.data;
        case MANAGE_CONFIRM_REGISTEG_SUCCESS:
            const { mobile } = action;
            return state.reduce((items, item) => {
                if (item.mobile === mobile) {
                    return items.concat({ ...item, status: action.action });
                }

                return items.concat(item);
            }, []);
        default:
            return state;
    }
};

const registerConfirmations = (state = {}, action) => {
    switch (action.type) {
        case MANAGE_CONFIRM_REGISTEG_REQUEST:
            return { ...state, [action.mobile]: "request" };
        case MANAGE_CONFIRM_REGISTEG_SUCCESS:
            return { ...state, [action.mobile]: "success" };
        case MANAGE_CONFIRM_REGISTEG_FAILURE:
            return { ...state, [action.mobile]: "failure" };
        default:
            return state;
    }
};

export default combineReducers({
    registerConfirmations,
    registers
});