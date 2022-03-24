$(function () {
    let form = layui.form;
    let layer = layui.layer;

    //使用layui的表单验证
    form.verify({
        nickname: function (value) {
            if (value.length > 6) {
                return '昵称长度必须在1-6个字符之间';
            }
        }
    })

    //初始化用户基本信息
    function getBaseUserInfo() {
        $.ajax({
            method: 'GET',
            url: '/my/userinfo',
            success: function (res) {
                if (res.status != 0) {
                    return layer.msg('基本信息获取失败');
                }
                // console.log(res);
                //给表单赋值
                form.val('userbaseinfo', res.data);
            }
        })
    }
    getBaseUserInfo();

    //重置表单数据
    $('#btnReset').on('click', function (e) {
        //阻止表单默认重置行为
        e.preventDefault();
        //调用初始化用户信息函数
        getBaseUserInfo();
    })

    //监听form表单提交
    $('#reSetMsgForm').on('submit',function(e){
        e.preventDefault();
        //调用ajax将数据更新
        $.ajax({
            method : 'POST',
            url : '/my/userinfo',
            data : $('#reSetMsgForm').serialize(),
            success : function(res){
                // console.log(res);
                if(res.status != 0){
                    layer.msg(res.message)
                }
                layer.msg(res.message);
                //调用父页面中的方法,重新渲染头像和名称
                window.parent.getUserInfo();
            }
        })
    })

})