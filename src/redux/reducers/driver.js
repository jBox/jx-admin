import { combineReducers } from "redux";
import {
    DRIVER_TRIP_DEPART_SUCCESS,
    DRIVER_TRIP_REVERT_SUCCESS,
    DRIVER_TRIP_UPDATE_SUCCESS
} from "../actions/ActionTypes";

const trips = (state = [

    {
        "name": "魏师傅", "mobile": "18688981234",
        "departureTime": "2018-04-11T01:00:00.000Z",
        "departurePlace": "Shenzhen",
        "destination": "destination destination", "duration": 3,
        "notes": "其他信息", "id": "20180410000005",
        "version": 1524018704140, "licenseNunber": "粤A23233",
        "vehicleModel": "商务车",
        "status": { id: "scheduled" }, //scheduled,departure,reverted
        "progress": []
    },

], action) => {
    switch (action.type) {
        case DRIVER_TRIP_DEPART_SUCCESS:
        case DRIVER_TRIP_REVERT_SUCCESS:
        case DRIVER_TRIP_UPDATE_SUCCESS: {
            const { trip } = action;
            const updated = [...state];
            const index = updated.findIndex(x => x.id === trip.id);
            updated[index] = trip;
            return updated;
        }
        default:
            return state;
    }
};

export default combineReducers({
    trips
});