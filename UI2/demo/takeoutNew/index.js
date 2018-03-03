define(function(require) {
	var $ = require("jquery");
	var justep = require("$UI/system/lib/justep");
	var Baas = justep.Baas;
	var CommonUtils = require("$UI/system/components/justep/common/utils");
	var jpushInstance = require("./jpush");
	var bmap = require('$UI/system/components/justep/bmap/bmap');
	

	require("$UI/system/lib/cordova/cordova");
	require("cordova!cordova-plugin-device");
	require("cordova!com.justep.cordova.plugin.weixin.v3");
	require("cordova!com.justep.cordova.plugin.alipay");
	require("cordova!cordova-plugin-geolocation");
	require("cordova!com.justep.cordova.plugin.baidulocation");
	require("cordova!cn.jpush.phonegap.JPushPlugin");
	require("cordova!com.justep.cordova.plugin.unionpay");
	require("res!./img");

	var Model = function() {
		this.callParent();
		this.actionUrl = "/baas/takeoutAdmin/attachment/SimpleFileStore";

		this._deviceType = "pc"; // pc || wx || app

		this._userID = "user";
		this._userDefaultName = "新用户";
		this._userDefaultAddress = "";
		this._userPhotoURL = "";
	};

	Model.prototype.modelLoad = function(event) {
		var self = this;
		// 获取url上的code参数 - 微信授权code，用于获取微信用户信息
		var weixinCode = this.getContext().getRequestParameter("code");

		// 判断运行环境是否在X5移动客户端中，如果在移动客户端中，则当deviceready后取手机设备uuid作为用户唯一标识
		if (justep.Browser.isX5App) {
			this._deviceType = "app";

			CommonUtils.attachDoubleClickExitApp(function() {
				if (self.comp('contents').getActiveIndex() === 0) {
					return true;
				}
				return false;
			});
			document.addEventListener("deviceready", function() {
				self._userID = window.device.uuid;
				self._userDefaultName = "新用户（来自X5APP的用户）";
			}, false);

		} else if (weixinCode !== "") {
			this._deviceType = "wx";
			if (justep.Browser.isWeChat) {
				this.wxApi = new navigator.WxApi("wx3fb4a0dd8ea0730c");
			}
			
			Baas.sendRequest({
				"url" : "/weixin/weixin",
				"action" : "userinfo",
				"async" : false,
				"params" : {
					code : weixinCode
				},
				"success" : function(weixinUser) {
					self._userID = weixinUser.openid;
					self._userDefaultName = weixinUser.nickname + "（来自微信的用户）";
					self._userDefaultAddress = weixinUser.country + weixinUser.province + weixinUser.city;
					self._userPhotoURL = weixinUser.headimgurl;
				}
			});
			
		}
		
		this.comp('userData').filters.setVar("user", this._userID);
		this.comp('orderData').filters.setVar("user", this._userID);
		this.initPayData();
		//this.queryAddr();
	};

	Model.prototype.initPayData = function() {
		var payData = this.comp('payData');
		this.comp('payTypeSelect').val("faceToFace");
		if (!(this._deviceType == "app" && navigator.weixin)) {
			payData.remove(payData.getRowByID(1));
		}
		if (!(this._deviceType == "app" && navigator.alipay)) {
			payData.remove(payData.getRowByID(2));
		}
		if (!(this._deviceType == "app" && navigator.unionpay)) {
				payData.remove(payData.getRowByID(5));
		}
		if (this._deviceType != "wx") {
			payData.remove(payData.getRowByID(3));
		}
		if (this._deviceType == "pc") {
			$(this.getElementByXid("paySection")).hide();
		}
	};

	Model.prototype.contentsActiveChange = function(event) {
		switch (event.to) {
		case 1:
			this.loadUserData();
			break;
		case 2:
			this.loadOrderData();
			break;
		case 3:
			this.loadUserData();
			if (this._userPhotoURL) {
				$(this.getElementByXid("photoImage")).attr("src", this._userPhotoURL);
			} else {
				$(this.getElementByXid("photoDiv")).hide();
			}
			break;
		}
	};

	Model.prototype.loadUserData = function() {
		var userData = this.comp("userData");
		if (!userData.loaded) {
			userData.refreshData();
			// 如果客户信息为空，新增客户信息
			if (userData.getCount() === 0) {
				this.comp("userData").newData({
						index : 0,
						defaultValues : [ {
							"fID" : this._userID,
							"fName" : this._userDefaultName,
							"fAddress" : this._userDefaultAddress
						} ]
					});

			}
		}
	};

	Model.prototype.queryAddr = function() {
		var gpsDtd = this.getLocation();
		var self = this;
		gpsDtd.done(function(position) {
			var x = position.latitude;
			var y = position.longitude;
			Baas.sendRequest({
				"url" : "/justep/takeout",
				"action" : "queryAddr",
				"async" : false,
				"params" : {
					x : x,
					y : y
				},
				"success" : function(data) {
					if(!data){
						self._userDefaultAddress = "北京市朝阳区东三环南路98号高和蓝峰大厦1802室";
						return;
					}
					var addrList = data.addrList;
					addrList = addrList ? addrList[0] : {};
					var status = addrList.status;
					if (status == 1) {
						var admName = addrList.admName;
						admName  = admName ? admName.replace(",", "") : admName; 
						var address = admName + addrList.name;
						self._userDefaultAddress = address;
					}else {
						self._userDefaultAddress = "北京市朝阳区东三环南路98号高和蓝峰大厦1802室";
					}
					var userData = self.comp("userData");
					if (userData.getCount() == 1) {
						userData.setValue("fAddress", self._userDefaultAddress);
					}
				}
			});
		});
	};

	Model.prototype.loadOrderData = function() {
		var orderData = this.comp("orderData");
		if (!this._orderDataLoaded) {
			this._orderDataLoaded = true;
			orderData.refreshData();
			this.comp("orderList").refresh();
		}
	};

	Model.prototype.addCartBtnClick = function(event) {
		var row = event.bindingContext.$object;
		var cartData = this.comp("cartData");
		if (cartData.find([ 'fFoodID' ], [ row.val('fID') ]).length === 0) {
			cartData.newData({
				index : 0,
				defaultValues : [ {
					"fFoodID" : row.val("fID"),
					"fName" : row.val("fName"),
					"fPrice" : row.val("fPrice"),
					"fCount" : 1
				} ]
			});
		}
	};

	Model.prototype.addCountBtnClick = function(event) {
		var row = event.bindingContext.$object;
		row.val("fCount", row.val("fCount") + 1);
	};

	Model.prototype.reduceCountBtnClick = function(event) {
		var row = event.bindingContext.$object;
		row.val("fCount", (row.val("fCount") > 0) ? row.val("fCount") - 1 : 0);
	};

	Model.prototype.saveOrderBtnClick = function(event) {
		var self = this;
		var orderData = this.comp("orderData");
		var cartData = this.comp("cartData");
		var userData = this.comp("userData");

		// 数据校验
		if ($.trim(userData.val("fName")) === "" || $.trim(userData.val("fPhoneNumber")) === "" || $.trim(userData.val("fAddress")) === "") {
			justep.Util.hint("请填写完整的用户信息", {
				"type" : "danger"
			});
			return;
		}

		// 合并订单内容
		var content = "";
		cartData.each(function(options) {
			var row = options.row;
			content = content + row.val("fName") + "(" + row.val("fCount") + ") ";
		});

		var orderID = justep.UUID.createUUID();

		// 生成订单数据
		var orderRows = orderData.newData({
			index : 0,
			defaultValues : [ {
				"fID" : orderID,
				"fCreateTime" : justep.Date.toString(new Date(), justep.Date.STANDART_FORMAT),
				"fContent" : content,
				"fUserID" : userData.val("fID"),
				"fUserName" : userData.val("fName"),
				"fPhoneNumber" : userData.val("fPhoneNumber"),
				"fAddress" : userData.val("fAddress"),
				"fSum" : cartData.sum("calcMoney") + ""
				//"fPayState" : 0
			} ]
		});

		var success = function(resultData) {
			// 保存成功清除购物车，并跳转到订单页
			cartData.clear();
			justep.Util.hint("下单成功，谢谢您的订餐！");
			userData.applyUpdates();
			// 开始支付
			var payDtd = self.payOrder(orderID);
			payDtd.always(function(code) {
				orderData.setValue("fPayState", code);
				orderData.saveData({"onSuccess" : function() {
						self.comp("contents").to("orderContent");
					}});
				self.sendOrderPushMessage();
			}).fail(function(code) {
				justep.Util.hint("支付遇到问题!");
			});
		};
		var error = function(msg) {
			// 保存失败后清除订单数据
			orderData.deleteData(orderRows);
			Baas.showError(msg);
		};

		// 保存数据
		orderData.saveData({
			"onSuccess" : success,
			"onError" : error});
	};

	Model.prototype.sendOrderPushMessage = function() {
		jpushInstance.getRegistrationID().done(function(id) {
			Baas.sendRequest({
				"method" : "post",
				"url" : "/jpush/jpush",
				"action" : "push",
				"params" : {
					registrationId : id
				}
			});
		});
	};

	/**
		支付失败参数:
			   <0 支付失败 按照不同支付类型 返回值不同
			   0 货到付款
		   1 用户采用微信支付付款完成
		   2 用户采用微信应用中js-sdk支付付款完成
		   3 用户采用支付宝支付付款完成
		   4 用户采用银联支付付款完成
		  ....未完待续 
	 **/
	Model.prototype.payOrder = function(orderID) {
		var payDtd = $.Deferred();
		var payType = this.comp('payTypeSelect').val();
		if (payType === "faceToFace" || payType === "") {
			payDtd.resolve(0);
		} else if (payType === "weixin") {
			this.payOrderByWeixin(payDtd, orderID);
		} else if (payType == "alipay") {
			this.payOrderByAlipay(payDtd, orderID);
		} else if (payType == "weixinJSSDK") {
			this.payOrderByWeixinJSSDK(payDtd,orderID);
		} else if (payType == "union") {
			this.payOrderByUnion(payDtd,orderID);
		} else {
			payDtd.reject(0);
		}
		return payDtd.promise();
	};

	/**  
		-23 当前环境不支持微信支付
	  	-20 微信支付失败
	 */
	Model.prototype.payOrderByWeixinJSSDK = function(payDtd, orderID) {
		if (!navigator.WxApi) {
			payDtd.reject(-33);
			return;
		}
		var tradeNo = orderID;
		var notifyUrl = location.origin + "/baas/weixin/weixin/notify";
		this.wxApi.chooseWXPay({
			body : "x5外卖",
			mchId : "1228613502",
			notifyUrl : notifyUrl,
			outTradeNo : tradeNo,
			totalFee : "1"
		}).done(function() {
			payDtd.resolve(2);
		}).fail(function() {
			payDtd.reject(-20);
		});
	};

	/** 
	 * 9000 操作成功。 
	 * 4000 系统异常。 
	 * 4001 数据格式不正确。  
	 * 4003 该用户绑定的支付宝账户被冻结或不允许支付。 
	 * 4004  该用户已解除绑定。 
	 * 4005  绑定失败或没有绑定。 
	 * 4006  订单支付失败。 
	 * 4010  重新绑定账户。  
	 * 6000 支付服务正在进行升级操作。 
	 * 6001 用户中途取消支付操作。
	 * 
	    当请求支付已经到alipay应用但是失败 错误编码 以 -33 + message(message是非常大的整数一般都3000+)  
		-33 当前环境不支持支付宝支付
	  	-30 支付宝支付支付请求被拒绝
	 */
	Model.prototype.payOrderByAlipay = function(payDtd, orderID) {
		if (!navigator.alipay) {
			payDtd.reject(-33);
			return;
		}
		var notifyUrl = location.origin;
		var tradeNo = orderID;
		var alipay = navigator.alipay;
		alipay.pay({
			"seller" : "huangyx@justep.com", // 卖家支付宝账号或对应的支付宝唯一用户号
			"subject" : "x5外卖", // 商品名称
			"body" : "x5外卖", // 商品详情
			"price" : "0.01", // 金额，单位为RMB
			"tradeNo" : tradeNo, // 唯一订单号
			"timeout" : "30m", // 超时设置
			"notifyUrl" : notifyUrl
		}, // 服务器通知路径
		function(message) {
			var responseCode = parseInt(message);
			if (responseCode === 9000) {
				payDtd.resolve(3);
			} else if (!isNaN(responseCode)) {
				payDtd.reject((-33) + responseCode);
			} else {
				payDtd.reject(-30);
			}
		}, function(msg) {
			payDtd.reject(-30);
		});
	};
	/** 
	    当请求支付已经到weixin应用但是失败 错误编码 以 -13 + message(message如果为weixin异常一定为负数) 
		-13 当前环境不支持微信支付	
	  	-12 微信获取accessToken失败
	  	-11 微信生成预支付订单失败
	  	-10 微信支付请求被拒绝
	 */
	Model.prototype.payOrderByWeixin = function(payDtd, orderID) {
		if (!navigator.weixin) {
			payDtd.reject(-13);
			return;
		}
		var notifyUrl = location.origin;
		var traceID = justep.UUID.createUUID();
		var traceNo = orderID;

		var weixin = navigator.weixin;
		weixin.generatePrepayId({
			"body" : "x5外卖",
			"feeType" : "1",
			"notifyUrl" : notifyUrl,
			"totalFee" : "1",
			"traceId" : traceID,
			"tradeNo" : traceNo
		}, function(prepayId) {
			weixin.sendPayReq(prepayId, function(message) {
				var responseCode = parseInt(message);
				if (responseCode === 0) {
					payDtd.resolve(1);
				} else if (!isNaN(responseCode)) {
					payDtd.reject((-13) + responseCode);
				} else {
					payDtd.reject(-10);
				}
			}, function(message) {
				justep.Util.hint("微信支付失败！");
				payDtd.reject(-10);
			});
		}, function(message) {
			justep.Util.hint("微信支付失败！");
			payDtd.reject(-11);
		});
	};
	/** 
	    当请求支付已经到unionpay但是失败
		-50 unionpay 失败
	 */
	Model.prototype.payOrderByUnion = function(payDtd,orderID) {
		Baas.sendRequest({
			"url" : "/unionpay/unionpay",
			"action" : "tn",
			"params" : {
				"orderId":orderID
			},
			"success" : function(data) {
				navigator.unionpay.pay({
					tn : data.tn
				}, function(code) {
					if(code === "success"){
						payDtd.resolve(4);
					}else{
						payDtd.reject(-50);
					}
					
				}, function(code) {
					payDtd.reject(-50);
				});
			},
			"error":function(){
				payDtd.reject(-50);
			}
		});
	};
	

	Model.prototype.cleanCartBtnClick = function(event) {
		this.comp("cartData").clear();
	};

	Model.prototype.saveUserBtnClick = function(event) {
		var userData = this.comp("userData");
		userData.saveData({onSuccess:function() {
			justep.Util.hint("用户信息保存成功");
		}});
	};

	// 转换动态图片URL
	Model.prototype.transURL = function(url) {
		return require.toUrl(url);
	};

	Model.prototype.getLocation = function() {
		var gpsDtd = $.Deferred();
		if (this.wxApi) {
			this.wxApi.exec().done(function(wx) {
				wx.getLocation({
					type : "gcj02",
					success : function(data) {
						gpsDtd.resolve({
							coorType : data.coorType,
							address : data.address,
							longitude : data.longitude,
							latitude : data.latitude
						});
					},
					cancel : function(res) {
						gpsDtd.resolve({
							longitude : 116.45764191999997,
							latitude : 39.8622934399999
						});
					}
				});
			}).fail(function() {
				gpsDtd.resolve({
					longitude : 116.45764191999997,
					latitude : 39.8622934399999
				});
			});
		} else if (navigator.geolocation) {
			var success = function(data) {
				// data.longtitude 经度
				// data.latitude 纬度
				// data.address 文字描述的地址信息
				// data.hasRadius 是否有定位精度半径
				// data.radius 定位精度半径
				// data.type 定位方式
				// data.coorType
				gpsDtd.resolve({
					coorType : data.coorType,
					address : data.address,
					longitude : data.coords.longitude,
					latitude : data.coords.latitude
				});
			};

			var fail = function(e) {
				justep.Util.hint("获取地理位置失败，暂时采用默认地址");
				gpsDtd.resolve({
					longitude : 116.45764191999997,
					latitude : 39.8622934399999
				});
			};
			/**
			 *  如果在室内 enableHighAccuracy: true 反而误差更大
			 *  如果在室外 enableHighAccuracy: true 相对准确
			 */
			navigator.geolocation.getCurrentPosition(success, fail);
			/*var gpsWatchID = navigator.geolocation.watchPosition(success, fail,{
			timeout: 30*1000,
			maximumAge: 30000,
			enableHighAccuracy: true});*/
		} else {
			justep.Util.hint("获取地理位置失败，暂时采用默认地址");
			gpsDtd.resolve({
				longitude : 116.45764191999997,
				latitude : 39.8622934399999
			});
		}
		return gpsDtd.promise();
	};

	Model.prototype.locationClick = function(event) {
		var self = this;
		var gpsDtd = self.getLocation();
		gpsDtd.done(function(position) {
			bmap.marker({
				location:position.latitude+","+ position.longitude,
				title:position.address,
				content:"",
				src:"justep"
			});
		});
	};

	Model.prototype.orderDataSaveCreateParam = function(event){
		event.param.tables.push(this.comp("userData").toJson(true));
	};

	Model.prototype.orderDataSaveCommit = function(event){
		this.comp('userData').applyUpdates();
	};
	//图片路径
	Model.prototype.transUrl = function(row) {
		var src = null;
		if (row.val('fImage') != null && row.val('fImage') != "" && row.val('fImage') != "[]") {
			var imageJson = eval("(" + row.val('fImage') + ")");
			var realFileName = imageJson[0]["realFileName"];
			var storeFileName = imageJson[0]["storeFileName"];
			var ownerID = row.val('fID');
			var operateType = "browse";
			var url = this.actionUrl + '?realFileName=' + realFileName + '&storeFileName=' + storeFileName + '&ownerID=' + ownerID + '&operateType=' + operateType;
			src = require.toUrl(url);
		}

		return src;
	}
	return Model;
});