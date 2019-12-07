//添加上传得文件
$('#file').on('change',function(){
   // alert(111)
   var file=this.files[0];
    //console.log(file);
    //实现二进制上传功能
    var formData=new FormData();
    formData.append('cover',file);
    //发送请求
    $.ajax({
        type:'post',
        url:'/upload',
        data:formData,
        processData:false,
        contentType:false,
        success:function(res){
            console.log(res)
            $('#image').val(res[0].cover)
         
        }
    })
})
//点击提交得到内容上传给数据库
$('#slidesFrom').on('submit',function(){
     //获得用户输入得
     var formData=$(this).serialize();
     $.ajax({
         type:'post',
         url:'/slides',
         data:formData,
         success:function(){
             location.reload();
         }
     })
     //提交 添加行为都是要阻止表单得默认行为得发生
     return false;
})

//把获得得数据利用模板字符串渲染到页面上
$.ajax({
    type:'get',
    url:'/slides',
    success:function(res){
            console.log(res)
            var html=template('slidesTpl',{data:res});
            $('#slidesBox').html(html)
    }
})
//删除轮播图
$('#slidesBox').on('click',".delete",function(){
    var id=$(this).attr('data-id');
    if(confirm("您确定要删除这个轮播图吗")){
        $.ajax({
            type:'delete',
            url:'/slides/'+id,
            success:function(){
                location.reload();
            }
        })
    }
})