### api 说明文档

> 线上部署 https://btea.site/fileApi

**_上传文件_**
`/upload`  
_method_： `post`  
_参数_：`formdata`

**生成 svg 图片**  
`/image`  
_method_: `get`  
_参数_: `/image?username=btea&type=text&text=天空高远，大风吟唱······`

**获取图片内容**  
`/images/`  
_method_: `get`  
_参数_: `fileName` => `/images/c.jpg`

**获取文件内容**  
`/files/`  
_method_: `get`  
_参数_: `fileName` => `/files/a.txt`
