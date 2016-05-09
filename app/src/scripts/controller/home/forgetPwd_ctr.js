	//忘记密码
		var forgetPwd_ctr = myApp.controller('forgetPwd_ctr', ['$scope', '$rootScope', '$log', '$timeout', '$http', '$location', 'MyProvider', 'publicFunc', 'ioniclocalStorage', '$ionicLoading',function($scope, $rootScope, $log, $timeout, $http, $location, MyProvider, publicFunc, ioniclocalStorage,$ionicLoading) {
		$scope.mobile = "";
		$scope.password= "";
   $scope.paracont = "获取短信码";  
				$scope.code= 888888;

		//忘记密码-短信验证码
		$scope.forgetPwd_mobile = function() {
											$log.info($scope.mobile );
			var infoMobile = publicFunc.isMobile($scope.mobile);
			if (infoMobile == true) {
						   publicFunc.setTime60($scope);
				var url = MyProvider.domain + "/user/smsUserIsExist.do?username=" + $scope.mobile;
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
		$scope.forgetPwd = function() {
			var url = MyProvider.domain + "/user/findPassword.do?username=" + $scope.mobile +
				"&password=" + $scope.password +"&code=" + $scope.code;
				$log.info(url);
			$http.get(url)
				.success(function(response) {
						if (response.status.msg == "SUCCESS") {
							publicFunc.showAlert("温馨提示", "修改成功");
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
	