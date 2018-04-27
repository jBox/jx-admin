const fetch = require("chaos-fetch");
const cv = require("config-vars");

module.exports = (req, res, next) => {
    const INTERNAL_API_HOST = `http://localhost:${cv.env.jx.inPort}`;
    const statusUrl = `${INTERNAL_API_HOST}/api/orders/status`;
    const modelsUrl = `${INTERNAL_API_HOST}/api/vehicles/models`;

    return Promise.all([fetch(statusUrl), fetch(modelsUrl)]).then(([statusRes, modelsRes]) => {
        req.foundation = { status: statusRes.data, models: modelsRes.data };
        return next();
    }).catch(error => next(error));
};