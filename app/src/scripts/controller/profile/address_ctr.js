//登录
var address_ctr = myApp.controller('address_ctr', ['$scope', '$rootScope', '$log', '$timeout', '$http', '$location', 'MyProvider', 'publicFunc', 'ioniclocalStorage', '$ionicLoading',
	function($scope, $rootScope, $log, $timeout, $http, $location, MyProvider, publicFunc, ioniclocalStorage, $ionicLoading) {

		//获取本地缓存数据
		$rootScope.userInfo = ioniclocalStorage.getObject("userInfo");

		//1.收货地址列表
		$scope.getUserAddress = function() {

			//url需要传的参数
			$scope.paramsList = {
				token: $rootScope.userInfo.token,
				uid: $rootScope.userInfo.uid,
				pageNo: 1
			};
			//方便在外部添加参数
			var paramsList = publicFunc.paramsConfig($scope.paramsList);
			$log.info(paramsList);
			$http({
					method: 'get',
					params: paramsList,
					//  data:{name:'john',age:27},
					url: MyProvider.domain + "/user/getUserAddress.do",
				})
				.success(function(response, status, headers, config) {
					$log.info(response);
					if (response.status.msg == "SUCCESS") {
						$scope.addressList = response.result.list;
					} else {
						$scope.addressList = "";						
						publicFunc.showAlert("温馨提示", response.status.msg,"我知道了");
					}
				})
				.error(function(response, status, headers, config) {
					publicFunc.showAlert("温馨提示", "连接接服务器出错","我知道了");
				})
				.finally(function() {
					$scope.$broadcast('scroll.refreshComplete');
				});

		}

		//2.添加收货地址
		$scope.addUserAddress = function() {
				var infoMobile = publicFunc.isMobile($scope.telephone);

				if ($scope.getname == undefined || $scope.getname == "") {
					publicFunc.showAlert("温馨提示", "请填写收货人姓名","我知道了");
					return false;
				} else if ($scope.telephone == "" || infoMobile == false || $scope.telephone == undefined) {
					publicFunc.showAlert("温馨提示", "请填写正确的手机号码","我知道了");
					return false;
				} else if ($scope.address == "" || $scope.address == undefined) {
					publicFunc.showAlert("温馨提示", "请填写收货详细地址","我知道了");
					return false;
				}
				//url需要传的参数
				$scope.paramsList = {
					token: $rootScope.userInfo.token,
					uid: $rootScope.userInfo.uid,
					name: $scope.getname,
					telephone: $scope.telephone,
					address: $scope.address
				};
				//方便在外部添加参数
				var paramsList = publicFunc.paramsConfig($scope.paramsList);
				$log.info(paramsList);

				$http({
						method: 'get',
						params: paramsList,
						//  data:{name:'john',age:27},
						url: MyProvider.domain + "/user/addUserAddress.do",
					})
					.success(function(response, status, headers, config) {
						$log.info(response);
						if (response.status.msg == "SUCCESS") {
	var alertPopup=publicFunc.showAlert("温馨提示", "添加成功",'我知道了');						
				alertPopup.then(function(res) {
						$location.path("/address").replace();		   
		          });	
							

						} else {
							publicFunc.showAlert("温馨提示", response.status.msg,"我知道了");
						}
					})
					.error(function(response, status, headers, config) {
						publicFunc.showAlert("温馨提示", "连接接服务器出错","我知道了");
					});

			}
			//3.删除收货地址
		$scope.deleteUserAddress = function(id) {
			var confirmPopup1=publicFunc.showConfirm("温馨提示", "确定要删除该地址吗？",'取消',"确定");				
				confirmPopup1.then(function(res) {
			if (res) {
			//url需要传的参数
			$scope.paramsList = {
				token: $rootScope.userInfo.token,
				uid: $rootScope.userInfo.uid,
				id: id
			};
			//方便在外部添加参数
			var paramsList = publicFunc.paramsConfig($scope.paramsList);
			$log.info(paramsList);
			$http({
					method: 'get',
					params: paramsList,
					//  data:{name:'john',age:27},
					url: MyProvider.domain + "/user/deleteUserAddress.do",
				})
				.success(function(response, status, headers, config) {
					$log.info(response);
					if (response.status.msg == "SUCCESS") {
						$scope.getUserAddress();

					} else {
						publicFunc.showAlert("温馨提示", response.status.msg,"我知道了");
					}
				})
				.error(function(response, status, headers, config) {
					publicFunc.showAlert("温馨提示", "连接接服务器出错","我知道了");
				})
				.finally(function() {
					$scope.$broadcast('scroll.refreshComplete');
				});
			} 

			
		});		
		}

//4.编辑用户登陆密码
$scope.newPassword="";
$scope.oldPassword="";
$scope.newPasswordAgin="";
	$scope.editPassword = function() {
			var ispassword=publicFunc.ispassword($scope.newPassword);		
		if($scope.oldPassword==""){
						publicFunc.showAlert("温馨提示", "请输入登录密码",'我知道了');
						return false;			
		}
				if($scope.newPassword==""){
						publicFunc.showAlert("温馨提示", "新密码不能为空",'我知道了');
						return false;			
		}
			if(ispassword==false){
						publicFunc.showAlert("温馨提示", "新密码格式不正确",'我知道了');
						return false;			
		}				
					if($scope.newPasswordAgin!=$scope.newPassword){
						publicFunc.showAlert("温馨提示", "两次输入的密码不一致",'我知道了');
						return false;			
		}
			//url需要传的参数
			$scope.paramsList = {
				token: $rootScope.userInfo.token,
				uid: $rootScope.userInfo.uid,
				oldPassword: $scope.oldPassword,
				newPassword: $scope.newPassword,
				newPasswordAgin:$scope.newPasswordAgin,
				
			};
			//方便在外部添加参数
			var paramsList = publicFunc.paramsConfig($scope.paramsList);
			$log.info(paramsList);
			$http({
					method: 'get',
					params: paramsList,
					//  data:{name:'john',age:27},
					url: MyProvider.domain + "/user/editPassword.do",
			})
				.success(function(response) {
					if (response.status.msg == "SUCCESS") {
				var alertPopup=publicFunc.showAlert("温馨提示", "密码修改成功，请牢记您的密码",'我知道了');						
				alertPopup.then(function(res) {
						$location.path("/profile").replace();			   
		          });	
					} else {
						publicFunc.showAlert("温馨提示", response.status.msg,'我知道了');
						$ionicLoading.hide();
					}
				})
				.error(function(response) {
					$log.info(response);
					$ionicLoading.hide();
				})
				.finally(function(response) {
					$scope.$broadcast('scroll.refreshComplete');
				})
		}
	
	//5.修改收货地址
	$scope.getUpdate = function(id,name,telephone,address) {
		$rootScope.getUpdateList={
			id:id,
			name:name,
			telephone:telephone,
			address:address,
		};
		$location.path("/addressDesc").replace();
		}
	//5.修改收货地址
	$scope.updateUserAddress = function() {
		var infoMobile = publicFunc.isMobile($rootScope.getUpdateList.telephone);
		if($rootScope.getUpdateList.name==""){
			publicFunc.showAlert("温馨提示", "收货人姓名不能为空",'我知道了');
			return false;
		};
		if($rootScope.getUpdateList.telephone==""||infoMobile==false){
			publicFunc.showAlert("温馨提示", "手机号码格式不正确",'我知道了');
			return false;
		};
		if($rootScope.getUpdateList.address==""){
			publicFunc.showAlert("温馨提示", "收货人地址不能为空",'我知道了');
			return false;
		}
			//url需要传的参数
			$scope.paramsList = {
				token: $rootScope.userInfo.token,
				uid: $rootScope.userInfo.uid,
				id: $rootScope.getUpdateList.id,
				name:$rootScope.getUpdateList.name,
				telephone:$rootScope.getUpdateList.telephone,
				address:$rootScope.getUpdateList.address
				
			};
			//方便在外部添加参数
			var paramsList = publicFunc.paramsConfig($scope.paramsList);
			$log.info(paramsList);
			$http({
					method: 'get',
					params: paramsList,
					//  data:{name:'john',age:27},
					url: MyProvider.domain + "/user/updateUserAddress.do",
				})


				.success(function(response) {
					
			$log.info(response);
					if (response.status.msg == "SUCCESS") {
							var alertPopup=publicFunc.showAlert("温馨提示", "信息修改成功",'我知道了');		
							  $scope.getUserAddress();
				alertPopup.then(function(res) {
					
						$location.path("/address").replace();		   
		          });	
              

	
						
					} else {
						publicFunc.showAlert("温馨提示", response.status.msg,'我知道了');
						$ionicLoading.hide();
					}
				})
				.error(function(response) {
					$log.info(response);
					$ionicLoading.hide();
				})
				.finally(function(response) {
					$scope.$broadcast('scroll.refreshComplete');
				})

		}
	//6.编辑用户登陆密码
	$rootScope.passwordlist={
		password:'',
		newpaymentcode:'',
		newpaymentcodeagin:''		
	}
	$scope.updatePaymentcode = function() {
	var iszhifu=publicFunc.iszhifupassword($rootScope.passwordlist.newpaymentcode);
		
		if($rootScope.passwordlist.password==""){
						publicFunc.showAlert("温馨提示", "请输入登录密码",'我知道了');
						return false;
			
		}
		
			if($rootScope.passwordlist.newpaymentcode==""||iszhifu==false){
						publicFunc.showAlert("温馨提示", "请输入长度为6位的支付密码",'我知道了');
						return false;
			
		}
		
						if($rootScope.passwordlist.newpaymentcodeagin==""){
						publicFunc.showAlert("温馨提示", "请再次输入支付密码",'我知道了');
						return false;			
		}
					if($rootScope.passwordlist.newpaymentcodeagin!=$rootScope.passwordlist.newpaymentcode){
						publicFunc.showAlert("温馨提示", "两次输入支付密码不一致",'我知道了');
						return false;
			
		}
			//url需要传的参数
			$scope.paramsList = {
				token: $rootScope.userInfo.token,
				uid: $rootScope.userInfo.uid,
				password: $rootScope.passwordlist.password,
				newpaymentcode: $rootScope.passwordlist.newpaymentcode,								
			};
			
			//方便在外部添加参数
			var paramsList = publicFunc.paramsConfig($scope.paramsList);
			$log.info(paramsList);
			$http({
					method: 'get',
					params: paramsList,
					//  data:{name:'john',age:27},
					url: MyProvider.domain + "/user/updatePaymentcode.do",
				})

//			var url = MyProvider.domain + "/user/userIncome.do?token=" + $rootScope.userInfo.token +
//				"&uid=" + $rootScope.userInfo.uid;
//			$log.info(url);
//			$http.get(url)
				.success(function(response) {
					if (response.status.msg == "SUCCESS") {
				var alertPopup=publicFunc.showAlert("温馨提示", "密码修改成功，请牢记您的密码",'我知道了');						
				alertPopup.then(function(res) {
						$location.path("/profile").replace();			   
		          });				
					} else {
						publicFunc.showAlert("温馨提示", response.status.msg,'我知道了');
						$ionicLoading.hide();
					}
				})
				.error(function(response) {
					$log.info(response);
					$ionicLoading.hide();
				})
				.finally(function(response) {
					$scope.$broadcast('scroll.refreshComplete');
				})

		}
		$scope.getUserAddress();
	}])