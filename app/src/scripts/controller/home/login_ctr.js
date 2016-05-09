//登录
var login_ctr = myApp.controller('login_ctr', ['$scope', '$rootScope', '$log', '$timeout', '$http', '$location', 'MyProvider', 'publicFunc', 'ioniclocalStorage', function($scope, $rootScope, $log, $timeout, $http, $location, MyProvider, publicFunc, ioniclocalStorage) {
		$scope.mobile = "";
		$scope.password = "";
		//ioniclocalStorage.set('name', 'test'); 
		// ioniclocalStorage.setObject('info', {  
		//  name: 'Thoughts',  
		//  text: 'Today was a good day'  
		//});  

		$scope.login = function() {
			var infoMobile = publicFunc.isMobile($scope.mobile);
			if (infoMobile == true) {}

			var url = MyProvider.domain + "/user/login.do?username=" + $scope.mobile +
				"&password=" + $scope.password + "&device=" + 862095022079492 + "&code=" + "&province=" + "河北省" + "&city=" + "邯郸市" + "&region=" + "磁县" + "&street=" + "劲松" + "&compound=" + "森淼" +
				"&longitude=" + 33 + "&latitude=" + 12.6541546 + "&mobile_platform=" + "android";
			$log.info(url);
			$http.get(url)
				.success(function(response) {
					$log.info(response);
					if (response.status.msg == "SUCCESS") {
						$location.path("/tab/gains").replace();
					    ioniclocalStorage.setObject('userInfo',response.result ); 
					} else {
						publicFunc.showAlert("温馨提示", response.status.msg);
					}
				})
				.error(function(response) {
					publicFunc.showAlert("温馨提示", "连接接服务器出错");
				});
		}
	}])
