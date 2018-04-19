import {
    API,
    DRIVER_TRIP_DEPART_SUCCESS,
    DRIVER_TRIP_REVERT_SUCCESS,
    DRIVER_TRIP_UPDATE_SUCCESS
} from "../ActionTypes";

import isEmpty from "lodash/isEmpty";
import { callout } from "../notifications";

export const depart = (trip) => (dispatch) => {
    dispatch(callout({ message: `行程${trip.id}已确认发车！`, type: "success" }));
    dispatch({
        type: DRIVER_TRIP_DEPART_SUCCESS,
        trip: {
            ...trip,
            status: { id: "departure" }
        }
    });
};

export const revert = (trip) => (dispatch) => {
    dispatch(callout({ message: `行程${trip.id}已确认收车！`, type: "success" }));
    dispatch({
        type: DRIVER_TRIP_REVERT_SUCCESS,
        trip: {
            ...trip,
            status: { id: "reverted" }
        }
    });
};

export const updateProgress = (trip, progress) => (dispatch) => {
    dispatch(callout({ message: `行程${trip.id}d\进度已更新！`, type: "success" }));
    dispatch({
        type: DRIVER_TRIP_UPDATE_SUCCESS,
        trip: {
            ...trip,
            progress
        }
    });
};