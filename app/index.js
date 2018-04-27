"use strict";

const express = require("express");
const Path = require("path");
const favicon = require("serve-favicon");
const logger = require("morgan");
const bodyParser = require("body-parser");
const cv = require("config-vars");

const viewEngine = require("./engines/html");
const router = require("./router");

const app = express();
const ROOT = Path.resolve(__dirname, "../");

// sets react rendering engine
app.engine("html", viewEngine);
app.set("views", Path.resolve(ROOT, "app/views"));
app.set("manifest", Path.resolve(ROOT, "static/dist/manifest.json"));
app.set("view engine", "html");

// uncomment after placing your favicon in /public
app.use(favicon(Path.resolve(ROOT, "static", "favicon.ico")));
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// streams static files
app.use("/static", express.static(Path.resolve(ROOT, "static")));

// setup router
app.use(router);

// catch 404 and forward to error handler
app.use((req, res, next) => {
    res.render("404");
});

// error handler
app.use((err, req, res, next) => {
    console.error(err);
    res.render("error");
});

module.exports = app;
