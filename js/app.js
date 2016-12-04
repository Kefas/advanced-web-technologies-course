var portfolioApp = angular.module('portfolioApp',[ 'ngRoute', 'appControllers', 'appFilters', 'appServices']);

portfolioApp.config(['$routeProvider', function($routeProvider) {
    $routeProvider
        .when('/galleries', {templateUrl: 'views/galleries.html', controller: 'GalleryListCtrl' })
        .when('/galleries/:galleryId', { templateUrl: 'views/gallery.html', controller: 'GalleryDetailCtrl' })
        .otherwise({ redirectTo: '/galleries' });
}]);

portfolioApp.controller('GalleryListCtrl', function($scope, $http) {
    $scope.title = "Moje podroze";

    $http.get(' json/galleries.json' ).then(
        function(response) {
            $scope.galleries=response.data;
        },
        function(errResponse) {
            console.log('Something went wrong: ' , errResponse);
        }
    );

    $http.get(' json/sort_list.json' ).then(
        function(response) {
            $scope.sortList=response.data;
            $scope.orderProp = $scope.sortList[0];
        },
        function(errResponse) {
            console.log('Something went wrong: ', errResponse);
        }
    );

});



