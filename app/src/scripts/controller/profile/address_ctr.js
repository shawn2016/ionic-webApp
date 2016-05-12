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
							publicFunc.showAlert("温馨提示", "添加成功","我知道了");
							$location.path("/address").replace();

						} else {
							publicFunc.showAlert("温馨提示", response.status.msg,"我知道了");
						}
					})
					.error(function(response, status, headers, config) {
						publicFunc.showAlert("温馨提示", "连接接服务器出错","我知道了");
					});

			}
			//3.收货地址列表
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

		$scope.getUserAddress();
	}
])