//收益
var gains_ctr = myApp.controller('gains_ctr', ['$scope', '$rootScope', '$log', '$timeout', '$http', '$location', 'MyProvider', 'publicFunc', 'ioniclocalStorage', '$ionicLoading', function($scope, $rootScope, $log, $timeout, $http, $location, MyProvider, publicFunc, ioniclocalStorage, $ionicLoading) {
	//初始化income
	$scope.income = {
		income_current: 0,
		currentdayincome: 0,
		income_total: 0
	};

	//获取本地缓存数据
	$scope.userInfo = ioniclocalStorage.getObject("userInfo");
	$log.info($scope.userInfo);
	// loading
//	$ionicLoading.show({
//		content: '数据加载中',
//		animation: 'fade-in',
//		showBackdrop: true,
//		maxWidth: 200,
//		showDelay: 0
//	});
	//加载收益情况
	$scope.getGains = function() {

			var url = MyProvider.domain + "/user/userIncome.do?token=" + $scope.userInfo.token +
				"&uid=" + $scope.userInfo.uid;
			$log.info(url);
			$http.get(url)
				.success(function(response) {
					if (response.status.msg == "SUCCESS") {
						$scope.income = response.result;
						$ionicLoading.hide();
					} else {
						publicFunc.showAlert("温馨提示", response.status.msg);
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
		//下拉刷新
	$scope.doRefresh = function() {
		$scope.getGains();
	};
	$scope.getGains();
}])