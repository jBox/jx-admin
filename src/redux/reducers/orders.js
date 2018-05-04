import { combineReducers } from "redux";
import {
    MANAGE_LOAD_ORDERS_REQUEST,
    MANAGE_LOAD_ORDERS_SUCCESS,
    MANAGE_LOAD_ORDERS_FAILURE,
    MANAGE_ORDER_UPDATED,
    MANAGE_LOAD_MORE_ORDERS_SUCCESS,
    MANAGE_GET_ORDER_SUCCESS,
    MANAGE_MODIFY_ORDER_REQUEST,
    MANAGE_MODIFY_ORDER_SUCCESS,
    MANAGE_MODIFY_ORDER_FAILURE
} from "../actions/ActionTypes";

const data = (state = [], action) => {
    switch (action.type) {
        case MANAGE_LOAD_ORDERS_SUCCESS:
            return action.data.orders;
        case MANAGE_ORDER_UPDATED:
        case MANAGE_MODIFY_ORDER_SUCCESS:
            const { id } = action.data;
            return state.reduce((items, item) => {
                if (id === item.id) {
                    return items.concat(action.data);
                }

                return items.concat({ ...item });
            }, []);
        case MANAGE_LOAD_MORE_ORDERS_SUCCESS:
            return [...state, ...action.data.orders];
        case MANAGE_GET_ORDER_SUCCESS:
            return [...state, action.data];
        default:
            return state;
    }
};

const next = (state = "", action) => {
    switch (action.type) {
        case MANAGE_LOAD_MORE_ORDERS_SUCCESS:
        case MANAGE_LOAD_ORDERS_SUCCESS:
            return action.data.next;
        default:
            return state;
    }
};

const modifications = (state = {}, action) => {
    switch (action.type) {
        case MANAGE_MODIFY_ORDER_REQUEST:
            return { ...state, [action.id]: { state: "request" } };
        case MANAGE_MODIFY_ORDER_SUCCESS:
            return { ...state, [action.id]: { state: "success" } };
        case MANAGE_MODIFY_ORDER_FAILURE:
            return { ...state, [action.id]: { state: "failure", error: action.error } };
        default:
            return state;
    }
}

export default combineReducers({
    data,
    next,
    modifications
});