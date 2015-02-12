var inspectionFrameworkApp = angular.module('inspectionFrameworkApp', [
	                                                                 'ngRoute',
	                                                                 'inspectionObjectControllers'
	                                                               ]);
inspectionFrameworkApp.config(['$routeProvider', '$locationProvider',
		                    function($routeProvider, $locationProvider) {
		                      $routeProvider.
		                        when('/assignments', {
		                          templateUrl: 'views/list-assignments.html',
		                          controller: 'InspectionObjectListCtrl'
		                        }).
		                        when('/assignments/:id', {
		                          templateUrl: 'views/list-assignments-detail.html',
		                          controller: 'InspectionObjectDetailCtrl'
		                        }).
		                        otherwise({
		                          redirectTo: '/'
		                        });
		                    }]);

