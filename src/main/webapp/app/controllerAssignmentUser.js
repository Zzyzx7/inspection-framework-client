var InspectionAssignmentControllers = angular.module(
		'inspectionAssignmentControllers', []);

InspectionAssignmentControllers.controller('AssignmentListCtrl', [
		'$scope',
		'InspectionAssignment',
		'CurrentUser',
		function($scope, InspectionAssignment, CurrentUser) {
			$scope.inspectionassignments = InspectionAssignment.list()
			$scope.orderProp = 'assignmentName';

			//get User ID for "Manage Profile" Link
			CurrentUser.getDetails(
 					function(callbackData) {
							$scope.currentUser = callbackData;
							$scope.master = angular.copy(callbackData);
						}, function(callbackData) {
							console.log(callbackData.data.errorMessage);
						});	
			
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
						function($scope, $location, $routeParams,
								InspectionAssignment, $rootScope) {

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

							
							
						} ]);

InspectionAssignmentControllers.controller(
		'TaskErrorCtrl',
		[
				'$scope',
				'$location',
				'$routeParams',
				'InspectionAssignmentTask',
				'$rootScope',
				'FileUploader',
				function($scope, $location, $routeParams,
						InspectionAssignmentTask, $rootScope, FileUploader) {
					
					var uploader = $scope.uploader = new FileUploader({
					    url: REST_BACKEND_URL + '/inspectionobject/',
					    alias: 'fileUpload' 
					});
					
					uploader.onBeforeUploadItem = function(item) {
						
					}
					
					uploader.onAfterAddingFile = function(item) {
						item.setDescription = function(description) {
							if(angular.isDefined(description)) {
								if(angular.isDefined(item.formData[0])) {
									item.formData[0] = {fileDescription: description}
								} else {
									item.formData.push({fileDescription: description})
								}
							} else {
								if(angular.isDefined(item.formData[0])) {
									return item.formData[0].fileDescription;
								} else {
									return description;
								}
							} 
						}
						//$scope.inspectionObject.attachments
					};

					
					$scope.formControl = {}
                    
					$scope.master = {};
					
						InspectionAssignmentTask.getDetails({
							inspectionassignmentid : $routeParams.id,
							taskid : $routeParams.taskid
							
						}, function(callbackData) {
							$scope.inspectionAssignmentTask = callbackData;
							
							$scope.master = angular.copy(callbackData);
						}, function(callbackData) {
							console.log(callbackData.data.errorMessage);
						});
						
                        $scope.save = function(inspectionAssignmentTask) {
							
							
											inspectionAssignmentTask.$update({
												inspectionassignmentid: $routeParams.id,
												taskid: inspectionAssignmentTask.id
												
									          }, function(callbackData) {
									              $scope.master = inspectionAssignmentTask;
									              
									              alert('Saved successfully.');
													//$location.path( '/assignments/' + $routeParams.id);
									          }, function(callbackData) {
									              alert(callbackData.data.errorMessage);
									          });
											
											
						
						
					};

					$scope.reset = function() {
						$scope.inspectionAssignmentTask = angular
								.copy($scope.master);
					};

					
				} ]);

