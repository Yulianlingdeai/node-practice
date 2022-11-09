const fs = require("fs");

// 异步读取文件
fs.readFile("cat.jpg", (err, data) => {
    if (err) {
        console.log(err);
    }
    console.log(data);
});
// 同步读取文件
const file = fs.readFileSync("cat.jpg", "utf-8");
console.log(file);
