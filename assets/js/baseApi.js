//每次调用$.get()/$.post()/$.ajax()的时候
// 会先调用ajaxPrefilter函数
// 在这个函数中我们能拿到Ajax提供的配置对象
$.ajaxPrefilter(function(option){
    console.log(option.url);
    option.url = 'http://www.liulongbin.top:3007' + option.url;
})