import { createSelector } from "reselect";

export default createSelector(
    (state) => state.auth,
    (auth) => {
        return { authenticated: auth.authenticated, user: auth.user };
    }
);