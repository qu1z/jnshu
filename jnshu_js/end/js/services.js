/**
 * Created by 雨月桑 on 2017/7/12.
 */
angular.module('wifeBackstage',['ui.router'])

    //这里我想要放所有的url
    .service('address',function () {
        //清除,获取列表，
        this.clearAddr = '/carrots-admin-ajax/a/article/search';

    })
    //这里我想做一个其他地方都能用的专门用来发送请求的东西
    .service('communication',function () {
        var deferred = $q.defer();
        $http({
            method:method,
            url:url,
            params:params,
            head:head
        }).success(function() {
            deferred.resolve(response.data);
        });
        return deferred.promise;
    })

    //删除
    .service('deleteArticle',function (id) {
        var deferred = $q.defer();
        $http({
            method:'DELETE',
            url:'/carrots-admin-ajax/a/u/article/'+id
        }).then(function () {
            deferred.$window.location.reload();
        });
        return deferred.promise;
    })


    //上下线
    .service('upOrDown',function (status,id) {
        if (status === 1) {
            status = 2;
        }
        else {
            status = 1;
        }
        var deferred = $q.defer();
        $http({
            method: 'PUT',
            url: '/carrots-admin-ajax/a/u/article/status',
            params: {
                'id': id,
                'status': status
            },
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).then(function () {
            deferred.$window.location.reload();
        });
        return deferred.promise;
    })