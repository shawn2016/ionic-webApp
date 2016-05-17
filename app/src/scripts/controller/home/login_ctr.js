//登录
		var login_ctr = myApp.controller('login_ctr', ['$scope', '$rootScope', '$log', '$timeout', '$http', '$location', 'MyProvider', 'publicFunc', 'ioniclocalStorage', '$ionicLoading','ionicDatePicker','ionicTimePicker','ionicToast',
		function($scope, $rootScope, $log, $timeout, $http, $location, MyProvider, publicFunc, ioniclocalStorage,$ionicLoading,ionicDatePicker,ionicTimePicker,ionicToast) {
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
$scope.showToast = function(){
//<!-- ionicToast.show(message, position, stick, time); -->
  ionicToast.show('This is a toast at the top.', 'top', true, 2500);
};
$scope.showToast();
$scope.hideToast = function(){
  ionicToast.hide();
};
//日历选择
    var ipObj1 = {
      callback: function (val) {  //Mandatory
        console.log('Return value from the datepicker popup is : ' + val, new Date(val));
      },
      disabledDates: [            //Optional
        new Date(2016, 5,18 ),
        new Date(2015, 3, 16),
        new Date(2015, 4, 16),
        new Date(2015, 5, 16),
        new Date('Wednesday, August 12, 2015'),
        new Date("08-16-2016"),
        new Date(1439676000000)
      ],
      from: new Date(2012, 1, 1), //Optional
      to: new Date(2016, 10, 30), //Optional
      inputDate: new Date(),      //Optional
      mondayFirst: true,          //Optional
      disableWeekdays: [0],       //Optional
      closeOnSelect: false,       //Optional
      templateType: 'popup'       //Optional
    };

    $scope.openDatePicker = function(){
      ionicDatePicker.openDatePicker(ipObj1);
    };

//---------------------------------------------------
//时间选择器
 var ipObj1 = {
    callback: function (val) {      //Mandatory
      if (typeof (val) === 'undefined') {
        console.log('Time not selected');
      } else {
        var selectedTime = new Date(val * 1000);
        console.log('Selected epoch is : ', val, 'and the time is ', selectedTime.getUTCHours(), 'H :', selectedTime.getUTCMinutes(), 'M');
      }
    },
    inputTime: 50400,   //Optional
    format: 12,         //Optional
    step: 15,           //Optional
    setLabel: '设置'    //Optional
  };

  //ionicTimePicker.openTimePicker(ipObj1);
  
  
  //------------------------------
  //raing
    $scope.ratingsObject = {
        iconOn: 'ion-ios-star',    //Optional
        iconOff: 'ion-ios-star-outline',   //Optional
        iconOnColor: 'rgb(200, 200, 100)',  //Optional
        iconOffColor:  'rgb(200, 100, 100)',    //Optional
        rating:  2, //Optional
        minRating:1,    //Optional
        readOnly: true, //Optional
        callback: function(rating) {    //Mandatory
          $scope.ratingsCallback(rating);
        }
      };

      $scope.ratingsCallback = function(rating) {
        console.log('Selected rating is : ', rating);
      };

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
