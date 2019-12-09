// 获取地址栏中的categoryId参数
var categoryId=getUrl('categoryId');
//console.log(categoryId)
$.ajax({
    type:'get',
    url:'/posts/category/'+categoryId,
    success:function(res){
     //   console.log(res);
      var html=  template('listTpl',{data:res});
      $('#listBox').html(html);
    }
})
//根据id查询分类
$.ajax({
    type:'get',
    url:'/categories/'+categoryId,
    success:function(res){
        console.log(res)
        $('#categoryTitle').html(res.title)
    }
})