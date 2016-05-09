//收益
	var gains_ctr = myApp.controller('gains_ctr', ['$scope', '$rootScope', '$log', '$timeout', '$http', '$location', 'MyProvider', 'publicFunc', 'ioniclocalStorage', function($scope, $rootScope, $log, $timeout, $http, $location, MyProvider, publicFunc, ioniclocalStorage) {

	$scope.userInfo=ioniclocalStorage.getObject("userInfo");
			$log.info($scope.userInfo);
	$scope.getGains = function() {
		var url = MyProvider.domain + "/user/userIncome.do?token=" + $scope.userInfo.token +
			"&uid=" + $scope.userInfo.uid ;
		$log.info(url);
		$http.get(url)
			.success(function(response) {
				if (response.status.msg == "SUCCESS") {
                   $scope.income=response.result;
						} else {
							publicFunc.showAlert("温馨提示", response.status.msg);
						}
			})
			.error(function(response) {
				$log.info(response);
			});
	}
	$scope.getGains();
}])