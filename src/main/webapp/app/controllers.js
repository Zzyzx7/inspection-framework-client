var inspectionObjectControllers = angular.module('inspectionObjectControllers', []);

inspectionObjectControllers.controller('InspectionObjectListCtrl', ['$scope', 'InspectionObject',
    function($scope, InspectionObject) {
        $scope.inspectionobjects = InspectionObject.list();
        $scope.orderProp = 'objectName';
        
        $scope.deleteItem = function(inspectionObjectId) {
            InspectionObject.delete({inspectionobjectid:inspectionObjectId}, 
	            function(callbackData) {
	                $scope.inspectionobjects = InspectionObject.list();
	            },
	            function(callbackData) {
	                console.log(callbackData.data.errorMessage);
	            });
        }
    }
]);

inspectionObjectControllers.controller('InspectionObjectNewCtrl', ['$scope', '$location', 'InspectionObject',
    function($scope, $location, InspectionObject) {
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

inspectionObjectControllers.controller('InspectionObjectDetailCtrl', ['$scope', '$routeParams', '$http',
    function($scope, $routeParams, $http) {
        $http.get('https://inspection-framework.herokuapp.com/inspectionobject/' + $routeParams.id).success(function(data) {
            $scope.object = data;
        });
    }
]);


var assignmentControllers = angular.module('assignmentControllers', []);

assignmentControllers.controller('AssignmentListCtrl', ['$scope', '$http',
    function($scope, $http) {
        $http.get('https://inspection-framework.herokuapp.com/assignment').success(function(data) {
            $scope.assignments = data;
        });

        $scope.orderProp = 'endDate';
    }
]);

assignmentControllers.controller('AssignmentDetailCtrl', ['$scope', '$routeParams', '$http',
    function($scope, $routeParams, $http) {
        $http.get('https://inspection-framework.herokuapp.com/assignment/' + $routeParams.id).success(function(data) {
            $scope.assignment = data;
        });
    }
]);
