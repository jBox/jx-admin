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
            orders: orders.data.map((order) => ({
                ...order, schedules: order.schedules.map((schedule) => {
                    const dateFrom = order.departureTime.toDate();
                    const duration = Number(order.duration);
                    const progress = (schedule.progress || []).map((item) => (item.date));
                    const terms = calcTerms(dateFrom, duration, progress);
                    return { ...schedule, terms };
                })
            })),
            drivers: drivers.data,
            vehicles: vehicleItems,
            hasMore: !!orders.next
        };
    }
);
