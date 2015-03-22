var httpInterceptors = angular.module('httpInterceptors', []);

httpInterceptors.factory('UnauthorizedInterceptor', [ '$q', '$location',
		'$window', function($q, $location, $window) {
			return {
				request : function(config) {
					config.headers = config.headers || {};
					// insert code to populate your request header for instance
					return config;
				},
				responseError : function(response, rejectReason) {
					if (response.status === 403 || response.status === 401) {
						$window.location.href = '/index.html#/notauthorized';
					}
					return $q.reject(response);
				}
			};
		} ]);