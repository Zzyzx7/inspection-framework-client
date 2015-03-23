var inspectionFrameworkApp = angular.module('inspectionFrameworkApp', [
    'angularFileUpload',
    'ngRoute',
    'inspectionObjectControllers',
    'inspectionAssignmentControllers',
    'inspectionObjectServices',
    'attachmentServices',
    'inspectionAssignmentServices',
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
			when('/', {
				templateUrl : 'adminViews/welcome.html'
			}).when('/inspectionobjects', {
				templateUrl : 'adminViews/inspection-object-list.html',
				controller : 'InspectionObjectListCtrl'
			}).when('/inspectionobjects/new', {
				templateUrl : 'adminViews/inspection-object-detail.html',
				controller : 'InspectionObjectDetailCtrl'
			}).when('/inspectionobjects/:id', {
				templateUrl : 'adminViews/inspection-object-detail.html',
				controller : 'InspectionObjectDetailCtrl'
			}).when('/users', {
				templateUrl : 'adminViews/user-list.html',
				controller : 'UserListCtrl'
			}).when('/users/new', {
				templateUrl : 'adminViews/user-detail.html',
				controller : 'UserDetailCtrl'
			}).when('/users/:id', {
				templateUrl : 'adminViews/user-detail.html',
				controller : 'UserDetailCtrl'
			}).when('/assignments', {
				templateUrl : 'adminViews/list-assignments.html',
				controller : 'AssignmentListCtrl'
			}).when('/assignments/new', {
				templateUrl : 'adminViews/add-assignment.html',
				controller : 'AddAssignmentCtrl'
			}).when('/templates/:id', {
				templateUrl : 'adminViews/add-assignment.html',
				controller : 'AddAssignmentCtrl'
			}).when('/assignments/:id', {
				templateUrl : 'adminViews/list-assignments-detail.html',
				controller : 'AssignmentDetailCtrl'
			}).when('/templates', {
				templateUrl : 'adminViews/list-templates.html',
				controller : 'TemplateListCtrl'
			}).when('/errorDetail/:id/:taskid', {
	            templateUrl: 'adminViews/errorDetail.html',
	            controller: 'ErrorDetailCtrl'
	        }).otherwise({
				redirectTo : '/'
			});
		} ]);
