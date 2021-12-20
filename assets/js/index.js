$(function() {
    var layer = layui.layer;
    //获取用户基本信息
    getUserInfo();
    //控制权限  如果 上面获取的用户信息 是 登陆失败  status =502  我们让用户强制跳转回登录界面

    //  点击按钮 实现退出功能
    $("#btnLogout").on("click", function() {
            // 退出 
            //layui 的提示消息框    confirm 确认框
            layer.confirm("确认退出?", { icon: 3, title: "提示" }, function(index) {
                //  回调函数
                //跳转回 登录界面   同时清除 local Storage 里面的token
                localStorage.removeItem("token")

                location.href = "/login.html" // 切记  locaiton.href  可以 跳转到其他页面
                layer.close(index) //关闭的对应的弹出层---关闭询问框


            })
        }

    )






})





// 获取用户的基本信息
function getUserInfo() {

    $.ajax({
        method: "get",
        url: "/my/userinfo",
        // headers: {
        //     Authorization: localStorage.getItem("token") // || 逻辑或真好用
        // } //请求头配置对象
        //     在 ajaxFliter里面提前设置 请求图


        success: function(res) {
                if (res.status !== 0) {
                    // location.href = "/login.html"    迫使用户 跳回登录界面
                    return layui.layer.msg("获取用户信息失败")
                }
                // 渲染头像

                //调用 renderAvatar 渲染用户的头像
                renderAvatar(res.data)

                //控制权限  如果 上面获取的用户信息 是 登陆失败  status =502  我们让用户强制跳转回登录界面


            }
            //此处我们使用 complete回调函数  无论请求成功还是失败
            ,

        //假装这里有一个complete 回调函数  不再baseAPI里面

    })
}


function renderAvatar(user) {
    //获取用户的名称
    var name = user.nickname || user.username;
    $(".welcome").html("欢迎&nbsp;&nbsp;" + name);
    //3: 按需求渲染用户的头像
    if (user.user_pic !== null) {
        //渲染图片头像
        $(".layui-nav-img").attr("src", user.user_pic).show(); //attr 设置属性
        //隐藏文本头像
        $(".text-avatar").hide();
    } else {
        //渲染文字图像
        $(".layui-nav-img").hide();
        var first = name[0].toUpperCase(); //字符串也是可迭代的  字符串[0] 代表获取第一个字符   .toUpperCase 如果是英文字符则转成大写

        $(".text-avatar").html(first).show();
    }
}