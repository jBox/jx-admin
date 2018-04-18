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
    (state) => state.driver,
    (driver) => {

        return {
            trips: driver.trips.map((trip) => {
                const dateFrom = trip.departureTime.toDate();
                const duration = Number(trip.duration);
                const progress = (trip.progress || []).map((item) => (item.date));
                const terms = calcTerms(dateFrom, duration, progress);
                return { ...trip, terms };
            })
        };
    }
);
