var myApp = angular.module('ionicApp', ['ionic','ionic-datepicker','ionic-timepicker','ionic-ratings','ionic-toast','ionic-citypicker'])
   myApp.run(function($ionicPlatform) {
        $ionicPlatform.ready(function() {
          // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
          // for form inputs)
          if(window.cordova && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
          }
          if(window.StatusBar) {
            StatusBar.styleDefault();
          }
        });
      })
   //日历
   
myApp.config(function (ionicDatePickerProvider) {
    var datePickerObj = {
      inputDate: new Date(),
      setLabel: '保存',
      todayLabel: '今天', 
      closeLabel: '关闭',
      mondayFirst: false,
      weeksList: ["S", "M", "T", "W", "T", "F", "S"],
      monthsList: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"],
      templateType: 'popup',
      from: new Date(2012, 8, 1),
      to: new Date(2018, 8, 1),
      showTodayButton: true,
      dateFormat: 'yyyy MMMM dd',
      closeOnSelect: false,
      disableWeekdays: [6]
    };
    ionicDatePickerProvider.configDatePicker(datePickerObj);
  })


//时间选择
myApp.config(function (ionicTimePickerProvider) {
    var timePickerObj = {
      inputTime: (((new Date()).getHours() * 60 * 60) + ((new Date()).getMinutes() * 60)),
      format: 12,
      step: 15,
      setLabel: '设置',
      closeLabel: '关闭'
    };
    ionicTimePickerProvider.configTimePicker(timePickerObj);
  })