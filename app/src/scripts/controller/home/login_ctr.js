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




	$scope.login = function() {
			if($scope.mobile==""||$scope.password==""){
			if($scope.mobile==""){
			publicFunc.showAlert("温馨提示", "手机号码不能为空",'我知道了');
			}else if($scope.password == ""){
			publicFunc.showAlert("温馨提示", "请输入密码",'我知道)了');				
			}
			}else{
				var infoMobile = publicFunc.isMobile($scope.mobile);
			if (infoMobile == true) {
		//url需要传的参数
	$scope.paramsList={
		username: $scope.mobile,
		password: $scope.password,
		device: 862095022079492,
		code: '',
		province: '',
		city: '邯郸市',
		region: '磁县',
		street: '劲松',
		compound: '森淼',
		longitude: 33,
		latitude: 12.6541546,
		mobile_platform: 'android'		
	};
	//方便在外部添加参数
	var paramsList=	publicFunc.paramsConfig($scope.paramsList);
$http({
	method : 'get',
    params : paramsList,
//  data:{name:'john',age:27},
    url : MyProvider.domain+"/user/login.do",
    })
.success(function(response, status, headers, config){
	$log.info(response);
					if (response.status.msg == "SUCCESS") {
						$location.path("/tab/gains").replace();
					    ioniclocalStorage.setObject('userInfo',response.result ); 
					} else {
						publicFunc.showAlert("温馨提示", response.status.msg,"我知道了");
					}
	})
	.error(function(response, status, headers, config){ 
		publicFunc.showAlert("温馨提示", "连接接服务器出错","我知道了");
	});

}else{
			publicFunc.showAlert("温馨提示", "手机格式不正确","我知道了");
			}
}
			}
	}])
