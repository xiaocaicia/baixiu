//需求一：上传图片
$('#logo').on('change',function(){
    var formData=new FormData();
    formData.append('cover',this.files[0]);
    $.ajax({
        type:'post',
        url:'/upload',
        data:formData,
        contentType:false,
        processData:false,
        success:function(res){
            //将图片路径保存在隐藏域里面
            $('#site_logo').val(res[0].cover)
            //将图片显示在页面上
            $('#preview').attr('src',res[0].cover);
        }
    })
})
//获取用户输入的数据 进行提交给服务器
$('#settingFrom').on('submit',function(){
    var formData=$(this).serialize();
    $.ajax({
        type:'post',
        url:'/settings',
        data:formData,
        success:function(){
            location.reload();
        }
    })
    //阻止默认行为
    return false;
})
//像服务器发送请求  获得数据 把数据渲染到对应的元素以及页面中
$.ajax({
    type:'get',
    url:'/settings',
    success:function(res){
        console.log(res);
        //如果有数据
        if(res){
            //将logo地址存贮在隐藏域中
            $('#site_logo').val(res.logo);
            //让图片显示到页面
            $('#preview').attr('src',res.logo);
            //显示标题
            $('input[name="title"]').val(res.title);
            //显示站点描述
            $('textarea[name="description"]').val(res.description);
            //显示站点关键字
            $('input[name="keywords"]').val(res.keywords);
            //显示评论
            $('input[name="comment"]').prop('checked',res.comment);
            //将评论是否经过人工审核显示在页面中
            $('input[name="review"]').prop('checked',res.review);

        }
    }
})