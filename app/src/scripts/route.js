	//路由
myApp.config(function($stateProvider, $urlRouterProvider) {
	$stateProvider
	//home
		.state('login', {
			url: "/login",
			templateUrl: "views/home/login.html",
			controller: 'login_ctr'
		})
		.state('register', {
			url: "/register",
			templateUrl: "views/home/register.html",
			controller: 'register_ctr'
		})
		.state('forgetPwd', {
			url: "/forgetPwd",
			templateUrl: "views/home/forgetPwd.html",
			controller: 'forgetPwd_ctr'
		})

	//main
	.state('tabs', {
			url: "/tab",
			abstract: true,
			templateUrl: "views/main.html"
		})
		//资金管理
		.state('tabs.gains', {
			url: "/gains",
			views: {
				'gains-tab': {
					templateUrl: "views/gains/gains.html",
					controller: 'gains_ctr'
				}
			}
		})
			//资金管理
				.state('gainsManage', {
			url: "/gainsManage",
			templateUrl: "views/gains/gainsManage.html",
			controller: 'forgetPwd_ctr'
		})
			//收益明细
				.state('gainsDetail', {
			url: "/gainsDetail",
			templateUrl: "views/gains/gainsDetail.html",
			controller: 'forgetPwd_ctr'
		})
			//每日签到
				.state('gainsSign', {
			url: "/gainsSign",
			templateUrl: "views/gains/gainsSign.html",
			controller: 'forgetPwd_ctr'
		})
			//我的收藏
				.state('gainsCollection', {
			url: "/gainsCollection",
			templateUrl: "views/gains/gainsCollection.html",
			controller: 'forgetPwd_ctr'
		})
		
		//广告
		.state('tabs.adviertisement', {
			url: "/adviertisement",
			views: {
				'adviertisement-tab': {
					templateUrl: "views/adviertisement/adviertisement.html",
					controller: 'forgetPwd_ctr'
				}
			}
		})
		//邀请
		.state('tabs.invite', {
			url: "/invite",
			views: {
				'invite-tab': {
					templateUrl: "views/invite/invite.html",
					controller: 'forgetPwd_ctr'
				}
			}
		})
		//个人信息
		.state('tabs.PIM', {
			url: "/PIM",
			views: {
				'PIM-tab': {
					templateUrl: "views/profile/PIM.html",
					controller: 'forgetPwd_ctr'
				}
			}
		})
		
			//listDemo
				.state('listDemo', {
			url: "/listDemo",
			templateUrl: "views/list/listDemo.html",
			controller: 'listDemo_ctr'
		})
	$urlRouterProvider.otherwise("/login");
})
