import { combineReducers } from "redux";
import {
    LOGIN_SUCCESS,
    INIT_LOGIN,
    LOGOUT,
    LANDING_LOGIN
} from "../actions/ActionTypes";

const landing = (state = false, action) => {
    switch (action.type) {
        case LANDING_LOGIN:
            return true;
        default:
            return state;
    }
};

const authenticated = (state = false, action) => {
    switch (action.type) {
        case LOGIN_SUCCESS:
        case INIT_LOGIN:
            return true;
        case LOGOUT:
            return false;
        default:
            return state;
    }
};

const token = (state = {}, action) => {
    switch (action.type) {
        case LOGIN_SUCCESS:
        case INIT_LOGIN:
            return action.data;
        case LOGOUT:
            return {};
        default:
            return state;
    }
};

export default combineReducers({
    landing,
    authenticated,
    token
});