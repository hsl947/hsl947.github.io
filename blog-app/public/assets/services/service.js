app.factory('blogService', ['$http', '$q', function ($http, $q) {
    var dal = {};
    dal.getAllType = function () {
        var deferred = $q.defer();
        $http({
            method: 'get',
            url: 'http://localhost:3000/allTypes'
        }).success(function (res) {
            deferred.resolve(res);
        }).error(function (res, statusCode) {
            deferred.reject(err);
        })
        return deferred.promise
    }

    dal.getAllTypeData = function (page, type) {
        var deferred = $q.defer();
        var page = page;
        $http({
            method: 'get',
            url: 'http://localhost:3000/typeData/' + page,
        }).success(function (res) {
            deferred.resolve(res);
        }).error(function (res, statusCode) {
            deferred.reject(err);
        })
        return deferred.promise
    }

    dal.getTypeData = function (page, type) {
        var deferred = $q.defer();
        var page = page;
        var type = type || '';
        $http({
            method: 'get',
            url: 'http://localhost:3000/typeData/' + page + '/' + type,
        }).success(function (res) {
            deferred.resolve(res);
        }).error(function (res, statusCode) {
            deferred.reject(err);
        })
        return deferred.promise
    }

    dal.getBlogData = function (id) {
        var deferred = $q.defer();
        var id = id;
        $http({
            method: 'get',
            url: 'http://localhost:3000/blog/' + id,
        }).success(function (res) {
            deferred.resolve(res);
        }).error(function (res, statusCode) {
            deferred.reject(err);
        })
        return deferred.promise
    }

    return dal
}])
