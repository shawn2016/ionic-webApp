//收益
var adviertisement_ctr = myApp.controller('adviertisement_ctr', ['$scope', '$rootScope', '$log', '$timeout', '$http', '$location', 'MyProvider', 'publicFunc', 'ioniclocalStorage', '$ionicLoading', function($scope, $rootScope, $log, $timeout, $http, $location, MyProvider, publicFunc, ioniclocalStorage, $ionicLoading) {
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
	//1.用户点击获取今天的广告列表（红包版）

	$scope.advClickedList = function() {
			//url需要传的参数
			$scope.paramsList = {
				token: $rootScope.userInfo.token,
				uid: $rootScope.userInfo.uid,
                longitude:116.306453,
				latitude: 40.059207,
				province: $rootScope.userInfo.province,
				region: $rootScope.userInfo.region,
				city: $rootScope.userInfo.city,
				
			};
			//方便在外部添加参数
			var paramsList = publicFunc.paramsConfig($scope.paramsList);
			$log.info(paramsList);
			$http({
					method: 'get',
					params: paramsList,
					//  data:{name:'john',age:27},
					url: MyProvider.domain + "/user/second/advClickedList.do",
				})

//			var url = MyProvider.domain + "/user/userIncome.do?token=" + $rootScope.userInfo.token +
//				"&uid=" + $rootScope.userInfo.uid;
//			$log.info(url);
//			$http.get(url)
				.success(function(response) {
					$log.info(response);
//					
					if (response.status.msg == "SUCCESS") {
						$rootScope.advlist=response.result.advlist;
						$rootScope.totalmoney=response.result.totalmoney;
						
						
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
	//根据当前时间选择上下晚时间
	$scope.isnowTime=function(){
		
	var now = new Date();
	var hours = now.getHours();
	console.log(hours);
	if(hours>=1&&hours<=12){
	   $scope.nowtime=1;
	     $scope.nowTotime=12;
		$scope.time='shangwu';
	   
		$scope.nowTotime=12;
	}else if(hours>12&&hours<=18){
		   $scope.nowtime=13;
		$scope.nowTotime=18;
		$scope.time='xiawu';
		
	}else if(hours>18&&hours<=24){
		$scope.nowtime=19;
		$scope.nowTotime=24;
		$scope.time='wanshang';
		
	}
	}

	//时间切换
	$scope.changetime=function(isTime){
		if(isTime=='shangwu'){
		   $scope.nowtime=1;
	     $scope.nowTotime=12;
	}else if(isTime=='xiawu'){
		   $scope.nowtime=13;
		$scope.nowTotime=18;

		
	}else if(isTime=='wanshang'){
    $scope.nowtime=19;
	$scope.nowTotime=24;

		
	}
			
			$scope.time=isTime;
	}
	
	//1.用户点击获取今天的广告列表（红包版）

	$scope.getenjoyadvdata = function(advClickId,advControlId,advId) {
						$location.path("/advAppreciate").replace();
		
			//url需要传的参数
			$scope.paramsList = {
				token: $rootScope.userInfo.token,
				uid: $rootScope.userInfo.uid,
				advClickId: advClickId,
				advControlId: advControlId,
				advId: advId,
				
			};
			//方便在外部添加参数
			var paramsList = publicFunc.paramsConfig($scope.paramsList);
			$log.info(paramsList);
			$http({
					method: 'get',
					params: paramsList,
					//  data:{name:'john',age:27},
					url: MyProvider.domain + "/user/second/getenjoyadvdata.do",
				})

//			var url = MyProvider.domain + "/user/userIncome.do?token=" + $rootScope.userInfo.token +
//				"&uid=" + $rootScope.userInfo.uid;
//			$log.info(url);
//			$http.get(url)
				.success(function(response) {
					$log.info(response);
//					
					if (response.status.msg == "SUCCESS") {

						$rootScope.advlistdesc=response.result;
						
						
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
	
	
	$scope.isnowTime();
    $scope.advClickedList();
}])