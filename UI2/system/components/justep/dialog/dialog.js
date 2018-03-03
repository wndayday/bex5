/*! 
* WeX5 v3 (http://www.justep.com) 
* Copyright 2015 Justep, Inc.
* Licensed under Apache License, Version 2.0 (http://www.apache.org/licenses/LICENSE-2.0) 
*/ 
define(function(require) {
	require("$UI/system/components/justep/common/res");
	require('css!./css/dialog').load();
	var layerManager = require("$UI/system/lib/base/layerManager");

	var $ = require("jquery");
	
	var justep = require("$UI/system/lib/justep");

	var url = require.normalizeName("./dialog");
	var ComponentConfig = require("./dialog.config");

	var Dialog = justep.BindComponent.extend({
		getConfig : function() {
			return ComponentConfig;
		},
		constructor : function(options) {
			this.callParent(options);
			this.showTitle = false;
			this.title = '';
			this.status = 'maximize';
			this.opened = false;
			this.width = '80%';
			this.height = '80%';
			this.resizable = false;
			this.top = null;
			this.left = null;
			this.routable = false;
		},
		dispose : function() {
			if(justep.Browser.isIOS)justep.Util.fixedIosPanel(this.domNode,false);
			$(window).off('resize', this.__resizeHandle);
			this.callParent();
		},
		doInit : function(value, bindingContext) {
			//创建可以改变大小的bar
			this._createResizeBar();
		    //屏蔽鼠标滚轮
			var self = this;
			this.$domNode.on('mousewheel',function(e){
				if(self.opened) e.stopPropagation();
			});
			
			this._getTitleNode().mousedown(function(evt){
				self._dragStart(evt);
			});
			this.__dragMoveHandle = this._dragMove.bind(this);
			this.__dragEndHandle = this._dragEnd.bind(this);
			this.__closeHandle = this.close.bind(this);
			this.__resizeHandle = this.doResize.bind(this);
			this.$domNode.mousemove(this.__dragMoveHandle).mouseup(this.__dragEndHandle).find('.x-dialog-title:first > button.close').on('click',this.__closeHandle);
			$(window).on('resize', this.__resizeHandle);
		},
		_createResizeBar : function(){
			var $dialogNode = this._getDialogNode();
			$dialogNode.append('<div class="x-resizeBar x-resizeBar-right"/><div class="x-resizeBar x-resizeBar-bottom"/>');
			var self = this;
			//绑定改变大小事件
			$dialogNode.children('.x-resizeBar')[this.resizable?'removeClass':'addClass']('hide').mousedown(function(evt){
				self._resizeStart(evt);
			});
			this.__resizeMoveHandle = this._resizeMove.bind(this);
			this.__resizeEndHandle = this._resizeEnd.bind(this);
			this.$domNode.mousemove(this.__resizeMoveHandle).mouseup(this.__resizeEndHandle);
		},
		_resizeStart: function(evt){
			var target = evt.target,$target=$(target);
			if($target.is('.x-resizeBar-right')){
				this._resizing = true;
				this.$domNode.addClass('x-dialog-resize-v');
				this._createDragContext(evt);
				this._dragContext.resizeType = 'right';
			}else if($target.is('.x-resizeBar-bottom')){
				this._resizing = true;
				this.$domNode.addClass('x-dialog-resize-h');
				this._createDragContext(evt);
				this._dragContext.resizeType = 'bottom';
			}
		},
		_createDragContext: function(evt){
			var $dlgNode = this._getDialogNode();
			this._dragContext = {
					onselectstart:document.onselectstart,
					x: evt.clientX,
					y: evt.clientY,
					dlg: $dlgNode.offset(),
					height: $dlgNode.innerHeight(),
					width: $dlgNode.innerWidth()
				};
			document.onselectstart=function(){return false;};
		},
		_clsDragContext: function(){
			if(this._dragContext)
				document.onselectstart=this._dragContext.onselectstart;
			this._dragContext = null;
		},
		_resizeMove: function(evt){
			if(this._resizing && this.resizable && this._dragContext){
				var v,name;
				if(this._dragContext.resizeType=='bottom'){
					v = evt.clientY - this._dragContext.y + this._dragContext.height;
					name = 'height';
				}else{
					v = evt.clientX - this._dragContext.x + this._dragContext.width;
					name = 'width';
				}
				this._getDialogNode().css(name,v);
				this._resized = true;
			}
		},
		_resizeEnd: function(evt){
			this.$domNode.removeClass('x-dialog-resize-h').removeClass('x-dialog-resize-v');
			this._resizing = false;
			this._clsDragContext();
		},
		_dragStart: function(evt){
			if (this._canMove()){
				var target = evt.target;
				if(!$(target).is('button.close') && !$(target).parent().is('button.close')){
					this.$domNode.addClass('x-dialog-drag');
					this._moving = true;
					this._createDragContext(evt);
				}
			}
		},
		_canMove: function(){
			return this.status != 'maximize';
		},
		_dragMove: function(evt){
			if(this._moving && this._dragContext){
				var left = evt.clientX - this._dragContext.x + this._dragContext.dlg.left;
				var top = evt.clientY - this._dragContext.y + this._dragContext.dlg.top;
				this._getDialogNode().offset({top:top,left:left});
				this._moved = true;
			}
		},
		_dragEnd: function(evt){
			this.$domNode.removeClass('x-dialog-drag');
			this._moving = false;
			this._clsDragContext();
		},
		doRoute : function(name,param,routeState){
			if(!this.routable){
				return;
			}
			if(name === ""){
				if(routeState == "enter"){
					this.open();
				}else if(routeState == "leave"){
					this.close();
				}
			}
		},
		addRouteItem : function(type){
			if(!this.routable){
				return;
			}
			var $routeState = this.getModel().$routeState;
			var xid = this.$domNode.attr('xid');
			if(type == 'open'){
				$routeState.addState(xid,'','');
				$routeState.publishState();
			}else if(type == 'close'){
				$routeState.removeState(xid,'','');
				$routeState.publishState(true);
			}
		},
		
		doResize : function() {
			if (this.opened) {
				this.render();
			}
		},
		buildTemplate : function(cfg) {
			if (!cfg)
				cfg = {};
			var xid = cfg.xid || justep.UUID.createUUID(); 
			this.set(cfg);
			return $('<span xid="' + xid + '" component="' + url + '">' + '<div class="x-dialog-overlay">' + '</div>'
					+ '<div class="x-dialog" style="display:none;" showTitle="' + !!cfg.showTitle + '">' + '<div class="x-dialog-title">' 
					+ '<button type="button" class="close"><span>×</span></button>' 
					+ '<h4 class="x-dialog-title-text">' + (cfg.title ? cfg.title : '')	+ '</h4>' 
					+ '</div>' + '<div class="x-dialog-body">' + (cfg.content ? cfg.content : '')
					+ '</div>' + '</div>' + '</span>');
		},
		propertyChangedHandler : function(key, oldVal, value) {
			switch (key) {
			case "showTitle":
				if(this._inited)
					this._getDialogNode()[value?'attr':'removeAttr']('showTitle','true');
				break;
			case "title":
				if (oldVal != value && this._inited) {
					this._getTitleTextNode().text(value);
				}
				break;
			case "resizable":
				if (oldVal != value && this._inited) {
					this._getDialogNode().children('.children')[value?'removeClass':'addClass']('hide');
				}
				break;
			case "status":
			case "width":
			case "height":
				if (oldVal != value) {
					this.needRender = this._inited;
				}
				break;
			default:
				this.callParent(key, oldVal, value);
			}
		},
		_getDialogNode : function() {
			return this.$domNode.find('div.x-dialog:first');
		},
		_getOverlayNode : function() {
			return this.$domNode.find('div.x-dialog-overlay:first');
		},
		_getTitleTextNode : function() {
			return this.$domNode.find('.x-dialog-title-text:first');
		},
		_getTitleNode : function() {
			return this.$domNode.find('.x-dialog-title:first');
		},
		_getBodyNode : function() {
			return this.$domNode.find('.x-dialog-body:first');
		},
		close : function() {
			this._getDialogNode().removeClass('x-dialog-in').hide();
			this._getOverlayNode().removeClass('x-dialog-overlay-visible');
			// justep.Util.enableTouchMove(document.body);
			$('body').removeClass('x-dialog-body-overflow-hidden');
			if(justep.Browser.isIOS)justep.Util.fixedIosPanel(this.domNode,false);
			this.opened = false;
			layerManager.removeLayerIndex(this._getDialogNode());
			this.fireEvent('onClose', {
				source : this
			});
			this.addRouteItem("close");
			
		},
		setContent: function(content){
			this._getBodyNode().html(content);
		},
		render : function() {
			this.callParent();
			var $w = $(window);
			var fillCss = {
				height : $w.height(),
				width : $w.width()
			};
			var normalCss = {
				height : this.height,
				width : this.width
			};
			this._getOverlayNode().css(fillCss);
			if(!this._resized){
				var $dlg = this._getDialogNode();
				if(this.status === 'maximize')
					$dlg.css(fillCss).removeClass('x-dialog-normal');
				else
					$dlg.css(normalCss).addClass('x-dialog-normal');
			}
			if(this.opened) this._setDialogTopLeft();
		},
		_setDialogTopLeft: function(){
			if(this._moved) return;//如果已经手工拖拽过，不再计算位置 
			var $w = $(window);
			var $dlg = this._getDialogNode();
			var dlgH = $dlg.outerHeight(), winH = $w.height(), dlgW = $dlg.outerWidth(), winW = $w.width();
			var mTop = (this.top === null)?(dlgH>=winH?10:(winH-dlgH)/2):this.top;
			var mLeft = (this.left === null)?(dlgW>=winW?0:(winW-dlgW)/2):this.left;
			if(this.status === 'maximize'){
				mTop = 0;
				mLeft = 0;
			}
			$dlg.css({'top':mTop,'left':mLeft});
		},
		open : function(option) {
			// lzg 暂时屏蔽,影响较大
			// justep.Util.disableTouchMove(document.body);
			if(justep.Browser.isMobile){
				//hcr. 解决在对话框中调用showPage时页面不出滚动条的问题: 只有mobile时, 才加此样式 
				$('body').addClass('x-dialog-body-overflow-hidden');
			}
			var $dlg = this._getDialogNode();
			this._getOverlayNode().addClass('x-dialog-overlay-visible');
			this.render();
			$dlg.show().addClass('x-dialog-in');
			this._setDialogTopLeft();//需要显示后才能计算出高度
			if(justep.Browser.isIOS)justep.Util.fixedIosPanel(this.domNode,true);
			this.addRouteItem('open',option);
			this.opened = true;
			this.fireEvent('onOpen', {
				source : this
			});
			layerManager.setLayerIndex($dlg);
		}
	});

	justep.Component.addOperations(Dialog, {
		open : {
			label : "",
			method : function(args) {
				return this.owner.open();
			}
		},
		close : {
			label : "",
			method : function(args) {
				return this.owner.close();
			}
		}
	});

	justep.Component.register(url, Dialog);
	return Dialog;
});