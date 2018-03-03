/*! 
* WeX5 v3 (http://www.justep.com) 
* Copyright 2015 Justep, Inc.
* Licensed under Apache License, Version 2.0 (http://www.apache.org/licenses/LICENSE-2.0) 
*/ 
define(function(require) {
	var $ = require("jquery");
	var justep = require("$UI/system/lib/justep");
	var BizDesignComp = require("$UI/system/components/designerCommon/comp/bizDesignComp");
	require('css!./css/user').load();

	function create(comp, clz) {
		var $domNode = $(comp.domNode);
		comp.domNode.style.position = "absolute";
		if (!comp.domNode.style.top) {
			comp.domNode.style.top = "10px";
			comp.domNode.style.left = "10px";
		}
		$domNode.addClass(clz).html('');
	}

	var User = BizDesignComp.extend({
		files: {
				"userDialog": {
					"label": '用户对话框',
				 	"login.w": {
				 		"label": '登录',
			 			"type": 'file'
				 	},
				 	"register.w": {
				 		"label": '注册',
				 		"type": 'file'
				 	},
				 	"user.w": {
				 		"label": '用户信息',
				 		"type": 'file'
				 	},
				 	"changePassword.w": {
				 		"label": '修改密码',
				 		"type": 'file'
				 	},
				 	"forgetPassword.w": {
				 		"label": '忘记密码',
				 		"type": 'file'
				 	}
				 }
		},
		compPath : "$UI/system/components/justep/user",
		init : function(value, bindingContext) {
			create(this, 'x-user');
			this.callParent(value, bindingContext);
		}
	});

	justep.Component.addOperations(User, {
		'login' : {
			label : '',//登录
			argsDef : [],
			method : function(args) {				
			}
		},
		'logout' : {
			label : '',//注销
			argsDef : [],
			method : function(args) {				
			}
		},
		'register' : {
			label : '',//注册用户
			argsDef : [],
			method : function(args) {				
			}
		},
		'showUser' : {
			label : '',//显示用户
			argsDef : [],
			method : function(args) {				
			}
		},
		'changePassword' : {
			label : '',//修改密码
			argsDef : [],
			method : function(args) {				
			}
		}
	});
	
	var quickIdeEx = {
			"$UI/system/components/justep/user/user":{
				properties:["xid","autoLogin",{name:"onLogin",text:"登录成功事件",editor:"eventEditor",noLabel:true},{name:"onLogout",text:"注销成功事件",editor:"eventEditor",noLabel:true}],
				//操作配置
				operations:function(){
					return [{groupName:"用户",
						items:[{name:'login',label:"登录"},
						       {name:'logout',label:"注销"},
	                        	  {name:'register',label:"注册"},
	                        	{name:'showUser',label:"显示用户信息"},
	                       {name:'changePassword',label:"修改密码"}
							   ]}];
				}
			}
	};
	
	return {
		'$UI/system/components/justep/user/user' : User,quickIdeEx:quickIdeEx
	};
});