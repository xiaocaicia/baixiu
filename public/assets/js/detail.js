var postId=getUrl('id');
$.ajax({
    type: 'get',
    url: '/posts/' + postId,
    success:function(res){
        console.log(res);
        var html=template('postTpl',res);
       $('#article').html(html)
    }
})
//点赞功能
$('#article').on('click','#like',function(){
        $.ajax({
            type: 'post',
            url: '/posts/fabulous/' + postId,
            success:function(){
                alert("点赞成功，感谢您的支持")
            }
        })
})
//获取网站得配置信息
$.ajax({
    type: 'get',
    url: '/settings',
    success:function(res){
        review = res.review ;
        if(res.comment){
            var html = template('commentTpl');
			// 渲染评论模板
			$('#comment').html(html);
        }
    }
})
//给评论表单绑定事件
$('#comment').on('submit', 'form', function() {
    var content = $(this).find('textarea').val();
    var state;
    
    if (review) {
        // 要经过人工审核
        state = 0;
    } else {
        // 不需要经过人工审核
        state = 1;
    }
    $.ajax({
        type: 'get',
        url: '/comments',
        data: {
            content: content,
            post: postId,
            state: state
        },
        success: function() {
            alert('评论成功')
            location.reload();
        },
        error: function() {
            alert('评论失败')
        }
    })
    // 阻止表单默认提交行为
    return false;
})