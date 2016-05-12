//登录
var Alipay_ctr = myApp.controller('Alipay_ctr', ['$scope', '$rootScope', '$log', '$timeout', '$http', '$location', 'MyProvider', 'publicFunc', 'ioniclocalStorage', '$ionicLoading',
			function($scope, $rootScope, $log, $timeout, $http, $location, MyProvider, publicFunc, ioniclocalStorage, $ionicLoading) {
				//获取本地缓存数据
				$rootScope.userInfo = ioniclocalStorage.getObject("userInfo");

				//1.支付宝账户 支付宝账户姓名修改
				$scope.updateAlipay = function() {
					//url需要传的参数
					$scope.paramsList = {
						token: $rootScope.userInfo.token,
						uid: $rootScope.userInfo.uid,
						alipay: $scope.alipay,
						alipay_name: $scope.alipay_name
					};
					//方便在外部添加参数
					var paramsList = publicFunc.paramsConfig($scope.paramsList);
					$log.info(paramsList);
					$http({
							method: 'get',
							params: paramsList,
							//  data:{name:'john',age:27},
							url: MyProvider.domain + "/user/updateAlipay.do",
						})
						.success(function(response, status, headers, config) {
							$log.info(response);
							if (response.status.msg == "SUCCESS") {
								publicFunc.showAlert("温馨提示", '信息保存成功','我知道了');
								$location.path("/profile").replace();
								
							
							} else {
								publicFunc.showAlert("温馨提示", response.status.msg,'我知道了');
							}
						})
						.error(function(response, status, headers, config) {
							publicFunc.showAlert("温馨提示", "连接接服务器出错",'我知道了');
						});
				}

				//2.是否已有支付宝账号  返回一个状态
				$scope.alipayStatus = function() {
					//url需要传的参数
					$scope.paramsList = {
						token: $rootScope.userInfo.token,
						uid: $rootScope.userInfo.uid

					};
					//方便在外部添加参数
					var paramsList = publicFunc.paramsConfig($scope.paramsList);
					$log.info(paramsList);
					$http({
							method: 'get',
							params: paramsList,
							//  data:{name:'john',age:27},
							url: MyProvider.domain + "/user/alipayStatus.do",
						})
						.success(function(response, status, headers, config) {
								$log.info(response);
								if (response.status.msg == "SUCCESS") {
									if (response.result.authentication == 2) { //cheng
                                            $scope.alipay_name=$rootScope.userInfo.alipay_name
                                                $scope.alipay=response.result.realName
									} else { //0 1 3  未 中  失败
										var confirmPopup1 = publicFunc.showConfirm("温馨提示", "你需要先进行身份认证,才能绑定支付宝？", '稍后再说', "去认证");
										confirmPopup1.then(function(res) {
												if (res) {
													$location.path("/identity").replace();
												}else {
												$location.path("/profile").replace();

											}
										})
										     }
									}else {
										publicFunc.showAlert("温馨提示", response.status.msg,'我知道了');
									}
								                                               })
							.error(function(response, status, headers, config) {
								publicFunc.showAlert("温馨提示", "连接接服务器出错");
							});
						}
					$scope.alipayStatus();

				}])