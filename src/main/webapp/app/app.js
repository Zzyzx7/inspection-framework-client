var inspectionFrameworkApp = angular.module('inspectionFrameworkApp', [
	                                                                 'ngRoute',
	                                                                 'inspectionObjectControllers'
	                                                               ]);
inspectionFrameworkApp.config(['$routeProvider', '$locationProvider',
		                    function($routeProvider, $locationProvider) {
		                      $routeProvider.
		                        when('/objects', {
		                          templateUrl: 'views/list-assignments.html',
		                          controller: 'InspectionObjectListCtrl'
		                        }).
		                        when('/objects/:id', {
		                          templateUrl: 'views/list-assignments-detail.html',
		                          controller: 'InspectionObjectDetailCtrl'
		                        }).
		                        otherwise({
		                          redirectTo: '/objects'
		                        });
		                    }]);

