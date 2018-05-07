import {
    API,
    DRIVER_TRIP_DEPART_SUCCESS,
    DRIVER_TRIP_REVERT_SUCCESS,
    DRIVER_TRIP_UPDATE_SUCCESS,
    DRIVER_LOAD_CURR_TRIP,
    DRIVER_LOAD_TRIPS
} from "../ActionTypes";

import isEmpty from "lodash/isEmpty";
import { callout } from "../notifications";

export const currentTripInitialLoad = () => {
    return {
        type: API,
        endpoint: { url: `/api/drivers/trips/current` },
        success: ({ data, dispatch }) => {
            dispatch({
                data,
                type: DRIVER_LOAD_CURR_TRIP
            });
        }
    };
};

export const tripsInitialLoad = () => {
    return {
        type: API,
        endpoint: { url: `/api/drivers/trips` },
        success: ({ data, dispatch }) => {
            dispatch({
                data,
                type: DRIVER_LOAD_TRIPS
            });
        }
    };
};

export const depart = (trip) => {
    const endpoint = {
        url: `/api/drivers/trips/${trip.id}`,
        method: "PUT",
        body: { operation: "depart", version: trip.version }
    };

    return {
        type: API,
        endpoint,
        error: ({ dispatch, error }) => dispatch(callout({ subject: `行程${trip.id}发车失败`, message: error, type: "error", duration: 8 })),
        success: ({ data, dispatch }) => {
            dispatch(callout({ message: `行程${trip.id}已确认发车！`, type: "success" }));
            dispatch({
                type: DRIVER_TRIP_DEPART_SUCCESS,
                data
            });
        }
    };
};

export const revert = (trip) => {
    const endpoint = {
        url: `/api/drivers/trips/${trip.id}`,
        method: "PUT",
        body: { operation: "revert", version: trip.version }
    };

    return {
        type: API,
        endpoint,
        error: ({ dispatch, error }) => dispatch(callout({ subject: `行程${trip.id}收车失败`, message: error, type: "error", duration: 8 })),
        success: ({ data, dispatch }) => {
            dispatch(callout({ message: `行程${trip.id}已确认收车！`, type: "success" }));
            dispatch({
                type: DRIVER_TRIP_REVERT_SUCCESS,
                data
            });
        }
    };
};

export const updateProgress = (trip, progress) => {
    const endpoint = {
        url: `/api/drivers/trips/${trip.id}`,
        method: "PUT",
        body: { operation: "progress", version: trip.version, data: progress }
    };

    return {
        type: API,
        endpoint,
        error: ({ dispatch, error }) => dispatch(callout({ subject: `行程${trip.id}进度更新失败`, message: error, type: "error", duration: 8 })),
        success: ({ data, dispatch }) => {
            dispatch(callout({ message: `行程${trip.id}进度已更新！`, type: "success" }));
            dispatch({
                type: DRIVER_TRIP_UPDATE_SUCCESS,
                data
            });
        }
    };
};