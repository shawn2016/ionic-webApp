//登录
		var identity_ctr = myApp.controller('identity_ctr', ['$scope', '$rootScope', '$log', '$timeout', '$http', '$location', 'MyProvider', 'publicFunc', 'ioniclocalStorage', '$ionicLoading',
		function($scope, $rootScope, $log, $timeout, $http, $location, MyProvider, publicFunc, ioniclocalStorage,$ionicLoading) {
		//获取本地缓存数据
	$rootScope.userInfo = ioniclocalStorage.getObject("userInfo");
	
	
	//1.用户身份认证
$scope.updateUserIdCardAuth = function() {		
		//url需要传的参数
	$scope.paramsList={
		token: $rootScope.userInfo.token,
		uid:$rootScope.userInfo.uid,
	id_card:$scope.id_card,
	realname:$scope.realname,
	id_card_front_small:'hppt',
	id_card_front_big:'hppt',
	id_card_back_small:'hppt',
	id_card_back_big:'hppt',
	idCardValidaty: '2020-08-16'//有效期

	};
	//方便在外部添加参数
	var paramsList=	publicFunc.paramsConfig($scope.paramsList);
$http({
	method : 'get',
    params : paramsList,
//  data:{name:'john',age:27},
    url : MyProvider.domain+"/user/updateUserIdCardAuth.do",
    })
.success(function(response, status, headers, config){
	$log.info(response);
					if (response.status.msg == "SUCCESS") {
	
					} else {
						publicFunc.showAlert("温馨提示", response.status.msg,'我知道了');
					}
	})
	.error(function(response, status, headers, config){ 
		publicFunc.showAlert("温馨提示", "连接接服务器出错",'我知道了');
	});

}

//2.获取用户身份认证信息
$scope.getUserIdCardAuthMsg = function() {		
		//url需要传的参数
	$scope.paramsList={
		token: $rootScope.userInfo.token,
		uid:$rootScope.userInfo.uid,
	};
	//方便在外部添加参数
	var paramsList=	publicFunc.paramsConfig($scope.paramsList);
$http({
	method : 'get',
    params : paramsList,
//  data:{name:'john',age:27},
    url : MyProvider.domain+"/user/getUserIdCardAuthMsg.do",
    })
.success(function(response, status, headers, config){
	$log.info(response);
					if (response.status.msg == "SUCCESS") {
		$scope.realname=response.result.realname;
		$scope.id_card=response.result.id_card;
		$scope.idcardvalidaty=response.result.idcardvalidaty;
					
					} else {
						publicFunc.showAlert("温馨提示", response.status.msg,'我知道了');
					}
	})
	.error(function(response, status, headers, config){ 
		publicFunc.showAlert("温馨提示", "连接接服务器出错",'我知道了');
	});
}
//3.设置邀请人
$scope.addUserInvite = function() {		
		//url需要传的参数
	$scope.paramsList={
		token: $rootScope.userInfo.token,
		uid:$rootScope.userInfo.uid,
		invite_code:$rootScope.invite_code,
		
	};
	//方便在外部添加参数
	var paramsList=	publicFunc.paramsConfig($scope.paramsList);
$http({
	method : 'get',
    params : paramsList,
//  data:{name:'john',age:27},
    url : MyProvider.domain+"/user/addUserInvite.do",
    })
.success(function(response, status, headers, config){
	$log.info(response);
					if (response.status.msg == "SUCCESS") {

					
					} else {
						publicFunc.showAlert("温馨提示", response.status.msg,'我知道了');
					}
	})
	.error(function(response, status, headers, config){ 
		publicFunc.showAlert("温馨提示", "连接接服务器出错",'我知道了');
	});
}
$scope.getUserIdCardAuthMsg();

	}])
