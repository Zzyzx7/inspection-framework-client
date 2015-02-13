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




var assignmentControllers = angular.module('assignmentControllers', []);

assignmentControllers.controller('AssignmentListCtrl', ['$scope', '$http',
                                                 function ($scope, $http) {
                                                   $http.get('https://inspection-framework.herokuapp.com/assignment').success(function(data) {
                                                     $scope.assignments = data;
                                                   });

                                                   $scope.orderProp = 'endDate';
                                                 }]);

assignmentControllers.controller('AssignmentDetailCtrl', ['$scope', '$routeParams', '$http',
                                                 function($scope, $routeParams, $http) {
	$http.get('https://inspection-framework.herokuapp.com/assignment/' + $routeParams.id).success(function(data) {
	      $scope.assignment = data;
	    });
                                                 }]);