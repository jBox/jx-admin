"use strict";

const babel = require("babel-core/register");
babel({
    only: /src/,
});

// teaches node.js to load css files
require("css-modules-require-hook/preset");

const requireDefault = (esModule) => {
    return esModule.default || esModule;
};

const Path = require("path");
const chaos = requireDefault(require("chaos-magician"));
const routes = requireDefault(require("../src/routes"));
const middlewares = requireDefault(require("../src/redux/middleware"));
const reducers = requireDefault(require("../src/redux/reducers"));

const express = require("express");
const router = express.Router();
const cv = require("config-vars");
const foundation = require("./foundation");

const apiBaseUrl = cv.env.jx.inExternalHost;
const CompanyName = cv.env.jx.company;

/* GET pages. */
router.get("/:any*?", foundation, (req, res, next) => {
    const { originalUrl } = req;
    const routerContext = {};
    const preloadedState = {
        settings: { apiBaseUrl, ...req.foundation }
    };
    const magician = chaos(routes, reducers, middlewares);
    magician.serverRender({ url: originalUrl, routerContext, preloadedState }).done((comp) => {
        if (routerContext.url) {
            return res.redirect(routerContext.url);
        }

        const models = {
            title: CompanyName,
            apiBaseUrl,
            initialState: JSON.stringify(comp.initials.__INITIAL_STATE__).replace(/</g, "\\x3c"),
            ...comp.components
        };

        // Send the rendered page back to the client
        res.render("index", { models });
    });
});

module.exports = router;