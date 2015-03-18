var InspectionAssignmentControllers = angular.module(
		'inspectionAssignmentControllers', []);

InspectionAssignmentControllers.controller('AssignmentListCtrl', [
		'$scope',
		'InspectionAssignment',
		'CurrentUser',
		function($scope, InspectionAssignment, CurrentUser) {
			$scope.inspectionassignments = InspectionAssignment.list()
			$scope.orderProp = 'assignmentName';

			// get User ID for "Manage Profile" Link
			CurrentUser.getDetails(
 					function(callbackData) {
							$scope.currentUser = callbackData;
							$scope.master = angular.copy(callbackData);
						}, function(callbackData) {
							console.log(callbackData.data.errorMessage);
						});	
			
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
			
			$scope.finish = function(inspectionAssignment) {

				inspectionAssignment.state = '2';
				inspectionAssignment
						.$update(
								{
									inspectionassignmentid : inspectionAssignment.id
								},
								function(callbackData) {
									$scope.master = inspectionAssignment;
								
								}
								);
				
				
			};
		} ]);



InspectionAssignmentControllers
		.controller(
				'AssignmentDetailCtrl',
				[
						'$scope',
						'$location',
						'$routeParams',
						'InspectionAssignment',
						'$rootScope',
						function($scope, $location, $routeParams,
								InspectionAssignment, $rootScope) {

							$scope.formControl = {}


							$scope.master = {};
							InspectionAssignment.getDetails({
								inspectionassignmentid : $routeParams.id
							}, function(callbackData) {
								$scope.inspectionAssignment = callbackData;
								$scope.master = angular.copy(callbackData);
							}, function(callbackData) {
								console.log(callbackData.data.errorMessage);
							});

							

							$scope.save = function(inspectionAssignment) {

								inspectionAssignment.state = '1';
								inspectionAssignment
										.$update(
												{
													inspectionassignmentid : inspectionAssignment.id
												},
												function(callbackData) {
													$scope.master = inspectionAssignment;
													alert("Assignment saved successfully.")
												}
												);
								
								
							};
							
							$scope.finish = function(inspectionAssignment) {

								inspectionAssignment.state = '2';
								inspectionAssignment
										.$update(
												{
													inspectionassignmentid : inspectionAssignment.id
												},
												function(callbackData) {
													$scope.master = inspectionAssignment;
													
													alert("Assignment submitted successfully.")
													
													$location.path( '/assignments' );
												}
												);
								
							};

							$scope.reset = function() {
								$scope.inspectionAssignment = angular
										.copy($scope.master);
							};

							
							
						} ]);

InspectionAssignmentControllers.controller(
		'TaskErrorCtrl',
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
					
						
					 getInspectionAssignmentTaskDetails = function(inspectionAssignmentId) {
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
                                                            			  InspectionAssignmentAttachmentTask.remove({
                                                            				  attachmentid : attachment.gridFsId,
                                                            				  inspectionassignmentid : inspectionAssignment.id
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





