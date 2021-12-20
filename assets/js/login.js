$(function() {

    $("#login").on('click', function() {

        $('.login_box').hide();
        $(".reg_box").show();
    })

    $("#reg").click(function() {
        $(".reg_box").hide();
        $(".login_box").show();

    })


    //  对表单进行预言验证：    添加表单规则
    //  -----layui 的自定义验证规则

    //1: 首先 从layui中获取form 对象
    //------我们在login.html 里面导入了 layui的js  这里自然有layui对象
    var form = layui.form
    var layer = layui.layer
    form.verify({
        // 键值对  自定义 pwd 校验规则而
        pwd: [/^[\S]{6,12}$/, '密码 6-12位 且不能出现空格'] //密码 6-12位 且不能出现空格
            // ^行首     $行尾   
            //数组 两个值 [] 正则   ， 报错提示
    })


    // 注册表单的验证规则
    form.verify({
        //校验两次密码是否一致的规则
        repwd: function(value) {
            // value 就是应用了这个 规则的 表单的值
            var pwd = $("#reg_pwd").val() //jq  val() 方法获取表单值
            if (value !== pwd) {
                //如果失败 return 一个提示消息即可
                // 如果成功：我们无需进行操作  让其继续执行就是了
                return "两次密码不一样"
            }
        }
    })

    // 监听注册表单的提交事件

    $("#form_reg").on("submit", function(e) {
        e.preventDefault();
        var data = {
                username: $('#form_reg [name=username]').val(),
                password: $('#form_reg [name=password]').val()
            }
            // ajax POST请求
            // $.post('http://ajax.frontend.itheima.net/api/reguser', data, function(res) {
            //     console.log("11");
            //     if (res.status !== 0) {
            //         return console.log("注册失败");
            //     }
            //     console.log('注册成功');
            // })
        $.ajax({
            type: "POST",
            // url: "http://ajax.frontend.itheima.net/api/reguser",
            url: "/api/reguser",
            data: {
                username: $('#form_reg [name=username]').val(),
                password: $('#form_reg [name=password]').val()
            },
            success: function(res) {
                if (res.status !== 0) {
                    // return console.log("注册失败");
                    //  layui 的 layer 提示信息
                    layer.msg("错了！")

                }
                layer.msg("注册成功~ 可喜可贺")
                    // 模拟人的点击行为
                $("#reg").click();
            }
        })


    })

    //登录 监听登录表单的提交事件
    $("#form_login").submit(function(e) {
        //阻止默认提交行为
        e.preventDefault()
        $.ajax({
            method: "POST",
            url: "/api/login",
            //快速获取表单中的数据
            data: $("#form_login").serialize(),
            success: function(res) {

                //服务器端会提供 token   用于 有权限接口的身认证
                if (res.status != 0) {
                    console.log(res);
                    return layer.msg("失败！")
                }
                console.log("1111111");
                console.log(res.msg);
                layer.msg("登录成功~~")
                localStorage.setItem('token', res.token)
                    // 利用localstorage  存储 token 字符串
                location.href = "/index.html"
                    //跳转到后台主页

            }

        })
    })

})