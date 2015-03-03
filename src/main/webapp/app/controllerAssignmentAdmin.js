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
		} ]);

InspectionAssignmentControllers.controller('AddAssignmentCtrl', [
		'$scope',
		'$http',
		'$location',
		'$routeParams',
		'InspectionAssignment',
		
		function($scope, $http, $location, $routeParams, InspectionAssignment) {

			$scope.formControl = {}
			
			if ($routeParams.id == null) {

				$scope.inspectionassignment = {};

				$scope.inspectionassignment.tasks = new Array();
				$scope.inspectionassignment.tasks.push({
					taskName : "",
					description : ""
				});
				$scope.addTask = function() {
					$scope.inspectionassignment.tasks.push({
						taskName : "",
						description : ""
					});
				}

				$scope.master = {};

			} else {

				$http.get(
						'https://inspection-framework.herokuapp.com/assignment/'
								+ $routeParams.id).success(function(data) {
					var template = data;

					delete template.id;
					delete template.assignmentName;

					$scope.inspectionassignment = template;
				});

				$scope.addTask = function() {
					$scope.inspectionassignment.tasks.push({
						taskName : "",
						description : ""
					});
				}

			}
			
			$http.get(
					'https://inspection-framework.herokuapp.com/users'
							).success(function(dataUser) {
				
				$scope.users = dataUser;
			});
			
			$http.get(
					'https://inspection-framework.herokuapp.com/inspectionobject'
							).success(function(dataObject) {
				
				$scope.inspectionobjects = dataObject;
			});

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
										$location.path( '/assignments' );
									},
									function(callbackData) {
									  alert(callbackData.data.errorMessage);
										
										
									});
				
				
			};

			$scope.reset = function() {
				$scope.inspectionassignment = angular.copy($scope.master);

				$scope.inspectionassignment = {};

				$scope.inspectionassignment.tasks = new Array();
				$scope.inspectionassignment.tasks.push({
					taskName : "",
					description : ""
				});

			};

		} ]);

InspectionAssignmentControllers.controller('AssignmentDetailCtrl', [
		'$scope',
		'$routeParams',
		'$http',
		function($scope, $routeParams, $http) {
			$http.get(
					'https://inspection-framework.herokuapp.com/assignment/'
							+ $routeParams.id).success(function(data) {
				$scope.inspectionassignment = data;
			});
		} ]);

InspectionAssignmentControllers.controller('TemplateListCtrl', [
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
		} ]);
