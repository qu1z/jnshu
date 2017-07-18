/**
 * Created by 雨月桑 on 2017/5/16.
 */
// 路由器
angular.module('wifeBackstage',['ui.router'])
    .config(function($stateProvider,$urlRouterProvider){
        $urlRouterProvider.otherwise("/");
        $stateProvider
            .state('welcome', {
                url: "/",
                templateUrl: '../views/welcome.html'
            })
            .state('articlelist', {
                url: "/articlelist",
                templateUrl: '../views/articlelist.html',
                controller: 'list'
            })
            .state('newadd', {
                params: {
                  'id': null
                },
                templateUrl: '../views/newadd.html',
                url: "/newadd",
                controller: "picUploadCtrl"
            });

    })
    .constant('item',{
        types: [
            {type:0, name:"首页banner"},
            {type:1, name:"找职位banner"},
            {type:2, name:"找精英banner"},
            {type:3, name:"行业大图"}
        ],
        statuses: [
            {status:1, name:"草稿"},
            {status:2, name:"上线"}
        ]
    })
    .constant('twoLv',{
        typo: [
            {type: 0, stage1: '首页banner'},
            {type: 1, stage1: '找职位banner'},
            {type: 2, stage1: '找精英banner'},
            {type: 3,stage1: '行业大图'}
        ],
        nat: [
            {industry:0 ,stage2: '移动互联网'},
            {industry:1 ,stage2: '电子商务'},
            {industry:2 ,stage2: '企业服务'},
            {industry:3 ,stage2: 'O2O'},
            {industry:4 ,stage2: '教育'},
            {industry:5 ,stage2: '金融'},
            {industry:6 ,stage2: '游戏'}
        ]
    })
    .controller('list',function ($scope,$http,$window,$state,item) {

        //分页开始
    $http({
        method: "GET",
        url: "/carrots-admin-ajax/a/article/search"
    }).then(function successCallback(response) {
        $scope.data = response.data.data.articleList;
        $scope.pageAm = Math.ceil((response.data.data.total/response.data.data.size));
        $scope.pages = [];
        for (var i =0; i<$scope.pageAm; i++) {
            $scope.pages.push(i);
        }
    });
    //首页
    $scope.firstPages = function () {
        $http({
            method: "GET",
            url: "/carrots-admin-ajax/a/article/search/?page="+1
        }).then(function successCallback(response) {
            $scope.data = response.data.data.articleList;
        })
    };
    //1-7
    $scope.otherPages = function (data) {
        $http({
            method: "GET",
            url: "/carrots-admin-ajax/a/article/search/?page="+data
        }).then(function successCallback(response) {
            $scope.data = response.data.data.articleList;
        })
    };
    //末叶
    $scope.lastPages = function (data) {
        $http({
            method: "GET",
            url: "/carrots-admin-ajax/a/article/search/?page="+data
        }).then(function successCallback(response) {
            $scope.data = response.data.data.articleList;
        })
    };
    //跳页
    $scope.commit = function () {
        $http({
            method: "GET",
            url: "/carrots-admin-ajax/a/article/search/?page="+$scope.jumpPage
        }).then(function successCallback(response) {
            $scope.data = response.data.data.articleList;
        })
    };

    //搜索开始
    //搜索框数据
    $scope.listStatuses = item.statuses;
    $scope.listTypes = item.types;
    //搜索按钮
    $scope.search= function () {
       console.log(Date.parse($scope.timeBgn));
        $http({
            method: "GET",
            url: "/carrots-admin-ajax/a/article/search/",
            params: {
                type: $scope.allType,
                status: $scope.allStatus,
                startAt: Date.parse($scope.timeBgn),
                endAt: Date.parse($scope.timeOvr)
            }
        }).then(function successCallback(response) {
            console.log(response);
            $scope.data = response.data.data.articleList;
        })
    };
    //清除按钮
    $scope.clean= function () {
        $http({
            method: "GET",
            url: "/carrots-admin-ajax/a/article/search/"}).then(function successCallback(response) {
            $scope.data = response.data.data.articleList;
        })
    };
    //搜索部分结束



    //上下线
    $scope.upOrDown = function (status,id) {
        if (status === 1) {
            status = 2;
        }
        else {
            status = 1;
        }
        $http({
            method:'PUT',
            url:'/carrots-admin-ajax/a/u/article/status',
            params: {
                'id':id,
                'status':status
            },
            headers:{
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).then(function successCallback() {
            $window.location.reload();
            alert('ok');
        })
    };


    //删除
    $scope.deleteArt = function (id) {
        $http({
            method: 'DELETE',
            url: '/carrots-admin-ajax/a/u/article/' + id
        }).then(function successCallback () {
            $window.location.reload();
        })
    };
    //编辑
    $scope.editArt = function (id) {
        $state.go('newadd',{'id':id});
    }
})
    .controller('picUploadCtrl',function ($scope,$http,$stateParams,twoLv) {
        //二级联动
        $scope.typo = twoLv.typo;
        $scope.nat = twoLv.nat;
        //图片获取及预览
        $scope.filesChanged = function (e) {

            $scope.up = false;
            $scope.delete = false;
            $scope.choosed = false;
            $scope.files = e.files;
            $scope.reader = new FileReader();
            $scope.reader.readAsDataURL($scope.files[0]);
            $scope.reader.onload = function (e) {
                $scope.imgUrl = e.target.result;
                $scope.up = true;
                $scope.delete = true;
                $scope.choosed = true;
                // console.log($scope.imgUrl);
                $scope.$apply();
                return $scope.imgUrl;
            };
        };
        //图片上传
        $scope.toUpdate = function toUpdate () {
            $scope.fd = new FormData ();
            $scope.fd.append('file',$scope.files[0]);
            $http ({
                method: 'POST',
                url: '/carrots-admin-ajax/a/u/img/task',
                headers: {
                    'content-type': undefined
                },
                data: $scope.fd,
                uploadEventHandlers: {
                    progress: function(e) {
                        $scope.progress = Math.round(e.loaded*100/e.total);
                    }
                },
                transformRequest: angular.identity
            }).then(function successCallback (response) {
                if (response.data.message === 'success' ) {
                    $scope.imgUrlCloud = response.data.data.url;
                    console.log(response.data.data.url);
                }
            })};
        //接收statego数据
        var getId = $stateParams.id;
        console.log(!isNaN(getId));
        if (!!getId) {
            //渲染接收到的数据
            $http({
                method:'GET',
                url:'/carrots-admin-ajax/a/article/'+getId
            }).then(function successCallback (response){
                console.log(response);
                $scope.art = {};
                $scope.art.title = response.data.data.article.title;
                $scope.art.type = response.data.data.article.type;
                $scope.art.industry = response.data.data.article.industry;
                editor.txt.html('<p>'+ $scope.art.explain+'</p>');
                $scope.art.jump = response.data.data.article.url;
                $scope.imgUrl = response.data.data.article.img;
                $scope.keng = response.data.data.article.createAt;
            });
            $scope.upDateNow = function () {
                $http ({
                    method: 'PUT',
                    url: '/carrots-admin-ajax/a/u/article/'+getId,
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
                    },
                    params: {
                        // 'title': $scope.art.title,
                        // 'type': $scope.art.type,
                        // 'industry': $scope.art.industry?$scope.art.industry:"",
                        // 'content':  editor.txt.text(),
                        // 'url': $scope.art.jump,
                        // 'img': $scope.imgUrl,
                        // 'status': 2,
                        // 'createAt':$scope.keng
                        'article': $scope.art
                    }
                })
            };
            $scope.saveAsDraft = function () {
                $http ({
                    method: 'PUT',
                    url: '/carrots-admin-ajax/a/u/article/',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
                    },
                    params: {
                        'title': $scope.art.title,
                        'type': $scope.art.type,
                        'industry': $scope.art.industry?$scope.art.industry:"",
                        'content':  editor.txt.text(),
                        'url': $scope.art.jump,
                        'img': $scope.imgUrl,
                        'status': 1,
                        'createAt':$scope.keng
                    }
                })
            }
        }
        else {
            $scope.upDateNow = function () {
                $http ({
                    method: 'POST',
                    url: '/carrots-admin-ajax/a/u/article/',
                    headers: {
                        'Content-Type': undefined
                    },
                    params: {
                        'title': $scope.art.title,
                        'type': $scope.art.type,
                        'industry': $scope.art.industry?$scope.art.industry:"",
                        'content':  editor.txt.text(),
                        'url': $scope.art.jump,
                        'img': $scope.imgUrlCloud,
                        'status': 2
                    }
                })
            };
            $scope.saveAsDraft = function () {
                $http ({
                    method: 'POST',
                    url: '/carrots-admin-ajax/a/u/article/',
                    headers: {
                        'Content-Type': undefined
                    },
                    params: {
                        'title': $scope.art.title,
                        'type': $scope.art.type,
                        'industry': $scope.art.industry?$scope.art.industry:"",
                        'content':  editor.txt.text(),
                        'url': $scope.art.jump,
                        'img': $scope.imgUrlCloud,
                        'status': 1
                    }
                })
            }
        }


    })
    .filter("typeChange",function () {
                return function (inputData) {
                    var changed = "";
                    switch (inputData){
                        case 0:
                            changed = "首页banner";
                            break;
                        case 1:
                            changed = "找职位banner";
                            break;
                        case 2:
                            changed = "找精英banner";
                            break;
                        case 3:
                            changed = "行业大图";
                            break;
                    }
                    return changed;
                }
            })
    .filter("statusChange",function () {
                return function (inputData) {
                    var changed = "";
                    switch (inputData){
                        case 1:
                            changed = "草稿";
                            break;
                        case 2:
                            changed = "上线";
                            break;
                    }
                    return changed;
                }
            })
    .filter("statusNot",function () {
                return function (inputData) {
                    var changed = "";
                    switch (inputData) {
                        case 1:
                            changed = "上线";
                            break;
                        case 2:
                            changed = "草稿";
                            break;
                    }
                    return changed;
                }
            });

// 点击事件
function getObvious () {
    if (table.style.display==="none") {
        table.style.display = "block";
    }
    else if (table.style.display === "block") {
        table.style.display="none";
    }
}





