import { createSelector } from "reselect";
import isString from "lodash/isString";

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

const localizeSchedules = (order, apiBaseUrl) => {

    const picsProgress = (progress) => {
        return progress.map((item) => {
            const imgs = item.pics || [];
            return {
                ...item,
                pics: imgs.map((img) => {
                    if (isString(img) && /^\d+$/g.test(img)) {
                        const src = `${apiBaseUrl}/api/images/${img}`;
                        return { id: img, src, thumbnail: `${src}?thumbnail` };
                    }

                    return img;
                })
            };
        });
    };

    return order.schedules.map((schedule) => {
        const dateFrom = order.departureTime.toDate();
        const duration = Number(order.duration);
        const progress = (schedule.progress || []).map((item) => (item.date));
        const terms = calcTerms(dateFrom, duration, progress);
        return {
            ...schedule,
            progress: picsProgress(schedule.progress || []),
            terms
        };
    });
}

export default createSelector(
    (state) => state.manage.orders,
    (state) => state.manage.drivers,
    (state) => state.manage.vehicles,
    (state) => state.settings.models,
    (state) => state.settings.apiBaseUrl,
    (orders, drivers, vehicles, models, apiBaseUrl) => {
        const vehicleItems = vehicles.map((item) => {
            const model = models[item.model] || { label: "" };
            return { ...item, model: model.label };
        });

        return {
            orders: orders.data.map((order) => ({
                ...order, schedules: localizeSchedules(order, apiBaseUrl)
            })),
            models,
            modifications: orders.modifications,
            drivers: drivers.data,
            vehicles: vehicleItems,
            hasMore: !!orders.next
        };
    }
);
