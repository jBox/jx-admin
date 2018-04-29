import { createSelector } from "reselect";

export default createSelector(
    (state) => state.manage.vehicles,
    (state) => state.settings.models,
    (vehicles, models) => {

        return {
            vehicles,
            models
        };
    }
);
