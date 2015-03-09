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
			if ($routeParams.id == null) {
				$scope.formControl.edit = true;
				$scope.formControl.cancelPossible = false;
				$scope.master = {};
				$scope.user = {};
			} else {
				$scope.formControl.edit = false;
				$scope.formControl.cancelPossible = true;
				User.getDetails({
					userid : $routeParams.id
				}, function(callbackData) {
					$scope.user = callbackData;
					$scope.master = angular.copy(callbackData);
				}, function(callbackData) {
					console.log(callbackData.data.errorMessage);
				});
			}

			$scope.editOn = function() {
				$scope.formControl.edit = true;
			}
			$scope.editOff = function() {
				$scope.formControl.edit = false;
			}

			$scope.save = function(user) {
				if (user.id == null) {
					User.save(user, function(callbackData) {
						$scope.user = callbackData;
						$scope.master = callbackData;
						$scope.formControl.edit = false;
						$scope.formControl.cancelPossible = true;

						alert('Saved successfully.');
						$location.path('/users');
					}, function(callbackData) {
						alert(callbackData.data.errorMessage);
					});
				} else {
					user.$update({
						userid : user.id
					}, function(callbackData) {
						$scope.master = user;
						$scope.editOff();
					}, function(callbackData) {
						alert(callbackData.data.errorMessage);
					});
				}
			};

			$scope.reset = function() {
				$scope.user = angular.copy($scope.master);
			};
		} ]);

