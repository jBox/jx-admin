import { combineReducers } from "redux";
import {
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAILURE,
    LOGIN_CAP_REQUEST,
    LOGIN_CAP_SUCCESS,
    LOGIN_CAP_FAILURE,
    RESET_LOGIN
} from "../actions/ActionTypes";

const captcha = (state = { state: "", success: false }, action) => {
    switch (action.type) {
        case LOGIN_CAP_REQUEST:
            return { success: false, state: "" };
        case LOGIN_CAP_SUCCESS:
            return { success: true, state: "success", time: Date.now() };
        case LOGIN_CAP_FAILURE:
            return { success: false, state: "failure" };
        default:
            return state;
    }
};

const submission = (state = { success: false }, action) => {
    switch (action.type) {
        case LOGIN_REQUEST:
            return { success: false, state: "request" };
        case LOGIN_SUCCESS:
            return { success: true, state: "success" };
        case LOGIN_FAILURE:
            return { success: false, state: "failure", error: action.error };
        case RESET_LOGIN:
            return { success: false };
        default:
            return state;
    }
};

export default combineReducers({
    captcha,
    submission
});