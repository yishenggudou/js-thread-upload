/*worker.js use for thread task
 * https://developer.mozilla.org/en-US/docs/DOM/Using_web_workers?redirectlocale=en-US&redirectslug=Using_web_workers
 * https://developer.mozilla.org/en-US/docs/DOM/Worker
 */
/*
POST /cgi-bin/upload.pl HTTP/1.1
Accept: application/vnd.ms-excel, application/msword, application/vnd.
+ms-powerpoint, image/gif, image/x-xbitmap, image/jpeg, image/pjpeg, a
+pplication/pdf, 
Referer: http://deville/cgi-bin/upload.pl
Accept-Language: en-us
Content-Type: multipart/form-data; boundary=--------------------------
+-7d03135102b8
Accept-Encoding: gzip, deflate
User-Agent: Mozilla/4.0 (compatible; MSIE 5.01; Windows NT)
Host: deville
Content-Length: 316
Connection: Keep-Alive

-----------------------------7d03135102b8
Content-Disposition: form-data; name="file"; filename="D:\hess\dev\www
+\notes\hello.txt"
Content-Type: text/plain

Hello there

-----------------------------7d03135102b8
Content-Disposition: form-data; name="done"

done
-----------------------------7d03135102b8--
*/
function sendbuff (url,buff,range){
      var xmlhttp=new XMLHttpRequest();
      xmlhttp.open('POST',url,true);
      var boundary = "xxxxxxxxx";
      var filename = "qsstest";
      //http://www.endum.net/xmlhttprequestsend-files-without-multipart-fo
      xmlhttp.setRequestHeader("range",''+range[0]+'-'+range[1]);
      xmlhttp.setRequestHeader("filename",filename);
      /*
      xmlhttp.setRequestHeader("Content-Type", "multipart/form-data, boundary="+boundary);
      var body = "--" + boundary + "--\r\n";
      body += 'Content-Disposition: form-data; name="contents"; filename="' + filename + '"\r\n';
      body += "Content-Type: application/octet-stream\r\n\r\n";
      body += buff + "\r\n";
      body += "--" + boundary + "--";
      xmlhttp.send(body);
      */
      /*
      var bb = new BlobBuilder();
      bb.append(buff);
      xmlhttp.send(bb.getBlob());
      */
      xmlhttp.send(buff);
      //xmlhttp.sendAsBinary(buff);
      //http://blog.kotowicz.net/2011/04/how-to-upload-arbitrary-file-contents.html
 };
self.onmessage = function (oEvent) {
  if (oEvent.data instanceof Object) {
        //oEvent.data is a {buff:BuffArraay;url:'/'} like object;
        var buff = oEvent.data.buff;
        var url = oEvent.data.url;
        sendbuff(url,buff,oEvent.data.range);
  } else {
    //pass
  }
};
