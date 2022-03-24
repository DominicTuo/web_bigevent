$(function(){
    //进入首页先获取用户的信息
    getUserInfo();

    let layer = layui.layer;
    //点击退出按钮,实现退出功能
    $('#escSys').on('click',function(){
        //使用layui中的弹出框
        layer.confirm('确认退出 ??', {icon: 3, title:'提示'}, function(index){
            //清空本地存储中的token
            localStorage.removeItem('token');
            //跳转到登录页面
            location.href = '/login.html'; 
            //关闭弹出框           
            layer.close(index);
          });
    })
})

//获取用户信息函数
function getUserInfo(){
    $.ajax({
        meathd : 'GET',
        url : '/my/userinfo',
        success : function(res){
            if(res.status !== 0){
                return layui.layer.msg('获取用户信息失败')
            }
            //调用renderAvatar 渲染用户的头像
            renderAvatar(res.data);
        }
    })
}

//渲染用户的头像
function renderAvatar(data){
    let name = data.nickname || data.username;
    // console.log(name);
    //渲染用户名
    $('#welcome').html('欢迎&nbsp;&nbsp;' + name);
    //渲染头像图片
    if(data.user_pic !== null){
        $('.text-avatar').hide();
        $('.userinfo img').show().attr('src',data.user_pic);
    }else {
        $('.userinfo img').hide();
        let first = name[0].toUpperCase();
        $('.text-avatar').show().html(first);
    }
}