import { createSelector } from "reselect";

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
