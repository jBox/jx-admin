import { createSelector } from "reselect";

export default createSelector(
    (state) => state.login,
    (login) => {
        return { ...login };
    }
);
