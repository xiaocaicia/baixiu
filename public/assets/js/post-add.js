//实现获得下拉列表的文章分类
$.ajax({
    url:'/categories',
    type:'get',
    success:function(res){
       // console.log(res);
       var html=template('categoryTpl',{data:res});
       //渲染
       $('#category').html(html);
    }
})
//显示文字封面图片上传功能 然后把图片的路劲放进去
$('#feature').on('change',function(){
    //因为默认得上传得图片有很多 所以需要选择第一个
     var file=this.files[0];
    // console.log(file);
    //这里需要实现二进制下载
    var formData=new FormData();
    //这里需要上传东西到formData里面 这里得cover是自己设置得名字
    formData.append('cover',file);
    //发送请求
    $.ajax({
        url:'/upload',
        type:'post',
        data:formData,
        processData:false,
        contentType:false,
        success:function(res){
            $('#thumbnail').val(res[0].cover)
        }
    })
})

//发表文章进行提交
$('#addForm').on('submit',function(){
    //获取管理员在表单输入得内容 
    var formData=$(this).serialize();
    //发送请求
    $.ajax({
        type:'post',
        url:'/posts',
        data:formData,
        success:function(){
            location.href = '/admin/posts.html'
        }
    })
    //阻止表单得默认行为得发生
     return false;
})