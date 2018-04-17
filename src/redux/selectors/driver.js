import { createSelector } from "reselect";

export default createSelector(
    (state) => state.driver,
    (driver) => {
        return { trips: driver.trips };
    }
);
