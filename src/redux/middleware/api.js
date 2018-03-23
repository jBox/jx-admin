import { API } from "../actions/ActionTypes";
import fetch from "chaos-fetch";
import qs from "qs";

const request = (endpoint, { token }) => {
    const headers = { "cache-control": "no-cache", ...(endpoint.headers || {}) };

    if (!headers["content-type"]) {
        headers["content-type"] = "application/json";
    }

    if (token) {
        headers["authorization"] = `${token.token_type} ${token.access_token}`;
    }

    const options = {
        method: endpoint.method,
        headers,
        body: endpoint.body
    };

    return fetch(endpoint.url, options);
};

const noop = (arg) => (arg);

const perfect = (apiBaseUrl, endpoint) => {
    if (typeof endpoint === "string") {
        return { url: `${apiBaseUrl}${endpoint}`, method: "GET" };
    }

    if (typeof endpoint === "object" && endpoint) {
        return { method: "GET", ...endpoint, url: `${apiBaseUrl}${endpoint.url}` };
    }

    throw new Error("Invalid endpoint.");
};

// A Redux middleware that interprets actions with CALL info specified.
// Performs the call and promises when such actions are dispatched.
export default ({ dispatch, getState }) => next => action => {
    if (action.type !== API) {
        return next(action);
    }

    let { endpoint } = action;
    const beforeCb = action.before || noop;
    const successCb = action.success || noop;
    const errorCb = action.error || noop;
    const state = getState();
    const { settings: { apiBaseUrl } } = state;

    if (typeof endpoint === "function") {
        endpoint = endpoint(state);
    }

    endpoint = perfect(apiBaseUrl, endpoint);

    try {
        beforeCb({ dispatch, getState });
    } catch (ex) {
        console.error(ex);
    }

    const { auth: { token } } = state;
    return request(endpoint, { token }).then((res) => {
        console.log(res);
        return successCb({ dispatch, getState, data: res.data });
    }).catch((error) => {
        console.error(error);
        return errorCb({ dispatch, getState, error: error.message });
    })
}