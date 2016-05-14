//收益
var gainsDetail_ctr = myApp.controller('gainsDetail_ctr', ['$scope', '$rootScope', '$log', '$timeout', '$http', '$location', 'MyProvider', 'publicFunc', 'ioniclocalStorage', '$ionicLoading', function($scope, $rootScope, $log, $timeout, $http, $location, MyProvider, publicFunc, ioniclocalStorage, $ionicLoading) {
	$rootScope.userInfo = ioniclocalStorage.getObject("userInfo");
	$scope.LineCharts = function() {

		var url = MyProvider.domain + "/user/getUserAccountSeven.do?token=" + $rootScope.userInfo.token +
			"&uid=" + $rootScope.userInfo.uid;
		$log.info(url);
		$http.get(url)
			.success(function(response) {
				if (response.status.msg == "SUCCESS") {
					
					$scope.lineData = response.result.array;

					ioniclocalStorage.setObject('lineData', response.result);
					var lineDataY = [];
					var lineDataX = [];
					for (var i = 0; i < $scope.lineData.length; i++) {
						lineDataY.push($scope.lineData[i].amount_total);
						var dTime=publicFunc.getDateTime($scope.lineData[i].ct);					
						lineDataX.push(dTime);
					}
$log.info(lineDataY);
$log.info(lineDataX);
					var myChart = echarts.init(document.getElementById('main'));
					// 指定图表的配置项和数据
					var option = {
						//  title: {
						//      text: '折线图堆叠'
						//  },
						tooltip: {
							trigger: 'axis'
						},
						legend: {
							x: -9999,
							data: ['收益明细']
						},
						grid: {
							left: '3%',
							right: '10%',
							bottom: '3%',
							top: '5%',
							containLabel: true
						},
						toolbox: {
							show: true,
							orient: 'vertical',
							x: 'right',
							y: 'center',
							feature: {

								magicType: {
									show: true,
									type: ['line', 'bar']
								},
								restore: {
									show: true
								},
								saveAsImage: {
									show: true
								}
							}
						},
						xAxis: {
							type: 'category',
							boundaryGap: false,
							data: lineDataX
						},
						yAxis: {
							type: 'value'
						},
						series: [

							{
								name: '收益',
								type: 'line',
								stack: '总量',
								data: lineDataY
							}
						]
					}

					// 使用刚指定的配置项和数据显示图表。
					myChart.setOption(option);
				}else {
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
				
				$scope.fourNumber = function() {

					var url = MyProvider.domain + "/user/userIncomeBranch.do?token=" + $rootScope.userInfo.token +
						"&uid=" + $rootScope.userInfo.uid;
					$log.info(url);
					$http.get(url)
						.success(function(response) {
							if (response.status.msg == "SUCCESS") {
								$rootScope.fourNumbers = response.result;
								ioniclocalStorage.setObject('fourNumbers', response.result);
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
				$scope.tiaozhuan=function(){
					$location.path("/tab/adviertisement").replace();
				}
$scope.fourNumber();
$scope.LineCharts();
}])