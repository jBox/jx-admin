import { combineReducers } from "redux";
import {
    DRIVER_TRIP_DEPART_SUCCESS,
    DRIVER_TRIP_REVERT_SUCCESS,
    DRIVER_TRIP_UPDATE_SUCCESS,
    DRIVER_LOAD_CURR_TRIP,
    DRIVER_LOAD_TRIPS
} from "../actions/ActionTypes";

const current = (state = {}, action) => {
    switch (action.type) {
        case DRIVER_TRIP_DEPART_SUCCESS:
        case DRIVER_TRIP_REVERT_SUCCESS:
        case DRIVER_TRIP_UPDATE_SUCCESS:
        case DRIVER_LOAD_CURR_TRIP:
            return action.data;
        default:
            return state;
    }
}

const trips = (state = [], action) => {
    switch (action.type) {
        case DRIVER_TRIP_DEPART_SUCCESS:
        case DRIVER_TRIP_REVERT_SUCCESS:
        case DRIVER_TRIP_UPDATE_SUCCESS: {
            const { data } = action;
            const updated = [...state];
            const index = updated.findIndex(x => x.id === data.id);
            if (index !== -1) {
                updated[index] = data;
                return updated;
            }

            return state;
        }
        case DRIVER_LOAD_TRIPS:
            return action.data;
        default:
            return state;
    }
};

export default combineReducers({
    current,
    trips
});