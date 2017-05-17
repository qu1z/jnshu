/**
 * Created by 雨月桑 on 2017/5/8.
 */
window.onload = function () {
    var nameValue;
    var pwdValue;
    var btnSignIn = document.getElementById("signIn");
    var show = document.getElementById("view");
    btnSignIn.addEventListener("click",getValue);
    btnSignIn.addEventListener("click",sendMessage);
    // 获取输入框的值
    function getValue() {
        nameValue = document.getElementById("name").value;
        console.log(nameValue);
        pwdValue = document.getElementById("pwd").value;
    }
    function sendMessage () {
        // 新建XHR对象
        var xmlHttp = new XMLHttpRequest();
        // 注册回调方法
        xmlHttp.onreadystatechange = callback;
        // 设置和服务器端交互的相应参数
        xmlHttp.open("POST","/carrots-admin-ajax/a/login",true);
        // POST方式交互所需要增加的代码
        xmlHttp.setRequestHeader("Content-type","application/x-www-form-urlencoded; charset=UTF-8");
        // 设置向服务器端发送的数据，启动和服务器端的交互
        xmlHttp.send("name=" + nameValue + "&pwd=" + pwdValue);
        //data,params,加密不加密，jquery$ajax
        function callback () {
            if (xmlHttp.readyState===4 && xmlHttp.status === 200) {
                show.innerHTML = xmlHttp.responseXML;
            }
        }
    }
};


