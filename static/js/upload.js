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
            //用于上传之前获取contlength
            //URL :
            var URL = 'http://qss.qiyi.domain/upx',list = [],worker_tasks=[];
            for  (var i=0;i<=parseInt(result.byteLength/step)+1;i++){
                list.push([i*step,(i+1)*step]);
                }
            $.ajax({
                type:"POST",
                url:URL,
                data:{file_size:result.byteLength,files:list},
                dataType:'json',
                crossDomain: true,
                success:function(data){
                    console.log(["revice task from serer",data]);
                    var url="http://qss.qiyi.domain/upu";
                    for  (task_id in data.bitmap){
                        task  = data.bitmap[task_id];
                        data.task_id = task_id;
                        var buff = result.slice(task[1],task[2]);
                        var work = {worker_index:task_id,buff:buff,url:url,task:task,upx:data};
                        console.log(work,buff);
                        worker.postMessage(work)
                        //console.log(['revice a buff from worker',buff,url]);
                        worker.onmessage = function(e){
                            worker_tasks.push(e.data);
                            if (!e.data.status){
                                worker.postMessage(wrok)
                            }                         
                        }
                    }
                }
            });
         }
         return false;
     })
})
