import { createSelector } from "reselect";
import { userHomePage } from "../common";

export default createSelector(
    (state, props) => {
        const { authenticated, landing, user } = state.auth;
        const { location } = props;
        return {
            authenticated,
            landing,
            returnUrl: userHomePage(user, location)
        };
    },
    (auth) => {
        return { auth };
    }
);
