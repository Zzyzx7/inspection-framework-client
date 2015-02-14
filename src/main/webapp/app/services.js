var inspectionObjectServices = angular.module('inspectionObjectServices', ['ngResource']);

inspectionObjectServices.factory('InspectionObject', ['$resource',
    function($resource) {
        return $resource('https://inspection-framework.herokuapp.com/inspectionobject/:inspectionobjectid', {}, {
            'list': {
                method: 'GET',
                isArray: true
            },
            'save': {
                method: 'POST'
            },
            'delete': {
                method: 'DELETE'
            }
        });
    }
]);

var inspectionAssignmentServices = angular.module('inspectionAssignmentServices', ['ngResource']);

inspectionAssignmentServices.factory('InspectionAssignment', ['$resource',
    function($resource) {
        return $resource('https://inspection-framework.herokuapp.com/assignment', {}, {
            'list': {
                method: 'GET',
                isArray: true
            },
            'save': {
                method: 'POST'
            }
        });
    }
]);
