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

export const confirmOrder = (order, department) => {
    const body = {
        version: order.version,
        department,
        operation: "confirm"
    };

    return {
        type: API,
        endpoint: { url: `/api/orders/${order.id}`, method: "PUT", body },
        error: ({ dispatch, error }) => dispatch(callout({ subject: `订单${order.id}确认失败`, message: error, type: "error", duration: 8 })),
        success: ({ data, dispatch }) => {
            const { warning, order } = data;
            if (warning) {
                dispatch(callout({ subject: `订单${order.id} - 警告`, message: warning.message, type: "warning", duration: 10 }));
            } else {
                dispatch(callout({ message: `订单${order.id}已确认`, type: "success" }));
            }
            dispatch({
                type: MANAGE_ORDER_UPDATED,
                data: order
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
        error: ({ dispatch, error }) => dispatch(callout({ subject: `订单${order.id}取消操作失败`, message: error, type: "error", duration: 8 })),
        success: ({ data, dispatch }) => {
            const { warning, order } = data;
            if (warning) {
                dispatch(callout({ subject: `订单${order.id} - 警告`, message: warning.message, type: "warning", duration: 10 }));
            } else {
                dispatch(callout({ message: `订单${order.id}已取消`, type: "success" }));
            }
            dispatch({
                type: MANAGE_ORDER_UPDATED,
                data: order
            });
        }
    };
};

export const scheduleOrder = (order) => {
    const body = {
        version: order.version,
        operation: "schedule",
        schedules: order.schedules
    };

    return {
        type: API,
        endpoint: { url: `/api/orders/${order.id}`, method: "PUT", body },
        error: ({ dispatch, error }) => dispatch(callout({ subject: `订单${order.id}安排失败`, message: error, type: "error", duration: 8 })),
        success: ({ data, dispatch }) => {
            const { warning, order } = data;
            if (warning) {
                dispatch(callout({ subject: `订单${order.id} - 警告`, message: warning.message, type: "warning", duration: 10 }));
            } else {
                dispatch(callout({ message: `订单${order.id}已安排`, type: "success" }));
            }
            dispatch({
                type: MANAGE_ORDER_UPDATED,
                data: order
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
        error: ({ dispatch, error }) => dispatch(callout({ subject: `订单${order.id}完成操作失败`, message: error, type: "error", duration: 8 })),
        success: ({ data, dispatch }) => {
            const { warning, order } = data;
            if (warning) {
                dispatch(callout({ subject: `订单${order.id} - 警告`, message: warning.message, type: "warning", duration: 10 }));
            } else {
                dispatch(callout({ message: `订单${order.id}已完成`, type: "success" }));
            }
            dispatch({
                type: MANAGE_ORDER_UPDATED,
                data: order
            });
        }
    };
};

export const departSchedule = (order, schedule) => {
    const body = {
        version: order.version,
        operation: "depart",
        schedule
    };

    return {
        type: API,
        endpoint: { url: `/api/orders/${order.id}`, method: "PUT", body },
        error: ({ dispatch, error }) => dispatch(callout({ subject: `${schedule.licenseNumber}发车失败`, message: error, type: "error", duration: 8 })),
        success: ({ data, dispatch }) => {
            const { warning, order } = data;
            if (warning) {
                dispatch(callout({ subject: `订单${order.id} - 警告`, message: warning.message, type: "warning", duration: 10 }));
            } else {
                dispatch(callout({ message: `${schedule.licenseNumber}已发车`, type: "success" }));
            }
            dispatch({
                type: MANAGE_ORDER_UPDATED,
                data: order
            });
        }
    };
}

export const progressSchedule = (order, schedule) => {
    const body = {
        version: order.version,
        operation: "progress",
        schedule
    };

    return {
        type: API,
        endpoint: { url: `/api/orders/${order.id}`, method: "PUT", body },
        error: ({ dispatch, error }) => dispatch(callout({ subject: `${schedule.licenseNumber}进度更新失败`, message: error, type: "error", duration: 8 })),
        success: ({ data, dispatch }) => {
            const { warning, order } = data;
            if (warning) {
                dispatch(callout({ subject: `订单${order.id} - 警告`, message: warning.message, type: "warning", duration: 10 }));
            } else {
                dispatch(callout({ message: `${schedule.licenseNumber}进度已更新`, type: "success" }));
            }
            dispatch({
                type: MANAGE_ORDER_UPDATED,
                data: order
            });
        }
    };
}

export const revertSchedule = (order, schedule) => {
    const body = {
        version: order.version,
        operation: "revert",
        schedule
    };

    return {
        type: API,
        endpoint: { url: `/api/orders/${order.id}`, method: "PUT", body },
        error: ({ dispatch, error }) => dispatch(callout({ subject: `${schedule.licenseNumber}收车失败`, message: error, type: "error", duration: 8 })),
        success: ({ data, dispatch }) => {
            const { warning, order } = data;
            if (warning) {
                dispatch(callout({ subject: `订单${order.id} - 警告`, message: warning.message, type: "warning", duration: 10 }));
            } else {
                dispatch(callout({ message: `${schedule.licenseNumber}已收车`, type: "success" }));
            }
            dispatch({
                type: MANAGE_ORDER_UPDATED,
                data: order
            });
        }
    };
}

export const cancelOrderImmediately = (order) => {
    const body = {
        version: order.version,
        operation: "executecan"
    };

    return {
        type: API,
        endpoint: { url: `/api/orders/${order.id}`, method: "PUT", body },
        error: ({ dispatch, error }) => dispatch(callout({ subject: `订单${order.id}无法取消`, message: error, type: "error", duration: 8 })),
        success: ({ data, dispatch }) => {
            const { warning, order } = data;
            if (warning) {
                dispatch(callout({ subject: `订单${order.id} - 警告`, message: warning.message, type: "warning", duration: 10 }));
            } else {
                dispatch(callout({ message: `订单${order.id}已取消`, type: "success" }));
            }
            dispatch({
                type: MANAGE_ORDER_UPDATED,
                data: order
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
            dispatch(callout({ subject: `订单${order.id}修改失败`, message: error, type: "error", duration: 8 }));
        },
        success: ({ data, dispatch }) => {
            const { warning, order } = data;
            if (warning) {
                dispatch(callout({ subject: `订单${order.id} - 警告`, message: warning.message, type: "warning", duration: 10 }));
            } else {
                dispatch(callout({ message: `订单${order.id}已修改成功`, type: "success" }));
            }
            dispatch({
                type: MANAGE_MODIFY_ORDER_SUCCESS,
                data: order,
                id: order.id
            });
        }
    };
};