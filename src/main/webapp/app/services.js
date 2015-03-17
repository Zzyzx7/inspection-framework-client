var attachmentServices = angular.module('attachmentServices', [ 'ngResource' ]);

attachmentServices.factory('Attachment', ['$resource', function($resource) {
	return $resource(REST_BACKEND_URL + '/attachment/:gridfsid', {}, {
		'download': {
			method: 'GET',
			isArray: false,
			withCredentials: true,
		    responseType: 'arraybuffer',
		    cache: true,
		    transformResponse: function (data) {
		        var file;
		        if (data) {
		            file = new Blob([data], { });
		        }
		        return {
		            response: file 
		        }
		    }
		}
	})
}]);

var inspectionObjectServices = angular.module('inspectionObjectServices',
		[ 'ngResource' ]);

inspectionObjectServices.factory('InspectionObject', [
		'$resource',
		function($resource) {
			return $resource(REST_BACKEND_URL
					+ '/inspectionobject/:inspectionobjectid', {}, {
				'list' : {
					method : 'GET',
					isArray : true,
					withCredentials : true
				},
				'getDetails' : {
					method : 'GET',
					withCredentials : true
				},
				'save' : {
					method : 'POST',
					withCredentials : true
				},
				'update' : {
					method : 'PUT',
					withCredentials : true
				},
				'remove' : {
					method : 'DELETE',
					withCredentials : true
				},
				'fileUpload' : {
					method : 'POST',
					transformRequest : function(data, headersGetters) {
						if (data === undefined)
							return data;

						var fd = new FormData();
						angular.forEach(data, function(value, key) {
							if (value instanceof FileList) {
								if (value.length == 1) {
									fd.append(key, value[0]);
								} else {
									angular.forEach(value,
											function(file, index) {
												fd.append(key + '_' + index,
														file);
											});
								}
							} else {
								fd.append(key, value);
							}
						});
						return fd;
					},
					headers : {
						'Content-Type' : undefined
					},
					withCredentials : true
				}
			});
		} ]);

inspectionObjectServices.factory('InspectionObjectAttachment', [
  		'$resource',
  		function($resource) {
  			return $resource(REST_BACKEND_URL
  					+ '/inspectionobject/:inspectionobjectid/attachment/:attachmentid', {}, {
  				'remove' : {
  					method : 'DELETE',
  					withCredentials : true
  				}
  			}
		)}]);


var userServices = angular.module('userServices', [ 'ngResource' ]);

userServices.factory('User', [ '$resource', function($resource) {
	return $resource(REST_BACKEND_URL + '/users/:userid', {}, {
		'list' : {
			method : 'GET',
			isArray : true,
			withCredentials : true
		},
		'getDetails' : {
			method : 'GET',
			withCredentials : true
		},
		'save' : {
			method : 'POST',
			withCredentials : true
		},
		'update' : {
			method : 'PUT',
			withCredentials : true
		},
		'remove' : {
			method : 'DELETE',
			withCredentials : true
		}
	});
} ]);

var inspectionAssignmentServices = angular.module(
		'inspectionAssignmentServices', [ 'ngResource' ]);

inspectionAssignmentServices.factory('InspectionAssignment', [
		'$resource',
		function($resource) {
			return $resource(REST_BACKEND_URL
					+ '/assignment/:inspectionassignmentid', {}, {
				'list' : {
					method : 'GET',
					isArray : true,
					withCredentials : true
				},
				'getDetails' : {
					method : 'GET',
					withCredentials : true
				},
				'save' : {
					method : 'POST',
					withCredentials : true
				},
				'update' : {
					method : 'PUT',
					withCredentials : true
				},
				'remove' : {
					method : 'DELETE',
					withCredentials : true
				}
			});
		} ]);

inspectionAssignmentServices.factory('InspectionAssignmentAttachment', [
                                                          		'$resource',
                                                          		function($resource) {
                                                          			return $resource(REST_BACKEND_URL
                                                          					+ '/assignment/:inspectionassignmentid/task/:taskid/attachment/:attachmentid', {}, {
                                                          				'remove' : {
                                                          					method : 'DELETE',
                                                          					withCredentials : true
                                                          				}
                                                          			}
                                                        		)}]);

inspectionAssignmentServices.factory('InspectionAssignmentTask', [
		'$resource',
		function($resource) {
			return $resource(REST_BACKEND_URL
					+ '/assignment/:inspectionassignmentid/task/:taskid', {}, {
				'list' : {
					method : 'GET',
					isArray : true,
					withCredentials : true
				},
				'getDetails' : {
					method : 'GET',
					withCredentials : true
				},
				'save' : {
					method : 'POST',
					withCredentials : true
				},
				'update' : {
					method : 'PUT',
					withCredentials : true
				},
				'remove' : {
					method : 'DELETE',
					withCredentials : true
				}
			});
		} ]);

var sessionServices = angular.module('sessionServices', [ 'ngResource' ]);

sessionServices.factory('Login', [
		'$resource',
		function($resource) {
			return $resource(REST_BACKEND_URL + '/login', {}, {
				'login' : {
					method : 'POST',
					headers : {
						'Content-Type' : 'application/x-www-form-urlencoded'
					},
					withCredentials : true,
					transformRequest : function(obj) {
						var str = [];
						for ( var p in obj)
							str.push(encodeURIComponent(p) + "="
									+ encodeURIComponent(obj[p]));
						return str.join("&");
					}
				}
			});
		} ]);

sessionServices.factory('CurrentUser', [ '$resource', function($resource) {
	return $resource(REST_BACKEND_URL + '/users/current', {}, {
		'list' : {
			method : 'GET',
			isArray : true,
			withCredentials : true
		},
		'getDetails' : {
			method : 'GET',
			withCredentials : true
		}
	});
} ]);

sessionServices.factory('Logout', [ '$resource', function($resource) {
	return $resource(REST_BACKEND_URL + '/logout', {}, {
		'logout' : {
			method : 'POST',
			headers : {
				'Content-Type' : 'application/x-www-form-urlencoded'
			},
			withCredentials: true
		}
	});
} ]);
