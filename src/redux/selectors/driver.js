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

export default createSelector(
    (state) => state.driver,
    (driver) => {
        const { current } = driver;
        if (isEmpty(current)) {
            return { data: null };
        }

        const dateFrom = current.departureTime.toDate();
        const duration = Number(current.duration);
        const progress = (current.progress || []).map((item) => (item.date));
        const terms = calcTerms(dateFrom, duration, progress);
        return {
            data: { ...current, terms }
        };
    }
);
