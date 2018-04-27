const cv = require("config-vars");

const version = require("../package").version;

module.exports = cv.setup((getenv) => ({
    version,
    port: getenv("JX_ADMIN_PORT"),
    host: getenv("JX_ADMIN_HOST"),
    jx: {
        company: getenv("JX_COMPANY_NAME"),
        inPort: getenv("JX_IN_PORT"),
        inExternalHost: getenv("JX_IN_EXTERNAL_HOST")
    }
}));