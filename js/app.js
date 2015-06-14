var caratarseApp = angular.module('caratarse', ['ngRoute', 'ngResource']);

caratarseApp.factory("userService", function ($resource) {
    return $resource('http://localhost:8081/users.json',
        {'query': { method: 'GET' }});
});


/*caratarseApp.controller('ListController', ['$scope', '$http',
    function ($scope, $http) {

        $http.get('data/users.json').success(function (data) {
            $scope.data = data;
        });
    }]);*/

caratarseApp.controller('ListController',
    function ($scope, userService) {
        userService.get(function(data) {
            $scope.data = data;
        });



});






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


