var inspectionFrameworkApp = angular.module('inspectionFrameworkApp', [
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
        
        when('/profile', {
            templateUrl: 'userViews/profile.html',
            controller: 'UserDetailCtrl'
        }).
        when('/assignments', {
            templateUrl: 'userViews/assignments.html',
            controller: 'AssignmentListCtrl'
        }).
        when('/assignments/:id', {
            templateUrl: 'userViews/assignments-detail.html',
            controller: 'AssignmentDetailCtrl'
        }).
        when('/saved', {
            templateUrl: 'userViews/saved.html',
            controller: 'TemplateListCtrl'
        }).
        otherwise({
            redirectTo: '/assignments'
        });
    }
]);

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
