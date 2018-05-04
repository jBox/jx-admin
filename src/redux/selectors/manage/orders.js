import { createSelector } from "reselect";

const calcTerms = (dateFrom, duration, progress) => {
    const FORMAT = "yyyy-MM-dd";
    const dateStart = new Date(dateFrom);
    const initialDate = dateStart.getDate();
    const terms = [];
    for (let i = 0; i < duration; i++) {
        dateStart.setDate(initialDate + i);
        let dateStr = dateStart.format(FORMAT);
        let inProgress = progress.find(x => x === dateStr);
        if (!inProgress) {
            terms.push(dateStr);
        }
    }

    return terms;
};

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
            orders: orders.data.map((order) => ({
                ...order, schedules: order.schedules.map((schedule) => {
                    const dateFrom = order.departureTime.toDate();
                    const duration = Number(order.duration);
                    const progress = (schedule.progress || []).map((item) => (item.date));
                    const terms = calcTerms(dateFrom, duration, progress);
                    return { ...schedule, terms };
                })
            })),
            models,
            modifications: orders.modifications,
            drivers: drivers.data,
            vehicles: vehicleItems,
            hasMore: !!orders.next
        };
    }
);
