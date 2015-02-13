var inspectionFrameworkApp = angular.module('inspectionFrameworkApp', [
	                                                                 'ngRoute',
	                                                                 'inspectionObjectControllers',
	                                                                 'assignmentControllers'
	                                                               ]);
inspectionFrameworkApp.config(['$routeProvider', '$locationProvider',
		                    function($routeProvider, $locationProvider) {
		                      $routeProvider.
		                        when('/inspectionobject', {
		                          templateUrl: 'views/inspection-object-list.html',
		                          controller: 'InspectionObjectListCtrl'
		                        }).
		                        when('/inspectionobject/:id', {
		                          templateUrl: 'views/inspection-object-detail.html',
		                          controller: 'InspectionObjectDetailCtrl'
		                        }).
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

