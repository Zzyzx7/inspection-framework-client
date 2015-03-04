var sessionControllers = angular.module('sessionControllers', []);

sessionControllers.controller('LoginCtrl', ['$scope','$window', 'Login', function($scope, $window, Login) {
    $scope.login = function(username, password) {
    	Login.login({ username: username,
    				  password: password }, 
    	function(callbackData) {
    		$window.location.href = 'admin.html';
        }, function(callbackData) {
            console.log("error");
        });
    }
}]);

sessionControllers.controller('LogoutCtrl', ['$scope', '$window', 'Logout', function($scope, $window, Logout) {
	Logout.logout({ },function(callbackData) {
		$window.location.href = 'index.html';
    }, function(callbackData) {
        console.log(callbackData.data.errorMessage);
    });
}]);

