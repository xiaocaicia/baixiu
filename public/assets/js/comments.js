//向服务器发送请求 获取评论列表数据
$.ajax({
    type:'get',
    url:'/comments',
    success:function(res){
         console.log(res);
      var html= template('commentsTpl',res);
        $('#commentsBox').html(html);
       var page=template('pageTpl',res);
       $('#pageBox').html(page)
    }
})

//实现页面得点击功能
function changePage(page){
     //发送请求
     $.ajax({
         type:'get',
         url:'/comments',
         data:{
             page:page
         },
         success:function(res){
           //  console.log(res)
           //这里发送请求得到得数据同样也要渲染到页面上去
            var html= template('commentsTpl',res);
            $('#commentsBox').html(html);
           var page=template('pageTpl',res);
           $('#pageBox').html(page) 
         }
     })
}
// 点击评论审核
$('#commentsBox').on('click','.state',function(){
    //获取对应得id
    var id=$(this).attr('data-id');
    //获取当前得状态
    var state=$(this).attr('data-state');
    console.log(id)
    //发送请求
    $.ajax({
        type: 'put',
        type:'/comments/'+id,
        data:{
            state : state == 0 ? 1 : 0
        },
        success:function(){
           // console.log(111)
            location.reload();
        }
    })
})
//点击删除
$('#commentsBox').on('click','.delete',function(){
    if(confirm('您确定要删除改评论吗')){
        //获取id
        var id=$(this).attr('data-id');
        //console.log(id)
        //发送请求
        $.ajax({
            type:'delete',
            url:'/comments/'+id,
            success:function(){
                location.reload();
            }
        })
    }
})
