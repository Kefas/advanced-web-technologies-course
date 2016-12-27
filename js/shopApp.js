var shopApp = angular.module('shopApp',[ 'ngRoute', 'appControlers']);

shopApp.config(['$routeProvider', function($routeProvider) {
    $routeProvider
        .when('/basket', {templateUrl: 'views/basket.html', controller: 'BasketCtrl' })
        .when('/shop', {templateUrl: 'views/shop.html', controller: 'ShopCtrl' })
        .when('/order', {templateUrl: 'views/order.html', controller: 'OrderCtrl' })
        .otherwise({ redirectTo: '/shop' });
}]);





