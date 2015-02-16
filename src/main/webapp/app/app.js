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
        when('/inspectionobjects', {
            templateUrl: 'views/inspection-object-list.html',
            controller: 'InspectionObjectListCtrl'
        }).
        when('/inspectionobjects/new', {
            templateUrl: 'views/inspection-object-detail.html',
            controller: 'InspectionObjectDetailCtrl'
        }).
        when('/inspectionobjects/:id', {
            templateUrl: 'views/inspection-object-detail.html',
            controller: 'InspectionObjectDetailCtrl'
        }).
        when('/users', {
            templateUrl: 'views/user-list.html',
            controller: 'UserListCtrl'
        }).
        when('/users/new', {
            templateUrl: 'views/user-detail.html',
            controller: 'UserDetailCtrl'
        }).
        when('/users/:id', {
            templateUrl: 'views/user-detail.html',
            controller: 'UserDetailCtrl'
        }).
        when('/assignments', {
            templateUrl: 'views/list-assignments.html',
            controller: 'AssignmentListCtrl'
        }).
        when('/inspectionassignment/new', {
            templateUrl: 'views/add-assignment.html',
            controller: 'AddAssignmentCtrl'
        }).
        when('/assignments/:id', {
            templateUrl: 'views/list-assignments-detail.html',
            controller: 'AssignmentDetailCtrl'
        }).
        when('/templates', {
            templateUrl: 'views/list-templates.html',
            controller: 'TemplateListCtrl'
        }).
        otherwise({
            redirectTo: '/'
        });
    }
]);

//code for add/delete Task in Add Assignment
function addRow(tableID){var table=document.getElementById(tableID);var rowCount=table.rows.length;var row=table.insertRow(rowCount);var colCount=table.rows[0].cells.length;for(var i=0;i<colCount;i++){var newcell=row.insertCell(i);newcell.innerHTML=table.rows[0].cells[i].innerHTML;switch(newcell.childNodes[0].type){case"text":newcell.childNodes[0].value="";break;case"checkbox":newcell.childNodes[0].checked=false;break;case"select-one":newcell.childNodes[0].selectedIndex=0;break;}}}
function deleteRow(tableID){try{var table=document.getElementById(tableID);var rowCount=table.rows.length;for(var i=0;i<rowCount;i++){var row=table.rows[i];var chkbox=row.cells[0].childNodes[0];if(null!=chkbox&&true==chkbox.checked){if(rowCount<=1){alert("Cannot delete all the rows.");break;}
table.deleteRow(i);rowCount--;i--;}}}catch(e){alert(e);}}
