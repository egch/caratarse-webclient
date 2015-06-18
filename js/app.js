var caratarseApp = angular.module('caratarse', ['ngRoute', 'ngResource']);


caratarseApp.factory('User', function($resource){
    return  $resource('http://localhost:8081/users/:uuid')

});

caratarseApp.controller('ListUsersController',
    function ($scope, User) {
        User.get(function(data) {
            $scope.data = data;
        });
});


caratarseApp.controller('DeleteUserController',
    function ($scope, User, $routeParams) {
        User.delete({uuid:$routeParams.uuid});

});



/* ********** ngRoute section ********** */

caratarseApp.config(['$routeProvider',
    function ($routeProvider) {
        $routeProvider.
            when('/', {
                templateUrl: 'views/home.html'
            }).
            when('/users', {
                controller:  'ListUsersController',
                templateUrl: 'views/listUsers.html'
            }).
            when('/deleteUser/:uuid', {
                controller:  'DeleteUserController',
                templateUrl: 'views/home.html'

            }).
            otherwise({
                redirectTo: '/'
            });
    }]);


