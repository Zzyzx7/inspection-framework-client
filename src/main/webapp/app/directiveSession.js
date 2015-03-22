var sessionControlDirective = angular.module('sessionControlDirective', [])

sessionControlDirective.directive('inspLogout', ['Logout', '$window', function(Logout, $window) {
	function link(scope, element, attrs) {
		scope.logout = function() {
							Logout.logout({ },function(callbackData) {
								$window.location.href = 'index.html#/loggedout';
						    }, function(callbackData) {
						        alert(callbackData.data.errorMessage);
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
			scope.closeAlert = function(index) {
				scope.alerts.splice(index, 1);
			};
			
			function addAlert(message, type) {
				if(scope.alerts == undefined) {
					scope.alerts = new Array();
				}
				scope.alerts.push({type: type, msg: message});
			}
			  
			function clearAlerts() {
				if(scope.alerts == undefined) {
					scope.alerts = new Array();
				}
				scope.alerts = [];
			}
				
		    scope.login = function(username, password) {
		    	clearAlerts();
		    	Login.login({ username: username, password: password }, 
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
				        	// no message is provided from the server...
				        	//addAlert(callbackData.data.errorMessage, 'danger');
				        	addAlert('Wrong Username or Password!', 'danger');
				        })
        	}
		}
		
		return {
			retrict: 'E',
			templateUrl: 'directiveViews/login.html',
			link: link
		};
}])

