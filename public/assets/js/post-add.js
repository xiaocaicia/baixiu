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

function getUrl(name){
   // console.log(location.search.substr(1).split('&'));
    var query=location.search.substr(1).split('&');
    for(var i=0;i<query.length;i++){
        var item=query[i].split('=');
        //console.log(item)
        if(item[0]==name){
            return item[1];
        }
    }
    //如果没有得话 返回-1
    return -1;
}
//取文章得详情
var id=getUrl('id');
if(id!=-1)
$.ajax({
    type:'get',
    url:'/posts/'+id,
    success:function(res){
        $.ajax({
            url:'/categories',
            type:'get',
            success:function(categories){
               // console.log(res);
               res.categories=categories;
            //  console.log(res)
               var html=template('modifyTpl',res);
            //   console.log(html);
               //渲染
               $('#partentBox').html(html);
            }
        })
    }
})
//当修改文章表单发生提交行为
$('#partentBox').on('submit','#modifyForm',function(){
     //获取管理员输入得内容
     var fromDate=$(this).serialize();
     var id=$(this).attr('data-id');
     //发送请求
     $.ajax({
         type:'put',
         url:'/posts/'+id,
         data:fromDate,
         success:function(){
             location.href='/admin/posts.html'
         }
     })
     return false;
})
