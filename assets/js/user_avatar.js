$(function() {



    // 1.1 获取裁剪区域的 DOM 元素
    var $image = $('#image')
        // 1.2 配置选项
    const options = {
            // 纵横比
            aspectRatio: 1, //1----代表正方向    4/3  矩形 ---》指定裁剪框的 形状
            // 指定预览区域
            preview: '.img-preview' // 指定 预览区域  ----  有 preview  这个类名的盒子  都是预览区
        }
        // 1.3 创建裁剪区域
    $image.cropper(options) //传入配置对象



    //  文件选择框  的 使用！


    // 为上传按钮绑定点击事件
    $("#btnChooseImage").on("click", function() {

        $("#file").click(); //进行一次  上传文件选择框 的点击！

    })

    //为文件选择框绑定change事件 
    $("#file").on("change", function(e) {
        //input  的 change 事件  ----（file文件上传）
        // console.log(e);
        // 获取用户选择的路径
        var filelist = e.target.files;
        // console.log(filelist);
        if (filelist.length == 0) {
            return layui.layer.msg("请上传图片")
        }

        //拿到用户选的文件
        var file = e.target.files[0]
            //2：将文件，转化为路径
        var ImgURL = URL.createObjectURL(file); //其实这里就是将本地路径的图片 上传到服务器上
        console.log(ImgURL);
        //3:重新初始化裁剪区域
        $image
            .cropper("destroy") //销毁旧的裁剪区域
            .attr("src", ImgURL) //重新设置图片路径
            .cropper(options) //重新初始化裁剪区域
    })



    //上传头像 功能    拿到裁切后的图片 上传到服务器
    $("#btnUpload").on("click", function() {

        //要拿到用户裁剪之后的头像
        var dataURL = $image
            .cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
                width: 100,
                height: 100
            })
            .toDataURL('image/png') // 将 Canvas 画布上的内容，转化为 base64 格式的字符
            //串
            //调用接口  把头像上传到服务器
        $.ajax({
            method: "POST",
            url: "/my/update/avatar",
            data: {
                avatar: dataURL

            },
            success: function(res) {
                if (res.status !== 0) {
                    return layui.layer.msg("失败！")
                }
                // layui.layer.msg("成功！")

                //让父页面 重新渲染头像
                window.parent.getUserInfo();
            }


        })
    })

})