var myApp = angular.module("exampleApp", []);


myApp.controller("dayCtrl", function ($scope) {

    var dayNames = ["niedziela", "poniedzialek", "wtorek", "sroda", "czwartek", "piatek", "sobota"];

    $scope.date = new Date();
    $scope.day = dayNames[new Date().getDay()];
    $scope.afterTomorrow = dayNames[(new Date().getDay() + 2) % 7];

});

myApp.filter("reverse", function() {
    return function(input) {
        var result = "";
        input = input || "";
        for (var i=0; i<input.length; i++) {
            result = input.charAt(i) + result;
        }
        return result;
    };
});

myApp.directive('ywidget', function () {
    return {
        restrict: 'E',
        replace: true,
        template: '<section>Hello Angular!</section>'
    };
});

myApp.directive('mywidget', function() {
    return {
        restrict: 'E',
        replace: true,
        template: function (elem, attr) {
            return '<section>Hello ' + attr.attribute + '</section>'
        }
    };
});

myApp.directive('repeater', function () {
    return {
        restrict: 'E',
        link: function(scope, elem, attr){
            var r = '';
            for(var i = 0; i < attr.times; i++) {
                r += elem[0].innerHTML;
            }
            elem[0].innerHTML = r;
        }
    };
});