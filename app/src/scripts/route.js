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
		//获奖消息
		.state('gainsMessage', {
			url: "/gainsMessage",
			templateUrl: "views/gains/gainsMessage.html",

		})
		
		
			//资金管理
		.state('gainsManageDesc', {
			url: "/gainsManageDesc",
			templateUrl: "views/gains/gainsManageDesc.html",

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
		//广告-----欣赏
	.state('advAppreciate', {
			url: "/advAppreciate",
			templateUrl: "views/adviertisement/advAppreciate.html",

		})
		//广告-----购买
	.state('advBuy', {
			url: "/advBuy",
			templateUrl: "views/adviertisement/advBuy.html",

		})
		//广告-----详情
	.state('advHelp', {
			url: "/advHelp",
			templateUrl: "views/adviertisement/advHelp.html",

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
			url: "/profile{id}",
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
		//			设置-----帮助
		.state('help', {
			url: "/help",
			templateUrl: "views/profile/help.html",

		})
//					设置-----意见反馈	
		.state('response', {
			url: "/response",
			templateUrl: "views/profile/response.html",

		})
		//					设置-----修改密码	
		.state('ModifyPwd', {
			url: "/ModifyPwd",
			templateUrl: "views/profile/ModifyPwd.html",

		})
		//					设置-----密码管理	
		.state('PasswordMng', {
			url: "/PasswordMng",
			templateUrl: "views/profile/PasswordMng.html",

		})
		//					设置-----身份认证	
		.state('identity', {
			url: "/identity",
			templateUrl: "views/profile/identity.html",

		})
		//					设置-----支付宝	
		.state('Alipay', {
			url: "/Alipay",
			templateUrl: "views/profile/Alipay.html",

		})
		//					设置-----收货地址	
		.state('address', {
			url: "/address",
			templateUrl: "views/profile/address.html",

		})
			//					设置-----收货地址---修改	
		.state('addressDesc', {
			url: "/addressDesc",
			templateUrl: "views/profile/addressDesc.html",

		})
			//					设置-----收货地址----添加
		.state('addAddress', {
			url: "/addAddress",
			templateUrl: "views/profile/addAddress.html",

		})
		//					设置-----邮箱	
		.state('mailbox', {
			url: "/mailbox",
			templateUrl: "views/profile/mailbox.html",

		})
		
		
	//listDemo
	.state('listDemo', {
		url: "/listDemo",
		templateUrl: "views/list/listDemo.html",
		controller: 'listDemo_ctr'
	})
		//				优惠

	.state('demo', {
			url: "/demo",
			templateUrl: "views/adviertisement/demo.html",

		})
	$urlRouterProvider.otherwise("/login");
})