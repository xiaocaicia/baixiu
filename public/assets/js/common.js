
$('#logout').on('click',function(){
    var isConfirm=confirm('请问你真的要退吗');
    if(isConfirm){
      ///alert('用户点击了推出按钮');
      $.ajax({
        url:'/logout',
        type:'post',
        data:{
          message:'退出成功'
        },
        success:function(res){
            location.href='login.html'
        },
        error:function(){
            alert('退出失败了')
        }
      })
    }
})

//处理日期时间格式
function formateDate(date){
  //将日期字符串转换成日期对象
  date=new Date(date);
   return date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate();

}

//先服务器发送请求 获取对应的信息
$.ajax({
  type:'get',
  url:'/users/'+userId,
  success:function(res){
      console.log(res)
      $('.avatar').attr('src', res.avatar)
      $('.profile .name').html(res.nickName)
  }
})

