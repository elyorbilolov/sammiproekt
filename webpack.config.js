module.exports = {
    mode: "development",
    entry: "./src/js/script.js",
    output: {
        path: __dirname + "/dist/js",
        filename: "./dist/bundle.js",
    },
    watch: true,
    devtool: "source-map",
    module: {},
};
