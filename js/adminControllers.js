angular.module("shopAdmin", [ 'ngRoute', 'appControlers'])
    .config(['$routeProvider', function($routeProvider) {
    $routeProvider
        .when('/admin', {templateUrl: 'views/login.html', controller: 'LoginCtrl' })
        .otherwise({ redirectTo: '/login' });
    }]);
