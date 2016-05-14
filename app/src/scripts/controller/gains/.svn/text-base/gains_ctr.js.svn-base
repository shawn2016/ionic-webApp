//收益
var gains_ctr = myApp.controller('gains_ctr', ['$scope', '$rootScope', '$log', '$timeout', '$http', '$location', 'MyProvider', 'publicFunc', 'ioniclocalStorage', '$ionicLoading', function($scope, $rootScope, $log, $timeout, $http, $location, MyProvider, publicFunc, ioniclocalStorage, $ionicLoading) {
	//初始化income
	$rootScope.income = {
		income_current: 0,
		currentdayincome: 0,
		income_total: 0
	};

	//获取本地缓存数据
	$rootScope.userInfo = ioniclocalStorage.getObject("userInfo");
	

	$log.info($rootScope.income);
	// loading
//	$ionicLoading.show({
//		content: '数据加载中',
//		animation: 'fade-in',
//		showBackdrop: true,
//		maxWidth: 200,
//		showDelay: 0
//	});
	//1.加载收益情况
	$scope.userIncome = function() {
			//url需要传的参数
			$scope.paramsList = {
				token: $rootScope.userInfo.token,
				uid: $rootScope.userInfo.uid,

			};
			//方便在外部添加参数
			var paramsList = publicFunc.paramsConfig($scope.paramsList);
			$log.info(paramsList);
			$http({
					method: 'get',
					params: paramsList,
					//  data:{name:'john',age:27},
					url: MyProvider.domain + "/user/userIncome.do",
				})

//			var url = MyProvider.domain + "/user/userIncome.do?token=" + $rootScope.userInfo.token +
//				"&uid=" + $rootScope.userInfo.uid;
//			$log.info(url);
//			$http.get(url)
				.success(function(response) {
					if (response.status.msg == "SUCCESS") {
						$rootScope.income = response.result;
						
						ioniclocalStorage.setObject('gainsInfo',response.result); 
						$ionicLoading.hide();
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
	//2.获取一等奖红包中奖记录列表（红包版）
	$scope.findWinrecordByPage = function() {
			//url需要传的参数
			$scope.paramsList = {
				token: $rootScope.userInfo.token,
				uid: $rootScope.userInfo.uid,
				pageNumber: 1,
				lastRecordId:10				
			};
			//方便在外部添加参数
			var paramsList = publicFunc.paramsConfig($scope.paramsList);
			$log.info(paramsList);
			$http({
					method: 'get',
					params: paramsList,
					//  data:{name:'john',age:27},
					url: MyProvider.domain + "/user/findWinrecordByPage.do",
			})
				.success(function(response) {
	                $log.info(response);
					
					if (response.status.msg == "SUCCESS") {
						$rootScope.income = response.result;
						ioniclocalStorage.setObject('gainsInfo',response.result); 
						$ionicLoading.hide();
					} else {
						publicFunc.showAlert("温馨提示", response.status.msg,'我知道了');
						$ionicLoading.hide();
					}
				})
				.error(function(response) {
		$ionicLoading.hide();
		publicFunc.showAlert("温馨提示", "连接接服务器出错",'我知道了');
					
				})
				.finally(function(response) {
					$scope.$broadcast('scroll.refreshComplete');
				})

		}	

	//3.是否设置支付宝
$scope.alipayStatus = function() {		
		//url需要传的参数
	$scope.paramsList={
		token: $rootScope.userInfo.token,
		uid:$rootScope.userInfo.uid
	};
	//方便在外部添加参数
	var paramsList=	publicFunc.paramsConfig($scope.paramsList);
$http({
	method : 'get',
    params : paramsList,
//  data:{name:'john',age:27},
    url : MyProvider.domain+"/user/alipayStatus.do",
    })
.success(function(response, status, headers, config){
	$log.info("");
	
	$log.info(response);
					if (response.status.msg == "SUCCESS") {						
		$rootScope.isAlipayStatus=response.result.authentication;
		ioniclocalStorage.setObject('isAlipayStatus',response.result.authentication ); 							
					} else {
						publicFunc.showAlert("温馨提示", response.status.msg,'我知道了');
					}
	})
	.error(function(response, status, headers, config){ 
		publicFunc.showAlert("温馨提示", "连接接服务器出错",'我知道了');
	});

}
	
	
	
			//finally --下拉刷新
	$scope.doRefresh = function() {
		$scope.userIncome();
	};
	

	


	$scope.userIncome();
	//$scope.findWinrecordByPage();	

    $scope.alipayStatus();
    
}])