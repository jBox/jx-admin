import jwtDecode from "jwt-decode";
import isObject from "lodash/isObject";
import fetch from "chaos-fetch";

class MemoryStorage {
    constructor() {
        this.data = {};
    }
    getItem(key) {
        return this.data[key];
    }
    setItem(key, value) {
        this.data[key] = value;
    }
    removeItem(key) {
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
    const KEY = "__JWT_";
    const storage = {
        local: typeof localStorage !== "undefined" ? localStorage : new MemoryStorage(),
        session: typeof sessionStorage !== "undefined" ? sessionStorage : new MemoryStorage()
    };

    const getToken = () => {
        const local = storage.local.getItem(KEY);
        const session = storage.session.getItem(KEY);
        if (local) {
            return { ...JSON.parse(local), rememberme: true };
        } else if (session) {
            return JSON.parse(session);
        }

        return { token: {} };
    };

    const setToken = (token, rememberme) => {
        if (isObject(token)) {
            try {
                const data = { token };
                const { exp, id, nickname, roles } = jwtDecode(token.access_token) || {};
                data.expiresAt = exp;
                data.user = { id, nickname, roles };

                const str = JSON.stringify(data);
                if (rememberme) {
                    storage.local.setItem(KEY, str)
                } else {
                    storage.session.setItem(KEY, str);
                }
            } catch (ex) {
                console.error("Save jwt failed.", ex);
            }
        }
    };

    this.save = (token, rememberme) => setToken(token, rememberme);

    this.verify = () => {
        const now = Date.now() / 1000;
        const { expiresAt, token } = getToken();
        if (expiresAt > now) {
            return token;
        }

        return null;
    };

    this.user = () => {
        const { user } = getToken();
        return user;
    };

    this.refresh = () => {
        const { token: { refresh_token }, rememberme } = getToken();
        if (!refresh_token) {
            return Promise.reject("Refresh tokon error");
        }

        const url = `${baseUrl}/oauth/refresh`;
        const request = {
            method: "POST",
            body: { token: refresh_token },
            headers: { "Content-Type": "application/json" }
        };
        return fetch(url, request).then((res) => {
            setToken(res.data, rememberme);
            const { token } = getToken();
            return token;
        }).catch((error) => {
            const interError = error.error || error;
            return Promise.reject(interError.message);
        });
    };

    this.clear = () => {
        storage.local.removeItem(KEY);
        storage.session.removeItem(KEY);
    };
}

const jwt = new Jwt();

export default jwt;