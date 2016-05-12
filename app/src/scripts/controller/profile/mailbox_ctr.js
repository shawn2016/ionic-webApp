//登录
		var mailbox_ctr = myApp.controller('mailbox_ctr', ['$scope', '$rootScope', '$log', '$timeout', '$http', '$location', 'MyProvider', 'publicFunc', 'ioniclocalStorage', '$ionicLoading',
		function($scope, $rootScope, $log, $timeout, $http, $location, MyProvider, publicFunc, ioniclocalStorage,$ionicLoading) {
		//获取本地缓存数据
	$rootScope.userInfo = ioniclocalStorage.getObject("userInfo");
	$scope.email=$rootScope.userInfo.email;

	

	//1.邮箱修改
$scope.updateEmail = function() {
	
//	验证邮箱格式
	var isemail=publicFunc.isemail($scope.email);

	if(isemail==true){		
		//url需要传的参数
	$scope.paramsList={
		token: $rootScope.userInfo.token,
		uid:$rootScope.userInfo.uid,
	email:$scope.email
	};
	//方便在外部添加参数
	var paramsList=	publicFunc.paramsConfig($scope.paramsList);
$http({
	method : 'get',
    params : paramsList,
//  data:{name:'john',age:27},
    url : MyProvider.domain+"/user/updateEmail.do",
    })
.success(function(response, status, headers, config){
	$log.info(response);
					if (response.status.msg == "SUCCESS") {
					   $rootScope.userInfo.email=$scope.email;
							$log.info($rootScope.userInfo);
					    ioniclocalStorage.setObject('userInfo',$rootScope.userInfo ); 
	$rootScope.userInfo = ioniclocalStorage.getObject("userInfo");
	$log.info(response);
	

	
							publicFunc.showAlert("温馨提示", "添加成功","我知道了");
					
					} else {
						publicFunc.showAlert("温馨提示", response.status.msg,"我知道了");
					}
	})
	.error(function(response, status, headers, config){ 
		publicFunc.showAlert("温馨提示", "连接接服务器出错","我知道了");
	});
	}else{
		publicFunc.showAlert("温馨提示", "邮箱格式不正确","我知道了");
		
	}
	
	
	

}




	}])
