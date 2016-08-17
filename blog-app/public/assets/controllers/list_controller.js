angular.module('app').controller('listCtrl', ['$scope', 'blogService', '$route', '$routeParams', '$location', function ($scope, B_S, $route, $routeParams, $location) {
    var page = $routeParams.page;
    //获取所有分类信息
    B_S.getAllType().then(function (res) {
        $scope.typeData = res.data;
        console.log(res.data)
    })
    //获取所有分类下的所有文章
    B_S.getAllTypeData(page).then(function (res) {
        $scope.blogData = res.data;
        $scope.page = res.page;
        console.log(res.data)
    })
}])