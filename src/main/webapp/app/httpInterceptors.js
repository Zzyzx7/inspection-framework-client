var httpInterceptors = angular.module('httpInterceptors',[]);


httpInterceptors.factory('UnauthorizedInterceptor', ['$q', '$location', function ($q, $location) {
    return {
        request: function (config) {
            config.headers = config.headers || {};
            // insert code to populate your request header for instance
            return config;
        },
        responseError: function (response, rejectReason) {
            if (response.status === 403 || response.status === 401) {
            	$location.absUrl('/login');
            }
            //return response || $q.when(response);
            return $q.reject(rejectReason);
        }
    };
}]);