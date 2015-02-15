var inspectionFrameworkApp = angular.module('inspectionFrameworkApp', [
    'ngRoute',
    'inspectionObjectControllers',
    'inspectionAssignmentControllers',
    'inspectionObjectServices',
    'inspectionAssignmentServices',
    'userControllers',
    'userServices'
]);

inspectionFrameworkApp.config(['$routeProvider', '$locationProvider',
    function($routeProvider, $locationProvider) {
        $routeProvider.
        when('/inspectionobjects', {
            templateUrl: 'views/inspection-object-list.html',
            controller: 'InspectionObjectListCtrl'
        }).
        when('/inspectionobjects/new', {
            templateUrl: 'views/inspection-object-detail.html',
            controller: 'InspectionObjectDetailCtrl'
        }).
        when('/inspectionobjects/:id', {
            templateUrl: 'views/inspection-object-detail.html',
            controller: 'InspectionObjectDetailCtrl'
        }).
        when('/users', {
            templateUrl: 'views/user-list.html',
            controller: 'UserListCtrl'
        }).
        when('/users/new', {
            templateUrl: 'views/user-detail.html',
            controller: 'UserDetailCtrl'
        }).
        when('/users/:id', {
            templateUrl: 'views/user-detail.html',
            controller: 'UserDetailCtrl'
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
