define(function(require) {
	require("$UI/system/components/justep/common/res");  //加载公共资源
	var $ = require("jquery");                              //引入jquery
	var justep = require("$UI/system/lib/justep");            //引入justep工具类
	var url = require.normalizeName("./qrcode");               //获得组件的绝对路径
	var ComponentConfig = require("./qrcode.config");          //加载组件运行时配置文件
	require("./js/qrcode.min"); 

	var QRCodeComp= justep.BindComponent.extend({               //创建组件，继承自BindComponent
		constructor : function(options) {                    //构造方法
			this.callParent(options);                       //调用父类的构造方法
			this.content = "";
			this.colorDark = "black";
			this.colorLight = "white";
		},
		doInit : function(value, bindingContext, allBindings) {
		},
		getConfig : function() {                           //获取组件配置文件
			return ComponentConfig;
		},
		dispose : function() {       //组件销毁时调用的方法，可以接管加入自定义的处理， 
			this.callParent();       //如事件解除绑定，dom节点与对象直接解绑等
		},
		refresh : function() {
			if(this.qrcode)
				$(this.qrcode._el).empty();
			if(this.content){
				this.qrcode = new QRCode(this.domNode, {
					width: this.$domNode.width(),
					height: this.$domNode.height(),
					colorDark: this.colorDark,  
					colorLight: this.colorLight,
					text: this.content
				});
				$("img",this.$domNode).css("width","100%");
				$("img",this.$domNode).css("height","100%");
			}
		},
    	doUpdate: function(value, bindingContext, allBindings){
    		this.content = value?value.content : null;
    		console.log(this.content);
			if(this.content)
				this.refresh();
        	this.callParent(value, bindingContext, allBindings);
		},
		propertyChangedHandler : function(key, oldVal, value) {   //属性发生改变时触发的方法
			switch (key) {                      //主要是处理一些根据属性值更新界面的操作
			case "colorDark":
			case "colorLight":
				if(oldVal != value)
					this.refresh();
			default:
				this.callParent(key, oldVal, value);
			}
		}
	});
	justep.Component.register(url, QRCodeComp);      //注册组件
	return QRCodeComp;                           //返回组件类
});
