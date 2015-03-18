var inspectionFrameworkApp = angular.module('inspectionFrameworkApp', [
    'angularFileUpload',
    'ngRoute',
    'inspectionAssignmentControllers',
    'inspectionObjectServices',
    'inspectionAssignmentServices',
    'attachmentServices',
    'userControllers',
    'userServices',
    'sessionServices',
    'httpInterceptors',
    'sessionControlDirective'
]);

inspectionFrameworkApp.config(['$routeProvider', '$locationProvider', '$httpProvider',
    function($routeProvider, $locationProvider, $httpProvider) {
		$httpProvider.interceptors.push('UnauthorizedInterceptor');
        
	
	$routeProvider.
        when('/profile/:id', {
            templateUrl: 'userViews/profile.html',
            controller: 'UserDetailCtrl'
        }).
        when('/assignments', {
            templateUrl: 'userViews/assignments.html',
            controller: 'AssignmentListCtrl'
        }).
        when('/assignments/:id', {
            templateUrl: 'userViews/assignments-detail.html',
            controller: 'AssignmentDetailCtrl'
        }).
        when('/addError/:id/:taskid', {
            templateUrl: 'userViews/addError.html',
            controller: 'TaskErrorCtrl'
        }).
        when('/saved', {
            templateUrl: 'userViews/saved.html',
            controller: 'AssignmentListCtrl'
        }).
        otherwise({
            redirectTo: '/assignments'
        });
    }
]);
