var InspectionAssignmentControllers = angular.module(
		'inspectionAssignmentControllers', ['ui.bootstrap']);

InspectionAssignmentControllers.controller('AssignmentListCtrl', [
		'$scope',
		'InspectionAssignment',
		function($scope, InspectionAssignment) {
			$scope.inspectionassignments = InspectionAssignment.list()
			$scope.orderProp = 'assignmentName';

			$scope.deleteItem = function(inspectionAssignment) {
				var index = $scope.inspectionassignments
						.indexOf(inspectionAssignment);
				InspectionAssignment.remove({
					inspectionassignmentid : inspectionAssignment.id
				}, function(callbackData) {
					$scope.inspectionassignments.splice(index, 1)
				}, function(callbackData) {
					console.log(callbackData.data.errorMessage);
				});
			}
		} ]);



InspectionAssignmentControllers.controller('AddAssignmentCtrl', [
		'$scope',
		'$http',
		'$location',
		'$routeParams',
		'InspectionAssignment',
		'User',
		'InspectionObject',
				
		function($scope, $http, $location, $routeParams, InspectionAssignment, User, InspectionObject) {
			
			
			//date picker:
			$scope.today = function() {
			    $scope.dt = new Date();
			  };
			  $scope.today();

			  $scope.clear = function () {
			    $scope.dt = null;
			  };

			  // Disable weekend selection
//			  $scope.disabled = function(date, mode) {
//			    return ( mode === 'day' && ( date.getDay() === 0 || date.getDay() === 6 ) );
//			  };
//
//			  $scope.toggleMin = function() {
//			    $scope.minDate = $scope.minDate ? null : new Date();
//			  };
//			  $scope.toggleMin();

			  $scope.open = function($event) {
			    $event.preventDefault();
			    $event.stopPropagation();

			    if($event.target.attributes.id.value == '1'){
			    	$scope.opened1 = true;
				    $scope.opened2 = false;
			    }
			    if($event.target.attributes.id.value == '2'){
			    	$scope.opened1 = false;
				    $scope.opened2 = true;
			    }
			    
			  };
			  
			  $scope.dateOptions = {
			    formatYear: 'yy',
			    startingDay: 1
			  };

			  $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
			  $scope.format = $scope.formats[2];
			  
			  $scope.onDateChange1 = function() {
                  if (this.inspectionassignment.startDate) {
                    this.inspectionassignment.startDate = this.inspectionassignment.startDate.getTime();
                  }
                };
                
                $scope.onDateChange2 = function() {
                    if (this.inspectionassignment.endDate) {
                      this.inspectionassignment.endDate = this.inspectionassignment.endDate.getTime();
                    }
                  };
			//end of datepicker

			$scope.formControl = {}
			
			if ($routeParams.id == null) {
				$scope.inspectionassignment = {};
				
				$scope.inspectionassignment.isTemplate = 'false';

				$scope.inspectionassignment.tasks = new Array();
				$scope.inspectionassignment.tasks.push({
					taskName : "",
					description : ""
				});
				$scope.addTask = function() {
					$scope.inspectionassignment.tasks.push({
						taskName : "",
						description : ""
					});
				}

				$scope.master = {};

			} else {

				$http.get(
						REST_BACKEND_URL + '/assignment/'
								+ $routeParams.id).success(function(data) {
					var template = data;

					delete template.id;
					delete template.assignmentName;

					$scope.inspectionassignment = template;
					
					$scope.inspectionassignment.isTemplate = 'false';
				});

				$scope.addTask = function() {
					$scope.inspectionassignment.tasks.push({
						taskName : "",
						description : ""
					});
				}

			}
			
			
				$scope.users = User.list();
			
			    $scope.inspectionobjects = InspectionObject.list();
			
			$scope.save = function(inspectionAssignment) {
				
				if($scope.inspectionassignment.isTemplate == 'true') {
					$scope.inspectionassignment.inspectionObject = null;
					$scope.inspectionassignment.user = null;
					$scope.inspectionassignment.startDate = null;
					$scope.inspectionassignment.endDate = null;
				}	
				
				
				InspectionAssignment
							.save(
									inspectionAssignment,
									function(callbackData) {
										$scope.inspectionAssignment = callbackData;
										$scope.master = callbackData;
										
										
										alert('Saved successfully.');
										$location.path( '/assignments' );
									},
									function(callbackData) {
									  alert(callbackData.data.errorMessage);
										
										
									});
				
				
			};

			$scope.reset = function() {
				$scope.inspectionassignment = angular.copy($scope.master);

				$scope.inspectionassignment = {};

				$scope.inspectionassignment.tasks = new Array();
				$scope.inspectionassignment.tasks.push({
					taskName : "",
					description : ""
				});

			};

		} ]);

