var inspectionObjectControllers = angular.module('inspectionObjectControllers', []);

inspectionObjectControllers.controller('InspectionObjectListCtrl', ['$scope', 'InspectionObject',
    function($scope, InspectionObject) {
        $scope.inspectionobjects = InspectionObject.list();
        $scope.orderProp = 'objectName';

        $scope.deleteItem = function(inspectionObject) {
            var index = $scope.inspectionobjects.indexOf(inspectionObject);
            InspectionObject.remove({
                    inspectionobjectid: inspectionObject.id
                },
                function(callbackData) {
                    $scope.inspectionobjects.splice(index, 1)
                },
                function(callbackData) {
                    console.log(callbackData.data.errorMessage);
                });
        }
    }
]);

inspectionObjectControllers.controller('InspectionObjectNewCtrl', ['$scope', '$location', 'InspectionObject',
    function($scope, $location, InspectionObject) {
		var edit = true;
		
        $scope.editOn = function() {
        	edit = true;
        }
        $scope.editOff = function() {
        	edit = false;
        }
        
        $scope.showEdit = function() {
        	return edit;
        }
        
        $scope.master = {};

        $scope.save = function(inspectionObject) {
            $scope.inspectionObject = angular.copy(inspectionObject);
            $scope.savedInspectionObject = angular.copy(InspectionObject.save($scope.inspectionObject,
                function(callbackData) {
                    $location.path('/inspectionobject/' + callbackData.id);
                },
                function(callbackData) {
                    console.log(callbackData.data.errorMessage);
                }));
        };

        $scope.reset = function() {
            $scope.inspectionObject = angular.copy($scope.master);
        };

        $scope.reset();
    }
]);

inspectionObjectControllers.controller('InspectionObjectDetailCtrl', ['$scope', '$routeParams', 'InspectionObject',
    function($scope, $routeParams, InspectionObject) {
		var edit = false;
		
	    $scope.editOn = function() {
	    	edit = true;
	    }
	    $scope.editOff = function() {
	    	$scope.reset();
	    	edit = false;
	    }
	    
	    $scope.showEdit = function() {
	    	return edit;
	    }
	    
	    $scope.inspectionObject = InspectionObject.getDetails({
            inspectionobjectid: $routeParams.id
        	},
        	function(callbackData) {
        		$scope.master = callbackData;
        	},
            function(callbackData) {
                console.log(callbackData.data.errorMessage);
            });
	    
        $scope.save = function(inspectionObject) {
        	inspectionObject.$update(
        		{ inspectionobjectid: inspectionObject.id
        		},
                function(callbackData) {
        			$scope.master = inspectionObject;
            		$scope.editOff();
                },
                function(callbackData) {
                    console.log(callbackData.data.errorMessage);
                });
        };
        
        $scope.reset = function() {
            $scope.inspectionObject = angular.copy($scope.master);
        };
	    
	    /*InspectionObject.remove({
            inspectionobjectid: inspectionObject.id
        },
        function(callbackData) {
            $scope.inspectionobjects.splice(index, 1)
        },
        function(callbackData) {
            console.log(callbackData.data.errorMessage);
        });*/
	
    }
]);


var InspectionAssignmentControllers = angular.module('inspectionAssignmentControllers', []);

InspectionAssignmentControllers.controller('AssignmentListCtrl', ['$scope', 'InspectionAssignment',
    function($scope, InspectionAssignment) {

        $scope.inspectionassignments = InspectionAssignment.list()


        $scope.orderProp = 'assignmentName';
    }
]);

InspectionAssignmentControllers.controller('AddAssignmentCtrl', ['$scope', 'InspectionAssignment',
    function($scope, InspectionAssignment) {
        $scope.master = {};

        $scope.save = function(inspectionAssignment) {
            $scope.inspectionAssignment = angular.copy(inspectionAssignment);
            InspectionAssignment.save($scope.inspectionAssignment)
        };

        $scope.reset = function() {
            $scope.inspectionAssignment = angular.copy($scope.master);
        };

        $scope.reset();
    }
]);

InspectionAssignmentControllers.controller('AssignmentDetailCtrl', ['$scope', '$routeParams', '$http',
    function($scope, $routeParams, $http) {
        $http.get('https://inspection-framework.herokuapp.com/assignment/' + $routeParams.id).success(function(data) {
            $scope.assignment = data;
        });
    }
]);
