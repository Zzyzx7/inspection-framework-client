var inspectionObjectServices = angular.module('inspectionObjectServices', ['ngResource']);

inspectionObjectServices.factory('InspectionObject', ['$resource',
  function($resource){
    return $resource('https://inspection-framework.herokuapp.com/inspectionobject', {}, {
    	list: {method:'GET', isArray:true},
    	save: {method: 'POST'}
    });
  }]);