import { combineReducers } from "redux";
import {
    MANAGE_GET_DRIVERS_SUCCESS
} from "../actions/ActionTypes";

const trips = (state = [], action) => {
    return state;
};

export default combineReducers({
    trips
});