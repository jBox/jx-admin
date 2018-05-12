import { createSelector } from "reselect";
import isEmpty from "lodash/isEmpty";
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

const localizeSchedule = (trip, apiBaseUrl) => {

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

    const dateFrom = trip.departureTime.toDate();
    const duration = Number(trip.duration);
    const progress = (trip.schedule.progress || []).map((item) => (item.date));
    const terms = calcTerms(dateFrom, duration, progress);
    return {
        ...trip.schedule,
        progress: picsProgress(trip.schedule.progress || []),
        terms
    };
}

export const tripsSelector = createSelector(
    (state) => state.driver,
    (state) => state.settings.apiBaseUrl,
    (driver, apiBaseUrl) => {
        const { trips } = driver;

        const data = trips.map((trip) => {
            const dateFrom = trip.departureTime.toDate();
            const duration = Number(trip.duration);
            const progress = (trip.schedule.progress || []).map((item) => (item.date));
            const terms = calcTerms(dateFrom, duration, progress);
            return {
                ...trip,
                terms,
                schedule: localizeSchedule(trip, apiBaseUrl)
            };
        });
        return { data };
    }
);

export default createSelector(
    (state) => state.driver,
    (state) => state.settings.apiBaseUrl,
    (driver, apiBaseUrl) => {
        const { current } = driver;
        if (isEmpty(current)) {
            return { data: null };
        }

        const dateFrom = current.departureTime.toDate();
        const duration = Number(current.duration);
        const progress = (current.schedule.progress || []).map((item) => (item.date));
        const terms = calcTerms(dateFrom, duration, progress);
        return {
            data: {
                ...current,
                terms,
                schedule: localizeSchedule(current, apiBaseUrl)
            }
        };
    }
);
