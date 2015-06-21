var caratarseApp = angular.module('caratarse', ['ngRoute', 'ngResource']);


caratarseApp.factory('User', function($resource){
    return  $resource('http://localhost:8081/users/:uuid')

});

caratarseApp.controller('ListUsersController',
    function ($scope, User, $routeParams) {
        User.get(function(data) {
            $scope.submissionSuccess = ($routeParams.submissionSuccess === "true");
            $scope.data = data;
        });
});


caratarseApp.controller('DeleteUserController',
    function ($scope, User, $routeParams, $location) {
        User.delete({uuid:$routeParams.uuid}, function()
        {
            $scope.submissionSuccess=true;
            $location.path('/users/true');

        },
        function(error)
        {
            console.error('error while deleting '+$routeParams.uuid);
            $location.path('/error');

        }
        );

});



/* ********** ngRoute section ********** */

caratarseApp.config(['$routeProvider',
    function ($routeProvider) {
        $routeProvider.
            when('/', {
                templateUrl: 'views/home.html'
            }).
            when('/error', {
                templateUrl: 'views/error.html'
            }).
            when('/users/:submissionSuccess', {
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


