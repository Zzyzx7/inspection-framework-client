var inspectionObjectControllers = angular.module('inspectionObjectControllers', []);

inspectionObjectControllers.controller('InspectionObjectListCtrl', ['$scope', 'InspectionObject',
    function($scope, InspectionObject) {
        $scope.inspectionobjects = InspectionObject.list();
        $scope.orderProp = 'objectName';

        $scope.deleteItem = function(inspectionObject) {
            var index = $scope.inspectionobjects.indexOf(inspectionObject);
            InspectionObject.remove({
                inspectionobjectid: inspectionObject.id
            }, function(callbackData) {
                $scope.inspectionobjects.splice(index, 1)
            }, function(callbackData) {
                console.log(callbackData.data.errorMessage);
            });
        }
    }
]);

inspectionObjectControllers.controller('InspectionObjectDetailCtrl', ['$scope', '$location',
    '$routeParams', 'InspectionObject', '$rootScope', 'uploadManager',
    function($scope, $location, $routeParams, InspectionObject, $rootScope, uploadManager) {

        $scope.formControl = {}
        if ($routeParams.id == null) {
            $scope.formControl.edit = true;
            $scope.formControl.cancelPossible = false;
            $scope.master = {};
            $scope.inspectionObject = {};
        } else {
            $scope.formControl.edit = false;
            $scope.formControl.cancelPossible = true;
            $scope.master = {};
            InspectionObject.getDetails({
                inspectionobjectid: $routeParams.id
            }, function(callbackData) {
                $scope.inspectionObject = callbackData;
                $scope.master = angular.copy(callbackData);
            }, function(callbackData) {
                console.log(callbackData.data.errorMessage);
            });
        }

        $scope.editOn = function() {
            $scope.formControl.edit = true;
        }
        $scope.editOff = function() {
            $scope.formControl.edit = false;
        }

        $scope.save = function(inspectionObject) {
            if (inspectionObject.id == null) {
                InspectionObject.save(inspectionObject, function(callbackData) {
                    $scope.inspectionObject = callbackData;
                    $scope.master = callbackData;
                    $scope.formControl.edit = false;
                    $scope.formControl.cancelPossible = true;
                }, function(callbackData) {
                    $scope.formControl.errorMsg = callbackData.data.errorMessage;
                    $scope.inspectionObjectDetailsForm.$invalid = true;
                });
            } else {
                inspectionObject.$update({
                    inspectionobjectid: inspectionObject.id
                }, function(callbackData) {
                    $scope.master = inspectionObject;
                    $scope.editOff();
                }, function(callbackData) {
                    $scope.formControl.errorMsg = callbackData.data.errorMessage;
                    $scope.inspectionObjectDetailsForm.$invalid = true;
                });
            }
        };

        $scope.reset = function() {
            $scope.inspectionObject = angular.copy($scope.master);
        };
        
        $scope.files = [];
        $scope.percentage = 0;

        $scope.upload = function () {
            uploadManager.upload();
            $scope.files = [];
        };

        $rootScope.$on('fileAdded', function (e, call) {
            $scope.files.push(call);
            $scope.$apply();
        });

        $rootScope.$on('uploadProgress', function (e, call) {
            $scope.percentage = call;
            $scope.$apply();
        });
    }
]);

var userControllers = angular.module('userControllers', []);

userControllers.controller('UserListCtrl', ['$scope', 'User', function($scope, User) {
    $scope.users = User.list();
    $scope.orderProp = 'userName';

    $scope.deleteItem = function(user) {
        var index = $scope.users.indexOf(user);
        User.remove({
            userid: user.id
        }, function(callbackData) {
            $scope.users.splice(index, 1)
        }, function(callbackData) {
            console.log(callbackData.data.errorMessage);
        });
    }
}]);

userControllers.controller('UserDetailCtrl', ['$scope', '$location', '$routeParams', 'User',
    function($scope, $location, $routeParams, User) {

        $scope.formControl = {}
        if ($routeParams.id == null) {
            $scope.formControl.edit = true;
            $scope.formControl.cancelPossible = false;
            $scope.master = {};
            $scope.user = {};
        } else {
            $scope.formControl.edit = false;
            $scope.formControl.cancelPossible = true;
            User.getDetails({
                userid: $routeParams.id
            }, function(callbackData) {
                $scope.user = callbackData;
                $scope.master = angular.copy(callbackData);
            }, function(callbackData) {
                console.log(callbackData.data.errorMessage);
            });
        }

        $scope.editOn = function() {
            $scope.formControl.edit = true;
        }
        $scope.editOff = function() {
            $scope.formControl.edit = false;
        }

        $scope.save = function(user) {
            if (user.id == null) {
                User.save(user, function(callbackData) {
                    $scope.user = callbackData;
                    $scope.master = callbackData;
                    $scope.formControl.edit = false;
                    $scope.formControl.cancelPossible = true;
                }, function(callbackData) {
                    $scope.formControl.errorMsg = callbackData.data.errorMessage;
                    $scope.userDetailsForm.$invalid = true;
                });
            } else {
                user.$update({
                    userid: user.id
                }, function(callbackData) {
                    $scope.master = user;
                    $scope.editOff();
                }, function(callbackData) {
                    $scope.formControl.errorMsg = callbackData.data.errorMessage;
                    $scope.userDetailsForm.$invalid = true;
                });
            }
        };

        $scope.reset = function() {
            $scope.user = angular.copy($scope.master);
        };
    }
]);

var InspectionAssignmentControllers = angular.module('inspectionAssignmentControllers', []);

InspectionAssignmentControllers.controller('AssignmentListCtrl', ['$scope',
    'InspectionAssignment',
    function($scope, InspectionAssignment) {
        $scope.inspectionassignments = InspectionAssignment.list()
        $scope.orderProp = 'assignmentName';
        
        $scope.deleteItem = function(inspectionAssignment) {
            var index = $scope.inspectionassignments.indexOf(inspectionAssignment);
            InspectionAssignment.remove({
                inspectionassignmentid: inspectionAssignment.id
            }, function(callbackData) {
                $scope.inspectionassignments.splice(index, 1)
            }, function(callbackData) {
                console.log(callbackData.data.errorMessage);
            });
        }
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

InspectionAssignmentControllers.controller('AssignmentDetailCtrl', [
    '$scope',
    '$routeParams',
    '$http',
    function($scope, $routeParams, $http) {
        $http.get('https://inspection-framework.herokuapp.com/assignment/' + $routeParams.id)
            .success(function(data) {
                $scope.inspectionassignment = data;
            });
    }
]);

InspectionAssignmentControllers.controller('TemplateListCtrl', ['$scope',
                                                                  'InspectionAssignment',
                                                                  function($scope, InspectionAssignment) {
                                                                      $scope.inspectionassignments = InspectionAssignment.list()
                                                                      $scope.orderProp = 'assignmentName';
                                                                      
                                                                      $scope.deleteItem = function(inspectionAssignment) {
                                                                          var index = $scope.inspectionassignments.indexOf(inspectionAssignment);
                                                                          InspectionAssignment.remove({
                                                                              inspectionassignmentid: inspectionAssignment.id
                                                                          }, function(callbackData) {
                                                                              $scope.inspectionassignments.splice(index, 1)
                                                                          }, function(callbackData) {
                                                                              console.log(callbackData.data.errorMessage);
                                                                          });
                                                                      }
                                                                  }
                                                              ]);
