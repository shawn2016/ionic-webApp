//路由
myApp.config(function($stateProvider, $urlRouterProvider) {
	$stateProvider
	//home
		.state('login', {
			url: "/login",
			templateUrl: "views/home/login.html",

		})
		.state('register', {
			url: "/register",
			templateUrl: "views/home/register.html",

		})
		.state('forgetPwd', {
			url: "/forgetPwd",
			templateUrl: "views/home/forgetPwd.html",

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

				}
			}
		})
		//资金管理
		.state('gainsManage', {
			url: "/gainsManage",
			templateUrl: "views/gains/gainsManage.html",

		})
		//收益明细
		.state('gainsDetail', {
			url: "/gainsDetail",
			templateUrl: "views/gains/gainsDetail.html",

		})
		//每日签到
		.state('gainsSign', {
			url: "/gainsSign",
			templateUrl: "views/gains/gainsSign.html",

		})
		//我的收藏
		.state('gainsCollection', {
			url: "/gainsCollection",
			templateUrl: "views/gains/gainsCollection.html",

		})

	//广告
	.state('tabs.adviertisement', {
			url: "/adviertisement",
			views: {
				'adviertisement-tab': {
					templateUrl: "views/adviertisement/adviertisement.html",

				}
			}
		})
		//邀请
		.state('tabs.invite', {
			url: "/invite",
			views: {
				'invite-tab': {
					templateUrl: "views/invite/invite.html",

				}
			}
		})
		//邀请
		//资金管理
		.state('invite_rule', {
			url: "/invite_rule",
			templateUrl: "views/invite/invite_rule.html",

		})
		//个人信息
		.state('tabs.PIM', {
			url: "/PIM",
			views: {
				'PIM-tab': {
					templateUrl: "views/profile/PIM.html",

				}
			}
		})
		.state('profile', {
			url: "/profile",
			templateUrl: "views/profile/profile.html",

		})
		//				优惠

	.state('profileCoupon', {
			url: "/profileCoupon",
			templateUrl: "views/profile/profileCoupon.html",

		})
		//				消息
		.state('profileMessage', {
			url: "/profileMessage",
			templateUrl: "views/profile/profileMessage.html",

		})
		//						兴趣
		.state('profileInterest', {
			url: "/profileInterest",
			templateUrl: "views/profile/profileInterest.html",

		})
		//记录									
		.state('profileRecord', {
			url: "/profileRecord",
			templateUrl: "views/profile/profileRecord.html",

		})
		//						历史		
		.state('profileHistory', {
			url: "/profileHistory",
			templateUrl: "views/profile/profileHistory.html",

		})
		//				邀请好友
		.state('profileAdd', {
			url: "/profileAdd",
			templateUrl: "views/profile/profileAdd.html",

		})
		//			设置
		.state('profileSetup', {
			url: "/profileSetup",
			templateUrl: "views/profile/profileSetup.html",

		})

	//listDemo
	.state('listDemo', {
		url: "/listDemo",
		templateUrl: "views/list/listDemo.html",
		controller: 'listDemo_ctr'
	})
	$urlRouterProvider.otherwise("/login");
})