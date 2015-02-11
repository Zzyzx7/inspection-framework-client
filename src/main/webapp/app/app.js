var inspectionFrameworkApp = angular.module('inspectionFrameworkApp', [
	                                                                 'ngRoute',
	                                                                 'inspectionObjectControllers'
	                                                               ]);
inspectionFrameworkApp.config(['$routeProvider', '$locationProvider',
		                    function($routeProvider, $locationProvider) {
		                      $routeProvider.
		                        when('/objects', {
		                          templateUrl: 'views/inspection-object-list.html',
		                          controller: 'InspectionObjectListCtrl'
		                        }).
		                        when('/objects/:id', {
		                          templateUrl: 'views/inspection-object-detail.html',
		                          controller: 'InspectionObjectDetailCtrl'
		                        }).
		                        otherwise({
		                          redirectTo: '/objects'
		                        });
		                    }]);

