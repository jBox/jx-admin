import { createSelector } from "reselect";

export default createSelector(
    (state) => state.manage.orders,
    (state) => state.manage.drivers,
    (state) => state.manage.vehicles,
    (state) => state.manage.models,
    (orders, drivers, vehicles, models) => {
        const vehicleItems = vehicles.map((item) => {
            const model = models[item.model] || { label: "" };
            return { ...item, model: model.label };
        });

        return {
            orders: orders.data,
            drivers,
            vehicles: vehicleItems,
            hasMore: !!orders.next
        };
    }
);
