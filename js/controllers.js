var portfolioControllers = angular.module('appControllers',[]);

portfolioControllers.controller('GalleryDetailCtrl', ['$scope','$routeParams', 'Gallery' , function($scope, $routeParams, Gallery) {
    $scope.gallery = Gallery.get(
        {galleryId: 'berlin-2015'},
        function(gallery) {
            $scope.mainImageUrl = $scope.gallery.photos[0].photoUrl;
        }
    );

    $scope.setImage = function(photo) {
        $scope.mainImageUrl = photo.photoUrl;
    }
}]);

angular.module('appFilters', [])
    .filter('monthName', function() {
        return function(monthNumber) {
            var monthNames = [
                'Styczeń',
                'Luty',
                'Marzec',
                'Kwiecień',
                'Maj',
                'Czerwiec',
                'Lipiec',
                'Sierpień',
                'Wrzesień',
                'Październik',
                'Listopad',
                'Grudzien'
            ];
            return monthNames[monthNumber - 1];
        }
    })
    .filter('dayName', function () {
        return function (englishDayName) {
            var dict = {
                "Sun": "Niedziela",
                "Mon": "Poniedziałek",
                "Tue": "Wtorek",
                "Wed": "Środa",
                "Thu": "Czwartek",
                "Fri": "Friday",
                "Sat": "Saturday"
            };
            return dict[englishDayName];
        };
    });
