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

				inspectionAssignment.state = '2';
				inspectionAssignment
						.$update(
								{
									inspectionassignmentid : inspectionAssignment.id
								},
								function(callbackData) {
									$scope.master = inspectionAssignment;
								
								}
								);
				
				
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

								inspectionAssignment.state = '1';
								inspectionAssignment
										.$update(
												{
													inspectionassignmentid : inspectionAssignment.id
												},
												function(callbackData) {
													$scope.master = inspectionAssignment;
													alert("Assignment saved successfully.")
												}
												);
								
								
							};
							
							$scope.finish = function(inspectionAssignment) {

								inspectionAssignment.state = '2';
								inspectionAssignment
										.$update(
												{
													inspectionassignmentid : inspectionAssignment.id
												},
												function(callbackData) {
													$scope.master = inspectionAssignment;
													
													alert("Assignment submitted successfully.")
													
													$location.path( '/assignments' );
												}
												);
								
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

InspectionAssignmentControllers.controller(
		'TaskErrorCtrl',
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
						
						
						
						$scope.assignmentTask = {
								assignmenttaskid : $routeParams.taskid
						}
						
						
						
						

					

						$scope.save = function(inspectionAssignment) {
							
							InspectionAssignment
									.save(
											inspectionAssignment,
											function(callbackData) {
												$scope.inspectionAssignment = callbackData;
												$scope.master = callbackData;
												$scope.formControl.edit = false;
												$scope.formControl.cancelPossible = true;
												
												alert('Saved successfully.');
												$location.path( '/assignments/' + $routeParams.id);
											},
											function(callbackData) {
											  alert(callbackData.data.errorMessage);
												
												
											});
						
						
					};

					$scope.reset = function() {
						$scope.inspectionAssignment = angular
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

