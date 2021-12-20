$.ajaxPrefilter(function(options) {
    //options 就是 调用AJAX时传递的配置对象

    // 在发起真正的AJAX请求之前，对面配置对象 进行操作

    options.url = "http://api-breakingnews-web.itheima.net" + options.url;


    //  以my 开头的 需要权限
    // 记住是 indexOf
    if (options.url.indexOf('/my/') !== -1) {
        // 字符串 indexof(字符串) 判断 字符串是否属于 字符串
        options.headers = {
            // headers
            Authorization: localStorage.getItem("token") // || 逻辑或真好用
        }




    }

    // 全局挂载complete回调函数:   如果用户 没有登录: 且从服务器那边返回来的消息里面 符合条件: 就强制回调到登录界面 且清空token
    options.complete = function(res) {
        //在complete 回调函数中 可以使用 res.responseJSON 拿到服务器响应回来的数据
        if (res.responseJSON.status === 1 && res.responseJSON.message === "身份认证失败！") { //你大爷的 这个 ! 还有区别

            // 1:强制清空 token
            localStorage.removeItem("token");
            //2:强制跳转到登录界面
            return location.href = "/login.html"
        }
    }

})