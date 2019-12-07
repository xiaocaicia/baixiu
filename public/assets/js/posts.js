//像服务端发送请求 获取文章数据
$.ajax({
    type:'get',
    url:'/posts',
    success:function(res){
         //  console.log(res);
       var html=template('postsTpl',res);
       $('#postsBox').html(html);
       //获得分页得数据
       var page=template('pageTpl',res);
       $('#page').html(page)
    }
})
//处理日期时间格式
function formateDate(date){
    //将日期字符串转换成日期对象
    date=new Date(date);
     return date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate();

}
//实现分页得功能
function changePage(page){
    $.ajax({
        type:'get',
        url:'/posts',
        data:{
            page:page,
        },
        success:function(res){
             //  console.log(res);
           var html=template('postsTpl',res);
           $('#postsBox').html(html);
           //获得分页得数据
           var pages=template('pageTpl',res);
           $('#page').html(pages)
        }
    })
}
//像服务器发送请求 索要分类得数据
$.ajax({
    type:'get',
    url:'/categories',
    success:function(res){
        console.log(res)
        var html=template('categoryTpl',{data:res});
      //  console.log(html)
      $('#categoryBox').html(html);
    }
})

$('#filterFrom').on('submit',function(){
  //  alert(111)
  //获取用户输入得
   var formDate=$(this).serialize();
   //发送请求
   $.ajax({
    type:'get',
    url:'/posts',
    data:formDate,
    success:function(res){
         //  console.log(res);
       var html=template('postsTpl',res);
       $('#postsBox').html(html);
       //获得分页得数据
       var page=template('pageTpl',res);
       $('#page').html(page)
    }
})
    //阻止表单事件默认提交行为
    return false;
})