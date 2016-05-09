/*----------------公共方法  & service的使用-----------------*/
myApp.service('publicFunc', ['$ionicPopup', '$timeout','$interval', function($ionicPopup, $timeout,$interval) {

	/*  -----------alert 对话框   ------------*/
	this.showAlert = function(title, template) {
		var alertPopup = $ionicPopup.alert({
			title: title,
			template: template
		});
//		$timeout(function() {
//			alertPopup.close(); // 3秒后关闭弹窗
//		}, 3000);
		alertPopup.then(function(res) {
			console.log('Thank you for not eating my delicious ice cream cone');
		});
	};
	
	/*  -----------confirm 对话框   ------------*/
	this.showConfirm = function(title, template) {
		var confirmPopup = $ionicPopup.confirm({
			title: title,
			template: template
		});
		confirmPopup.then(function(res) {
			if (res) {
				console.log('You are sure');
			} else {
				console.log('You are not sure');
			}
		});
	};
	/*  -----------输入 对话框   ------------*/
	this.showPopup = function() {
		$scope.data = {}
			// 自定义弹窗
		var myPopup = $ionicPopup.show({
			template: '<input type="password" ng-model="data.wifi">',
			title: 'Enter Wi-Fi Password',
			subTitle: 'Please use normal things',
			scope: $scope,
			buttons: [{
				text: 'Cancel'
			}, {
				text: '<b>Save</b>',
				type: 'button-positive',
				onTap: function(e) {
					if (!$scope.data.wifi) {
						// 不允许用户关闭，除非输入 wifi 密码
						e.preventDefault();
					} else {
						return $scope.data.wifi;
					}
				}
			}, ]
		});
		myPopup.then(function(res) {
			console.log('Tapped!', res);
		});
		$timeout(function() {
			myPopup.close(); // 3秒后关闭弹窗
		}, 3000);
	};
	
		/*  -----------判断手机号格式   ------------*/
	this.isMobile = function(str) {
			var re = /^1\d{10}$/;
			if (re.test(str)) {
				return true;
			} else {
				return false;
			}
		}
			/*  -----------密码验证  6-16位字母或数字   ------------*/
		//
	this.ispassword = function(str) {
		var re = /^[a-zA-Z0-9]{6,16}$/;

		if (re.test(str)) {
			return true;
		} else {
			return false;
		}
	};
	
				/*  -----------短信验证等待60秒   ------------*/
this.setTime60=function($scope){
   $scope.paracont = "获取短信码";  
       $scope.paraclass = "but_null";  
       $scope.paraevent = false;  
       var second = 60,  
            timePromise = undefined;  
  
        timePromise = $interval(function(){  
          if(second<=0){  
            $interval.cancel(timePromise);  
            timePromise = undefined;  
  
            second = 60;  
            $scope.paracont = "重发验证码";  
            $scope.paraclass = "but_null";  
            $scope.paraevent = false;  

          }else{  
            $scope.paracont = second + "秒后可重发";  
            $scope.paraclass = "not but_null";  
                        $scope.paraevent = true;  
            second--;  
             
          }  
        },1000,100);
        return this;
}

}]);
