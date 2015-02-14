var inspectionFrameworkApp = angular.module('inspectionFrameworkApp', [
    'ngRoute',
    'inspectionObjectControllers',
    'inspectionAssignmentControllers',
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
            templateUrl: 'views/inspection-object-detail.html',
            controller: 'InspectionObjectDetailCtrl'
        }).
        when('/inspectionobject/:id', {
            templateUrl: 'views/inspection-object-detail.html',
            controller: 'InspectionObjectDetailCtrl'
        }).
        when('/assignments', {
            templateUrl: 'views/list-assignments.html',
            controller: 'AssignmentListCtrl'
        }).
        when('/inspectionassignment/new', {
            templateUrl: 'views/add-assignment.html',
            controller: 'AddAssignmentCtrl'
        }).
        when('/assignments/:id', {
            templateUrl: 'views/list-assignments-detail.html',
            controller: 'AssignmentDetailCtrl'
        }).
        otherwise({
            redirectTo: '/'
        });
    }
]);
