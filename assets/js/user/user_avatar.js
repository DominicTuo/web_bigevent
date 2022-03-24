$(function () {
    let layer = layui.layer;

    // 1.1 获取裁剪区域的 DOM 元素
    var $image = $('#image')
    // 1.2 配置选项
    const options = {
        // 纵横比
        aspectRatio: 1,
        // 指定预览区域
        preview: '.img-preview'
    }

    // 1.3 创建裁剪区域
    $image.cropper(options)

    //通过按钮模拟文件上传选择
    $('#butUpdateImg').on('click', function () {
        $('#fileChooseImage').click();
    })

    //为文件选择框绑定change事件
    $('#fileChooseImage').on('change', function (e) {
        // console.log(e);
        let filesList = e.target.files;
        if (filesList.lenght === 0) {
            return layer.msg('请选择照片');
        }
        //拿到用户选择的文件
        let file = filesList[0];
        //获取文件的路径
        let imgURl = URL.createObjectURL(file);
        //重新初始化裁剪区域
        $image.cropper('destroy') // 销毁旧的裁剪区域
            .attr('src', imgURl) // 重新设置图片路径
            .cropper(options) // 重新初始化裁剪区域
    })

    //为确定按钮绑定点击事件，上传选定的头像
    $('#btuUpdate').on('click', function () {
        //获取裁剪的图片
        var dataURL = $image
            .cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
                width: 100,
                height: 100
            })
            .toDataURL('image/png') // 将 Canvas 画布上的内容，转化为 base64 格式的字符串
        //调用接口，上传头像
        $.ajax({
            method : 'POST',
            url : '/my/update/avatar',
            data: {
                avatar : dataURL
            },
            success : function(res){
                if(res.status != 0){
                    return layer.msg(res.message);
                }
                layer.msg(res.message);
                //调用index界面中的初始化函数更新页面上的头像
                window.parent.getUserInfo();
            }
        })
    })
})