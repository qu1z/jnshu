/**
 * Created by 雨月桑 on 2017/5/31.
 */
var app = angular.module('intoWife',[]);
app.controller ('mine',function($scope,$http) {
    $scope.signIn = function () {
        $http({
            method: "POST",
            url: "/carrots-admin-ajax/a/login",
            data: {
                name:$scope.name,
                pwd:$scope.pwd
            },
            headers: {
                'Content-Type':'application/x-www-form-urlencoded'
            },
            transformRequest:function (obj) {
                var str = [];
                for (var p in obj) {
                    str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                }
                return str.join("&");
            }
        }).then(function successCallback (data) {
            if(data.data.code===0) {
                window.location.href = "index.html"
            }
            else if(data.data.code===-5003) {
                document.getElementById("view").innerHTML="本站立足于美利坚合众国，针对年满18周岁非大陆全球华人开放，受北美法律保护。未经授权禁止复制或建立镜像。";
            }
            // }, function errorCallback (data) {
            //     if (data.data.code===-5003) {
            //
            //     }
        });
    }

});