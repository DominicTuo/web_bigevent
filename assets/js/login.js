$(function(){
//点击“去注册”的链接
$('#link-reg').on('click',function(){
    $('.login-box').hide();
    $('.reg-box').show();
})

//点击去登录的链接
$('#link-login').on('click',function(){
    $('.login-box').show();
    $('.reg-box').hide();
})

//通过layui实现表单的自校验规则
let form = layui.form;
//定义layui的弹出层对象
let layer = layui.layer;
//定义自校验规则
form.verify({
    //自定义一个pwd的校验规则
    pwd:[/^[\S]{6,12}$/,'密码必须6到12位,且不能出现空格'],
    //定义注册确认密码的校验规则
    repwd:function(value){
        let pd = $('.reg-box [name=password]').val();
        if(value != pd){
            return '两次输入的密码不一致'
        }
    }
})

//监听注册表单
$('#reg-form').on('submit',function(e){
    //阻止表单的默认提交行为
    e.preventDefault();
    //发起ajax请求调用用户注册接口
    let data = {
        username:$('#reg-form [name=username]').val(),
        password:$('#reg-form [name=password]').val()
    }
    $.post({
        url : '/api/reguser',
        data,
        success:function(res){
            if(res.status != 0){
                return layer.msg(res.message);
            }
            layer.msg(res.message);
            //模拟人的点击行为
            $('#link-login').click();
        }
    })
})

//监听登录表单
$('#login-form').submit(function(e){
    //阻止默认提交事件
    e.preventDefault();
    //发起ajax请求调用登录接口
    $.ajax({
        method : 'POST',
        url : '/api/login',
        //快速获取表单中的内容
        data : $('#login-form').serialize(),
        success : function(res){
            if(res.status !== 0){
                return layer.msg(res.message);
            }
            layer.msg(res.message);
            //将获得的token保存到本地存储，用于后面需要权限的接口
            localStorage.setItem('token',res.token);
            //跳转页面到index.html
            location.href = '/index.html'
        }
    })
})

})