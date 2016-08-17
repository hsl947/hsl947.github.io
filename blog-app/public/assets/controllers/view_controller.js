angular.module('app').controller('viewCtrl', ['$scope', 'blogService', '$route', '$routeParams', '$location', function ($scope, B_S, $route, $routeParams, $location) {
    var id = $routeParams.id;
    //获取指定文章的详细信息
    B_S.getBlogData(id).then(function (res) {
        $scope.data = res.data;
        $scope.content = res.data.content;
        console.log(res.data)
    })
    B_S.getAllType().then(function (res) {
        $scope.typeData = res.data;
        console.log(res.data)
    })
}])