import { combineReducers } from "redux";
import {
    DRIVER_TRIP_DEPART_SUCCESS,
    DRIVER_TRIP_REVERT_SUCCESS,
    DRIVER_TRIP_UPDATE_SUCCESS,
    DRIVER_LOAD_CURR_TRIP
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

const trips = (state = [

    {
        "name": "魏师傅", "mobile": "18688981234",
        "departureTime": "2018-04-11T01:00:00.000Z",
        "departurePlace": "Shenzhen",
        "destination": "destination destination", "duration": 3,
        "notes": "其他信息", "id": "20180410000005",
        "version": 1524018704140, "licenseNunber": "粤A23233",
        "vehicleModel": "商务车",
        "status": "scheduled", //scheduled,departure,reverted
        "progress": []
    },

], action) => {
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
        default:
            return state;
    }
};

export default combineReducers({
    current,
    trips
});