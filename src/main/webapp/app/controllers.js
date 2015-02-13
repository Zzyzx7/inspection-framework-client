var inspectionObjectControllers = angular.module('inspectionObjectControllers', []);

inspectionObjectControllers.controller('InspectionObjectListCtrl', ['$scope', 'InspectionObject',
                                                function ($scope, InspectionObject) {
													$scope.inspectionobjects = InspectionObject.list()
													$scope.orderProp = 'objectName';
                                                 }]);

inspectionObjectControllers.controller('InspectionObjectNewCtrl', ['$scope', 'InspectionObject',
                                                function ($scope, InspectionObject) {
													$scope.master = {};
												
												    $scope.save = function(inspectionObject) {
												      $scope.inspectionObject = angular.copy(inspectionObject);
												      InspectionObject.save($scope.inspectionObject)
												    };
												
												    $scope.reset = function() {
												      $scope.inspectionObject = angular.copy($scope.master);
												    };
												
												    $scope.reset();
												 }]);

inspectionObjectControllers.controller('InspectionObjectDetailCtrl', ['$scope', '$routeParams', '$http',
                                                 function($scope, $routeParams, $http) {
	$http.get('https://inspection-framework.herokuapp.com/inspectionobject/' + $routeParams.id).success(function(data) {
	      $scope.object = data;
	    });
                                                 }]);




var InspectionAssignmentControllers = angular.module('InspectionAssignmentControllers', []);

InspectionAssignmentControllers.controller('AssignmentListCtrl', ['$scope', 'InspectionAssignment',
                                                 function ($scope, InspectionAssignment) {
                                                   
                                                     $scope.inspectionassignments = InspectionAssignment.list()
                             

                                                     $scope.orderProp = 'assignmentName';
                                                 }]);

InspectionAssignmentControllers.controller('AddAssignmentCtrl', ['$scope', 'InspectionAssignment',
                                                                 function ($scope, InspectionAssignment) {
                 													$scope.master = {};
                 												
                 												    $scope.save = function(InspectionAssignment) {
                 												      $scope.inspectionAssignment = angular.copy(inspectionAssignment);
                 												      InspectionAssignment.save($scope.inspectionAssignment)
                 												    };
                 												
                 												    $scope.reset = function() {
                 												      $scope.inspectionAssignment = angular.copy($scope.master);
                 												    };
                 												
                 												    $scope.reset();
                 												 }]);

InspectionAssignmentControllers.controller('AssignmentDetailCtrl', ['$scope', '$routeParams', '$http',
                                                 function($scope, $routeParams, $http) {
	$http.get('https://inspection-framework.herokuapp.com/assignment/' + $routeParams.id).success(function(data) {
	      $scope.assignment = data;
	    });
                                                 }]);

