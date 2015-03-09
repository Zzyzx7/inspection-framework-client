var sessionControllers = angular.module('sessionControllers', []);

sessionControllers.controller('LoginCtrl', ['$scope','$window', 'Login', function($scope, $window, Login) {
    $scope.login = function(username, password) {
    	Login.login({ username: username,
    				  password: password }, 
    	function(callbackData) {
    		$window.location.href = 'admin.html#/assignments';
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

sessionControlDirective.directive('inspLogin', ['Login', 'CurrentUser',  '$window', 
                                                function(Login, CurrentUser, $window) {
	function link(scope, element, attrs) {
	    scope.login = function(username, password) {
				    	Login.login({ username: username,
				    				  password: password }, 
				    	function(callbackData) {
				    					  CurrentUser.getDetails(
				    					function(callbackData) {
				  							scope.currentUser = callbackData;
				  							
				  							if (scope.currentUser.role == 'ROLE_ADMIN') {
				  								$window.location.href = 'admin.html#/assignments';
				  							} else {
				  								$window.location.href = 'user.html#/assignments';
				  							}
				  							
				  						}, function(callbackData) {
				  							console.log(callbackData.data.errorMessage);
				  						});		  
				        }, function(callbackData) {
				            console.log("error");
				            alert('Wrong Username or Password!');
				        })
				        
				    		
				    	
				        
				        
		        	}
	}
	
	return {
		retrict: 'E',
		templateUrl: 'login.html',
		link: link
	};
}])

