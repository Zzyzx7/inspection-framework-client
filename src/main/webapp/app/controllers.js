var AssignmentControllers = angular.module('AssignmentControllers', []);

AssignmentControllers.controller('AssignmentListCtrl', ['$scope', '$http',
                                                 function ($scope, $http) {
                                                   $http.get('https://inspection-framework.herokuapp.com/assignment').success(function(data) {
                                                     $scope.assignments = data;
                                                   });

                                                   $scope.orderProp = 'endDate';
                                                 }]);

AssignmentControllers.controller('AssignmentDetailCtrl', ['$scope', '$routeParams', '$http',
                                                 function($scope, $routeParams, $http) {
	$http.get('https://inspection-framework.herokuapp.com/assignment/' + $routeParams.id).success(function(data) {
	      $scope.assignment = data;
	    });
                                                 }]);