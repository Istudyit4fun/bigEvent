$(function() {
    var form = layui.form
        //利用form 设置表单验证规则
    var layer = layui.layer
    form.verify({
            nickname: function(value) {
                if (value.lenght > 6)
                    return "不能大于6字符"

            }
        })
        // 获取后台数据

    // 初始化用户的基本信息
    get_UserInfo();

    function get_UserInfo() {

        $.ajax({
            method: "get",
            url: "/my/userinfo",
            success: function(res) {
                if (res.status !== 0) {
                    // location.href = "/login.html"    迫使用户 跳回登录界面
                    return layer.msg("获取用户信息失败")
                }
                console.log(typeof res);
                console.log(res.data.username);
                console.log(1);
                // $("#uname1").val(res.data.username);
                // $("#uname1").attr("readonly", "")
                //利用layui  的form  的表单赋值 和取值
                //form.val(“fliter”,object)   可以赋值 也可以取值
                form.val("formUserInfo", res.data) //快速为表单赋值
                    //为表单中所有的....表单元素赋值
                    // name:value  的形式
            }

        })
    }

    //点击事件处理函数
    //重置表单的数据
    $("#btn-reset").on("click", function(e) {
        //阻止表单的默认重置行为
        e.preventDefault();
        //再次调用 获取表单信息函数  快速填写表单
        get_UserInfo();
    })

    //表单数据的提交        
    //监听表单的提交时间
    $(".layui-form").on("submit", function(e) {
        //阻止表单的默认提交行为
        e.preventDefault();

        //发起ajax数据请求

        $.ajax({
            method: "POST",
            url: "/my/userinfo",
            data: $(this).serialize(),
            // 问题： API里面要求填写三个 参数  id nickname email
            //但是利用 serialize()  会加入   username  这个不必要的参数
            // 这样也可以请求成功吗？

            // serialize 快速获取 表单里面的数据  同时生成一个 满足 data  格式的字符串
            success: function(res) {
                console.log(typeof $(".layui-form").serialize(), );
                console.log($(".layui-form").serialize(), );
                if (res.status !== 0) {
                    return layer.msg("更新用户信息失败")

                }
                layer.msg("更新用户信息成功！")
                    //在子页面中 调用父页面中的 方法  重新渲染用户的头像和 用户的信息

                //如何在 ifream 里面 调用 父页面的函数?
                // window.parent 
                // 当前window 是 ifream 所展示的页面（html/js/css 组成的页面）----可以认为ifsream 里面就是一个小窗口
                // window.parent  就是 ifream 的父页面！！  =-====还有这种方法啊！
                window.parent.getUserInfo();
                // 因为 普通的函数  都是属于 window 这个对象的！
            }


        })


    })


})