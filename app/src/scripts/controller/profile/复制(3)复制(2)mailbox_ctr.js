//登录
		var login_ctr = myApp.controller('login_ctr', ['$scope', '$rootScope', '$log', '$timeout', '$http', '$location', 'MyProvider', 'publicFunc', 'ioniclocalStorage', '$ionicLoading',
		function($scope, $rootScope, $log, $timeout, $http, $location, MyProvider, publicFunc, ioniclocalStorage,$ionicLoading) {
		$scope.mobile = "";
		$scope.password = "";
		//ioniclocalStorage.set('name', 'test'); 
		// ioniclocalStorage.setObject('info', {  
		//  name: 'Thoughts',  
		//  text: 'Today was a good day'  
		//});  
$ionicLoading.show({
template: '这是提示框',
noBackdrop: true,
duration: 2000 ,
animation: 'fade-in'
});

$scope.paramsList[{{key1: 'value1', key2: 'value2'}];
	$scope.login = function() {
$http({
	method : 'get',
    params : { id:123},
    data:{name:'john',age:27},
    url : "/mypath"
    })
.success(function(response, status, headers, config){
	//do anything what you want; 
	})
	.error(function(response, status, headers, config){ 
		//do  anything what you want;
	});


}



//		$scope.login = function() {
//			if($scope.mobile==""||$scope.password==""){
//			if($scope.mobile==""){
//			publicFunc.showAlert("温馨提示", "手机号码不能为空");
//			}else if($scope.password == ""){
//			publicFunc.showAlert("温馨提示", "请输入密码");				
//			}
//			}else{
//				var infoMobile = publicFunc.isMobile($scope.mobile);
//			if (infoMobile == true) {
//				var url = MyProvider.domain + "/user/login.do?username=" + $scope.mobile +
//				"&password=" + $scope.password + "&device=" + 862095022079492 + "&code=" + "&province=" + "河北省" + "&city=" + "邯郸市" + "&region=" + "磁县" + "&street=" + "劲松" + "&compound=" + "森淼" +
//				"&longitude=" + 33 + "&latitude=" + 12.6541546 + "&mobile_platform=" + "android";
//			$log.info(url);
//			$http.get(url)
//				.success(function(response) {
//					$log.info(response);
//					if (response.status.msg == "SUCCESS") {
//						$location.path("/tab/gains").replace();
//					    ioniclocalStorage.setObject('userInfo',response.result ); 
//					} else {
//						publicFunc.showAlert("温馨提示", response.status.msg);
//					}
//				})
//				.error(function(response) {
//					publicFunc.showAlert("温馨提示", "连接接服务器出错");
//				});
//			}else{
//			publicFunc.showAlert("温馨提示", "手机格式不正确");
//			}
//			}
//		}


	}])
