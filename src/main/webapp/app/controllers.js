var inspectionObjectControllers = angular.module('inspectionObjectControllers', []);

inspectionObjectControllers.controller('InspectionObjectListCtrl', ['$scope', '$http',
                                                 function ($scope, $http) {
                                                   $http.get('https://inspection-framework.herokuapp.com/inspectionobject').success(function(data) {
                                                     $scope.inspectionobjects = data;
                                                   });

                                                   $scope.orderProp = 'endDate';
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
                                                     $scope.objects = data;
                                                   });

                                                   $scope.orderProp = 'endDate';
                                                 }]);

assignmentControllers.controller('AssignmentDetailCtrl', ['$scope', '$routeParams', '$http',
                                                 function($scope, $routeParams, $http) {
	$http.get('https://inspection-framework.herokuapp.com/assignment/' + $routeParams.id).success(function(data) {
	      $scope.object = data;
	    });
                                                 }]);