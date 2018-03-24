import { combineReducers } from "redux";
import {
    LOGIN_SUCCESS,
    INIT_LOGIN,
    LOGOUT
} from "../actions/ActionTypes";

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
    authenticated,
    token
});