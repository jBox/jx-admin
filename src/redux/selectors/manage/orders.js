import { createSelector } from "reselect";

export const modifyOrderSelector = createSelector(
    (state) => state.manage.orders.modify,
    (state, props) => {
        const { orders } = state.manage;
        const { match: { params: { orderId } } } = props;
        return orders.data.find(x => x.id === orderId);
    },
    (state) => state.manage.models,
    (state) => state.manage.orderStatus,
    (ordersModify, order, models, status) => {
        const initModify = { state: "init" };
        if (!order) {
            return {
                order,
                models,
                modify: initModify
            };
        }

        const modify = ordersModify[order.id] || initModify;
        const s = status[order.status] ? { ...status[order.status] } : { id: order.status };
        return {
            order: { ...order, status: s },
            models,
            modify
        };
    }
);

export default createSelector(
    (state) => state.manage.orders,
    (state) => state.manage.drivers,
    (state) => state.manage.vehicles,
    (state) => state.manage.models,
    (state) => state.manage.orderStatus,
    (orders, drivers, vehicles, models, status) => {
        const vehicleItems = vehicles.map((item) => {
            const model = models[item.model] || { label: "" };
            return { ...item, model: model.label };
        });

        return {
            orders: orders.data.map((item) => {
                const s = status[item.status] ? { ...status[item.status] } : { id: item.status };
                return { ...item, status: s };
            }),
            drivers,
            vehicles: vehicleItems,
            hasMore: !!orders.next
        };
    }
);
