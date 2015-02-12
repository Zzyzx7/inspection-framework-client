var inspectionObjectControllers = angular.module('inspectionObjectControllers', []);

inspectionObjectControllers.controller('InspectionObjectListCtrl', ['$scope', '$http',
                                                 function ($scope, $http) {
                                                   $http.get('https://inspection-framework.herokuapp.com/assignment').success(function(data) {
                                                     $scope.objects = data;
                                                   });

                                                   //$scope.orderProp = 'age';
                                                 }]);

inspectionObjectControllers.controller('InspectionObjectDetailCtrl', ['$scope', '$routeParams', '$http',
                                                 function($scope, $routeParams, $http) {
	$http.get('https://inspection-framework.herokuapp.com/assignment/' + $routeParams.id).success(function(data) {
	      $scope.object = data;
	    });
                                                 }]);