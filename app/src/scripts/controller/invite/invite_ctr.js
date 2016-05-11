//收益
var invite_ctr = myApp.controller('invite_ctr', ['$scope', '$rootScope', '$log', '$timeout', '$http', '$location', 'MyProvider', 'publicFunc', 'ioniclocalStorage', '$ionicLoading', function($scope, $rootScope, $log, $timeout, $http, $location, MyProvider, publicFunc, ioniclocalStorage, $ionicLoading) {
	//加载邀请数据
		$rootScope.userInfo = ioniclocalStorage.getObject("userInfo");
	$scope.getInvite = function() {
		
			var url = MyProvider.domain + "/user/getUserInviteCount.do?token=" + $rootScope.userInfo.token +
				"&uid=" + $rootScope.userInfo.uid;
			$log.info(url);
			$http.get(url)
				.success(function(response) {
					if (response.status.msg == "SUCCESS") {
						$rootScope.inviteInfo = response.result;
						ioniclocalStorage.setObject('inviteInfo',response.result ); 
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
	$scope.getInvite();
}])