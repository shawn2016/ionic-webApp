//收益
var gainsManage_ctr = myApp.controller('gainsManage_ctr', ['$scope', '$rootScope', '$log', '$timeout', '$http', '$location', 'MyProvider', 'publicFunc', 'ioniclocalStorage', '$ionicLoading','$ionicScrollDelegate', function($scope, $rootScope, $log, $timeout, $http, $location, MyProvider, publicFunc, ioniclocalStorage, $ionicLoading,$ionicScrollDelegate) {

	//获取本地缓存数据
	$rootScope.userInfo = ioniclocalStorage.getObject("userInfo");
	$log.info($rootScope.income);
	//1.转出记录
	
	//1.1回到顶部
	 $scope.scrollTop = function() {
    $ionicScrollDelegate.scrollTop([
    	shouldAnimate=true
    ]);
  };	
			 $scope.stories = [];
	//1.2调用接口，获取数据		 
    function loadStories(params, callback) {
    		//url需要传的参数
		$scope.paramsList = {
			token: $rootScope.userInfo.token,
			uid: $rootScope.userInfo.uid,
				pageNo: 1,
			lastRecordId: params,
		};
      var stories = [];
		var paramsList = publicFunc.paramsConfig($scope.paramsList);

    
      	$http({
				method: 'get',
				params: paramsList,
				//  data:{name:'john',age:27},
				url: MyProvider.domain + "/user/histAccountOutAndInflow.do",
			})
        .success(function (response) {
if(response.status.msg="查询的数据不存在"){
       $scope.listEnd=true;
}       		          	
          angular.forEach(response.result.list, function (child) {          	
            stories.push(child);
          });
          callback(stories);
        });
 
    }
    //1.3上拉加载
    $scope.loadOlderStories = function () {
      var params = "";
      if ($scope.stories.length > 0) {
        params = $scope.stories[$scope.stories.length - 1].id;
      }
      loadStories(params, function (olderStories) {
      	
      	$scope.old_stories=$scope.stories;
        $scope.stories = $scope.stories.concat(olderStories);
				$log.info($scope.stories.length);        
        $scope.$broadcast('scroll.infiniteScrollComplete');
      });
 
    }
     //1.4下拉刷新
    $scope.loadNewerStories = function () {
      var params = "";
      if ($scope.stories.length > 0&&$scope.stories.length!=10) {
        params = $scope.stories[$scope.stories.length - 1].id;     	
        }
      loadStories(params, function (newerStories) {				
        $scope.stories = newerStories.concat($scope.old_stories);
        $scope.$broadcast('scroll.refreshComplete');
      });

    }	
	//2.获取转出金额的详细信息
	$scope.getoutflowdesc = function(id,type) {
					    $rootScope.btnshow=type;
						$location.path("/gainsManageDesc").replace();
		
		//url需要传的参数
		$scope.paramsList = {
			token: $rootScope.userInfo.token,
			uid: $rootScope.userInfo.uid,
				id: id,
		};
		//方便在外部添加参数
		var paramsList = publicFunc.paramsConfig($scope.paramsList);
		$http({
				method: 'get',
				params: paramsList,
				//  data:{name:'john',age:27},
				url: MyProvider.domain + "/user/getoutflowdesc.do",
			})
			.success(function(response, status, headers, config) {


				$log.info(response);
				if (response.status.msg == "SUCCESS") {	
					$rootScope.getoutflowdesclist=response.result;

				} else {
					publicFunc.showAlert("温馨提示", response.status.msg, '我知道了');
				}
			})
			.error(function(response, status, headers, config) {
				publicFunc.showAlert("温馨提示", "连接接服务器出错", '我知道了');
			});

	}	
	//3.更新转出记录订单的状态
	$scope.updateuseroutflowtype = function() {
		//url需要传的参数
		$scope.paramsList = {
			token: $rootScope.userInfo.token,
			uid: $rootScope.userInfo.uid,
				id: $rootScope.getoutflowdesclist.id,
			alipay: $rootScope.getoutflowdesclist.alipay,
					alipay_name:$rootScope.getoutflowdesclist.alipay_name

		};
		//方便在外部添加参数
		var paramsList = publicFunc.paramsConfig($scope.paramsList);
		$http({
				method: 'get',
				params: paramsList,
				//  data:{name:'john',age:27},
				url: MyProvider.domain + "/user/updateuseroutflowtype.do",
			})
			.success(function(response, status, headers, config) {


				$log.info(response);
				if (response.status.msg == "SUCCESS") {	
					publicFunc.showAlert("温馨提示", "提交成功", '我知道了');
	                  $scope.loadOlderStories();					
						$location.path("/gainsManage").replace();
					

				} else {
					publicFunc.showAlert("温馨提示", response.status.msg, '我知道了');
				}
			})
			.error(function(response, status, headers, config) {
				publicFunc.showAlert("温馨提示", "连接接服务器出错", '我知道了');
			});

	}	
$scope.loadOlderStories ();
}])