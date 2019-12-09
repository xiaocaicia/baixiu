//获取浏览器地址的关键字
var key = getUrl('key');
$.ajax({
	type: 'get',
	url: '/posts/search/' + key,
	success: function (response) {
		var html = template('searchTpl', {data: response});
		$('#listBox').html(html);
	}
})