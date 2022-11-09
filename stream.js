const fs = require('fs');

const rs = fs.createReadStream('cat.jpg', 'utf-8')

rs.on('data', (chunk) => {
    console.log('data', chunk)
})

rs.on('end', () => {
    console.log('END');
})

rs.on('error', function (err) {
    console.log('ERROR: ' + err);
});

// fs.createWriteStream
// rs.pipe(ws);

// 获取文件大小，创建时间等信息
fs.stat('cat.jpg', function (err, stat) {
    if (err) {
        console.log(err);
    } else {
        // 是否是文件:
        console.log('isFile: ' + stat.isFile());
        // 是否是目录:
        console.log('isDirectory: ' + stat.isDirectory());
        if (stat.isFile()) {
            // 文件大小:
            console.log('size: ' + stat.size);
            // 创建时间, Date对象:
            console.log('birth time: ' + stat.birthtime);
            // 修改时间, Date对象:
            console.log('modified time: ' + stat.mtime);
        }
    }
});