define(function(require){
	require("$UI/system/resources/system.res");	
	var defaultTheme = "skin-blue";

	require("css!./lib/font-awesome/4.6.3/css/font-awesome.min").load();
	require("css!./lib/ionicons/2.0.1/css/ionicons.min").load();
	require("css!$UI/system/components/bootstrap/lib/css/bootstrap").load();
	require("css!./AdminLTE/css/AdminLTE.min").load();
	require("css!./AdminLTE/css/skins/_all-skins.min").load();
	
	require("$UI/system/components/bootstrap/lib/js/bootstrap");
	require("./plugins/slimScroll/jquery.slimscroll.min");
	require("./AdminLTE/js/app");
	require("./AdminLTE/js/setting");
	
	var $ = require("jquery");
	var justep = require("$UI/system/lib/justep");
	
	var defaultAvatar = require.toUrl("./AdminLTE/img/avatar.png");
	
	var Model = function(){
		this.callParent();
		
		//修改主页，初始化门户
		this.on('onInit', function(event) {
			event.config.isDebugMode = true;//开发模式
			event.config.needLogin =false;
			event.config.main.url = '$UI/portal/sample-pc3/base/main/main.w';
		});
		
		//登录前清理相关
		this.on('onBeforeLogin', this.doBeforeLogin);
		//登录成功后加载展现
		this.on('onLogin', this.doAfterLogin);

		//功能激活，设置title和菜单
		this.on('onShowPage', this.doActivePage);
		//功能关闭，清理菜单
		this.on('onClosePage', this.doClosePage);

		//加载功能树
		this.on('onLoadFunctionTree', this.doCreateFunctionTree);
		//清理功能树
		this.on('onClearFunctionTree', this.clearFuncTree);
		/*
		//加载代理
		this.on('onLoadAgent', this.doLoadAgent);
		*/
	};

	Model.prototype.initTheme = function(){
		//TODO 设置默认皮肤
		$('body').addClass(defaultTheme);
	};
	
	Model.prototype.doActivePage = function(event){
		//event.pageID, event.title, event.isMainPage
		this.setTitle(event.title);
		
		//设置x-full-screen
		var value = $(".content>.x-contents").css("min-height");
		if(/px$/.test(value)){
			$(".window.x-full-screen").height(value);
		}
		
		if(!event.isMainPage){
			$(this.comp("closeFuncBtn").domNode).show();
			if(event.first){
			/*
          <li>
            <a href="javascript:void(0)">
              <i class="menu-icon fa fa-birthday-cake bg-red"></i>

              <div class="menu-info">
                <h4 class="control-sidebar-subheading">Langdon's Birthday</h4>

                <p>Will be 23 on April 24th</p>
              </div>
            </a>
          </li>
			*/
				var colors = ['bg-red','bg-yellow','bg-light-blue','bg-green','bg-teal'];
				var icons = ['fa fa-hourglass-o','fa fa-hourglass-o','fa fa-hourglass-o','fa fa-hourglass-o','fa fa-hourglass-o'];
				var size = $('#control-sidebar-func-tab .functionOpenedList li').length,i=size % colors.length;				
			
				var html = justep.String.format('<li><a data-pid="{0}"><i class="menu-icon '+icons[i]+' '+colors[i]+'"></i><div class="menu-info"><h4 class="control-sidebar-subheading">{1}</h4></div></a></li>', event.pageID, event.title);
				this.addNode($('#control-sidebar-func-tab .functionOpenedList')[0], $(html)[0]);
				size++;
				$('#control-sidebar-func-tab .functionOpenedCount').html(size);
			}
		}else $(this.comp("closeFuncBtn").domNode).hide();	
	};
	
	Model.prototype.doClosePage = function(event){
		$('#control-sidebar-func-tab .functionOpenedList > li > a').each(function(){
			if($(this).data('pid') == event.pageID) $(this).parent().remove();
		});
		var size = $('#control-sidebar-func-tab .functionOpenedList li').length;
		$('#control-sidebar-func-tab .functionOpenedCount').html(size);
	};
		
	Model.prototype.setTitle = function(value){
		value = value || "";
		$('.content-header > h1').html(value);
	};	
	
	Model.prototype.doCreateFunctionTree = function(event){
		var funcs = event.funcs,
			$content = $(".sidebar-menu"),
			html = [],
			me = this;
	
		function printTree(children, isFirst){
			if(!children || !children.length) return;
			for(var i=0; i<children.length; i++){
				var child = children[i];
				var hasChildren = child.$children && child.$children.length > 0;
				console.log(hasChildren);
				console.log(children);
				html.push('<li class="');
				if(hasChildren)
					html.push(' treeview');
				if(child.psmCount > 1)
					html.push(' psm');
				html.push('">');
				html.push('<a ');
				if(child.url){
					html.push('title="', child.label, '" ');
					html.push('pageKey="', child.pageKey, '" ');
				}
				html.push('>');
				
				if(child.iconClass){
					html.push('<i class="x-functree-icon ' + child.iconClass + '"/>');
				}else if(hasChildren){
					console.log(child);	
					if(child.label=="表格案例"){
						html.push('<i class="x-functree-icon glyphicon glyphicon-th"/>');
					}else if(child.label=="表单案例"){
						html.push('<i class="x-functree-icon glyphicon glyphicon-list-alt"/>');
					}else if(child.label=="文本案例"){
						html.push('<i class="x-functree-icon glyphicon glyphicon-file"/>');
					}else if(child.label=="列表案例"){
						html.push('<i class="x-functree-icon glyphicon glyphicon-align-left"/>');
					}else if(child.label=="表单元素案例"){
						html.push('<i class="x-functree-icon glyphicon glyphicon-th-large"/>');
					}else if(child.label=="导航案例"){
						html.push('<i class="x-functree-icon glyphicon glyphicon-menu-right"/>');
					}else{
						html.push('<i class="x-functree-icon glyphicon glyphicon-duplicate"/>');
					};
				}else{
					html.push('<i class="x-functree-icon fa fa-circle-o"/>');
				}
				
				
//				html.push('<i class="x-functree-icon ' + (child.iconClass||(hasChildren?'fa fa-folder':'fa fa-circle-o')) + '"/>');
				if(isFirst){
					html.push('<span class="title">');
				}
				html.push(child.label);
				if(isFirst){
					html.push('</span>');
					/*
					html.push('<span class="selected"></span>');
					 */
				}
				if(hasChildren){
					html.push('<span class="pull-right-container"><i class="fa fa-angle-left pull-right"></i></span>');
				}
				if(child.psmCount > 1){
					html.push('<span class="psm icon-person-stalker pull-right-container"></span>');
				}
				html.push('</a>');
				if(hasChildren){
					html.push('<ul class="treeview-menu">');
					printTree(child.$children);
					html.push('</ul>');
				}
				html.push('</li>');
			}
		}
		
		printTree(funcs, true);
		
		html = html.join('');
		
		$content.append(html);
		//设置main的显示名
		$content.find('li>.x-portal-showMain>.title').html(this._cfg.main.title);
		var me = this;
	    $('li>a', $content).click(function(){
	    	var el = $(this),pageKey=el.attr('pageKey');
	    	if(pageKey){
	    		$(".func-open", $content).removeClass("func-open");
	    		el.parent().addClass("func-open");
	    		me.showPage(pageKey);
	    	}
	    });
	    $('li>a>.psm', $content).click(function(){
	    	var p = $(this).parent(),pageKey=p.attr('pageKey');
	    	if(pageKey){
	    		me.selectExecutorShowPage(pageKey);
	    	}
	    	return false;
	    });
	};

	Model.prototype.clearFuncTree = function(){
		$(".sidebar-menu>li").each(function(index, item){
			if(index>1) $(item).remove();
		});
	};

	Model.prototype.doBeforeLogin = function(){
		//TODO 登录前初始化,清除人员相关
	};
	
	Model.prototype.doLoadAgent = function(event){
		//初始化代理
		var agents = event.agents;
		var html = [];
		for(var i=0; i<agents.length; i++){
			var agent = agents[i];
			var s = justep.String.format('<li><a data-executor="{0}">{1}</a></li>', agent.id, agent.name);
			html.push(s);
		}
		$('#portal-agent .dropdown-menu').append(html.join(''));
		var me = this;
		$("#portal-agent").click(function(e){
			var executor = $(e.target).data("executor");
			executor && me.openAgent(executor);
		});
	};
	
	Model.prototype.doAfterLogin = function(event){
		/*
		var context = event.context;
		this.customizer = new Customizer(context.data.layout, context, !this.isAgent);
		 */
		this.initTheme();
		$(".wrapper").show();//显示主页
		$.AdminLTE.layout.fix();//刺激重新计算fixed
		this.loginDatetime = new Date();//记录登录时间
		this.initPerson();
	};
	
	Model.prototype.initPerson = function(){
		var pid = "system"//this.getContext().getCurrentPersonID();
		var orgFName = "system"//this.getContext().getCurrentOrgFName();
		var loginDate = justep.Date.toString(this.loginDatetime, 'yyyy-MM-dd hh:mm');
		var personAvatar = getPersonAvatar(pid,this.loginDatetime.getTime());
		$('img.x-person-avatar').one('error',function(){
			$(this).attr('src', defaultAvatar);
		}).attr('src', personAvatar);
		$('.x-login-datetime').text(loginDate);
		$('.x-person-info').html(justep.String.format('<div>组织:{0}</div><div>登录时间:{1}</div>', orgFName, loginDate));
	};
	
	Model.prototype.initPortal = function(event){
		$("body").addClass('sidebar-mini');
		
		//已打开功能处理
		var me = this;		
		$(".functionOpened").on('click','a',function(event){
			if($(event.currentTarget).hasClass('opened-close')){
				me.closePage($(event.currentTarget).parent().data('pid'));
			}else if($(event.currentTarget).hasClass('closeAll')){
				me.closeAllPage();
			}else{
				var pid = $(event.currentTarget).data('pid');
				if(pid) me.showPage(pid);
			}
		});
		
		//兼容平板设备
		$(".dropdown-toggle[data-hover=dropdown]").click(function(){
			$(this).parent().addClass("open");
		})
	};
	
	Model.prototype.initExecutor = function(){
		if(this.isAgent){
			this.comp("configBtn").$domNode.hide();
			this.comp("changPasswordBtn").$domNode.hide();
			$(".user-divider").hide();
			this.comp("logoutBtn").set("label","关闭");
		}
	};
	
	Model.prototype.closeFuncBtnClick = function(event){
		if(this.current) this.closePage(this.current);
	};

	Model.prototype.configBtnClick = function(event){
		this.comp("configDialog").open();
	};
	
	var getPersonAvatar = function(personID,lastModified){
		var params = {
				process : '/SA/OPM/system/systemProcess',
				activity : 'mainActivity',
				action : 'blobDownloadAction',
				blobDataModel : '/system/data',
				blobConcept : 'SA_OPPerson',
				blobRelation : 'sPhoto',
				blobConceptValue : personID,
				$lastModified : lastModified
		};
		var url = new justep.URL(require.toUrl("$UI/system/components/justep/blob/server/download.j"));
		url.setParam(params);
		return url.toString();
	};	
	
	//解决IE9+, 下href="javascript:..."引起onbeforeunload执行的问题
	$(document).click(function(event){
		if(event.target && event.target.tagName.toLowerCase() == 'a'){
			var href = $(event.target).attr("href");
			if(href && href.indexOf("javascript:") == 0)
				return false;
		}
	});
	
	return Model;
});