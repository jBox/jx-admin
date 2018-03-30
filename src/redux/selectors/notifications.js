import { createSelector } from "reselect";

export const calloutsSelector = createSelector(
    (state) => state.notifications,
    (notifications) => {

        return { callouts: notifications.callouts.filter((callout) => callout.active) };
    }
);
