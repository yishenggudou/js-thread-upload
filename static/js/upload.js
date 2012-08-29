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
         //reader.readAsArrayBuffer(fileobj);
         //reader.onload = function(e){
         var URL = 'http://qss.qiyi.domain/upx',list = [],worker_tasks=[];
         $.ajax({
                type:"POST",
                url:URL,
                data:{file_size:fileobj.size},
                dataType:'json',
                crossDomain: true,
                success:function(data){
                    console.log(["revice task from serer",data]);
                    var url="http://qss.qiyi.domain/upu";
                    for  (task_id in data.bitmap){
                        var worker = new Worker('/static/js/worker.js');
                        task  = data.bitmap[task_id];
                        data.task_id = task_id;
                        var buff = fileobj.slice(task[1],task[2]);
                        var work = {worker_index:task_id,buff:buff,url:url,task:task,upx:data};
                        //console.log(work,buff);
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
         return false;
     })
})
