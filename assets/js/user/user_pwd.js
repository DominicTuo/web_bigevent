$(function () {
    // 导入layui中的form
    let form = layui.form;
    let layer = layui.layer;

    //校验表单
    form.verify({
        pass: [
            /^[\S]{6,20}$/, '密码必须6到20位,且不能出现空格'
        ],
        samePwd:function(value){
            if($('[name=oldPwd]').val() === value){
                return '新密码不能与旧密码一样';
            }
        },
        rePwd : function(value){
            if($('[name=newPwd]').val() != value){
                return '两次输入的密码不一致';
            }
        }
    })

    //监听重置按钮,发起请求实现更新密码
    $('.layui-form').on('submit',function(e){
        e.preventDefault();
        $.ajax({
            method : 'POST',
            url : '/my/updatepwd',
            data : $(this).serialize(),
            success : function(res){
                if(res.status != 0){
                    layer.msg(res.message);
                }
                layer.msg(res.message);
                $('.layui-form')[0].reset();
            }
        })
    })
})