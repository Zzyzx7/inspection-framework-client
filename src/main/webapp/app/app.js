var inspectionFrameworkApp = angular.module('inspectionFrameworkApp', [
	                                                                 'ngRoute',
	                                                                 'inspectionObjectControllers'
	                                                               ]);
inspectionFrameworkApp.config(['$routeProvider', '$locationProvider',
		                    function($routeProvider, $locationProvider) {
		                      $routeProvider.
		                        when('/objects', {
<<<<<<< HEAD
		                          templateUrl: 'views/list-assignments.html',
		                          controller: 'InspectionObjectListCtrl'
		                        }).
		                        when('/objects/:id', {
		                          templateUrl: 'views/list-assignments-detail.html',
=======
		                          templateUrl: 'views/inspection-object-list.html',
		                          controller: 'InspectionObjectListCtrl'
		                        }).
		                        when('/objects/:id', {
		                          templateUrl: 'views/inspection-object-detail.html',
>>>>>>> origin/master
		                          controller: 'InspectionObjectDetailCtrl'
		                        }).
		                        otherwise({
		                          redirectTo: '/objects'
		                        });
		                    }]);

