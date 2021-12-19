$.ajaxPrefilter(function(options) {
    //options 就是 调用AJAX时传递的配置对象

    // 在发起真正的AJAX请求之前，对面配置对象 进行操作
    options.url = "http://api-breakingnews-web.itheima.net" + options.url;
})