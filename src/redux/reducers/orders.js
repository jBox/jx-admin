import { combineReducers } from "redux";
import {
    MANAGE_LOAD_ORDERS_REQUEST,
    MANAGE_LOAD_ORDERS_SUCCESS,
    MANAGE_LOAD_ORDERS_FAILURE,
    MANAGE_ORDER_UPDATED
} from "../actions/ActionTypes";

const data = (state = [], action) => {
    switch (action.type) {
        case MANAGE_LOAD_ORDERS_SUCCESS:
            return action.data.orders;
        case MANAGE_ORDER_UPDATED:
            const { id } = action.data;
            return state.reduce((items, item) => {
                if (id === item.id) {
                    return items.concat(action.data);
                }

                return items.concat({ ...item });
            }, []);
        default:
            return state;
    }
};

const next = (state = "", action) => {
    switch (action.type) {
        case MANAGE_LOAD_ORDERS_SUCCESS:
            return action.data.next;
        default:
            return state;
    }
};

export default combineReducers({
    data,
    next
});