import { createSelector } from "reselect";
import Qs from "qs";

const getReturnUrl = (location) => {
    if (location && location.search) {
        const query = qs.parse(location.search.substr(1));
        const returnuUrlKey = Object.keys(query).find(key => /^returnurl$/ig.test(key));
        if (returnuUrlKey) {
            return query[returnuUrlKey] || "/";
        }
    }

    return "/";
};

export default createSelector(
    (state, props) => {
        const { authenticated } = state.auth;
        const { location } = props;
        const returnUrl = getReturnUrl(location);
        return { authenticated, returnUrl };
    },
    (state) => state.login,
    (auth, login) => {
        return { ...login, auth };
    }
);
