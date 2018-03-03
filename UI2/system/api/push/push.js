/*! 
* WeX5 v3 (http://www.justep.com) 
* Copyright 2015 Justep, Inc.
* Licensed under Apache License, Version 2.0 (http://www.apache.org/licenses/LICENSE-2.0)
*  
*/ 
/**
 *	push sdk for X5 App: 只支持一个时刻登录一个账号 
 * 	example
 * 		var Push = require("$UI/system/api/push/push");
 * 		var Message = require("$UI/system/api/push/push");
 * 
 * 		//设置PushServer地址(默认不用设置, 当期望使用别的PushServer时才需要设置)
 * 		//Push.setPushServer("http://server-ip:port/PushServer");		
 * 
 * 		//建立连接
 * 		Push.connect("personID", "password", null, function(){
 * 			alert("连接成功");
 * 		}, function(error){
 * 			alert("连接失败");
 * 		});
 * 		
 *		//接收消息
 * 		Push.on("onMessage", function(event){
 * 			var msg = event.message;
 * 			alert("receive message: " + JSON.stringify(msg));
 * 		});
 * 
 * 		//发送消息
 * 		var msg = new Message("测试消息");
 * 		msg.addExt("ext1", "this is ext1");
 * 		msg.addExt("ext2", "this is ext2");
 * 		var targets = []; //指定消息指收者, 可以是人的ID或组织的FID 
 * 		Push.sendMessage(msg, targets);	
 * 
 * 		//断开连接
 * 		Push.disConnect();
 */
