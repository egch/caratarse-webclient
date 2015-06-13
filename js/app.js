var caratarseApp = angular.module('caratarse', ['ngRoute']);


caratarseApp.controller('ListController', ['$scope', '$http',
    function ($scope, $http) {

        $http.get('data/users.json').success(function (data) {
            $scope.data = data;
        });
    }]);





caratarseApp.config(['$routeProvider',
    function ($routeProvider) {
        $routeProvider.
            when('/', {
                templateUrl: 'views/home.html'
            }).
            when('/users', {
                templateUrl: 'views/listUsers.html',
                controller: 'ListController'
            }).
            otherwise({
                redirectTo: '/'
            });
    }]);


