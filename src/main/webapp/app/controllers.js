var inspectionObjectControllers = angular.module('inspectionObjectControllers', []);

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