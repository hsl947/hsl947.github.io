angular.module('app').controller('typeCtrl', ['$scope', 'blogService', '$route', '$routeParams', '$location', function ($scope, B_S, $route, $routeParams, $location) {
    var page = $routeParams.page;
    var type = $routeParams.type;
    $scope.maxPage = 1;
    $scope.showLoadMore = true;
    //获取指定分类下的所有文章
    B_S.getTypeData(page, type).then(function (res) {
        $scope.blogData = res.data;
        $scope.maxPage = res.pageCount;
        console.log(res.data)
    })
    B_S.getAllType().then(function (res) {
        $scope.typeData = res.data;
        console.log(res.data)
    })

    /////加载更多
    $scope.loadMore = function () {
        if (page < $scope.maxPage) {
            page++
            B_S.getTypeData(page, type).then(function (res) {
                res.data = res.data.map(function (item) {
                    if (!!!item.img) {
                        item.img = '/images/err.jpg'
                    }
                    if (!!!item.title) {
                        item.title = '这个人很懒,忘记输入标题了...'
                    }
                    return item
                })
                $scope.blogData = $scope.blogData.concat(res.data)
            })
        }
        else {
            $scope.showLoadMore = false
        }
    }
}])