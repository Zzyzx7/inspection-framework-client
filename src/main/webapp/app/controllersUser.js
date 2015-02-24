var userControllers = angular.module('userControllers', []);

userControllers
		.controller(
				'UserDetailCtrl',
				[
						'$scope',
						'$location',
						'$routeParams',
						'User',
						function($scope, $location, $routeParams, User) {

							$scope.formControl = {}
							
								$scope.formControl.edit = false;
								$scope.formControl.cancelPossible = true;
								User
										.getDetails(
												{
													userid : $routeParams.id
												},
												function(callbackData) {
													$scope.user = callbackData;
													$scope.master = angular
															.copy(callbackData);
												},
												function(callbackData) {
													console
															.log(callbackData.data.errorMessage);
												});
							

							$scope.editOn = function() {
								$scope.formControl.edit = true;
							}
							$scope.editOff = function() {
								$scope.formControl.edit = false;
							}

							$scope.save = function(user) {
								
									user
											.$update(
													{
														userid : user.id
													},
													function(callbackData) {
														$scope.master = user;
														$scope.editOff();
													},
													function(callbackData) {
														$scope.formControl.errorMsg = callbackData.data.errorMessage;
														$scope.userDetailsForm.$invalid = true;
													});
								
							};

							$scope.reset = function() {
								$scope.user = angular.copy($scope.master);
							};
						} ]);

var InspectionAssignmentControllers = angular.module(
		'inspectionAssignmentControllers', []);

InspectionAssignmentControllers.controller('AssignmentListCtrl', [
		'$scope',
		'InspectionAssignment',
		function($scope, InspectionAssignment) {
			$scope.inspectionassignments = InspectionAssignment.list()
			$scope.orderProp = 'assignmentName';

			$scope.deleteItem = function(inspectionAssignment) {
				var index = $scope.inspectionassignments
						.indexOf(inspectionAssignment);
				InspectionAssignment.remove({
					inspectionassignmentid : inspectionAssignment.id
				}, function(callbackData) {
					$scope.inspectionassignments.splice(index, 1)
				}, function(callbackData) {
					console.log(callbackData.data.errorMessage);
				});
			}
			
			$scope.finish = function(inspectionAssignment) {

				inspectionAssignment
						.$update(
								{
									inspectionassignmentid : inspectionAssignment.id
								},
								function(callbackData) {
									$scope.master = inspectionAssignment;
								
								}
								);
				inspectionAssignment.state = '2';
			};
		} ]);



InspectionAssignmentControllers
		.controller(
				'AssignmentDetailCtrl',
				[
						'$scope',
						'$location',
						'$routeParams',
						'InspectionAssignment',
						'$rootScope',
						'uploadManager',
						function($scope, $location, $routeParams,
								InspectionAssignment, $rootScope, uploadManager) {

							$scope.formControl = {}


							$scope.master = {};
							InspectionAssignment.getDetails({
								inspectionassignmentid : $routeParams.id
							}, function(callbackData) {
								$scope.inspectionAssignment = callbackData;
								$scope.master = angular.copy(callbackData);
							}, function(callbackData) {
								console.log(callbackData.data.errorMessage);
							});

							

							$scope.save = function(inspectionAssignment) {

								inspectionAssignment
										.$update(
												{
													inspectionassignmentid : inspectionAssignment.id
												},
												function(callbackData) {
													$scope.master = inspectionAssignment;
												
												}
												);
								inspectionAssignment.state = '1';
							};
							
							$scope.finish = function(inspectionAssignment) {

								inspectionAssignment
										.$update(
												{
													inspectionassignmentid : inspectionAssignment.id
												},
												function(callbackData) {
													$scope.master = inspectionAssignment;
												
												}
												);
								inspectionAssignment.state = '2';
							};

							$scope.reset = function() {
								$scope.inspectionAssignment = angular
										.copy($scope.master);
							};

							/*$scope.files = [];
							$scope.percentage = 0;

							$scope.upload = function() {
								uploadManager.upload();
								$scope.files = [];
							};

							$rootScope.$on('fileAdded', function(e, call) {
								$scope.files.push(call);
								$scope.$apply();
							});

							$rootScope.$on('uploadProgress', function(e, call) {
								$scope.percentage = call;
								$scope.$apply();
							});
							
							*/
							
						} ]);



