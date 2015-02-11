var inspectionFrameworkApp = angular.module('inspectionFrameworkApp', []);

inspectionFrameworkApp.controller('InspectionObjectCtrl', ['$scope', '$http',function ($scope, $http) {
  $http.get('https://inspection-framework.herokuapp.com/assignment').success(function(data) {
	$scope.objects = data
  });

// if ordered by age, attribute age in json needed                    $scope.orderProp = 'age';
}]);