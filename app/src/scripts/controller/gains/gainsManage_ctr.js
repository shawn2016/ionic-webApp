//收益
var gainsManage_ctr = myApp.controller('gainsManage_ctr', ['$scope', '$rootScope', '$log', '$timeout', '$http', '$location', 'MyProvider', 'publicFunc', 'ioniclocalStorage', '$ionicLoading', function($scope, $rootScope, $log, $timeout, $http, $location, MyProvider, publicFunc, ioniclocalStorage, $ionicLoading) {
//初始化income
	$rootScope.income = {
		income_current: 0		
	};
						$rootScope.income = ioniclocalStorage.getObject("gainsInfo");					
}])