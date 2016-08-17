var app = angular.module('app', ['ngRoute', 'ngAnimate', 'ngSanitize'])
//自定义过滤器服务器为mine
// 在使用的使用需要添加一个后缀即mineFilter

/**
 * 常见的创建服务方法
 * 
 * value
 * service
 * provider
 * factory
 */

// app.value('defaultApp','这是我的第一个angularjs应用')
angular.module('app').config(['$routeProvider', function ($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'assets/tpl/list.html', ////模板位置
            controller: 'listCtrl' //////控制器名称
        })
        .when('/views/:page/:type', {
            templateUrl: 'assets/tpl/typeData.html',////html文件路径
            controller: 'typeCtrl', ////路由器名称
        })
        .when('/view/:id', {
            templateUrl: 'assets/tpl/view.html',////html文件路径
            controller: 'viewCtrl', ////路由器名称
            controllerAs: 'view' /////别名
        })
}])

angular.module('app').directive("navDirective", function () {
    return {
        template: "<nav class='navbar navbar-default'>"
        + "<div class='container-fluid'>"
        + "<div class='navbar-header'>"
        + "<button type='button' class='navbar-toggle collapsed' data-toggle='collapse' data-target='#bs-example-navbar-collapse-1' aria-expanded='false'>"
        + "<span class='icon-bar'></span>"
        + "<span class='icon-bar'></span>"
        + "<span class='icon-bar'></span>"
        + "</button>"
        + "<a class='navbar-brand' href='/#/' style='font-size: 26px;'>博客展示</a>"
        + "</div>"
        + "<div class='collapse navbar-collapse' id='bs-example-navbar-collapse-1'>"
        + "<ul class='nav navbar-nav'>"
        + "<li ng-repeat='item in typeData'><a href='/#/views/1/{{item.name}}'>{{item.name}}</a></li>"
        + "</ul>"
        + "</div>"
        + "</div>"
        + "</nav>"
    };
});