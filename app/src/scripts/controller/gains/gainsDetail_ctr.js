//收益
var gainsDetail_ctr = myApp.controller('gainsDetail_ctr', ['$scope', '$rootScope', '$log', '$timeout', '$http', '$location', 'MyProvider', 'publicFunc', 'ioniclocalStorage', '$ionicLoading', function($scope, $rootScope, $log, $timeout, $http, $location, MyProvider, publicFunc, ioniclocalStorage, $ionicLoading) {
$scope.LineCharts=function(){
	  var myChart = echarts.init(document.getElementById('main'));

        // 指定图表的配置项和数据
      var option = {
//  title: {
//      text: '折线图堆叠'
//  },
    tooltip: {
        trigger: 'axis'
    },
    legend: {
    	x:-9999,
        data:['邮件营销','联盟广告','视频广告','直接访问','搜索引擎']
    },
    grid: {
        left: '3%',
        right: '10%',
        bottom: '3%',
        top:'5%',
        containLabel: true
    },
     toolbox: {
        show: true,
          orient : 'vertical',
        x: 'right',
        y: 'center',
        feature: {
          
            magicType: {show: true, type: ['line', 'bar']},
            restore: {show: true},
            saveAsImage: {show: true}
        }
    },
    xAxis: {
        type: 'category',
        boundaryGap: false,
        data: ['周一','周二','周三','周四','周五','周六','周日']
    },
    yAxis: {
        type: 'value'
    },
    series: [
       
       
      
        {
            name:'搜索引擎',
            type:'line',
            stack: '总量',
            data:[820, 932, 901, 934, 1290, 1330, 1320]
        }
    ]
};

        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
}
$scope.LineCharts();
}])