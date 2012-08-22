js-thread-upload
================

use javascript `xmlrequest` and `worker` to upload large file.


##简介

使用`FileReader`读取文件为`ArrayBuffer`对象
切片分割使用worker上传

##使用
`python server.py`

浏览器中打开`http://localhost:8080/`

##note
+ IE下应该不支持worker线程
+ js`ArrayBuffer`读取文件的模式不祥
+ 超大文件上传效率有待验证

