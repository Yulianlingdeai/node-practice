const Vue = require("vue");
const fs = require("fs");
const express = require("express");
const server = express();

const renderer = require("vue-server-renderer").createRenderer({
    template: fs.readFileSync("./index.template.html", "utf-8")
});

const context = {
    title: "vue ssr",
    metas: `
        <meta name="keyword" content="vue,ssr">
        <meta name="description" content="vue srr demo">
    `
};

server.get("/", (req, res) => {
    const app = new Vue({
        data: {
            url: req.url
        },
        template: `<div>访问的 URL 是： {{ url }}</div>`
    });
    renderer.renderToString(app, context, (err, html) => {
        if (err) {
            res.status(500).end("Internal Server Error");
            return;
        }
        console.log(html);
        res.end(html);
    });
});

server.listen(8080, function () {
    console.log("Example app listening on port 8080!");
});
