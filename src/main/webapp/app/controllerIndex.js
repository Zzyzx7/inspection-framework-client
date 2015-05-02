var indexControllers = angular.module('indexControllers', []);

indexControllers.controller('NotAuthorizedCtrl', [ '$scope','$location', 
        function($scope, $location) {
			$scope.goToLogin = function() {
				$location.path('/login');
			}
		}
]);

indexControllers.controller('LoggedOutCtrl', [ '$scope','$location', 
       function($scope, $location) {
			$scope.goToLogin = function() {
				$location.path('/login');
   			}
   		}
   ]);

indexControllers.controller('PageNotFoundCtrl', [ '$scope','$location', 
       function($scope, $location) {
			$scope.goToLogin = function() {
				$location.path('/login');
   			}
   		}
   ]);


indexControllers.controller('RememberPasswordCtrl', [ '$scope','$location', 'RememberPassword', 
       function($scope, $location, RememberPassword) {
			addAlert = function(message, type) {
				if($scope.alerts == undefined) {
					$scope.alerts = new Array();
				}
				$scope.alerts.push({type: type, msg: message});
			}
			  
			clearAlerts = function() {
				if($scope.alerts == undefined) {
					$scope.alerts = new Array();
				}
				$scope.alerts = [];
			}
			
			$scope.goToLogin = function() {
				$location.path('/login');
	  		}
			
			$scope.sendPassword = function(username, email) {
				clearAlerts();
			      RememberPassword.sendPassword({
			          username: username,
			          email: email
			      }, function(callbackData) {
			          addAlert('The password has been sent to you via e-mail.', 'success');
			          $scope.sentWithSuccess = true;
			      }, function(callbackData) {
			    	  addAlert(callbackData.data.errorMessage, 'danger');
			      });
			}
			
			$scope.closeAlert = function(index) {
				$scope.alerts.splice(index, 1);
			};
		}
  ]);
