import { createSelector } from "reselect";
import isEmpty from "lodash/isEmpty";

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

export const tripsSelector = createSelector(
    (state) => state.driver,
    (driver) => {
        const { trips } = driver;

        const data = trips.map((trip) => {
            const dateFrom = trip.departureTime.toDate();
            const duration = Number(trip.duration);
            const progress = (trip.schedule.progress || []).map((item) => (item.date));
            const terms = calcTerms(dateFrom, duration, progress);
            return { ...trip, terms };
        });
        return { data };
    }
);

export default createSelector(
    (state) => state.driver,
    (driver) => {
        const { current } = driver;
        if (isEmpty(current)) {
            return { data: null };
        }

        const dateFrom = current.departureTime.toDate();
        const duration = Number(current.duration);
        const progress = (current.schedule.progress || []).map((item) => (item.date));
        const terms = calcTerms(dateFrom, duration, progress);
        return {
            data: { ...current, terms }
        };
    }
);
