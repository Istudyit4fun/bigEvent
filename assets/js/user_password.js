$(function() {
    var form = layui.form

    //但是？我寻思这原密码也不是我的源密码啊
    form.verify({
        //自定义校验规则

        pwd: [
            /^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'
        ]

        //新密码 与原密码不能相同
        ,
        samePwd: function(value) {
            // value  指的是 应用 samePwd 的表单的value
            //value 与旧密码进行对比
            if (value === $("[name=oldPwd]").val()) {

                return "新密码与旧密码一致！ 不符合要求！"
            }
        },
        sameNewPwd: function(value) {

            if (value !== $("[name=newPwd]").val()) {

                return "两次密码不一致！ 不符合要求！"
            }
        }
    })

    //表单提交
    $(".layui-form").on("submit", function(e) {
        e.preventDefault();
        $.ajax({
            method: "POST",
            url: "/my/updatepwd",
            data: $(this).serialize(),


            //思路分析一下：  服务器那边的接口  其实帮我们完成了很多工作
            // 我们提交的信息有  原密码  新密码  确认新密码
            //  服务器那边会自动检查提供的原密码  是否为 当前啥验证码所对应的 密码
            //  如果不对  则会更新密码失败
            success: function(res) {
                if (res.status !== 0) {
                    return layui.layer.msg("更新密码失败！")
                }
                console.log(res);
                layui.layer.msg("更新密码成功！")
                    //
                $(".layui-form")[0].reset(); //转换成DOM元素
                // dom 表单元素  有一个方法：  reset()   重置表单！
            }


        })

    })

})