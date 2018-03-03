/*! 
* WeX5 v3 (http://www.justep.com) 
* Copyright 2015 Justep, Inc.
* Licensed under Apache License, Version 2.0 (http://www.apache.org/licenses/LICENSE-2.0) 
*/ 
define(function(require) {
	require("$UI/system/components/justep/common/res");
	require('css!./css/messageDialog').load();

	var $ = require("jquery");
	var justep = require("$UI/system/lib/justep");
	
	var ComponentConfig = require("./messageDialog.config");
	var url = require.normalizeName("./messageDialog");
	var layerManager = require("$UI/system/lib/base/layerManager");
	
	var okLabel = (new justep.Message(justep.Message.JUSTEP231079)).getMessage();
	var cancelLabel = (new justep.Message(justep.Message.JUSTEP231080)).getMessage();
	var yesLabel = (new justep.Message(justep.Message.JUSTEP231081)).getMessage();
	var noLabel = (new justep.Message(justep.Message.JUSTEP231082)).getMessage();
	
	
	var MsgDialog = null;
	MsgDialog = justep.BindComponent
			.extend({
				getConfig : function() {
					return ComponentConfig;
				},
				constructor : function(options) {
					this.callParent(options);
					this.type = MsgDialog.type.OK;
					this.title = '';
					this.message = '';
					this.inputValue = null;
					this.width = '';
					this.height = '';
				},
				dispose : function() {
					this.callParent();
				},
				doInit : function(value, bindingContext) {
					this._getButtonsNode().on('click', this._doClick.bind(this));
					this._getInputNode().on('change', this._doInputChange.bind(this));
				},
				buildTemplate : function(cfg) {
					if (!cfg)
						cfg = {};
					if (!cfg.type)
						cfg.type = MsgDialog.type.OK;
					this.set(cfg);
					return '<span component="' + url + '" type="' + cfg.type + '">' + '<div class="x-modal-overlay"></div>' + '<div class="x-modal">'
							+ '<div class="x-modal-inner">' + '<div class="x-modal-title">' + cfg.title + '</div>' + '<div class="x-modal-text">'
							+ cfg.message + '</div>' + '<input type="text" class="x-modal-prompt-input">' + '</div>'
							+ '<div class="x-modal-buttons">' + '<a class="x-modal-button x-modal-button-bold OK" value="ok">' + okLabel + '</a>'
							+ '<a class="x-modal-button x-modal-button-bold Yes" value="yes">' + yesLabel + '</a>'
							+ '<a class="x-modal-button x-modal-button-bold No" value="no">' + noLabel + '</a>'
							+ '<a class="x-modal-button x-modal-button-bold Cancel" value="cancel">' + cancelLabel + '</a>' + '</div>' + '</div>'
							+ '</span>';
				},
				propertyChangedHandler : function(key, oldVal, value) {
					switch (key) {
					case "title":
						if (oldVal != value && this._inited) {
							this._getTitleNode().text(value);
						}
						break;
					case "message":
						if (oldVal != value && this._inited) {
							var msg = value?(""+value).replace(/\n/g, "<br/>"):'';
							this._getTextNode().html(msg);
						}
						break;
					case "inputValue":
						if (oldVal != value && this._inited) {
							var inputVal = (value!==null&&value!==undefined)?value:'';
							this._getInputNode().val(inputVal);
						}
						break;
					default:
						this.callParent(key, oldVal, value);
					}
				},
				_getDialogNode : function() {
					return this.$domNode.find('div.x-modal');
				},
				_getOverlayNode : function() {
					return this.$domNode.find('div.x-modal-overlay');
				},
				_getTitleNode : function() {
					return this.$domNode.find('div.x-modal-title');
				},
				_getTextNode : function() {
					return this.$domNode.find('div.x-modal-text');
				},
				_getButtonsNode : function() {
					return this.$domNode.find('div.x-modal-buttons');
				},
				_getInputNode : function() {
					return this.$domNode.find('input.x-modal-prompt-input');
				},
				_doInputChange : function(){
					this.inputValue = this._getInputNode().val();
				},
				_doClick : function(event) {
					this._getDialogNode().removeClass('x-modal-in').hide();
					this._getOverlayNode().removeClass('x-modal-overlay-visible');
					justep.Util.enableTouchMove(document.body);
					var evtData = {
						source : this,
						button : $(event.target).attr('value')
					};
					if (MsgDialog.type.Prompt == this.type && evtData.button == 'ok')
						evtData['input'] = this._getInputNode().val();
					this.fireEvent('onClose', evtData);
					layerManager.removeLayerIndex(this._getDialogNode());
					if('function'===typeof(this.callback))
						this.callback(evtData);
					switch (evtData.button) {
					case 'ok':
						this.fireEvent('onOK', evtData);
						break;
					case 'cancel':
						this.fireEvent('onCancel', evtData);
						break;
					case 'yes':
						this.fireEvent('onYes', evtData);
						break;
					case 'no':
						this.fireEvent('onNo', evtData);
						break;
					}
				},
				show : function(param) {
					param = param || {};
					this.callback = null;
					if('function'===typeof(param.callback))
						this.callback = param.callback;
					this.set(param);
					var $dlg = this._getDialogNode();
					if (this.height !== '')
						$dlg.height(this.height);
					var css = {
						marginTop : -$dlg.outerHeight() / 2 + 'px'
					};
					if (this.width !== '') {
						$dlg.width(this.width);
						css['marginLeft'] = -$dlg.outerWidth() / 2 + 'px';
					}
					$dlg.css(css);
					justep.Util.disableTouchMove(document.body);
					this._getOverlayNode().addClass('x-modal-overlay-visible');
					$dlg.show().addClass('x-modal-in');
					layerManager.setLayerIndex($dlg);
				}
			});

	MsgDialog.type = {
		OK : 'OK',
		OKCancel : 'OKCancel',
		YesNo : 'YesNo',
		YesNoCancel : 'YesNoCancel',
		Prompt : 'Prompt'
	};

	MsgDialog.result = {
		ok : 'ok',
		cancel : 'cancel',
		yes : 'yes',
		no : 'no'
	};

	justep.Component.addOperations(MsgDialog, {
		show : {
			label : "",
			method : function(args) {
				return this.owner.show(args.option);
			}
		}
	});
	
	justep.Component.register(url, MsgDialog);
	return MsgDialog;
});