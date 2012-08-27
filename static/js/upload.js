$(document).ready(function(){
     //var a='<input name=\"test\" type=file   id="qsstest"/>';
     //$('body').prepend(a);
     //https://developer.mozilla.org/en-US/docs/JavaScript_typed_arrays/ArrayBuffer
     //http://robertnyman.com/2010/03/25/using-html5-web-workers-to-have-background-computational-power/
     var worker = new Worker('/static/js/worker.js');
     worker.onmessage = function(event) {
          //console.log("Called back by the worker!\n");
     };
     $('#filesubmit').click(function(){
         var fileobj = document.getElementById('qsstest').files[0];
         var reader  = new FileReader();
         window.R = reader;
         reader.readAsArrayBuffer(fileobj);
         reader.onload = function(e){
            var result=e.target.result;
            var buff = result;
            var step = parseInt(reader.result.byteLength/50);//btye
            var buffs = [];
            var uploaddir = '/file/';
            var url = uploaddir + fileobj.name
            window.buffs = buffs;
            for  (var i=0;i<=parseInt(result.byteLength/step)+1;i++){
                var buff = result.slice(i*step,(i+1)*step);
                worker.postMessage({buff:buff,url:url,range:[i*step,(i+1)*step]})
                //console.log(['revice a buff from worker',buff,url]);
            }
         }
         return false;
     })
})
