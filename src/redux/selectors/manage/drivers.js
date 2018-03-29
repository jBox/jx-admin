import { createSelector } from "reselect";

export default createSelector(
    (state) => state.manage.drivers,
    (drivers) => {

        return {
            drivers
        };
    }
);
