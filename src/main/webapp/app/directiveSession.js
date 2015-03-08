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


var sessionControlDirective = angular.module('sessionControlDirective', [])

sessionControlDirective.directive('inspLogout', ['Logout', '$window', function(Logout, $window) {
	function link(scope, element, attrs) {
		scope.logout = function() {
							Logout.logout({ },function(callbackData) {
								$window.location.href = 'index.html';
						    }, function(callbackData) {
						        $window.location.href = 'index.html';
					    });
						}
	}
	
	return {
		retrict: 'E',
		template: '<input type="submit" class="btn btn-default btn-xs" name="commit" ng-click="logout()" value="Logout">',
		link: link
	};
}])

sessionControlDirective.directive('inspLogin', ['Login', '$window', function(Login, $window) {
	function link(scope, element, attrs) {
	    scope.login = function(username, password) {
				    	Login.login({ username: username,
				    				  password: password }, 
				    	function(callbackData) {
				    		$window.location.href = 'admin.html';
				        }, function(callbackData) {
				            console.log("error");
				        })
		        	}
	}
	
	return {
		retrict: 'E',
		templateUrl: 'login.html',
		link: link
	};
}])

