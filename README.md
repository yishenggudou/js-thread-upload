js-thread-upload
================

use javascript `xmlrequest` and `worker` to upload large file.


==简介==

使用`FileReader`读取文件为`ArrayBuffer`对象
切片分割使用worker上传

==note==
+ IE下应该不支持worker线程
+ js`ArrayBuffer`读取文件的模式不祥

