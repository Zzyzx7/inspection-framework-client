var inspectionFrameworkApp = angular.module('inspectionFrameworkApp', [
	                                                                 'ngRoute',
	                                                                 'inspectionObjectControllers',
	                                                                 'InspectionAssignmentControllers',
	                                                                 'inspectionObjectServices',
	                                                                 'inspectionAssignmentServices'
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
		                        when('/inspectionassignment', {
		                          templateUrl: 'views/list-assignments.html',
		                          controller: 'AssignmentListCtrl'
		                        }).
		                        when('/inspectionassignment/new', {
			                          templateUrl: 'views/add-assignment.html',
			                          controller: 'AddAssignmentCtrl'
			                        }).
		                        when('/inspectionassignment/:id', {
		                          templateUrl: 'views/list-assignments-detail.html',
		                          controller: 'AssignmentDetailCtrl'
		                        }).
		                        
		                        otherwise({
		                          redirectTo: '/'
		                        });
		                    }]);

