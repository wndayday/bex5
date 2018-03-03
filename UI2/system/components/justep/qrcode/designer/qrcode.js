define(function(require) {
	var $ = require("jquery");
	var Util = require("$UI/system/components/justep/common/designer/common");
	var xuiService = require("$UI/system/components/designerCommon/js/xuiService");
	                                            //引入设计时w页面模型操作服务类
	var xuiDoc = xuiService.getXuiDoc();
	var QRCode = require("../qrcode");                    //引入运行时的相关组件类
	
	var _QRCode = QRCode.extend({                       //创建类
		init : function(value, bindingContext) { 
            //重载运行时的init方法，主要做一些设计时需要的额外处理
			this.callParent(value, bindingContext);            //调用父的init方法
			var cfg = Util.attr2js(this.$domNode, [ 'bind-content','colorDark','colorLight' ]);   //读取DOM中的属性值
			if (cfg)
				this.set(cfg);                                   //设置组件JS类的属性
			if(this.content == null || this.content == ""){
				this.content = "123";
				this.refresh();
			}
		},
		propertyChangedHandler : function(key, oldVal, value) {
			switch (key) {
			default:
				this.callParent(key, oldVal, value);
			}
		}
	});

	var quickIdeEx = {
			"$UI/system/components/justep/qrcode/qrcode":{
				properties:["xid","bind-content",
				            {name:"colorDark",editor : "colorEditorNew"},
				            {name:"colorLight",editor : "colorEditorNew"}],
				styleConfig:function(designer){
					return [
						    designer.getCommonStyleItem('baseStyle'),
						    designer.getCommonStyleItem('position')
						];
				}
			}
	};

	return {
		'$UI/system/components/justep/qrcode/qrcode': _QRCode,quickIdeEx:quickIdeEx
	};
});
