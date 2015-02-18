var inspectionFrameworkApp = angular.module('inspectionFrameworkApp', [
    'angularFileUpload',
    'ngRoute',
    'inspectionObjectControllers',
    'inspectionAssignmentControllers',
    'inspectionObjectServices',
    'inspectionAssignmentServices',
    'userControllers',
    'userServices'
]);

inspectionFrameworkApp.config(['$routeProvider', '$locationProvider',
    function($routeProvider, $locationProvider) {
        $routeProvider.
        when('/inspectionobjects', {
            templateUrl: 'adminViews/inspection-object-list.html',
            controller: 'InspectionObjectListCtrl'
        }).
        when('/inspectionobjects/new', {
            templateUrl: 'adminViews/inspection-object-detail.html',
            controller: 'InspectionObjectDetailCtrl'
        }).
        when('/inspectionobjects/:id', {
            templateUrl: 'adminViews/inspection-object-detail.html',
            controller: 'InspectionObjectDetailCtrl'
        }).
        when('/users', {
            templateUrl: 'adminViews/user-list.html',
            controller: 'UserListCtrl'
        }).
        when('/users/new', {
            templateUrl: 'adminViews/user-detail.html',
            controller: 'UserDetailCtrl'
        }).
        when('/users/:id', {
            templateUrl: 'adminViews/user-detail.html',
            controller: 'UserDetailCtrl'
        }).
        when('/assignments', {
            templateUrl: 'adminViews/list-assignments.html',
            controller: 'AssignmentListCtrl'
        }).
        when('/inspectionassignment/new', {
            templateUrl: 'adminViews/add-assignment.html',
            controller: 'AddAssignmentCtrl'
        }).
        when('/assignments/:id', {
            templateUrl: 'adminViews/list-assignments-detail.html',
            controller: 'AssignmentDetailCtrl'
        }).
        when('/templates', {
            templateUrl: 'adminViews/list-templates.html',
            controller: 'TemplateListCtrl'
        }).
        otherwise({
            redirectTo: '/'
        });
    }
]);

/*
inspectionFrameworkApp.factory('uploadManager', function($rootScope) {
    var _files = [];
    return {
        add: function(file) {
            _files.push(file);
            $rootScope.$broadcast('fileAdded', file.files[0].name);
        },
        clear: function() {
            _files = [];
        },
        files: function() {
            var fileNames = [];
            $.each(_files, function(index, file) {
                fileNames.push(file.files[0].name);
            });
            return fileNames;
        },
        upload: function() {
            $.each(_files, function(index, file) {
                file.submit();
            });
            this.clear();
        },
        setProgress: function(percentage) {
            $rootScope.$broadcast('uploadProgress', percentage);
        }
    };
});

inspectionFrameworkApp.directive('upload', ['uploadManager', function factory(uploadManager) {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            $(element).fileupload({
                dataType: 'text',
                add: function(e, data) {
                    uploadManager.add(data);
                },
                progressall: function(e, data) {
                    var progress = parseInt(data.loaded / data.total * 100, 10);
                    uploadManager.setProgress(progress);
                },
                done: function(e, data) {
                    uploadManager.setProgress(0);
                }
            });
        }
    };
}]);
*/