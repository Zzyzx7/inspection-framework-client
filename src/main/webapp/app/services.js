var inspectionObjectServices = angular.module('inspectionObjectServices', ['ngResource']);

inspectionObjectServices.factory('InspectionObject', ['$resource',
    function($resource) {
        return $resource('https://inspection-framework.herokuapp.com/inspectionobject/:inspectionobjectid', {}, {
            'list': {
                method: 'GET',
                isArray: true
            },
            'getDetails': {
                method: 'GET'
            },
            'save': {
                method: 'POST'
            },
            'update': {
                method: 'PUT'
            },
            'remove': {
                method: 'DELETE'
            }
        });
    }
]);

var userServices = angular.module('userServices', ['ngResource']);

userServices.factory('User', ['$resource',
    function($resource) {
        return $resource('https://inspection-framework.herokuapp.com/users/:userid', {}, {
            'list': {
                method: 'GET',
                isArray: true
            },
            'getDetails': {
                method: 'GET'
            },
            'save': {
                method: 'POST'
            },
            'update': {
                method: 'PUT'
            },
            'remove': {
                method: 'DELETE'
            }
        });
    }
]);

var inspectionAssignmentServices = angular.module('inspectionAssignmentServices', ['ngResource']);

inspectionAssignmentServices.factory('InspectionAssignment', ['$resource',
    function($resource) {
        return $resource('https://inspection-framework.herokuapp.com/assignment/:inspectionassignmentid', {}, {
            'list': {
                method: 'GET',
                isArray: true
            },
            'getDetails': {
                method: 'GET'
            },
            'save': {
                method: 'POST'
            },
            'update': {
                method: 'PUT'
            },
            'remove': {
                method: 'DELETE'
            }
        });
    }
]);
