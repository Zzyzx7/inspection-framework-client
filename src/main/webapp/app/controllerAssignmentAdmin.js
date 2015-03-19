var InspectionAssignmentControllers = angular.module(
		'inspectionAssignmentControllers', ['ui.bootstrap']);

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
		'User',
		'InspectionObject',
				
		function($scope, $http, $location, $routeParams, InspectionAssignment, User, InspectionObject) {
			
			
			//date picker:
			$scope.today = function() {
			    $scope.dt = new Date();
			  };
			  $scope.today();

			  $scope.clear = function () {
			    $scope.dt = null;
			  };

			  // Disable weekend selection
			  $scope.disabled = function(date, mode) {
			    return ( mode === 'day' && ( date.getDay() === 0 || date.getDay() === 6 ) );
			  };

			  $scope.toggleMin = function() {
			    $scope.minDate = $scope.minDate ? null : new Date();
			  };
			  $scope.toggleMin();

			  $scope.open = function($event) {
			    $event.preventDefault();
			    $event.stopPropagation();

			    if($event.target.attributes.id.value == '1'){
			    	$scope.opened1 = true;
				    $scope.opened2 = false;
			    }
			    if($event.target.attributes.id.value == '2'){
			    	$scope.opened1 = false;
				    $scope.opened2 = true;
			    }
			    
			  };
			  
			  $scope.dateOptions = {
			    formatYear: 'yy',
			    startingDay: 1
			  };

			  $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
			  $scope.format = $scope.formats[2];
			  
			  $scope.onDateChange1 = function() {
                  if (this.inspectionassignment.startDate) {
                    this.inspectionassignment.startDate = this.inspectionassignment.startDate.getTime();
                  }
                };
                
                $scope.onDateChange2 = function() {
                    if (this.inspectionassignment.endDate) {
                      this.inspectionassignment.endDate = this.inspectionassignment.endDate.getTime();
                    }
                  };
			//end of datepicker

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
						REST_BACKEND_URL + '/assignment/'
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
			
			
				$scope.users = User.list();
			
			
			
				
				$scope.inspectionobjects = InspectionObject.list();
			
			
			

			$scope.save = function(inspectionAssignment) {
				
					InspectionAssignment
							.save(
									inspectionAssignment,
									function(callbackData) {
										$scope.inspectionAssignment = callbackData;
										$scope.master = callbackData;
										
										
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
					REST_BACKEND_URL + '/assignment/'
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



