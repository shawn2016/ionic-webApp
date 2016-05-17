//收益

var gainsSign_ctr = myApp.controller('gainsSign_ctr', ['$scope', '$rootScope', '$log', '$timeout', '$http', '$location', 'MyProvider', 'publicFunc', 'ioniclocalStorage', '$ionicLoading','$ionicScrollDelegate', function($scope, $rootScope, $log, $timeout, $http, $location, MyProvider, publicFunc, ioniclocalStorage, $ionicLoading,$ionicScrollDelegate) {
		    		$scope.myActiveSlide = 1;

	$scope.check_inStatus="立即签到";

 var inplen=document.querySelectorAll('ion-slide[ion-slide]');

$log.info(inplen); 	
//	$scope.loading =function(){
//	$timeout(
//	    function() {
//        if($scope.myActiveSlide == min){
//        	$scope.myActiveSlide =$scope.myActiveSlide +1;
//        }else if($scope.myActiveSlide == max){
//                  	$scope.myActiveSlide =$scope.myActiveSlide -1;
//        }
//		$scope.loading();
//	    },
//	    3000
//	);
//}
//	$scope.loading();
	//获取本地缓存数据
	$rootScope.userInfo = ioniclocalStorage.getObject("userInfo");
	$log.info($rootScope.income);
	//1.用户签到信息列表
	$scope.getuserCheckIn = function() {
		//url需要传的参数
		$scope.paramsList = {
			token: $rootScope.userInfo.token,
			uid: $rootScope.userInfo.uid
		};
		//方便在外部添加参数
		var paramsList = publicFunc.paramsConfig($scope.paramsList);
		$http({
				method: 'get',
				params: paramsList,
				//  data:{name:'john',age:27},
				url: MyProvider.domain + "/user/getuserCheckIn.do",
			})
			.success(function(response, status, headers, config) {
				$log.info("");

				$log.info(response);
				if (response.status.msg == "SUCCESS") {	
					if(response.result.frequency==1){
	                 $scope.check_inStatus="今日已签到";
						
					}
					 $scope.getuserCheckInLength=response.result.jsonList.length;

						$scope.last_check_in_time=response.result.jsonList[0].check_in_time;					

				} else if(response.status.msg == "已签到"){
					$scope.check_inStatus="今日已签到"
				}
			})
			.error(function(response, status, headers, config) {
				publicFunc.showAlert("温馨提示", "连接接服务器出错", '我知道了');
			});

	}
	//2.用户签到信息列表
	$scope.updateUserCheckIn = function() {
		//url需要传的参数
		$scope.paramsList = {
			token: $rootScope.userInfo.token,
			uid: $rootScope.userInfo.uid
		};
		//方便在外部添加参数
		var paramsList = publicFunc.paramsConfig($scope.paramsList);
		$http({
				method: 'get',
				params: paramsList,
				//  data:{name:'john',age:27},
				url: MyProvider.domain + "/user/updateUserCheckIn.do",
			})
			.success(function(response, status, headers, config) {


				$log.info(response);
				if (response.status.msg == "SUCCESS") {	

					
					publicFunc.showAlert("温馨提示", '签到成功', '我知道了');
	        $scope.getuserCheckIn();
					
				
				} else if(response.status.msg == "已签到"){
					$scope.check_inStatus="今日已签到"
				}else{
				publicFunc.showAlert("温馨提示", response.status.msg, '我知道了');
					
				}
			})
			.error(function(response, status, headers, config) {
				publicFunc.showAlert("温馨提示", "连接接服务器出错", '我知道了');
			});

	}
	//3.获取一等奖红包中奖记录列表（红包版）
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
				pageNumber: 1,
			lastRecordId: params,
		};
      var stories = [];
		var paramsList = publicFunc.paramsConfig($scope.paramsList);

    
      	$http({
				method: 'get',
				params: paramsList,
				//  data:{name:'john',age:27},
				url: MyProvider.domain + "/user/findWinrecordByPage.do",
			})
        .success(function (response) {
				$log.info(paramsList);
        	
if(response.status.msg="查询的数据不存在"){
       $scope.listEnd=true;
}       		          	
          angular.forEach(response.result.jsonArray, function (child) {          	
            stories.push(child);
          });
          callback(stories);
        });
 
    }
    //1.3上拉加载
    $scope.loadOlderStories = function () {
      var params = "";
      if ($scope.stories.length > 0&&$scope.stories.length!=10) {
        params = $scope.stories[$scope.stories.length - 1].lastRecordId;
      }
      var storieslist=$scope.stories;
      loadStories(params, function (olderStories) {
if(storieslist!=olderStories){
	$scope.old_stories=$scope.stories;
        $scope.stories = $scope.stories.concat(olderStories);
}else{
        $scope.stories = storieslist.concat(olderStories);
	
}
			    
        $scope.$broadcast('scroll.infiniteScrollComplete');
      });
 
    }
     //1.4下拉刷新
    $scope.loadNewerStories = function () {
      var params = "";
      if ($scope.stories.length > 0&&$scope.stories.length!=10) {
        params = $scope.stories[$scope.stories.length - 1].lastRecordId;     	
        }
      loadStories(params, function (newerStories) {				
        $scope.stories = newerStories.concat($scope.old_stories);
        $scope.$broadcast('scroll.refreshComplete');
      });

    }	
	$scope.getuserCheckIn();
  $scope.loadOlderStories();
}])