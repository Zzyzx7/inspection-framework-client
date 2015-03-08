var inspectionObjectControllers = angular.module('inspectionObjectControllers', []);

inspectionObjectControllers.controller('InspectionObjectListCtrl', [ '$scope',
		'InspectionObject', function($scope, InspectionObject) {
			$scope.inspectionobjects = InspectionObject.list();
			$scope.orderProp = 'objectName';

			$scope.deleteItem = function(inspectionObject) {
				var index = $scope.inspectionobjects.indexOf(inspectionObject);
				InspectionObject.remove({
					inspectionobjectid : inspectionObject.id
				}, function(callbackData) {
					$scope.inspectionobjects.splice(index, 1)
				}, function(callbackData) {
					console.log(callbackData.data.errorMessage);
				});
			}
		} ]);


inspectionObjectControllers.controller('InspectionObjectDetailCtrl', ['$scope', '$location',
          '$routeParams', 'InspectionObject', '$rootScope', 'FileUploader',
          function($scope, $location, $routeParams, InspectionObject, $rootScope, FileUploader) {
      	
			var uploader = $scope.uploader = new FileUploader({
			    url: REST_BACKEND_URL + '/inspectionobject/',
			    alias: 'fileUpload' 
			});
			
			uploader.onBeforeUploadItem = function(item) {
				
			}
			
			uploader.onAfterAddingFile = function(item) {
				item.setDescription = function(description) {
					if(angular.isDefined(description)) {
						if(angular.isDefined(item.formData[0])) {
							item.formData[0] = {fileDescription: description}
						} else {
							item.formData.push({fileDescription: description})
						}
					} else {
						if(angular.isDefined(item.formData[0])) {
							return item.formData[0].fileDescription;
						} else {
							return description;
						}
					} 
				}
				//$scope.inspectionObject.attachments
			};

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
		          inspectionobjectid: $routeParams.id,
		          addAttachmentDetails: true
		      }, function(callbackData) {
		          $scope.inspectionObject = callbackData;
		          $scope.master = angular.copy(callbackData);
		          uploader.url = REST_BACKEND_URL + '/inspectionobject/' + $scope.inspectionObject.id + '/attachment';
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
		      uploader.formData;
		  };
}]);

