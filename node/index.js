const http = require('http');
const fs = require('fs');
const { uploadFile } = require('./upload');

http.createServer((request, response) => {
    const { url, method } = request;
    if (/\.ico$/.test(url)) {
        response.end('');
        return;
    }
    let params = '';
    response.setHeader('Access-Control-Allow-Origin', '*');
    response.setEncoding('utf-8');
    // 获取图片/文件
    if (/^\/(images|files)\//.test(url)) {
        const p = '.' + url;
        if (fs.existsSync(p)) {
            const readable = fs.createReadStream(p);
            readable.pipe(response);
        } else {
            response.code = 404;
            response.end('');
        }
        // response.pipe(readable);
        // console.log(url);
        return;
    }
    // 上传文件
    if (/^\/upload/.test(url)) {
        request.setEncoding('binary');
        request.on('data', chunk => {
            params += chunk;
        });
        request.on('end', err => {
            const result = uploadFile(request, response, params);
            const { fileName, content } = result;
            const imgReg = /\.(jpe?g|png|gif|webp)$/;
            let url;
            if (imgReg.test(fileName)) {
                url = `./images/${fileName}`;
            } else {
                url = `./files/${fileName}`;
            }
            fs.writeFile(url, content, err => {
                const info = {};
                if (err) {
                    info.code = -1;
                    info.msg = '上传文件失败';
                } else {
                    info.code = 200;
                    info.msg = '文件上传成功';
                    info.data = {
                        url
                    };
                }
                response.end(JSON.stringify(info));
            });
        });
    }
}).listen(2233, () => {
    console.log('启动：http://192.168.50.166:2233');
});
