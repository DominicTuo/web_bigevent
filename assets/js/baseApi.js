//每次调用$.get()/$.post()/$.ajax()的时候
// 会先调用ajaxPrefilter函数
// 在这个函数中我们能拿到Ajax提供的配置对象
$.ajaxPrefilter(function(option){
    // console.log(option.url);
    option.url = 'http://www.liulongbin.top:3007' + option.url;
    //统一为需要权限的接口添加请求头
    if(option.url.indexOf('/my/') !== -1){
        option.headers = {
            Authorization : localStorage.getItem ('token') || ''
        }
    }
    //在全局挂载complete回调函数
    option.complete = function(res){
        // console.log(res);
        //判断responseJson并强制返回到登录页面
        if(res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！'){
            //强制清空token
            localStorage.removeItem('token');
            location.href = '/login.html';
        }
    }
})