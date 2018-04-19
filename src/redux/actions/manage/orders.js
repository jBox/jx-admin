import {
    API,
    MANAGE_LOAD_ORDERS_REQUEST,
    MANAGE_LOAD_ORDERS_SUCCESS,
    MANAGE_LOAD_ORDERS_FAILURE,
    MANAGE_ORDER_UPDATED,
    MANAGE_LOAD_MORE_ORDERS_SUCCESS,
    MANAGE_GET_ORDER_REQUEST,
    MANAGE_GET_ORDER_SUCCESS,
    MANAGE_GET_ORDER_FAILURE,
    MANAGE_MODIFY_ORDER_REQUEST,
    MANAGE_MODIFY_ORDER_SUCCESS,
    MANAGE_MODIFY_ORDER_FAILURE
} from "../ActionTypes";

import isEmpty from "lodash/isEmpty";
import { callout } from "../notifications";

export const ordersInitialLoad = (filter) => {
    const pathname = "/api/orders";
    const search = [];
    if (filter) {
        search.push(`filter=${encodeURIComponent(filter)}`);
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

export const orderInitialLoad = (orderId) => (dispatch, getState) => {
    const { manage: { orders } } = getState();
    const found = orders.data.some(x => x.id === orderId);
    if (found) {
        return;
    }

    return dispatch({
        type: API,
        endpoint: `/api/orders/${orderId}`,
        before: ({ dispatch }) => dispatch({ type: MANAGE_GET_ORDER_REQUEST, orderId }),
        error: ({ dispatch, error }) => dispatch({ type: MANAGE_GET_ORDER_FAILURE, error, orderId }),
        success: ({ data, dispatch }) => {
            dispatch({
                orderId,
                data,
                type: MANAGE_GET_ORDER_SUCCESS
            });
        }
    });
}

export const loadMore = (filter) => (dispatch, getState) => {
    const { manage: { orders } } = getState();
    const pathname = "/api/orders";
    const search = [];
    if (filter) {
        search.push(`filter=${encodeURIComponent(filter)}`);
    }
    if (orders.next) {
        search.push(`next=${encodeURIComponent(orders.next)}`);
    }

    const url = pathname + (search.length > 0 ? `?${search.join("&")}` : "");

    return dispatch({
        type: API,
        endpoint: { url },
        success: ({ data, dispatch }) => {
            dispatch({
                data,
                type: MANAGE_LOAD_MORE_ORDERS_SUCCESS
            });
        }
    });
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

export const confirmCancelOrder = (order) => {
    const body = {
        version: order.version,
        operation: "confirmcan"
    };

    return {
        type: API,
        endpoint: { url: `/api/orders/${order.id}`, method: "PUT", body },
        error: ({ dispatch, error }) => dispatch(callout({ subject: "确认取消失败", message: error, type: "error", duration: 8 })),
        success: ({ data, dispatch }) => {
            dispatch(callout({ message: "订单已取消", type: "success" }));
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

export const completeOrder = (order) => {
    const body = {
        version: order.version,
        operation: "complete"
    };

    return {
        type: API,
        endpoint: { url: `/api/orders/${order.id}`, method: "PUT", body },
        error: ({ dispatch, error }) => dispatch(callout({ subject: "无法完成订单", message: error, type: "error", duration: 8 })),
        success: ({ data, dispatch }) => {
            dispatch(callout({ message: "订单已完成", type: "success" }));
            dispatch({
                data,
                type: MANAGE_ORDER_UPDATED
            });
        }
    };
};

export const cancelOrder = (order) => {
    const body = {
        version: order.version,
        operation: "executecan"
    };

    return {
        type: API,
        endpoint: { url: `/api/orders/${order.id}`, method: "PUT", body },
        error: ({ dispatch, error }) => dispatch(callout({ subject: "无法取消订单", message: error, type: "error", duration: 8 })),
        success: ({ data, dispatch }) => {
            dispatch(callout({ message: "订单已取消", type: "success" }));
            dispatch({
                data,
                type: MANAGE_ORDER_UPDATED
            });
        }
    };
};

export const modifyOrder = (order) => {
    const body = {
        order,
        version: order.version,
        operation: "modify"
    };

    return {
        type: API,
        endpoint: { url: `/api/orders/${order.id}`, method: "PUT", body },
        before: ({ dispatch, error }) => dispatch({ type: MANAGE_MODIFY_ORDER_REQUEST, id: order.id }),
        error: ({ dispatch, error }) => {
            dispatch({ type: MANAGE_MODIFY_ORDER_FAILURE, error, id: order.id });
            dispatch(callout({ subject: "修改订单失败", message: error, type: "error", duration: 8 }));
        },
        success: ({ data, dispatch }) => {
            dispatch(callout({ message: "修改订单成功", type: "success" }));
            dispatch({
                type: MANAGE_MODIFY_ORDER_SUCCESS,
                data,
                id: order.id
            });
        }
    };
};