//获取轮播图数据
// alert(111)
$.ajax({
    type:'get',
    url: '/slides',
    success:function(res){
       // console.log(res)
       var html=template('swipeTpl',{data:res})
      // console.log(html)
       $('#slidesBox').html(html);
        //
    var swiper = Swipe(document.querySelector('.swipe'), {
        auto: 2000,
        transitionEnd: function (index) {
          // index++;
  
          $('.cursor span').eq(index).addClass('active').siblings('.active').removeClass('active');
        }
      });
  
      // 上/下一张
      $('.swipe .arrow').on('click', function () {
        var _this = $(this);
  
        if(_this.is('.prev')) {
          swiper.prev();
        } else if(_this.is('.next')) {
          swiper.next();
        }
      })
    }
    
})
//页面一加载 向服务器发送请求 获得数据
$.ajax({
  type:'get',
  url:'/posts/lasted',
      success:function(res){
         // console.log(res);
        var html=template('lastedTpl',{data:res})
       // console.log(html)
        $('#lastedBox').html(html)
      }
})