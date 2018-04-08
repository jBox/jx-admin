import {
    API,
    MANAGE_LOAD_ORDERS_REQUEST,
    MANAGE_LOAD_ORDERS_SUCCESS,
    MANAGE_LOAD_ORDERS_FAILURE,
    MANAGE_ORDER_UPDATED
} from "./ActionTypes";

import isEmpty from "lodash/isEmpty";
import { callout } from "./notifications";

export const ordersInitialLoad = (filter, next) => {
    const pathname = "/api/orders";
    const search = [];
    if (filter) {
        search.push(`filter=${encodeURIComponent(filter)}`);
    }
    if (next) {
        search.push(`next=${encodeURIComponent(next)}`);
    }

    const url = pathname + (search.length > 0 ? `?${search.join("&")}` : "");

    return {
        type: API,
        endpoint: { url },
        before: ({ dispatch }) => dispatch({ type: MANAGE_LOAD_ORDERS_REQUEST }),
        error: ({ dispatch, error }) => dispatch({ type: MANAGE_LOAD_ORDERS_FAILURE, error }),
        success: ({ data, dispatch }) => {
            dispatch({
                data,
                type: MANAGE_LOAD_ORDERS_SUCCESS
            });
        }
    };
};

export const confirmOrder = (order) => {
    const body = {
        version: order.version,
        operation: "confirm"
    };

    return {
        type: API,
        endpoint: { url: `/api/orders/${order.id}`, method: "PUT", body },
        error: ({ dispatch, error }) => dispatch(callout({ subject: "订单确认失败", message: error, type: "error", duration: 8 })),
        success: ({ data, dispatch }) => {
            dispatch(callout({ message: "订单已确认", type: "success" }));
            dispatch({
                data,
                type: MANAGE_ORDER_UPDATED
            });
        }
    };
};

export const scheduleOrder = (order, schedule) => {
    const body = {
        version: order.version,
        operation: "schedule",
        schedule
    };

    return {
        type: API,
        endpoint: { url: `/api/orders/${order.id}`, method: "PUT", body },
        error: ({ dispatch, error }) => dispatch(callout({ subject: "订单安排失败", message: error, type: "error", duration: 8 })),
        success: ({ data, dispatch }) => {
            dispatch(callout({ message: "订单已安排", type: "success" }));
            dispatch({
                data,
                type: MANAGE_ORDER_UPDATED
            });
        }
    };
};
