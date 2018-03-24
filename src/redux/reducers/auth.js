import { combineReducers } from "redux";
import {
    LOGIN_SUCCESS
} from "../actions/ActionTypes";

const authenticated = (state = false, action) => {
    switch (action.type) {
        case LOGIN_SUCCESS:
            return true;
        default:
            return state;
    }
};

const token = (state = {}, action) => {
    switch (action.type) {
        case LOGIN_SUCCESS:
            return action.data;
        default:
            return state;
    }
};

export default combineReducers({
    authenticated,
    token
});