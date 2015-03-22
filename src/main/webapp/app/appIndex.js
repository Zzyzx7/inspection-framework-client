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
    'sessionControlDirective',
    'indexControllers'
]);

inspectionFrameworkApp.config(['$routeProvider', '$locationProvider', '$httpProvider',
    function($routeProvider, $locationProvider, $httpProvider) {
//		$httpProvider.interceptors.push('UnauthorizedInterceptor');
			
	$routeProvider.
			when('/', {
				templateUrl : 'indexViews/login.html',
			}).when('/login', {
				templateUrl : 'indexViews/login.html',
			}).when('/loggedout', {
				templateUrl : 'indexViews/logged-out.html',
				controller : 'LoggedOutCtrl'
			}).when('/notauthorized', {
				templateUrl : 'indexViews/not-authorized.html',
				controller : 'NotAuthorizedCtrl'
			}).when('/pagenotfound', {
				templateUrl : 'indexViews/page-not-found.html',
				controller : 'PageNotFoundCtrl'
			}).when('/remember', {
				templateUrl : 'indexViews/remember-password.html',
				controller : 'RememberPasswordCtrl'
			}).otherwise({
				redirectTo : '/'
			});
		} ]);
