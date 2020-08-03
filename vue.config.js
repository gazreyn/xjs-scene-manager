module.exports = {
    publicPath: "",
    pages: {
        index: {
            entry: "src/main.js",
            template: "public/index.html",
            filename: "index.html",
            title: "Scene Re-order Extension",
            chunks: ["chunk-vendors", "chunk-common", "index"]
        }
    },
    chainWebpack: config => {
        if (process.env.NODE_ENV !== "production") return;
        config.plugin("html-index").tap(args => {
            args[0].filename = "Scene Manager.html";
            return args;
        });
    }
};
