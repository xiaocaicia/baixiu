$('#addCategory').on('submit',function(){
   // console.log(111)
   //获得用户输入的内容
   var formData=$(this).serialize();
   // console.log(formData);
   //发送请求
    $.ajax({
        url:'/categories',
        type:'post',
        data:formData,
        success:function(res){
            location.reload();
        }
    })
    return false;
})
//渲染添加的数据给页面
$.ajax({
    type:'get',
    url:'/categories',
    success:function(res){
       var html= template('categoryListTpl',{data:res});
      // console.log(res);
       //console.log(html);
       $('#categoryBox').html(html);
    }
})
//点击编辑按钮 会出现想要编辑的内容
$('#categoryBox').on('click','.edit',function(){
    var id=$(this).attr('data-id');
    //console.log(id)
    $.ajax({
        type:'get',
        url:'/categories/'+id,
        success:function(res){
           // console.log(res)
          var html= template('modifyCategoryTpl',res); 
          $('#formBox').html(html);
        }
    })
});
//编辑完毕完毕 添加到页面
$('#formBox').on('submit','#modifyCategory',function(){
    //获取用户修改的在表单输入的内容
    var formData=$(this).serialize();
    //获取你编辑的用户的id
    var  id =$(this).attr('data-id');
    //发送ajax请求
    $.ajax({
        type:'put',
        url:'/categories/'+id,
        data:formData,
        success:function(){
            //刷新页面
            location.reload();
        }
    })
    return false;
})
//删除用户  根据id去选择删除的用户
$('#categoryBox').on('click','.delete',function(){
    if(confirm('您确定是要删除吗')){
        //获取删除的id
        var id=$(this).attr('data-id');
        //发送请求
        $.ajax({
            type:'delete',
            url:'/categories/'+id,
            success:function(){
                location.reload();
            }
        })
    }
})

