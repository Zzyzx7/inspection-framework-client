var inspectionObjectControllers = angular.module('inspectionObjectControllers',
		[]);

inspectionObjectControllers.controller('InspectionObjectListCtrl', [ '$scope',
		'InspectionObject', function($scope, InspectionObject) {
			$scope.inspectionobjects = InspectionObject.list();
			$scope.orderProp = 'objectName';

			$scope.deleteItem = function(inspectionObject) {
				var index = $scope.inspectionobjects.indexOf(inspectionObject);
				InspectionObject.remove({
					inspectionobjectid : inspectionObject.id
				}, function(callbackData) {
					$scope.inspectionobjects.splice(index, 1)
				}, function(callbackData) {
					console.log(callbackData.data.errorMessage);
				});
			}
		} ]);

inspectionObjectControllers
		.controller(
				'InspectionObjectDetailCtrl',
				[
						'$scope',
						'$location',
						'$routeParams',
						'InspectionObject',
						'$rootScope',
						'uploadManager',
						function($scope, $location, $routeParams,
								InspectionObject, $rootScope, uploadManager) {

							$scope.formControl = {}
							if ($routeParams.id == null) {
								$scope.formControl.edit = true;
								$scope.formControl.cancelPossible = false;
								$scope.master = {};
								$scope.inspectionObject = {};
							} else {
								$scope.formControl.edit = false;
								$scope.formControl.cancelPossible = true;
								$scope.master = {};
								InspectionObject
										.getDetails(
												{
													inspectionobjectid : $routeParams.id
												},
												function(callbackData) {
													$scope.inspectionObject = callbackData;
													$scope.master = angular
															.copy(callbackData);
												},
												function(callbackData) {
													console
															.log(callbackData.data.errorMessage);
												});
							}

							$scope.editOn = function() {
								$scope.formControl.edit = true;
							}
							$scope.editOff = function() {
								$scope.formControl.edit = false;
							}

							$scope.save = function(inspectionObject) {
								if (inspectionObject.id == null) {
									InspectionObject
											.save(
													inspectionObject,
													function(callbackData) {
														$scope.inspectionObject = callbackData;
														$scope.master = callbackData;
														$scope.formControl.edit = false;
														$scope.formControl.cancelPossible = true;
														
														alert('Saved successfully.');
														$location.path( '/inspectionobjects' );
													},
													function(callbackData) {
														alert(callbackData.data.errorMessage);
													});
								} else {
									inspectionObject
											.$update(
													{
														inspectionobjectid : inspectionObject.id
													},
													function(callbackData) {
														$scope.master = inspectionObject;
														$scope.editOff();
													},
													function(callbackData) {
														alert(callbackData.data.errorMessage);
													});
								}
							};

							$scope.reset = function() {
								$scope.inspectionObject = angular
										.copy($scope.master);
							};

							$scope.files = [];
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
						} ]);

