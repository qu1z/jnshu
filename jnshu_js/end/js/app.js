/**
 * Created by 雨月桑 on 2017/5/16.
 */
// 路由器
angular.module('wifeBackstage',['ngRoute'])
.config(['$routeProvider',function($routeProvider){
    $routeProvider
        .when('/',{templateUrl: 'welcome.html'})
        .when('/articlelist',{templateUrl: 'articlelist.html'})
        .when('/newadd',{templateUrl: 'newadd.html'})
        // .otherwise({redirectTo:'welcome.html'});
}]);
// 点击事件
function getObvious () {
    if (table.style.display==="none") {
        table.style.display = "block";
    }
    else if (table.style.display === "block") {
        table.style.display="none";
    }
}