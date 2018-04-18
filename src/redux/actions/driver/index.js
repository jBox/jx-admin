import {
    API,
    DRIVER_TRIP_UPDATE_SUCCESS
} from "../ActionTypes";

import isEmpty from "lodash/isEmpty";
import { callout } from "../notifications";

export const updateProgress = (trip, progress) => (dispatch) => {
    dispatch(callout({ message: `行程${trip.id}已更新！`, type: "success" }));
    dispatch({
        type: DRIVER_TRIP_UPDATE_SUCCESS,
        trip: {
            ...trip,
            progress
        }
    });
};