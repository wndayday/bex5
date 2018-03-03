define(function(require) {
	var $ = require("jquery");
	var justep = require("$UI/system/lib/justep");
	var ShellImpl = require('$UI/system/lib/portal/shellImpl');
	var WindowDialog = require("$UI/system/components/justep/windowDialog/windowDialog");
	var UAA = require('$UI/system/components/justep/user/js/uaa');
	var util = require("$UI/system/designer/webIde/quickIde/js/util");
	//var util = require("$UI/apps/js/util");
	require.res("./base/img");
	var selectors = {
		pages : '.x-portal-pages',
		username : '.x-portal-username',
		reload : '.x-portal-reload',
		logout : '.x-portal-logout',
		changeOrg : '.x-portal-changeOrg',
		changePassWd : '.x-portal-changePassWd',
		tenantname : '.x-portal-tenantname',
		userInfo : '.x-portal-userinfo',
		mainBtn : ".mainBtn",
	};
	var mainPageKey = 'main';

	var Model = function() {
		this.callParent();
		this._cfg = {
			isDebugMode : false,
			// needLogin : true,
			main : {
				show : true,
				xid : mainPageKey,
				url : "$UI/system/admin/base/main/main.w",
				title : "首页"
			},
			loginURL : '$UI/system/admin/base/login/login.w',
			changePassWdURL : '$UI/system/admin/base/dialog/changePassword.w',
			userInfo : "$UI/system/admin/base/dialog/personDetail.w"
		};
		this._cfg.binds = [ {
			selector : selectors.logout,
			event : 'click',
			func : this.logout.bind(this)
		}, {
			selector : selectors.reload,
			event : 'click',
			func : this.reload.bind(this)
		}, {
			selector : selectors.changePassWd,
			event : 'click',
			func : this.changePassWd.bind(this)
		}, {
			selector : selectors.userInfo,
			event : 'click',
			func : this.changeUserInfo.bind(this)
		}

		];
		this._pages = null;
		this.userName = "system";
		this.current = null;
		this._loginDlg = null;
		this.openedPage = {};

		this.openers = [];
		if (location.hash !== "" && location.hash !== "#!login") {
			this.loginDtd = this.getLoadedDeferred();
		}
		this.on("initLoginData", this.initLoginData);
	};

	Model.prototype.initLoginData = function(key) {
		// TODO 初始化用户缓存数据
//		var url = util.transUrl("/sys/cache", {
//			key : key
//		});
//		util.sendRequest({
//			url : url,
//			async : false,
//			success : function(result) {
//				if (result.success === true)
//					util[key] = result.object;
//			}
//		});
	};

	Model.prototype.changeUserInfo = function() {
//		justep.Shell.showPage("$UI/SA/OPM/organization/ownerInfo.w", null, {
//			title : "个人信息"
//		});
	};

//	Model.prototype.changeOrg = function() {
//		//this.getChangeOrgDialog().open();
//	};

//	Model.prototype.getChangeOrgDialog = function() {
//		if (!this._orgDlg) {
//			this._orgDlg = new WindowDialog({
//				src : this._cfg.orgURL,
//				parentNode : this.getRootNode(),
//				title : "切换组织",
//				status : "normal",
//				showTitle : true,
//				width : "50%",
//				height : "50%"
//			});
//		}
//		this._orgDlg.on('onReceive', this.changeOrgReceive, this);
//		return this._orgDlg;
//	};

	Model.prototype.changeOrgReceive = function(event) {
		if (event.data.success) {
			this.closeAllPage();
			this.showTenantName(event.data.name);
		}
	};

	Model.prototype.changePassWd = function() {
		 if (!this.changePasswordDialog) {
			 this.changePasswordDialog = new WindowDialog({
				 	src : this._cfg.changePassWdURL,
					 parentNode : this.getRootNode(),
					 title : "修改密码",
					 status : "normal",
					 showTitle : true,
					 width : "50%",
					 height : "300px"
			 });
		 }
		 this.changePasswordDialog.open();
	};

	Model.prototype.reload = function() {
		this.isReloadMode = true;
		window.location.reload();
	};

	Model.prototype._getTitle = function(options, container) {
		var title = (options && (options.title || (options.extra && options.extra.title))) || '';
		if (container && container.getInnerModel()) {
			var evtData = {
				type : 'getTitle',
				title : title
			};
			container.getInnerModel().postMessage(evtData);
			title = evtData.title;
		}
		return title;
	};

	Model.prototype._doShowPage = function(event) {
		var container = event.data.container, options = event.data.params, pageID = event.data.xid;
		var title = this._getTitle(options, container);
		this.current = pageID;
		if (container) {
			// 增加相关的class
			container.$domNode.addClass('x-portal-page-container').parent(".x-contents-content").addClass('x-portal-page-content');
		}
		if (this.hasListener('onShowPage')) {
			var eData = {
				source : this,
				isMainPage : (options ? this.isMainPage(options.xid) : false),
				title : title,
				pageID : pageID,
				first : !this.openedPage[pageID],
				options : options
			};
			this.fireEvent('onShowPage', eData);
		}
		this.openedPage[pageID] = true;
	};

	Model.prototype.showPage = function(options) {
		return this.shellImpl.showPage(options);
	};

	Model.prototype._doClosePage = function(event) {
		var id = event.data.closePageXid;
		if (this.current === id)
			this.current = null;
		delete this.openedPage[id];
		if (this.hasListener('onClosePage')) {
			var eData = {
				source : this,
				pageID : id
			};
			this.fireEvent('onClosePage', eData);
		}
	};

	Model.prototype.closePage = function(pageID) {
		return this.shellImpl.closePage(pageID, true);
	};

	Model.prototype.logout = function(config) {
		config = config || {};
		var self = this;
		this.comp("confirmDeleteMessageDialog").show({
			title : "提示",
			type : "YesNo",
			message : "<h4>您确定要退出吗？</h4><div class='text-red'>请您注意，是否打开的功能都保存了，关闭系统将导致没有保存的数据丢失！</div>",
			callback : function(param) {
				if (param.button === "yes") {
					self.closeAllPage();
					self.closeMainPage();
					self._doLogout();
					self.showLoginDialog();
				} else if (param.button === "no"){
					if ((typeof event !== "undefined") && event.type == "hashchange") {
						history.forward();
					}
				}
			}
		});
		/*if (config.ignoreConfirm || confirm("请您注意，是否打开的功能都保存了，关闭系统将导致没有保存的数据丢失！\r\r您确定要退出吗？")) {
			alert(11111);
			this.closeAllPage();
			this.closeMainPage();
			this._doLogout();
			this.showLoginDialog();
		} else {alert(222);
			if ((typeof event !== "undefined") && event.type == "hashchange") {
				history.forward();
			}
		}*/
	};

	Model.prototype._doLogout = function() {
		UAA.logout();
	};

	Model.prototype._doBind = function() {
		var $root = $(this.getRootNode());
		var binds = this._cfg.binds;
		if ($.isArray(binds)) {
			for (var i = 0; i < binds.length; i++) {
				$root.find(binds[i].selector).on(binds[i].event, binds[i].func);
			}
		}
	};

	Model.prototype.clearFunctionTree = function() {
		if (this.hasListener('onClearFunctionTree')) {
			var eData = {
				source : this
			};
			this.fireEvent('onClearFunctionTree', eData);
		}
	};

	Model.prototype.getFunctions = function() {
		return this.getContext().data.functionTree.menu;
	};

	var param2pageMapping = function(param) {
		var ret = $.extend({}, param);
		if (param.title) {
			delete ret.title;
			ret.extra = {};
			ret.extra.title = param.title;
		}
		return ret;
	};

	var createPageKey = function(func) {
		var key = func.url;
		func['pageKey'] = key;
		return key;
	};

	var func2pageMapping = function(func) {
		var ret = {
			extra : {}
		};
		$.each(func, function(k, v) {
			if ('url' === k)
				ret[k] = v;
			else if ('title' === k)
				ret.extra.title = v;
			else if ('children' != k)
				ret.extra[k] = v;
		});

		return ret;
	};

	Model.prototype.getFunctions = function(url) {
		var deferred = $.Deferred();
		$.ajax({
			dataType : 'json',
			url : url,
			async: false,
			success : function(funcs) {
				deferred.resolve(funcs);
			},
			error : function(){
				deferred.resolve([]);
			}
		});
		return deferred.promise();
	};
	
	Model.prototype.getMenu = function() {
		var deferred = $.Deferred(), defers = [], self = this;
		//加载系统功能树
		var url = require.toUrl("../config/sys.function.json");//"$UI2/system/designer/webIde/quickIde/config/sys.function.json";
		defers.push(self.getFunctions(url));
		//加载业务组件功能树
		if(this.appCfg && $.isArray(this.appCfg.funcs)){
			$.each(this.appCfg.funcs, function(i,v){
				var url = require.toUrl(v);
				defers.push(self.getFunctions(url));
			});
		}
		if(defers.length>0){
			$.when.apply($,defers).then(function(){
				var args = $.makeArray(arguments);
				var menus = [];
				$.each(args, function(i,v){
					menus.push.apply(menus,v);
				});
				deferred.resolve(menus);
			});
		}else{
			deferred.resolve([]);
		}
		return deferred.promise();
	};

	Model.prototype.createFunctionTree = function() {
		var deferred = $.Deferred();
		var getMenuDft = this.getMenu();
		var self = this;
		getMenuDft.done(function(menu){		
			// 功能增加到maaping
			var pageMappings = {};
			pageMappings[mainPageKey] = param2pageMapping(self._cfg.main);
			// 遍历功能树生成mapping
			var model = self;
			self.eachFuncs(menu, function(params) {
				if (model.isFunc(params.func)) {
					var func = params.func;
					var key = createPageKey(func);
					pageMappings[key] = func2pageMapping(func);
				}
			});
			self.shellImpl.addPageMappings(pageMappings);
			// 清理功能树
			self.clearFunctionTree();
			
			if (self.hasListener('onLoadFunctionTree')) {
				var eData = {
						source : this,
						funcs : menu
				};
				self.fireEvent('onLoadFunctionTree', eData);
			}
			deferred.resolve();
		});
		return deferred.promise();
	};

	Model.prototype.eachFuncs = function(funcs, fn, layer, parent) {
		var iLayer = layer || 0;
		if (!$.isArray(funcs) || !$.isFunction(fn))
			return;
		for (var i = 0; i < funcs.length; i++) {
			var func = funcs[i];
			fn({
				layer : iLayer,
				parent : parent,
				func : funcs[i],
				index : i
			});
			this.eachFuncs(func.children, fn, (iLayer + 1), func);
		}
	};

	Model.prototype.isMainPage = function(pid) {
		return pid === this._cfg.main.xid;
	};

	Model.prototype.getLoginDialog = function() {
		if (!this._loginDlg) {
			this._loginDlg = new WindowDialog({
				src : this._cfg.loginURL,
				parentNode : this.getRootNode()
			});
			this._loginDlg.on('onReceive', this.loginDialogReceive, this);
		}
		return this._loginDlg;
	};

	Model.prototype.showLoginDialog = function() {
		this.beforeLogin();
		var self = this;
		if (this._cfg.needLogin) this.getLoginDialog().open();
		else UAA.login('system','123456').then(function(){self.afterLogin();},function(){justep.Util.hint('登录失败!', {
			'type' : 'danger'
		});});//system默认账号登录
	};

	Model.prototype.loginDialogReceive = function(event) {
		this.userName = event.data.name;
		this.beforeLogin();
		this.afterLogin();
	};

	Model.prototype.closeMainPage = function() {
		if (this.shellImpl) {
			this.closePage(mainPageKey);
			this.shellImpl.removeMainPage();
		}
	};

	Model.prototype.closeAllPage = function() {
		if (this.shellImpl) {
			this.shellImpl.closeAllOpendedPages();
		}
	};

	Model.prototype.beforeLogin = function() {
		this.clearFunctionTree();
		this.closeAllPage();

		// 登录前
		if (this.hasListener('onBeforeLogin')) {
			this.fireEvent('onBeforeLogin', {
				source : this
			});
		}
	};

	Model.prototype.showTenantName = function(tenantname) {
//		// 显示当前生效的组织
//		$(selectors.tenantname).html("");
//		$(".x-portal-changeOrg")["hide"]();
//		if (tenantname) {
//			$(".x-portal-changeOrg")["show"]();
//			$(selectors.tenantname).html("当前组织：" + tenantname);
//			return true;
//		}
//		if (!util.isSysAdmin() && !util.isContainRule("OP_NORMAL")) {
//			// var tenantName = util.getCurrentTenantName();
//			var tenantInfo = util.CURRENT_TENANT;
//			if (tenantInfo) {
//				$(".x-portal-changeOrg")["show"]();
//				$(selectors.tenantname).html("当前组织：" + tenantInfo.name);
//			} else {// 如果没创建组织，跳转到组织管理的页面
//				justep.Util.hint("当前组织不存在，请先创建组织或加入组织", {
//					type : "warning"
//				});
//				var url = location.pathname.indexOf("paas/pt/index.w") > -1 ? "$UI/SA/OPM/tenants/listActivity.w" : "$UI/SA/OPM/tenants/CTListActivity.w";
//				justep.Shell.showPage(require.toUrl(url));
//			}
//		}
	};
	// 根据token进行登录
//	Model.prototype.doLogin = function(token) {
//		var result;
//		util.sendRequest({
//			type : "POST",
//			url : "/login",
//			async : false,
//			data : {
//				token : token
//			},
//			success : function(resultData) {
//				result = {
//					flag : resultData.success,
//					msg : resultData.msg
//				};
//			}
//		});
//		return result;
//	};

	Model.prototype.afterLogin = function(token) {
		var context = this.getContext();
		//this.isDebugMode = this._cfg.isDebugMode;
		var me = this; 
		//loginResult;
		// this.fireEvent("initLoginData","CURRENT_USER");
		// this.fireEvent("initLoginData","CURRENT_TENANT");
//		if (token) {
//			// 执行登录，
//			var loginResult = this.doLogin(token);
//			if (!loginResult || loginResult.flag == false) {
//				this.showLoginDialog();
//				return false;
//			}
//		}
		// 取当前登陆者的相关信息
//		this.fireEvent("initLoginData", "CURRENT_USER");
//		this.fireEvent("initLoginData", "CURRENT_TENANT");
		// 控制开发模式刷新
		 $(selectors.reload)[this.isDebugMode ? 'show' : 'hide']();
		// 显示登陆者名称
		$(selectors.username).html(this.userName);
		// 登录后完成
		if (this.hasListener('onLogin')) {
			var eData = {
				source : this,
				context : context
			};
			this.fireEvent('onLogin', eData);
		}
		// 初始化功能树
		this.createFunctionTree().done(function(){
		
			// 加载主页面
			var loginDtdResolve = function() {
				if (me.loginDtd)
					me.loginDtd.resolve();
			};
			if (me._cfg.main.show)
				me.showPage(mainPageKey).done(loginDtdResolve);
			else
				loginDtdResolve();
			// 打开默认页
//		if (util.isContainRule("PT_NORMAL"))
////			this.showPage("/UI2/project/ptMainActivity.w");
//		this.showTenantName();
		});

	};

	Model.prototype.isFunc = function(func) {
		return !!func.url;
	};

	Model.prototype.getPages = function() {
		if (!this._pages) {
			var node = this.getPagesNode();
			if (node)
				this._pages = this.comp(node);
		}
		return this._pages;
	};

	Model.prototype.getPagesNode = function() {
		var $root = $(this.getRootNode());
		var $pages = $root.find(selectors.pages);
		if ($pages.size() > 0) {
			return $pages[0];
		}
	};

	Model.prototype._doInit = function() {
		var self = this;
		var ctx = this.getContext();
		var data = ctx.getRequestParameter("key");
		var isQuick = 'true'==sessionStorage.getItem("isQuick") || 'true'==ctx.getRequestParameter("quick");
		if (!isQuick && !data) {
			data = sessionStorage.getItem("config")||"{}";
			/*获取app相关信息
			 * {
			 * 	appPath:'',
			 *  funcs:['$UI/account/config/1.function.json','$UI/account/config/2.function.json']
			 * }
			 */
			$.ajax({
				dataType : 'json',
				url : require.toUrl("$UI/app.json"),
				async: false,
				success : function(appCfg) {
					self.appCfg = appCfg;
					if(self.appCfg && self.appCfg.appPath) sessionStorage.setItem("appPath",self.appCfg.appPath);
				}
			});
		}else{
			if(data)
				data = util.encrypt(justep.Base64.decode(data), [ 20, 54, 68, 73, 25, 11, 86, 34, 97, 33, 20, 20 ]);
			else 
				data = sessionStorage.getItem("config")||"{}";
		}

		//增加模式3部署通过.j获取配置
		$.ajax({
			dataType : 'json',
			url : require.toUrl("./server/funcs.j"),
			async: false,
			cache: false,
			success : function(funcs) {
				self.appCfg = self.appCfg || {};
				self.appCfg.funcs = funcs;
			}
		});
		
		if(isQuick) justep.Util.setGlobalValue('isQuick','true');
		this.config = data == '{}' ? {} : JSON.parse(data);// 解密
		sessionStorage.setItem("config", JSON.stringify(this.config));

		this.comp("confirmDeleteMessageDialog").$domNode.removeClass('hide');
		if (this.hasListener('onInit')) {
			var eData = {
				source : this,
				config : this._cfg
			};
			this.fireEvent('onInit', eData);
		}

		this.shellImpl = this.createShellImpl();
		this.shellImpl.on('onCallPortal', this._doCallPortal, this);
		this.shellImpl.on('onPageActive', this._doShowPage, this);
		this.shellImpl.on('onAfterPageClose', this._doClosePage, this);
	};

	Model.prototype._doCallPortal = function(event) {
		var fn = event.fn, param = event.param;
		if ($.isFunction(this[fn])) {
			event.result = this[fn].call(this, param);
		}
	};

	Model.prototype.createShellImpl = function() {
		return new ShellImpl(this, {
			contentsXid : this.getPagesNode()
		});
	};
	
//	Model.prototype.encrypt = function(str) {
//		var key = [ 20, 54, 68, 73, 25, 11, 86, 34, 97, 33, 20, 20 ];
//		str = str instanceof Object ? JSON.stringify(str) : str;
//		var ret = '', keyLen = key.length;
//		for (var i = 0; i < str.length; i++) {
//			ret += String.fromCharCode(str.charCodeAt(i) ^ key[i % keyLen]);
//		}
//		return ret;
//	};
	
	Model.prototype.modelLoad = function(event) {
		var me = this;
		window.onunload = function() {
			if (me.logined && !me.isReloadMode) {
				me._doLogout();
			}
		};

		// 如果不是IE9 , 可以设置onbeforeunload
		if (!justep.Browser.IE9) {
			window.onbeforeunload = function() {
				if (me.logined && !me.isReloadMode && !me.isDebugMode)
					return "退出会导致未保存的数据丢失?";
			};
		}

//		var name = getParameter("username");
//		var password = getParameter("password");
//		var token = getParameter("token");
//		if (password)
//			password = password.toUpperCase();// 大写MD5
//		var isDirectLogin = (name && password) || token;
//		if (this.logined || isDirectLogin) {
//			if (this.loadPortalContext(name, password)) {
//				// 隐藏密码和用户名
//				var newUrl = (location.origin ? location.origin : (location.protocol + "//" + location.host)) + window.location.pathname;
//				var search = window.location.search || "";
//				if (search) {
//					var a = [];
//					search = search.substring(1);
//					search = search.split("&");
//					for (var i = 0; i < search.length; i++) {
//						var s = search[i];
//						if (s.toLowerCase().indexOf("password=") == -1 && s.toLowerCase().indexOf("username=") == -1) {
//							a.push(s);
//						}
//					}
//					search = "";
//					if (a.length > 0)
//						search = "?" + a.join("&");
//				}
//				newUrl += search;
//				newUrl += window.location.hash;
//				window.history.replaceState(null, null, newUrl);
//
//				this.afterLogin(token);
//			} else
//				this.showLoginDialog();
//		} else {
//			this.showLoginDialog();
//		}
		this.showLoginDialog();
	};

	Model.prototype.loadPortalContext = function(name, password) {
		this.userName = name;
		return true;
	};

	/*
	function getParameter(name) {
		var search = window.location.search;
		var params = {};
		search = search ? search : "";

		if (search.charAt(0) == "?") {
			search = search.substring(1);
		}
		search = decodeURIComponent(search);
		var items = search.split("&");
		for (var i = 0; i < items.length; i++) {
			var item = items[i];
			var index = item.indexOf("=");
			if (item && (index != -1)) {
				var key = item.substring(0, index), value = decodeURIComponent(item.substring(index + 1));
				if (key.indexOf('.') == '-1')
					params[key] = value;
				else {
					key = key.split('.');
					var obj = params[key[0]] = params[key[0]] || {};
					for (var j = 1; j < key.length - 1; j++) {
						obj = obj[key[j]] = obj[key[j]] || {};
					}
					obj[key.pop()] = value;
				}
			}
		}
		return params[name];
	}
	*/

	Model.prototype.modelModelConstruct = function(event) {
		this._doInit();
		this._doBind();
	};

	// 写首页的事件
//	Model.prototype.mainBtn = function(event) {
//		justep.Shell.showMainPage();
//	};

	return Model;
});