define(function(require) {
	require("$UI/system/lib/cordova/cordova");
	require("cordova!com.justep.cordova.plugin.push");
	require("cordova!cordova-plugin-device");
	var $ = require("jquery");
	var Shell = require("$UI/system/lib/portal/shell");
	var Browser = require("$UI/system/lib/base/browser");
	var Object = require("$UI/system/lib/base/object");
	var Observable = require("$UI/system/lib/base/observable");
	var Operational = require("$UI/system/lib/base/operational");
	var Util = require("$UI/system/lib/base/util");

	var _processMessage = null;
	/**
	 * message格式: 
	  	{
	  		title: "hello",
      		aps: {alert: ""},
      		url: "",
      		surl:"",
      		e: {}     
	  	}
	*/	
	var Push = Object.extend({
		mixins : [ Observable, Operational ],
		constructor : function() {
			this.callParent();
			Observable.prototype.constructor.call(this);
			Operational.prototype.constructor.call(this);
			this.pushServer = this.PUSH_SERVER;
		},
		
		setPushServer: function(url){
			this.pushServer = url;
		},

		connect: function(personID, password, successCallback, failCallback){
			failCallback = failCallback || Util.hint;
			if (Browser.isPC){
				this._registerTerminal(personID, personID + ".pcid");
				//failCallback("PC不支持推送功能！");
			}else{
				var me = this;

				document.addEventListener('deviceReady',function(){
					var connectSuccess = function(){
						var terminalID = navigator.push.token;
						try{
							me._registerTerminal(personID, terminalID);	
							if (successCallback) successCallback();
						}catch(error){
							failCallback("注册终端失败！");
						}
					};
					var connectFail = function(){
						failCallback("推送建立连接失败！");
					};
					//var password = new MD5(true).hex_md5("justep");//Utils.getCookie("access_token") || "";
					var params = { 
						userName: personID,
						password: password,
						topicName: me._getTopicName(personID)
					};
					if (!_processMessage){
						_processMessage = function(evt){
							try{
								var message = JSON.parse(evt.data);
								//因为ios的扩展属性转换成了string
								if (message.e && (typeof(message.e) === "string")){
									try{
										message.e = JSON.parse(message.e);
									}catch(e1){
										if (console){
											console.log(e1);
										}
									}
								}
								if (message.aps && message.aps.alert)
									message.title = message.aps.alert;
								var event = {message: message, cancel: false};
								me.fireEvent(me.MESSAGE_EVENT, event);
								if (!event.cancel){
									message.type = message.type || me.DEFAULT_TYPE;
									event = {message: message, cancel: false};
										me.fireEvent(message.type, event);
									if (!event.cancel && (message.type === me.DEFAULT_TYPE)){
										//默认打开相应的功能页面
										if (message.url){
											Shell.showPage({url: message.url, title: message.title||""});
										}else if (message.surl){
											$.ajax({
								                type: "GET",
								                url: message.surl,
								                async: false,
								                cache: false 
								            }).done(function(data){
								            	Shell.showPage({url: data, title: message.title||""});
								            }).fail(function(){
								            	Util.hint("转换消息中的地址失败！");
								            });
										}
									}
								}
							}catch(err){
								Util.hint("消息处理失败！");
							}
						};		
					}
					document.removeEventListener('pushMessage', _processMessage, false);
					document.addEventListener('pushMessage', _processMessage, false);
					if (navigator && navigator.push && navigator.push.connect){
						navigator.push.connect(connectSuccess, connectFail, params);
					}else{
						failCallback("未找到推送插件！");
					}
				},false);
			}
		},
		
		/** TODO 待讨论
		 *  {
		 *  	data: {  推送的内容
		 *  		title: 消息标题, 显示在通知栏
		 *  		content: 消息内容
		 *  		url: 消息页面
		 *  		e: {   消息扩展属性
		 *  			
		 *  		}
		 *  	}
		 *  	targets: 消息接收者, 使用","分隔, "*"表示所有人
		 *  	terminals: 消息终端, 如ios, android, weixin, 使用","分隔, "*"表示所有终端
		 *  	push_time: 定期推送时间
		 *  	expiration_interval: 消息过期的相对时间，从调用 API 的时间开始算起，单位是秒。
		 *  	expiration_time: 消息过期的绝对日期时间
		 *  }
		 */
		sendMessage: function(message, targets){
			if (message && targets){
				var msg = (typeof message.toJson === "function") ? message.toJson() : message;
				var params = {
					message: msg,
					targets: targets 
				}
				this._doPost({
					params: params,
					url: "/send_message",
					success: function(){
						
					},
					error: function(){
						Util.hint("发送消息失败！");
					}
				});
			}
		},
		
		_getUrl: function(url){
			if(0===url.indexOf('http://')||0===url.indexOf('https://'))
				return url;
			else
				return this.pushServer + url;
		},
		
		
		/**
	 		options = {
	 			"async" : 是否异步请求，默认false
	 			"url" : 服务端请求地址，不包含/PushServer
	 			"params" : 动作对应的参数
 				"success" : 请求成功后的回调，参数(resultData, xhr)
 				"error" : 请求失败后的回调，参数(msg, xhr)	 		
 			}
		 */
		_doPost: function(options){
			return $.ajax({
				"type" : "post",
				"async" : options.async ? options.async : false,
				"dataType" : "json",
				"contentType" : "application/json",
				"url" : this._getUrl(options.url),
				"data" : JSON.stringify(options.params),
				"complete" : function(xhr) {
					if (xhr.readyState == 4 && xhr.status == 200) {
						if (xhr.responseJSON.status == 1){
							if (options.success) {
								options.success.call(this, xhr.responseJSON, xhr);
							}
						}else{
							if (options.error) {
								options.error.call(this, xhr.responseJSON);
							}
						}
					} else {
						if (options.error) {
							options.error.call(this, {status: 0, error: "网络出错！"});
						}
					}
				}
			});
		},
		
		disConnect: function(){
			if (_processMessage){
				document.removeEventListener('pushMessage', _processMessage, false);
			}
			if (navigator && navigator.push && navigator.push.disConnect){
				navigator.push.disConnect();
			}
		},
		
		
		_getTopicName: function(personID){
			return "/" + personID + "/" + this.getTerminalType() + "/%1$s" + this.BUSINESS_TOPIC;
		},
			
		_registerTerminal: function(owner, terminalId){
			this._doPost({
				url: "/register_terminal",
				params: {
					owner: owner,
					id: terminalId,
					type: this.getTerminalType(),
					protocol: this.getTerminalProtocol()
				}, 
				success: function(){
					
				},
				error: function(){
					throw new Error("注册终端失败");
				}
			});
		}, 
		
		_unRegisterTerminal: function(owner, terminalId){
			this._doPost({
				url: "/unregister_terminal",
				params: {
					owner: owner,
					id: terminalId,
					type: this.getTerminalType(),
					protocol: this.getTerminalProtocol()
				}, 
				success: function(){
					
				},
				error: function(){
					throw new Error("注册终端失败");
				}
			});
		},
		
		getTerminalProtocol: function(){
			if (Browser.isIOS){
				return this.TERMINAL_PROTOCOL_APNS;
			}else{
				return this.TERMINAL_PROTOCOL_MQTT;
			}
		},
		
		getTerminalType: function(){
			if (Browser.isPC){
				return this.TERMINAL_TYPE_PC;
			}else if (Browser.isMobile){
				return this.TERMINAL_TYPE_MOBILE;
			}else{
				return this.TERMINAL_TYPE_PC;
			}
		},
		
		TERMINAL_TYPE_PC: "pc",
		TERMINAL_TYPE_MOBILE: "mobile",
		TERMINAL_TYPE_PAD: "pad",
		TERMINAL_PROTOCOL_MQTT: "mqtt",
		TERMINAL_PROTOCOL_APNS: "apns",
		
		BUSINESS_TOPIC: "/business",
		PUSH_SERVER: "/PushServer",
		PUSH_TOPIC: "/PushServer",
		DEFAULT_TYPE: "default",
		
		MESSAGE_EVENT: "onMessage"
	});
	
	return new Push();
});