InspectionAssignmentControllers.controller('AssignmentDetailCtrl', [
		'$scope',
		'$routeParams',
		'$http',
		function($scope, $routeParams, $http) {
			$http.get(
					REST_BACKEND_URL + '/assignment/'
							+ $routeParams.id).success(function(data) {
				$scope.inspectionassignment = data;
			});
		} ]);

InspectionAssignmentControllers.controller(
		'ErrorDetailCtrl',
		[
				'$scope',
				'$location',
				'$routeParams',
				'InspectionAssignmentTask',
				'$rootScope',
				'FileUploader',
				'InspectionAssignmentAttachment',
				'Attachment',
				function($scope, $location, $routeParams,
						InspectionAssignmentTask, $rootScope, FileUploader, InspectionAssignmentAttachment, Attachment) {
					
					var uploader = $scope.uploader = new FileUploader({
        			    url: REST_BACKEND_URL + '/assignment/',
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
        				getInspectionAssignmentTaskDetails($scope.inspectionAssignmentTask.id);
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
        		  
        		  setUploaderUrl = function(taskid) {
        			  uploader.url = REST_BACKEND_URL + '/assignment/' + $routeParams.id + '/task/' + taskid + '/attachment';
        		  }
					
						
				 getInspectionAssignmentTaskDetails = function() {
				 	this.clearAlerts();
					InspectionAssignmentTask.getDetails({
							inspectionassignmentid : $routeParams.id,
							taskid : $routeParams.taskid,
							addAttachmentDetails: true
							
						}, function(callbackData) {
							$scope.inspectionAssignmentTask = callbackData;
							$scope.master = angular.copy(callbackData);
							
							setUploaderUrl($scope.inspectionAssignmentTask.id);
          		          if($scope.inspectionAssignmentTask.attachments === undefined || $scope.inspectionAssignmentTask.attachments == null || $scope.inspectionAssignmentTask.attachments.length == 0) {
          		        	  $scope.noAttachments = true;
          		          } else {
          		        	  $scope.noAttachments = false;
          		          }
						}, function(callbackData) {
							console.log(callbackData.data.errorMessage);
						});
				 	}
					 
					 $scope.master = {};
				      getInspectionAssignmentTaskDetails($routeParams.id);
						
						$scope.downloadAttachment = function(attachment) {
              			  window.open(attachment.url)
						}
						
						 $scope.deleteAttachment = function(inspectionAssignmentTask, attachment) {
                                        			  clearAlerts();
                                        			  var index = $scope.inspectionAssignmentTask.attachments.indexOf(attachment);
                                        			  InspectionAssignmentAttachment.remove({
                                        				  attachmentid : attachment.gridFsId,
                                        				  inspectionassignmentid : $routeParams.id,
                                        				  taskid: inspectionAssignmentTask.id
                                        			  }, function(callbackData) {
                                        				  $scope.inspectionAssignmentTask.attachments.splice(index, 1);
                                        				  $scope.master.attachments.splice(index, 1);
                                        				  if($scope.inspectionAssignmentTask.attachments.length == 0) {
                                        					  $scope.noAttachments = true;
                                        				  } else {
                                        					  $scope.noAttachments = false;
                                        				  }
                                        			  }, function(callbackData) {
                                        				  addAlert(callbackData.data.errorMessage, 'danger')
                                        			  });
                                        		  }
						
						
						
                        $scope.save = function(inspectionAssignmentTask) {
											inspectionAssignmentTask.$update({
												inspectionassignmentid: $routeParams.id,
												taskid: inspectionAssignmentTask.id
									          }, function(callbackData) {
									              $scope.master = inspectionAssignmentTask;
									              
									              alert('Saved successfully.');
												  $location.path( '/assignments/' + $routeParams.id);
									          }, function(callbackData) {
									              alert(callbackData.data.errorMessage);
									          });
					};

					$scope.reset = function() {
						$scope.inspectionAssignmentTask = angular
								.copy($scope.master);
					};

					
				} ]);

InspectionAssignmentControllers.controller('TemplateListCtrl', [
		'$scope',
		'InspectionAssignment',
		function($scope, InspectionAssignment) {
			$scope.inspectionassignments = InspectionAssignment.list()
			$scope.orderProp = 'assignmentName';

			$scope.deleteItem = function(inspectionAssignment) {
				var index = $scope.inspectionassignments
						.indexOf(inspectionAssignment);
				InspectionAssignment.remove({
					inspectionassignmentid : inspectionAssignment.id
				}, function(callbackData) {
					$scope.inspectionassignments.splice(index, 1)
				}, function(callbackData) {
					console.log(callbackData.data.errorMessage);
				});
			}
		} ]);



