import { createSelector } from "reselect";
import { userHomePage } from "../common";

export default createSelector(
    (state, props) => {
        const { authenticated, user } = state.auth;
        const { location } = props;
        return {
            authenticated,
            returnUrl: userHomePage(user, location)
        };
    },
    (state) => state.login,
    (auth, login) => {
        return { ...login, auth };
    }
);
