import { combineReducers } from "redux";
import {
    MANAGE_GET_REGISTERS_SUCCESS
} from "../actions/ActionTypes";

const registers = (state = [], action) => {
    switch (action.type) {
        case MANAGE_GET_REGISTERS_SUCCESS:
            return action.data;
        default:
            return state;
    }
};

export default combineReducers({
    registers
});