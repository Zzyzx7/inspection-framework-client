var inspectionFrameworkApp = angular.module('inspectionFrameworkApp', []);

<<<<<<< HEAD
inspectionObjectControllers.controller('InspectionObjectListCtrl', ['$scope', '$http',
                                                 function ($scope, $http) {
                                                   $http.get('https://inspection-framework.herokuapp.com/assignment').success(function(data) {
                                                     $scope.objects = data;
                                                   });

                                                   //$scope.orderProp = 'age';
                                                 }]);

inspectionObjectControllers.controller('InspectionObjectDetailCtrl', ['$scope', '$routeParams',
                                                 function($scope, $routeParams) {
                                                   $scope.id = $routeParams.id;
                                                 }]);
=======
inspectionFrameworkApp.controller('InspectionObjectCtrl', ['$scope', '$http',function ($scope, $http) {
  $http.get('https://inspection-framework.herokuapp.com/assignment').success(function(data) {
	$scope.objects = data
  });

// if ordered by age, attribute age in json needed                    $scope.orderProp = 'age';
}]);
>>>>>>> origin/master
