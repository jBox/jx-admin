import { combineReducers } from "redux";
import {
    SUBMIT_REG_REQUEST,
    SUBMIT_REG_SUCCESS,
    SUBMIT_REG_FAILURE,
    VALIDATE_REQUEST,
    VALIDATE_SUCCESS,
    VALIDATE_FAILURE,
    GET_CAP_REQUEST,
    GET_CAP_SUCCESS,
    GET_CAP_FAILURE,
    RESET_SUBMIT
} from "../actions/ActionTypes";

const verification = (state = {}, action) => {
    const { category, type, verified } = action;
    switch (type) {
        case VALIDATE_REQUEST:
            return { ...state, [category]: { verified: false } }
        case VALIDATE_SUCCESS:
            return { ...state, [category]: { verified } }
        case VALIDATE_FAILURE:
            return { ...state, [category]: { verified: false, error: action.error } }
        case GET_CAP_SUCCESS:
            return { ...state, [category]: { verified: true } }
        default:
            return state;
    }
};

const captcha = (state = { state: "", success: false }, action) => {
    switch (action.type) {
        case GET_CAP_REQUEST:
            return { success: false, state: "" };
        case GET_CAP_SUCCESS:
            return { success: true, state: "success", time: Date.now() };
        case GET_CAP_FAILURE:
            return { success: false, state: "failure" };
        default:
            return state;
    }
};

const submission = (state = { success: false }, action) => {
    switch (action.type) {
        case SUBMIT_REG_REQUEST:
            return { success: false, state: "request" };
        case SUBMIT_REG_SUCCESS:
            return { success: true, state: "success" };
        case SUBMIT_REG_FAILURE:
            return { success: false, state: "failure", error: action.error };
        case RESET_SUBMIT:
            return { success: false };
        default:
            return state;
    }
};

export default combineReducers({
    verification,
    captcha,
    submission
});