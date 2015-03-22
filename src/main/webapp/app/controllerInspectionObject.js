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
			    withCredentials: true,
			    queueLimit: 1
			});
			
			addAlert = function(message, type) {
				if($scope.alerts == undefined) {
					$scope.alerts = new Array();
				}
				$scope.alerts.push({type: type, msg: message});
			}
			  
			clearAlerts = function() {
				if($scope.alerts == undefined) {
					$scope.alerts = new Array();
				}
				$scope.alerts = [];
			}
			  
			uploader.onSuccessItem = function(item, response, status, headers) {
				getInspectionObjectDetails($scope.inspectionObject.id);
			}
			
			uploader.onErrorItem = function(item, response, status, headers) {
				addAlert(response, 'danger');
			}
			
			uploader.onBeforeUploadItem = function(item) {
				if(angular.isDefined($scope.fileDescription)) {
					if(angular.isDefined(item.formData[0])) {
						item.formData[0] = {fileDescription: $scope.fileDescription}
					} else {
						item.formData.push({fileDescription: $scope.fileDescription})
					}
				}
			} 
			
		  $scope.formControl = {};
		  $scope.noAttachments = false;
		  
		  $scope.performUpload = function() {
			  uploader.uploadItem(0);
			  if(angular.isDefined($scope.fileDescription)) {
				  $scope.fileDescription = "";
			  }
			  document.getElementById('fileInput').value = "";
		  }
		  
		  $scope.resetUploadQueue = function() {
			  uploader.clearQueue();
		  }
		  
		  setUploaderUrl = function(inspectionObjectid) {
			  uploader.url = REST_BACKEND_URL + '/inspectionobject/' + inspectionObjectid + '/attachment';
		  }
		  
		  getInspectionObjectDetails = function(inspectionObjectId) {
			  this.clearAlerts();
		      InspectionObject.getDetails({
		          inspectionobjectid: inspectionObjectId,
		          addAttachmentDetails: true
		      }, function(callbackData) {
		          $scope.inspectionObject = callbackData;
		          $scope.master = angular.copy(callbackData);
		          setUploaderUrl($scope.inspectionObject.id);
		          if($scope.inspectionObject.attachments === undefined || $scope.inspectionObject.attachments == null || $scope.inspectionObject.attachments.length == 0) {
		        	  $scope.noAttachments = true;
		          } else {
		        	  $scope.noAttachments = false;
		          }
		      }, function(callbackData) {
		    	  addAlert(callbackData.data.errorMessage, 'danger')
		      });
		  }
		  
		  if ($routeParams.id == null) {
		      $scope.formControl.edit = true;
		      $scope.formControl.cancelPossible = false;
		      $scope.noAttachments = true;
		      $scope.master = {};
		      $scope.inspectionObject = {};
		  } else {
		      $scope.formControl.edit = false;
		      $scope.formControl.cancelPossible = true;
		      $scope.master = {};
		      getInspectionObjectDetails($routeParams.id);
		  }
		  
		  $scope.editOn = function() {
			  clearAlerts();
		      $scope.formControl.edit = true;
		  }
		  $scope.editOff = function() {
			  clearAlerts();
		      $scope.formControl.edit = false;
		  }
		  
		  $scope.downloadAttachment = function(attachment) {
			  window.open(attachment.url)
		  }
		  
		  $scope.deleteAttachment = function(inspectionObject, attachment) {
			  clearAlerts();
			  var index = $scope.inspectionObject.attachments.indexOf(attachment);
			  InspectionObjectAttachment.remove({
				  attachmentid : attachment.gridFsId,
				  inspectionobjectid : inspectionObject.id
			  }, function(callbackData) {
				  $scope.inspectionObject.attachments.splice(index, 1);
				  $scope.master.attachments.splice(index, 1);
				  if($scope.inspectionObject.attachments.length == 0) {
					  $scope.noAttachments = true;
				  } else {
					  $scope.noAttachments = false;
				  }
			  }, function(callbackData) {
				  addAlert(callbackData.data.errorMessage, 'danger')
			  });
		  }
		
		  $scope.save = function(inspectionObject) {
			  clearAlerts();
		      if (inspectionObject.id == null) {
		          InspectionObject.save(inspectionObject, function(callbackData) {
		              $scope.inspectionObject = callbackData;
		              $scope.master = callbackData;
		              $scope.formControl.edit = false;
		              $scope.formControl.cancelPossible = true;
		              setUploaderUrl($scope.inspectionObject.id);
		              $location.path('/inspectionobjects/' + $scope.inspectionObject.id);
		          }, function(callbackData) {
		        	  addAlert(callbackData.data.errorMessage, 'danger')
		          });
		      } else {
		          inspectionObject.$update({
		              inspectionobjectid: inspectionObject.id
		          }, function(callbackData) {
		              $scope.master = inspectionObject;
		              $scope.editOff();
		          }, function(callbackData) {
		        	  addAlert(callbackData.data.errorMessage, 'danger')
		          });
		      }
		  };

		  $scope.reset = function() {
			  clearAlerts();
		      $scope.inspectionObject = angular.copy($scope.master);
		      uploader.formData;
		  };
		  
		  $scope.closeAlert = function(index) {
			  $scope.alerts.splice(index, 1);
		  };
}]);

