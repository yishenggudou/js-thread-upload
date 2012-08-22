/*worker.js use for thread task
 * https://developer.mozilla.org/en-US/docs/DOM/Using_web_workers?redirectlocale=en-US&redirectslug=Using_web_workers
 * https://developer.mozilla.org/en-US/docs/DOM/Worker
 */
function sendbuff (url,buff,range){
      var xmlhttp=new XMLHttpRequest();
      xmlhttp.open('POST',url,true);
      //http://www.endum.net/xmlhttprequestsend-files-without-multipart-fo
      xmlhttp.setRequestHeader("range",''+range[0]+'-'+range[1])
      xmlhttp.send(buff);
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
