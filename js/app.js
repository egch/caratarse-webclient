var caratarseApp = angular.module('caratarse', ['ngRoute', 'ngResource']);


caratarseApp.factory('User', function($resource){
    return  $resource('http://caratarse.ugevents.org:8081/users/:uuid')

});
//object to share data among controllers and views
caratarseApp.factory('Store', function() {
 var savedData = {}
 var error = {}
 function set(data) {
   savedData = data;
 }
 function get() {
  return savedData;
 }

return {
  set: set,
  get: get
 }

});

caratarseApp.controller('ListUsersController',
    function ($scope, User, Store, $routeParams) {
        User.get(function(data) {
            $scope.submissionSuccess = Store.get()===true;
            $scope.submissionError = Store.get()==='error';
            $scope.data = data;
        });
});


caratarseApp.controller('DeleteUserController',
    function ($scope, User, Store, $routeParams, $location) {
        User.delete({uuid:$routeParams.uuid}, function()
        {
            Store.set(true);
            $location.path('/users');
        },
        function(error)
       {
           Store.set('error');
           $location.path('/users');
       });
});

caratarseApp.controller('NewUserUserController',
    function ($scope, User, Store, $location) {

      $scope.addUser = function() {
        console.log('username: '+$scope.user.username);
        User.save($scope.user, function()
         {
             Store.set(true);
             $location.path('/users');

         },function(error)
         {
            Store.set('error');
            $location.path('/users');
         });
      }
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
            when('/newUser', {
                controller:  'NewUserUserController',
                templateUrl: 'views/newUser.html'
            }).
            otherwise({
                redirectTo: '/'
            });
    }]);


