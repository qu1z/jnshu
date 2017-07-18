/**
 * Created by 雨月桑 on 2017/5/11.
 */
// var $nameValue;
// var $pwdValue;
// var $btnSignIn = $("#signIn");
$ (function() {
    $("#signIn").bind("click",function(){
        // $.post("/carrots-admin-ajax/a/login",{
        //     nameValue: $("#name").val() ,
        //     pwdValue: $("#pwd").val()
        // }, function (data,textStatus) {
        //
        // });
        $.ajax({
            type: "POST" ,
            url: "/carrots-admin-ajax/a/login" ,
            data: "name" + $.param($("#name")) + "&pwd" + $.param($("#pwd")),
            dataType: "json" ,
            success: function(e) {
               if(e.code===0){
                   window.location.href = "index.html"
               }
               else if (e.code===-5003) {
                   $("#view").html("本站立足于美利坚合众国，针对年满18周岁非大陆全球华人开放，受北美法律保护。未经授权禁止复制或建立镜像。")
               }
            }
        });
    })
});

