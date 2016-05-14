/*----------------公共方法  & service的使用-----------------*/
myApp.service('publicFunc', ['$ionicPopup', '$timeout','$interval','$http', function($ionicPopup, $timeout,$interval,$http) {

	/*  -----------alert 对话框   ------------*/
	this.showAlert = function(title, template,Save) {
		var alertPopup = $ionicPopup.alert({
			title: title,
			template: template,
				buttons: [{
				text: '<b>'+Save+'</b>',
				type: 'button-positive',
				onTap: function(e) {
				}
			}]
		});
//		$timeout(function() {
//			alertPopup.close(); // 3秒后关闭弹窗
//		}, 3000);

		return alertPopup;
		
	};
	
	/*  -----------confirm 对话框   ------------*/
	this.showConfirm = function(title, template,Cancel,Save) {
		var confirmPopup = $ionicPopup.confirm({
			title: title,
			template: template,
			  cancelText: Cancel, // String (默认: 'Cancel')。一个取消按钮的文字。
  cancelType: '', // String (默认: 'button-default')。取消按钮的类型。
  okText: Save, // String (默认: 'OK')。OK按钮的文字。
  okType: '', // String (默认: 'button-positive')。OK按钮的类型。

		});
	
		return confirmPopup;
	};
	/*  -----------输入 对话框   ------------*/
	this.showPopup = function($scope,title,subTitle,Cancel,Save) {
		$scope.data = {}
			// 自定义弹窗
		var myPopup = $ionicPopup.show({
//			template: '<input type="password" ng-model="data.wifi">',
			title: title,
			subTitle: subTitle,
			scope: $scope,
			buttons: [{
				text: Cancel
			}, {
				text: '<b>'+Save+'</b>',
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
	};
	
	//		myPopup.then(function(res) {
//			console.log('Tapped!', res);
//		});
//		$timeout(function() {
//			myPopup.close(); // 3秒后关闭弹窗
//		}, 3000);
		/*  -----------判断手机号格式   ------------*/
	this.isMobile = function(str) {
			var re = /^1\d{10}$/;
			if (re.test(str)) {
				return true;
			} else {
				return false;
			}
		}
		/*  -----------判断邮箱格式   ------------*/
	this.isemail = function(str) {
			 var reg =  /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/;
			if (reg.test(str)) {
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
				/*  -----------支付密码 只能是6位  ------------*/
		//
	this.iszhifupassword = function(str) {
		var re = /^[a-zA-Z0-9]{6,6}$/;

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

				/*  -----------长整型转时间格式   ------------*/
this.getDateTime=function(str){
  	var sjdat=new Date(str);
	var year=sjdat.getFullYear();
   var month=sjdat.getMonth()+1;
   var day=sjdat.getDate();
   var dTime=year+'.'+month+'.'+day;
   return dTime;
}



var saveHttpList=[];
	this.addHttp=function(name) {
			saveHttpList.push(name);
			console.log(name);
	};
		this.removeHttp=function() {
						console.log(saveHttpList);
			for(var i=0;i<saveHttpList.length;i++){
			
				saveHttpList[0].abort();
			}
		saveHttpList=[];
		};
		
			
	/*  -----------confirm 对话框   ------------*/
	this.paramsConfig = function(object) {
//		console.log(object);
//		object.HEADERS_RECEIVED=123;//你要添加的参数
//		console.log(object);
		
	return object;
	};
		
		
		
		
		
		
}]);
