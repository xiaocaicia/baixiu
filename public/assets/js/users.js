$('#userFrom').on('submit',function(){
    var obj=$(this).serialize();
    console.log(obj);
 //   alert('111');
   $.ajax({
       url:'/users',
       type:'post',
       data:obj,
       success:function(){
        location.reload();
       },
       error:function(){
           alert('添加失败')
       }
       
   })
    return false;
})
//添加图片预览功能
$('#modifyBox').on('change','#avatar',function(){
    var formData=new FormData();
    formData.append('avatar',this.files[0]);
    $.ajax({
        url:'/upload',
        type:'post',
        data:formData,
        //告诉ajax不要解析文件参数
        processData:false,
        // 告诉$.ajax方法不要设置请求参数的类型
        contentType:false,
        success:function(res){
           // console.log(res)
            //给图片添加属性 实现头像预览功能
            $('#preview').attr('src',res[0].avatar);

            $('#hiddenAvatar').val(res[0].avatar)

        }

    })
})

//获取用户列表 因为以打开页面就要获取 
$.ajax({
    url:'/users',
    type:'get',
    success:function(res){
        //console.log(res);
        //使用模板引擎将数据和html进行拼接
       var html= template('userTpl',{data:res});
       //将拼接好的字符串显示在页面中
       $('#userBox').html(html);
    }

})
//通过事件委托的方式未编辑按钮添加点击事件
$('#userBox').on('click','.edit',function(){
     //获取被点击用户的id值
     var id=$(this).attr('data-id');
    // console.log(id)
    //根据id获取用户的详细信息
    $.ajax({
        url:'/users/'+id,
        type:'get',
        success:function(res){
            // console.log(res)
            //渲染到模板中
           var html= template('modifyTpl',res);
           // console.log(html)
           $('#modifyBox').html(html);
        }
    })
})
//未修改表单添加表单提交事件
$('#modifyBox').on('submit','#modifyFrom',function(){
    //获取用户在表单中输入的内容
    var formData=$(this).serialize();   //转换成字符串
   // console.log(formData);
   //获取要修改的那个用户的id值
   var id=$(this).attr('data-id');
   //发送请求 修改用户
   $.ajax({
       type:'put',
       url:'/users/'+id,
       data:formData,
       success:function(res){
           // console.log(res)   //修改后的信息 是一个对象
           //重新加载页面
           location.reload();
       }
   })
    return false;
})

//根据id来删除用户
 $('#userBox').on('click','.delete',function(){
     if(confirm('您确定要删除用户吗')){
          //获取删除的id
          var id =$(this).attr('data-id');
         // console.log(id);
         //发送请求
         $.ajax({
             type:'delete',
             url:'/users/'+id,
             success:function(res){
                  //重新加载页面  能够进入这里的是一定可以删除的
                 location.reload();
             }
         })
     }
     
 })
 //批量删除
 var selectAll=$('#selectAll');
 var deleteMany=$('#deleteMany');
selectAll.on('change',function(){
    //获取到全选按钮当前的状态
    var status=  $(this).prop('checked');
    if(status){
        //显示批量删除按钮
        deleteMany.show();
    }else{
        //隐藏批量删除按钮
        deleteMany.hide()
    }
    //console.log(status)
    //获取所有用的用户的选择状态让他和全选按钮一致
    $('#userBox').find('input').prop('checked',status);
    
})
// 当用户前面的复选框发生改变的时候
$('#userBox').on('change','.userStatus',function(){
    //获取所有的用户
    var inputs= $('#userBox').find('input');
    if(inputs.length==inputs.filter(':checked').length){
        // alert('所有用户都是被选中的')
        selectAll.prop('checked',true)
    }else{
        // alert('所有用户都不是被选中的')
        selectAll.prop('checked',false)
    }
    if(inputs.filter(':checked').length>0){
        deleteMany.show();
    }else{
        deleteMany.hide()
    }
})
//删除所有用户添加点击事件
deleteMany.on('click',function(){
    //多个用户要用-分开
    var isd=[];
    //找出已经选中的用户
    var checkedUser=$('#userBox').find('input').filter(':checked');
    //循环复选框 从复选框中获取id
    checkedUser.each(function(index,ele){
        isd.push( $(ele).attr('data-id'));
    });
    //console.log(isd)
    if(confirm('您真的想要批量删除吗')){
        //如果是的话 那就发送ajax请求
        $.ajax({
            type:'delete',
            url:'/users/'+isd.join('-'),
            success:function(){
                location.reload();
            }
        })
    }
    //return false;
})

