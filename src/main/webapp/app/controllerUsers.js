var userControllers = angular.module('userControllers', []);

userControllers.controller('UserListCtrl', [ '$scope', 'User', function($scope, User) {
	$scope.users = User.list();
	$scope.orderProp = 'userName';

	$scope.deleteItem = function(user) {
		var index = $scope.users.indexOf(user);
		User.remove({
			userid : user.id
		}, function(callbackData) {
			$scope.users.splice(index, 1)
		}, function(callbackData) {
			console.log(callbackData.data.errorMessage);
		});
	}
} ]);

userControllers.controller('UserDetailCtrl', [ '$scope', '$location', '$routeParams', 'User',
		function($scope, $location, $routeParams, User) {
			$scope.formControl = {}
			
			$scope.allowedRoles = [
	          { label: 'Administrator', value: 'ROLE_ADMIN'},
	          { label: 'Inspector', value: 'ROLE_INSPECTOR' }
	        ];
			
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
			
			if ($routeParams.id == null) {
				$scope.formControl.edit = true;
				$scope.formControl.cancelPossible = false;
				$scope.user = {};
				$scope.user.role = 'ROLE_INSPECTOR';
				$scope.master = $scope.user;
			} else {
				$scope.formControl.edit = false;
				$scope.formControl.cancelPossible = true;
				User.getDetails({
					userid : $routeParams.id
				}, function(callbackData) {
					$scope.user = callbackData;
					$scope.master = angular.copy(callbackData);
				}, function(callbackData) {
					addAlert(callbackData.data.errorMessage, 'danger')
				});
			}

			$scope.editOn = function() {
				clearAlerts();
				$scope.formControl.edit = true;
			}
			$scope.editOff = function() {
				clearAlerts();
				$scope.formControl.edit = false;
			}

			$scope.save = function(user) {
				clearAlerts();
				if (user.id == null) {
					User.save(user, 
						function(callbackData) {
							$scope.user = callbackData;
							$scope.master = callbackData;
							$scope.formControl.edit = false;
							$scope.formControl.cancelPossible = true;
							alert('Saved successfully.');
							$location.path('/users');
						}, function(callbackData) {
							addAlert(callbackData.data.errorMessage, 'danger')
						}
					);
				} else {
					user.$update({
						userid : user.id
					}, function(callbackData) {
						$scope.master = user;
						$scope.editOff();
					}, function(callbackData) {
						addAlert(callbackData.data.errorMessage, 'danger')
					});
				}
			};

			$scope.reset = function() {
				clearAlerts();
				$scope.user = angular.copy($scope.master);
			};
			$scope.closeAlert = function(index) {
				$scope.alerts.splice(index, 1);
			};
		} ]);

