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
          '$routeParams', 'InspectionObject', '$rootScope', 'FileUploader', 'InspectionObjectAttachment', 'Attachment',
          function($scope, $location, $routeParams, InspectionObject, $rootScope, FileUploader, InspectionObjectAttachment, Attachment ) {
      	
			var uploader = $scope.uploader = new FileUploader({
			    url: REST_BACKEND_URL + '/inspectionobject/',
			    alias: 'fileUpload',
			    removeAfterUpload: true,
			    withCredentials: true
			});
			
			uploader.onSuccessItem = function(item, response, status, headers) {
				getInspectionObjectDetails($scope.inspectionObject.id);
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
			};

		  $scope.formControl = {};
		  $scope.noAttachments = false;
		  
		  setUploaderUrl = function(inspectionObjectid) {
			  uploader.url = REST_BACKEND_URL + '/inspectionobject/' + inspectionObjectid + '/attachment';
		  }
		  
		  getInspectionObjectDetails = function(inspectionObjectId) {
		      InspectionObject.getDetails({
		          inspectionobjectid: inspectionObjectId,
		          addAttachmentDetails: true
		      }, function(callbackData) {
		          $scope.inspectionObject = callbackData;
		          $scope.master = angular.copy(callbackData);
		          setUploaderUrl($scope.inspectionObject.id);
		          //uploader.url = REST_BACKEND_URL + '/inspectionobject/' + $scope.inspectionObject.id + '/attachment';
		          if($scope.inspectionObject.attachments === undefined || $scope.inspectionObject.attachments == null || $scope.inspectionObject.attachments.length == 0) {
		        	  $scope.noAttachments = true;
		          } else {
		        	  $scope.noAttachments = false;
		          }
		      }, function(callbackData) {
		          console.log(callbackData.data.errorMessage);
		      });
		  }
		  
		  if ($routeParams.id == null) {
		      $scope.formControl.edit = true;
		      $scope.formControl.cancelPossible = false;
		      $scope.master = {};
		      $scope.inspectionObject = {};
		  } else {
		      $scope.formControl.edit = false;
		      $scope.formControl.cancelPossible = true;
		      $scope.master = {};
		      getInspectionObjectDetails($routeParams.id);
		  }
		  
		  $scope.editOn = function() {
		      $scope.formControl.edit = true;
		  }
		  $scope.editOff = function() {
		      $scope.formControl.edit = false;
		  }
		  
		  $scope.downloadAttachment = function(attachment) {
			  window.open(attachment.url)
			  
			  /*Attachment.download({
				  gridfsid: attachment.gridFsId,
			  }, function(callbackData) {
				  window.saveAs(callbackData.response, attachment.fileName);
				  //window.saveAs(new Blob([callbackData]), attachment.fileName)
				  /*var file = new Blob([ callbackData ], {
                      type : 'application/csv'
                  });
				  var fileURL 	= URL.createObjectURL(file);
                  var a         = document.createElement('a');
                  a.href        = fileURL; 
                  a.target      = '_blank';
                  document.body.appendChild(a);
                  a.click();
			  }, function(callbackData) {
				  console.log(callbackData.data.errorMessage);
			  }) */
		  }
			$scope.deleteAttachment = function(inspectionObject, attachment) {
				var index = $scope.inspectionObject.attachments.indexOf(attachment);
				InspectionObjectAttachment.remove({
					attachmentid : attachment.gridFsId,
					inspectionobjectid : inspectionObject.id
				}, function(callbackData) {
					$scope.inspectionObject.attachments.splice(index, 1);
					$scope.master.attachments.splice(index, 1);
				}, function(callbackData) {
					console.log(callbackData.data.errorMessage);
				});
			}
		
		  $scope.save = function(inspectionObject) {
		      if (inspectionObject.id == null) {
		          InspectionObject.save(inspectionObject, function(callbackData) {
		              $scope.inspectionObject = callbackData;
		              $scope.master = callbackData;
		              $scope.formControl.edit = false;
		              $scope.formControl.cancelPossible = true;
		              setUploaderUrl($scope.inspectionObject.id);
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
		          }, function(errorData) {
		              alert(errorData.data.errorMessage);
		          });
		      }
		  };

		  $scope.reset = function() {
		      $scope.inspectionObject = angular.copy($scope.master);
		      uploader.formData;
		  };
}]);

