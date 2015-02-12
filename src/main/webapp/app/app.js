var inspectionFrameworkApp = angular.module('inspectionFrameworkApp', [
	                                                                 'ngRoute',
	                                                                 'AssignmentControllers'
	                                                               ]);
inspectionFrameworkApp.config(['$routeProvider', '$locationProvider',
		                    function($routeProvider, $locationProvider) {
		                      $routeProvider.
		                        when('/assignments', {
		                          templateUrl: 'views/list-assignments.html',
		                          controller: 'AssignmentListCtrl'
		                        }).
		                        when('/assignments/:id', {
		                          templateUrl: 'views/list-assignments-detail.html',
		                          controller: 'AssignmentDetailCtrl'
		                        }).
		                        otherwise({
		                          redirectTo: '/'
		                        });
		                    }]);

