import { createSelector } from "reselect";

export const modifyOrderSelector = createSelector(
    (state, props) => {
        const { orders } = state.manage;
        const { match: { params: { orderId } } } = props;
        return orders.data.find(x => x.id === orderId);
    },
    (state) => state.manage.drivers,
    (state) => state.manage.vehicles,
    (state) => state.manage.models,
    (state) => state.manage.orderStatus,
    (order, drivers, vehicles, models, status) => {
        const vehicleItems = vehicles.map((item) => {
            const model = models[item.model] || { label: "" };
            return { ...item, model: model.label };
        });

        if (!order) {
            return {
                order,
                drivers,
                vehicles: vehicleItems
            };
        }

        const s = status[order.status] ? { ...status[order.status] } : { id: order.status };
        return {
            order: { ...order, status: s },
            drivers,
            vehicles: vehicleItems
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
