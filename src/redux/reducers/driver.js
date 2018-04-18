import { combineReducers } from "redux";
import {
    MANAGE_GET_DRIVERS_SUCCESS
} from "../actions/ActionTypes";

const trips = (state = [

    { "name": "魏俊华", "mobile": "18688950367", "departureTime": "2018-04-11T01:00:00.000Z", "departurePlace": "Shenzhen", "destination": "destination destination", "duration": 3, "notes": "其他信息", "id": "20180410000005", "version": 1524018704140, "licenseNunber": "粤A23233", "vehicleModel": "商务车", "progress": [] },

], action) => {
    return state;
};

export default combineReducers({
    trips
});