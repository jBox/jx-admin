import { createSelector } from "reselect";

export const modifyOrderSelector = createSelector(
    (state) => state.manage.orders.modify,
    (state, props) => {
        const { orders } = state.manage;
        const { match: { params: { orderId } } } = props;
        return orders.data.find(x => x.id === orderId);
    },
    (state) => state.settings.models,
    (ordersModify, order, models) => {
        const initModify = { state: "init" };
        if (!order) {
            return {
                order,
                models,
                modify: initModify
            };
        }

        const modify = ordersModify[order.id] || initModify;
        return {
            order: { ...order },
            models,
            modify
        };
    }
);

export default createSelector(
    (state) => state.manage.orders,
    (state) => state.manage.drivers,
    (state) => state.manage.vehicles,
    (state) => state.settings.models,
    (orders, drivers, vehicles, models) => {
        const vehicleItems = vehicles.map((item) => {
            const model = models[item.model] || { label: "" };
            return { ...item, model: model.label };
        });

        return {
            orders: orders.data.map((item) => ({ ...item})),
            drivers: drivers.data,
            vehicles: vehicleItems,
            hasMore: !!orders.next
        };
    }
);
