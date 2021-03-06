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


/*
* worker available https://developer.mozilla.org/en-US/docs/DOM/Worker/Functions_available_to_workers
*/




//https://developer.mozilla.org/en-US/docs/DOM/Using_web_workers?redirectlocale=en-US&redirectslug=Using_web_workers
//importScripts("/static/js/formdata.js)
importScripts("/static/js/xhr-formdata.js")

//fordata see:https://github.com/francois2metz/html5-formdata
//http://stackoverflow.com/questions/4093722/upload-a-file-in-a-google-chrome-extension

function sendbuff (worker_index,url,buff,task,upx){
      var xmlhttp=new XMLHttpRequest();
      xmlhttp.open('POST',url,true);
      var filename = "qsstest";
      //http://www.endum.net/xmlhttprequestsend-files-without-multipart-fo
      xmlhttp.setRequestHeader("File-Range",''+task[1]+'-'+task[2]);
      xmlhttp.setRequestHeader("Filename",filename);
      var task_info = upx.fid+'_'+upx.task_id+'_'+task[1]+'-'+task[2]+'_'+task[3]
      xmlhttp.setRequestHeader("Task-Info",task_info);
      xmlhttp.setRequestHeader("Qss-Upx",'QSS_UPX');
      xmlhttp.onload = function(e){
            if (this.status == 200) {
                    self.postMessage({worker_index:worker_index,status:true});               
                }
            else{
                    self.postMessage({worker_index:worker_index,status:false});               
                }
        }
      xmlhttp.send(buff);
        
      //xmlhttp.sendAsBinary(buff);
      //http://blog.kotowicz.net/2011/04/how-to-upload-arbitrary-file-contents.html
 };
self.onmessage = function (oEvent) {
  if (oEvent.data instanceof Object) {
        //oEvent.data is a {buff:BuffArraay;url:'/'} like object;
        var buff = oEvent.data.buff;
        var url = oEvent.data.url;
        sendbuff(oEvent.data.worker_index,url,buff,oEvent.data.task,oEvent.data.upx);
  } else {
    //pass
  }
};
