var inspectionFrameworkApp = angular.module('inspectionFrameworkApp', [
	                                                                 'ngRoute',
	                                                                 'inspectionObjectControllers',
	                                                                 'assignmentControllers',
	                                                                 'inspectionObjectServices'
	                                                               ]);
inspectionFrameworkApp.config(['$routeProvider', '$locationProvider',
		                    function($routeProvider, $locationProvider) {
		                      $routeProvider.
		                        when('/inspectionobject', {
		                          templateUrl: 'views/inspection-object-list.html',
		                          controller: 'InspectionObjectListCtrl'
		                        }).
		                        when('/inspectionobject/new', {
			                          templateUrl: 'views/inspection-object-create.html',
			                          controller: 'InspectionObjectNewCtrl'
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

