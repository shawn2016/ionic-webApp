	//注册
var register_ctr = myApp.controller('register_ctr', ['$scope', '$interval','$rootScope', '$log', '$timeout', '$http', '$location', 'MyProvider', 'publicFunc', 'ioniclocalStorage', function($scope,$interval, $rootScope, $log, $timeout, $http, $location, MyProvider, publicFunc, ioniclocalStorage) {
		$scope.mobile = "";
		$scope.password = "";
		$scope.mobile = "";
		   $scope.paracont = "获取短信码";  
		$scope.pic_yzm = "";
		$scope.showpic_yzm = false;
		$scope.inputpic_yzm = "";
		$scope.inputMobile_yzm = 888888;
		var myDate = new Date();
//		var mytime = myDate.toLocaleTimeString(); //获取当前时间
//		$log.info(mytime);
		$scope.sim = "8911118888811119999999999999999999991111";
		$scope.guid = "488" ;
		$scope.device = "12300045886";
		$scope.type = "Android";



		//获取图片验证码

		$scope.getPic = function() {
				if ($scope.mobile != "") {
					//判断手机格式
					var infoMobile = publicFunc.isMobile($scope.mobile);
					if (infoMobile == true) {
						
						var url = MyProvider.domain + "/user/isExsitsUserByMobile.do?mobile=" + $scope.mobile;
						$log.info(url);
						$http.get(url)
							.success(function(response) {
								$log.info(response);
								$scope.showpic_yzm = true;
								$scope.pic_yzm = MyProvider.domain + "/user/vcode.do?mobile=" + $scope.mobile + "&time=" + response.status.systime;
							})
							.error(function(response) {
								publicFunc.showAlert("温馨提示", "连接接服务器出错");
							});
					} else {
						publicFunc.showAlert("温馨提示", "手机号格式不正确");
					}
				} else {
					publicFunc.showAlert("温馨提示", "手机号不能为空");
				}
			}
			//获取短信验证码
		$scope.mobileYzm = function() {
				//判断手机格式
				var infoMobile = publicFunc.isMobile($scope.mobile);
				if (infoMobile == true) {
					   publicFunc.setTime60($scope);
					var url = MyProvider.domain + "/user/smsUserIsNotExist.do?username=" + $scope.mobile + "&imageCode=" + $scope.inputpic_yzm + "&sim=" + $scope.sim + "&device=" + $scope.device + "&guid=" + $scope.guid + "&type=" + "Android";
					$log.info(url);
					$http.get(url)
						.success(function(response) {
							if (response.status.msg == "SUCCESS") {
								publicFunc.showAlert("温馨提示", "发送成功");
							} else {
								publicFunc.showAlert("温馨提示", response.status.msg);
							}
						})
						.error(function(response) {
							$log.info(response);
						});
				} else {
					publicFunc.showAlert("温馨提示", "手机号格式不正确");
				}
			}
			//注册按钮
		$scope.register = function() {
			var url = MyProvider.domain + "/user/register.do?username=" + $scope.mobile +
				"&password=" + $scope.password + "&code=" + $scope.inputMobile_yzm + "&imagecode=" + $scope.inputpic_yzm +
				"&sim=" + $scope.sim + "&device=" + $scope.device + "&guid=" + $scope.guid + "&type=" + "Android";
			$log.info(url);
			$http.get(url)
				.success(function(response) {
					if (response.status.msg == "SUCCESS") {
						//publicFunc.showAlert("温馨提示","恭喜您,注册成功！");
						$location.path("/login").replace();
					} else {
						publicFunc.showAlert("温馨提示", response.status.msg);
					}

				})
				.error(function(response) {
					$log.info(response);
				});
		}
	}])
