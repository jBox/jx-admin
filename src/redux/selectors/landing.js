import { createSelector } from "reselect";
import qs from "qs";

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

const driverOnly = (user) => {
    return user && user.roles && user.roles.length === 1 && user.roles.includes("driver");
}

export default createSelector(
    (state, props) => {
        const { authenticated, landing, user } = state.auth;
        const { location } = props;

        let returnUrl = getReturnUrl(location);
        if (authenticated &&
            returnUrl === "/" &&
            driverOnly(user)) {
            returnUrl = "/driver";
        }

        return { authenticated, landing, returnUrl };
    },
    (auth) => {
        return { auth };
    }
);
