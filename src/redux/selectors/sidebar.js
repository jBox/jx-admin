import { createSelector } from "reselect";
import { manage, driver } from "../../navs";

export default createSelector(
    (state) => state.auth,
    (auth) => {
        const { authenticated, user } = auth;
        let navs = [];
        if (authenticated) {
            if (user.roles.includes("super") || user.roles.includes("admin")) {
                navs = manage;
            } else if (user.roles.includes("driver")) {
                navs = driver;
            }
        }

        return { authenticated, user, navs };
    }
);