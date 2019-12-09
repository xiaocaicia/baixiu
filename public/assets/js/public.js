//实现随机展示的功能
$.ajax({
  type: "get",
  url: "/posts/random",
  success: function(res) {
    // console.log(res);
    var randomTpl = `
            {{each data}}
                <li>
                <a href="detail.html?id={{$value._id}}">
                <p class="title">{{$value.title}}</p>
                <p class="reading">阅读({{$value.meta.views}})</p>
                <div class="pic">
                    <img src="{{$value.thumbnail}}" alt="">
                </div>
                </a>
            </li>
         {{/each}}
        `;
    var html = template.render(randomTpl, { data: res });
    $("#randomBox").html(html);
  }
});
//处理日期时间格式
function formateDate(date) {
  //将日期字符串转换成日期对象
  date = new Date(date);
  return (
    date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate()
  );
}

//最新评论
$.ajax({
  type: "get",
  url: "/comments/lasted",
  success: function(res) {
    // console.log(res)
    var commentTpl = `
        {{each data}}
                <li>
                <a href="javascript:;">
                <div class="avatar">
                    <img src="{{$value.author.avatar}}" alt="">
                </div>
                <div class="txt">
                    <p>
                    <span>{{$value.author.nickName}}</span>{{$imports.formateDate($value.createAt)}}说:
                    </p>
                    <p>{{$value.content}}</p>
                </div>
                </a>
            </li>
           {{/each}}
        `;
    var html = template.render(commentTpl, {data:res});
    // console.log(html);
    $("#commentBox").html(html);
  }
});

function getUrl(name) {
  // console.log(location.search.substr(1).split('&'));
  var query = location.search.substr(1).split("&");
  for (var i = 0; i < query.length; i++) {
    var item = query[i].split("=");
    //console.log(item)
    if (item[0] == name) {
      return item[1];
    }
  }
  //如果没有得话 返回-1
  return -1;
}
//分类功能模块展示
$.ajax({
  type: "get",
  url: "/categories",
  success: function(res) {
   // console.log(res);
    var navTpl = `
    {{each data}}
        <li>
            <a href="list.html?categoryId={{$value._id}}">
                <i class="fa {{$value.className}}"></i>{{$value.title}}
            </a>
        </li>
    {{/each}}
        `;
        var html= template.render(navTpl,{data:res});
        $('#navBox').html(html);
        $('#topnavBox').html(html);
  }

    

});
//文章搜索功能
$('.search form').on('submit',function(){
    var keys=$(this).find('.keys').val();
    location.href='/search.html?key='+keys;
    return false;
})
