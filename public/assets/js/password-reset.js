//密码修改
$('#modifyFrom').on('submit',function(){
    //获取用户在表单输入的内容
    var fromData=$(this).serialize();
    $.ajax({
        url:'/users/password',
        type:'put',
        data:fromData,
        success:function(){
            location.href="/admin/login.html"
        }
    })
    return false;
})