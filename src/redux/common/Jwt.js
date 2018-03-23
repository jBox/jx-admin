import jwtDecode from "jwt-decode";
import isObject from "lodash/isObject";
import fetch from "chaos-fetch";

function memoryStorage() {
    this.data = {};
    this.getItem = (key) => {
        return this.data[key];
    }
    this.setItem = (key, value) => {
        this.data[key] = value;
    }
    this.removeItem = (key) => {
        delete this.data[key];
    }
}

const getBaseUrl = () => {
    if (typeof document !== "undefined") {
        const item = document.querySelector(`meta[name="API_BASE_URL"]`);
        if (item && item.content) {
            return item.content;
        }
    }

    return "";
};

function Jwt() {
    const baseUrl = getBaseUrl();
    const key = "__JWT_";
    const storage = {
        local: typeof localStorage !== "undefined" ? localStorage : new memoryStorage(),
        session: typeof sessionStorage !== "undefined" ? sessionStorage : new memoryStorage()
    };

    const getToken = () => {
        const local = storage.local.getItem(key);
        const session = storage.session.getItem(key);
        if (local) {
            return JSON.parse(local);
        } else if (session) {
            return JSON.parse(session);
        }

        return {};
    };

    const setToken = (value, rememberme) => {
        let str = "";
        if (isObject(value)) {
            const { token, refresh } = value;
            const data = { token, refresh, rememberme };
            if (token) {
                const { user, exp } = jwtDecode(token) || {};
                data.user = user;
                data.exp = exp;
            }

            str = JSON.stringify(data);
        }

        if (rememberme) {
            storage.local.setItem(key, str)
        } else {
            storage.session.setItem(key, str);
        }
    };

    this.save = (value, rememberme) => setToken(value, rememberme);

    this.verify = () => {
        const now = Date.now() / 1000;
        const { exp, token, user } = getToken();
        if (exp > now) {
            return { token, user };
        }

        return null;
    };

    this.refresh = () => {
        const { refresh, rememberme } = getToken();
        if (!refresh) {
            return Promise.reject({ message: "Unauthorized Error" });
        }

        const url = `${baseUrl}/api/oauth/refresh`;
        const request = {
            method: "POST",
            body: { token: refresh },
            headers: { "Content-Type": "application/json" }
        };
        return fetch(url, request).then((res) => {
            setToken(res.data, rememberme);
            const token = getToken();
            return { token: token.token, user: token.user };
        });
    };

    this.clear = () => {
        storage.local.removeItem(key);
        storage.session.removeItem(key);
    };
}

const jwt = new Jwt();

export default jwt;