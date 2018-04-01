import { createSelector } from "reselect";

export default createSelector(
    (state) => state.manage.vehicles,
    (state) => state.manage.models,
    (vehicles, models) => {

        return {
            vehicles,
            models
        };
    }
);
