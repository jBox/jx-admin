const fs = require("fs-extra");

const gb = global;

const readManifest = (manifestFile) => {
    if (!manifestFile) {
        return Promise.resolve({});
    }

    const assets = gb[manifestFile];
    if (assets) {
        return Promise.resolve(assets);
    }

    return fs.readFile(manifestFile, { encoding: "utf8" }).then((data) => {
        if (data) {
            return gb[manifestFile] = JSON.parse(data);
        }

        return gb[manifestFile] = {};
    }).catch(() => Promise.resolve({}));
};

module.exports = (manifestFile) => {
    return readManifest(manifestFile)
        .then((manifest) => (path) => (manifest[path] || path))
        .catch(() => Promise.resolve((path) => path));
};