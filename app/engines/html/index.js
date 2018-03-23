const fs = require("fs-extra");
const manifestFactory = require("./manifest");

const htmls = {};

const readHtml = (path) => {
    const fsOptions = { encoding: "utf8" };
    if (process.env.NODE_ENV === "development") {
        return fs.readFile(path, fsOptions);
    }

    if (htmls[path]) {
        return Promise.resolve(htmls[path]);
    } else {
        return fs.readFile(path, fsOptions).then((data) => {
            return htmls[path] = data;
        });
    }
};

const translate = (models = {}) => (token) => {
    const tokens = token.split(".");
    if (tokens.length === 1) {
        return models[token];
    }

    const piece = tokens[0];
    const rest = models[piece];
    const restToken = tokens.slice(1).join(".");
    return translate(rest)(restToken);
};

/**
 * @param {string}   file
 * @param {object}   opts
 * @param {function} cb
 */
module.exports = (file, opts, cb) => {
    const tasks = [
        Promise.resolve(translate(opts.models)),
        manifestFactory(opts.settings.manifest),
        readHtml(file)
    ];
    Promise.all(tasks).then(([models, manifest, html]) => {
        const markup = html.replace(/{{[\w\.-\d]+}}/ig, (m) => {
            const [, token] = /{{(.+?)}}/ig.exec(m);

            if (/.*?\.(js|css)$/ig.test(token)) {
                return manifest(token);
            }

            return models(token);
        });

        cb(null, markup);
    }).catch((error) => cb(error));
};