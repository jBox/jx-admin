import Jwt from "./Jwt";
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
    return user.roles.length === 1 && user.roles.includes("driver");
}

const manager = (user) => {
    return user.roles.includes("super") || user.roles.includes("admin");
}

export const userHomePage = (user, location) => {
    let returnUrl = null;
    if (user && user.roles && user.roles.length > 0) {
        returnUrl = getReturnUrl(location);
        if (returnUrl === "/") {
            if (driverOnly(user)) {
                returnUrl = "/driver";
            } else if (manager(user)) {
                returnUrl = "/dashboard";
            } else {
                returnUrl = null;
            }
        }
    }

    return returnUrl;
};

export const authenticate = () => {
    const token = Jwt.verify();
    if (token) {
        return { verified: true };
    }

    return { redirect: "/landing?returnUrl={0}" };
};

export const driverAuthorize = () => {
    const auth = authenticate();
    if (auth.verified) {
        const user = Jwt.user();
        if (user.roles.length === 1 && user.roles.includes("driver")) {
            return { verified: true };
        }

        return { redirect: "/access/denied" };
    }

    return auth;
};

export const adminAuthorize = () => {
    const auth = authenticate();
    if (auth.verified) {
        const user = Jwt.user();
        if (user.roles.includes("admin") || user.roles.includes("super")) {
            return { verified: true };
        }

        return { redirect: "/access/denied" };
    }

    return auth;
};