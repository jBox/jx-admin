import { combineReducers } from "redux";
import {
    LOGIN_SUCCESS,
    INIT_LOGIN,
    LOGOUT,
    LANDING_LOGIN,
    GET_USER_IFNO
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

const user = (state = { nickname: "Anonymous", roles: [] }, action) => {
    switch (action.type) {
        case GET_USER_IFNO:
            return action.data;
        default:
            return state;
    }
};

export default combineReducers({
    landing,
    authenticated,
    token,
    user
});