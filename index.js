let fs = require("fs");
let path = require("path");
let express = require("express");
let formidable = require("formidable");

let app = express();

/**
 * 存储文件方法
 */
function saveFile(files, callback) {
    // 定义存储文件地址
    let file = files.file;
    console.log("file", file);
    console.log("__dirname", __dirname);
    if (!file) {
        callback("不是文件!");
        return;
    }
    let savePath = path.resolve(__dirname, `./src/${file.originalFilename}`);
    console.log("savePath==>>>", savePath);
    let sourcePath = file.filepath;
    console.log("sourcePath", sourcePath);

    // 通过fs.rename方法转存文件
    if (fs.existsSync(savePath)) {
        console.log("路径已存在");
        callback("路径已存在");
    } else {
        fs.rename(sourcePath, savePath, (err) => {
            if (err) {
                console.log("图片保存失败");
            }
            console.log("图片保存成功");
            callback();
        });
    }
}

app.all("*", function (req, res, next) {
    //设置允许跨域的域名，*代表允许任意域名跨域
    res.header("Access-Control-Allow-Origin", "*");
    //允许的header类型
    res.header("Access-Control-Allow-Headers", "content-type");
    //跨域允许的请求方式
    res.header("Access-Control-Allow-Methods", "DELETE,PUT,POST,GET,OPTIONS");
    if (req.method.toLowerCase() == "options") res.send(200); //让options尝试请求快速结束
    else next();
});

app.get("/", function (req, res) {
    // res.send("Hello World!");
    res.sendFile(__dirname + "/" + "index.html");
});

app.get("/static/*.jpg", function (req, res) {
    res.sendFile(__dirname + "/" + req.url);
});

app.post("/upload_file", (request, response) => {
    let form = new formidable.IncomingForm();
    form.parse(request, function (err, fields, files) {
        console.log("err==>>", err);
        saveFile(files, (err) => {
            response.status(err ? 500 : 200).json({
                code: 200,
                msg: err || "上传图片成功"
            });
        });
    });
});

app.listen(3000, function () {
    console.log("Example app listening on port 3000!");
});
