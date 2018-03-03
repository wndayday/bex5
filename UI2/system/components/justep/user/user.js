/*! 
 * WeX5 v3 (http://www.justep.com) 
 * Copyright 2015 Justep, Inc.
 * Licensed under Apache License, Version 2.0 (http://www.apache.org/licenses/LICENSE-2.0) 
 */
define(function(require) {
	var $ = require("jquery");
	var store = require('$UI/system/lib/base/store');
	var justep = require("$UI/system/lib/justep");
	var WindowDialog = require("$UI/system/components/justep/windowDialog/windowDialog");
	var uaa = require("./js/uaa");
	//require("service!uaa");

	var url = require.normalizeName("./user");
	var ComponentConfig = require("./user.config");

	var dialogUrls = {
			login:'{0}/userDialog/login.w',	
			register:'{0}/userDialog/register.w',	
			userInfo:'{0}/userDialog/user.w',	
			changePassword:'{0}/userDialog/changePassword.w',
			forgetPassword:'{0}/userDialog/forgetPassword.w'
	};
	
	function getUrl(name,appPath){
		appPath = appPath || '$UI/system/components/justep/user';
		var url = justep.String.format(dialogUrls[name],appPath);
		return require.toUrl(url);
	}
	
	var password = [ 15, 52, 60, 66, 12, 11, 98, 35 ];
	var encrypt = function(str, key) {
		var ret = '', keyLen = key.length;
		for (var i = 0; i < str.length; i++) {
			ret += String.fromCharCode(str.charCodeAt(i) ^ key[i % keyLen]);
		}
		return ret;
	};

	var _loginData_;
	var loadLoginDataByStore = function() {
		if (_loginData_)
			return _loginData_;
		var data = store.get('app_loginData');
		if (data) {
			data = encrypt(data, password);
			_loginData_ = JSON.parse(data);
			return _loginData_;
		}
	};

	var saveLoginDataToStore = function(data) {
		data = JSON.stringify(data);
		store.set('app_loginData', encrypt(data, password));
		_loginData_ = null;
	};

	var clsLoginDataToStore = function() {
		_loginData_ = null;
		store.set('app_loginData', encrypt('{}', password));
	};

	var needLogin = function() {
		var data = loadLoginDataByStore();
		return !data || !data.name || !data.password;
	};
	
	var getRequestVars = function() {
		var vars = [], hash;  
		var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');  
		for(var i = 0; i < hashes.length; i++)  
		{  
			hash = hashes[i].split('=');  
			vars.push(hash[0]);  
			vars[hash[0]] = hash[1];  
		}  
		return vars;	
	};
	
	var isLogined = justep.Bind.observable(false);
	var loginCount = 0, logoutCount = 0;
	
	var User = justep.BindComponent.extend({
		getDlgUrl: function(name){
			return getUrl(name,this.getAppPath());
		},
		getConfig : function() {
			return ComponentConfig;
		},
		// 构造函数
		constructor : function(options) {
			this.appPath = null;
			this.autoLogin = true;
			this.data = null;
			this.callParent(options);
		},
		dispose : function() {
			if(this.isLoginedChangeHandle) this.isLoginedChangeHandle.dispose();
			this.callParent();
		},
		// 动态创建组件
		buildTemplate : function(config) {
		},
		// 初始化
		doInit : function(value, bindingContext, allBindings) {
			this.callParent(value, bindingContext, allBindings);
			var self = this;
			var doLoginedChange = function(logined){
				var data = self.getData();
				if(data){
					var row = data.getCurrentRow(true);
					if(!row){
						data.open();
						data.first();
						row = data.getCurrentRow(true);
					}
					if(row){
						row.val('isLogined',logined);
						if(logined){
							var user = self.getUser();
							row.val('id',user.id);
							row.val('name',user.name);
							row.val('phone',user.phoneNumber);
							row.val('email',user.email);
						}else{
							row.val('id','');
							row.val('name','');
							row.val('phone','');
							row.val('email','');
						}					
					}
				}
				if(logined){
					if(loginCount>0) self.fireEvent('onLogin',{source:self});
				}else{
					if(logoutCount>0) self.fireEvent('onLogout',{source:self});
				}
			};
			this.isLoginedChangeHandle = isLogined.subscribe(doLoginedChange);
			if(isLogined.peek()) doLoginedChange(true);
		},
		doUpdate : function(value, bindingContext, allBindings) {
			this.callParent(value, bindingContext, allBindings);
		},
		getData: function(){
			if(this.data)
				return this.getModel().comp(this.data);
		},
		getAppPath: function(){
			var cfg = this.getConfig();
			return this.appPath || cfg.appPath;
		},
		_createWinDlg: function(option){
			var m = this.getModel();
			//创建对话框
			var dlgCfg = {
					showTitle : false,
					src : option.src,
					parentNode : m.getRootNode()
			};
			var dlg = new WindowDialog(dlgCfg);
			return dlg;
		},
		openWindowDialog: function(option){
			//option: src,params
			if(!this.dlg){
				this.dlg = this._createWinDlg(option);
			}
			this.dlg.open(option);
		},
		_doLoginAfter: function(){
			loginCount++;
			logoutCount = 0;
			isLogined.set(true);
		},
		_doLogoutAfter: function(){
			logoutCount++;
			loginCount = 0;
			isLogined.set(false);
			justep.Util.hint('注销成功!', {
				"type" : "success"
			});
		},
		_doRegisterAfter: function(){
			justep.Util.hint('注册成功!', {
				"type" : "success"
			});
			this.fireEvent('onRegister',{source:this});
		},
		showLogin: function(){
			var vars = getRequestVars();		
			//第三方登录
			//if(justep.Util.getCookie("oauth2-logined") === "true") {
			if(vars["tk"] != undefined && vars["tk"] !== "") {
				//取用户
//				var uaaUser = decodeURI(justep.Util.getCookie("uaa-user"));		
//				uaa.loginAfter($.parseJSON(uaaUser));
//				this._doLoginAfter();
				//执行登录
				uaa.login(vars["tk"], vars["tk"]);
			} else {
				if(!this.isLogined()){
					if(this.autoLogin && !needLogin()) this.login(loadLoginDataByStore());
					else this.openWindowDialog({src:this.getDlgUrl('login'), data:{userComp:this}});
				} else this._doLoginAfter();
			}
		},
		showUserInfo: function(){
			if(this.isLogined())
				this.openWindowDialog({src:this.getDlgUrl('userInfo'), data:{userComp:this}});
			else
				this.showLogin();
		},
		showRegister: function(){
			this.openWindowDialog({src:this.getDlgUrl('register'), data:{userComp:this}});
		},
		showChangePassword: function(){
			if(this.isLogined())
				this.openWindowDialog({src:this.getDlgUrl('changePassword'), data:{userComp:this}});
			else 
				justep.Util.hint("登陆后才能修改密码!", {
					'type' : 'danger'
				});
		},
		login: function(user){
			//name,password
			var self = this;
			return uaa.login(user.name,user.password).then(function(){
				saveLoginDataToStore(user);
				self._doLoginAfter();
				justep.Util.hint('登录成功!', {
					"type" : "success"
				});
			},function(){
				justep.Util.hint('登录失败,确定用户名密码是否正确!', {
					'type' : 'danger'
				});
				clsLoginDataToStore();
				self.showLogin();
			});
		},
		weChatLogin: function(user) {
			var self = this;
			//add user to uaa
			uaa.createUser(user).then(function(data){
				return uaa.login(user.name,user.password).then(function(){
					saveLoginDataToStore(user);
					self._doLoginAfter();
					justep.Util.hint('登录成功!', {
						"type" : "success"
					});
				},function(){
					justep.Util.hint('登录失败,确定用户名密码是否正确!', {
						'type' : 'danger'
					});
					clsLoginDataToStore();
					self.showLogin();
				});
			},function(reason){
				return uaa.login(user.name,user.password).then(function(){
					saveLoginDataToStore(user);
					self._doLoginAfter();
					justep.Util.hint('登录成功!', {
						"type" : "success"
					});
				},function(){
					justep.Util.hint('登录失败,确定用户名密码是否正确!', {
						'type' : 'danger'
					});
					clsLoginDataToStore();
					self.showLogin();
				});
			});
		},
		logout: function(){
			var self = this;
			return uaa.logout().then(function(){
				self._doLogoutAfter();
				clsLoginDataToStore();
				self.showLogin();
			});
		},
		changePassword: function(oldPassword,password){
			return uaa.changePassword(oldPassword,password).then(function(){
				clsLoginDataToStore();
				justep.Util.hint("密码修改成功！", {
					"type" : "success"
				});
			},function(error){
				justep.Util.hint("密码修改失败！", {
					'type' : 'danger'
				});
			});
		},
		register: function(user){
			//name,phone,email,password
			var self = this;
			user.active = true;
			return uaa.register(user,user.code).then(function(){
				saveLoginDataToStore({name:user.email,password:user.password});
				self._doRegisterAfter();
				self.showLogin();
			},function(error){
				justep.Util.hint('注册失败！', {
					'type' : 'danger'
				});
			});
		},
		sendVerifyCode: function(type,tel){
			return uaa.sendVerifyCode(type,tel).then(function(){
				justep.Util.hint("发送验证码成功！", {
					"type" : "success"
				});
			},function(error){
				justep.Util.hint('发送验证码失败！', {
					'type' : 'danger'
				});
			});
		},
		resetPassword: function(tel,code,newPassword){
			return uaa.resetPassword(tel,code,newPassword).then(function(){
				justep.Util.hint("重置密码成功！", {
					"type" : "success"
				});
			},function(error){
				justep.Util.hint('重置密码失败！', {
					'type' : 'danger'
				});
			});
		},
		isLogined: function(){
			return uaa.isLogined();
		},
		getUser: function(){
			return User.getCurrentUser();
		}
	});
	
	User.getLoginedObservable = function(){
		return isLogined;
	};
	
	User.getCurrentUser = function(){
		return uaa.getCurrentUser();
	};

	justep.Component.addOperations(User, {
		'login' : {
			label : '',//登录
			argsDef : [],
			method : function(args) {				
				return this.owner.showLogin();
			}
		},
		'logout' : {
			label : '',//注销
			argsDef : [],
			method : function(args) {				
				return this.owner.logout();
			}
		},
		'register' : {
			label : '',//注册用户
			argsDef : [],
			method : function(args) {				
				return this.owner.showRegister();
			}
		},
		'showUser' : {
			label : '',//显示用户
			argsDef : [],
			method : function(args) {				
				return this.owner.showUserInfo();
			}
		},
		'changePassword' : {
			label : '',//修改密码
			argsDef : [],
			method : function(args) {				
				return this.owner.showChangePassword();
			}
		}
	});

	User.phoneReg = /^[1][34578][0-9]{9}$/;
	User.phoneHint = "手机号码格式不正确!";
	User.emailReg = /^(\w)+(\.\w+)*@(\w)+((\.\w+)+)$/;
	User.emailHint = "邮箱格式不正确!";
	User.passwordReg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9a-zA-Z]{6,16}$/;
	User.passwordHint = "请输入由6-16位字母和数字的组合的密码!";

	User.bindTimmer = function Timmer(btn, loopSecond, titile1, title2) {
		btn.loopSecond = loopSecond;
		btn.waittime = loopSecond;
		var self = btn;
		btn.mytimer = function() {
			if (self.waittime <= 0) {
				self.set({
					"disabled" : false,
					"label" : titile1
				});
				this.waittime = loopSecond;
			} else {
				self.set({
					"disabled" : true,
					"label" : title2 + "(" + self.waittime + ")"
				});
				self.waittime--;
				setTimeout(function() {
					self.mytimer();
				}, 1000);
			}
		};
	};
	
	justep.Component.register(url, User);
	return User;
});