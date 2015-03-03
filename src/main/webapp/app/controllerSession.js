var sessionControllers = angular.module('sessionControllers', []);

sessionControllers.controller('LoginCtrl', ['$scope', 'Login', function($scope, Login) {
    $scope.login = function(username, password) {
    	Login.login({ username: username,
    				  password: password }, 
    	function(callbackData) {
    		console.log("success");
        }, function(callbackData) {
            console.log(callbackData.data.errorMessage);
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

