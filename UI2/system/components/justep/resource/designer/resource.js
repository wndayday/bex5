define(function(require){
	var $ = require("jquery"),
	ViewComponent = require("$UI/system/lib/base/viewComponent");
    var xuiService = require("$UI/system/components/designerCommon/js/xuiService");
	var xuiDoc = xuiService.getXuiDoc();
	var fileSelectorUrl  = "$UI/system/designer/webIde/editors/fileSelector/fileSelector.w";
	
	var loadCss = function(cssItems){
		var values = cssItems.split(",");
		for(var i = 0;i<values.length;i+=1){
			var item = values[i];
			require([item],function(a){
				a.load();
			});	
		}			
	}
	
	var Resource = ViewComponent.extend({
		init: function(value, bindingContext){
			this.callParent(value, bindingContext);
			this.$domNode = $(this.domNode);
			this.$domNode.hide();
		},

		getResource:function(){
	 
			return this.$domNode[0];
		},
		
		/**添加js引用*/
		addJS:function(event){
			var resouce = this.getResource();
			xuiService.openPage(fileSelectorUrl, {
				title : "js文件选择",
				width:480,
				extName:"js"
			}, function(result) {
				var value = result.value;
				if(value){
					var idx = value.lastIndexOf(".");
					if("js" != value.substring(idx+1)){
						alert("必须选择一个js文件");
						return;
					}
					value = value.substring(0,idx);
					var templateContent = '<require   url="'+value+'"></require>';
					xuiDoc.createComponent("$/UI2/system/components/justep/resource#require",resouce.getAttribute("d_id"),{templateContent:templateContent,paintComponent:true});
				}
			});
		},

		/**添加css引用*/
		addCSS:function(event){
			var resouce = this.getResource();
			xuiService.openPage(fileSelectorUrl, {
				title : "css文件选择",
				width:480,
				extName:"css"
			}, function(result) {
				var value = result.value;
				if(value){
					var idx = value.lastIndexOf(".");
					if("css" != value.substring(idx+1)){
						alert("必须选择一个css文件");
						return;
					}
					value = value.substring(0,idx);
					var templateContent = '<require   url="css!'+value+'"></require>';
					xuiDoc.createComponent("$/UI2/system/components/justep/resource#require",resouce.getAttribute("d_id"),{templateContent:templateContent,paintComponent:true});
				}
			});
		},
		
		/**添加Cordova 插件引用*/
		addCordovaPlugin:function(){
			var resouce = this.getResource();
			xuiService.openPage("$UI/system/components/justep/resource/designer/selectCordovaPlugins.w", {
				title : "cordova插件选择"
			}, function(result) {
				var values = result; 
				if(values){
					values = values.split(",");
					var configs = [];
					for(var i = 0;i<values.length;i+=1){
						var templateContent = '<require   url="cordova!'+values[i]+'"></require>';
						xuiDoc.createComponent("$/UI2/system/components/justep/resource#require",resouce.getAttribute("d_id"),{templateContent:templateContent,paintComponent:true});
					}
				}
			});			
		},
		
		/**添加w文件引用*/
		addWFileRef:function(){
			var resouce = this.getResource();
			xuiService.openPage(fileSelectorUrl, {
				title : "w文件选择",
				width:480,
				extName:"w,html"
			}, function(result) {
				var value = result.value;
				if(value){
					var idx = value.lastIndexOf(".");
					if("w" != value.substring(idx+1) && "html" != value.substring(idx+1)){
						alert("必须选择一个w文件");
						return;
					}
					value = value.substring(0,idx);
					var templateContent = '<require   url="w!'+value+'"></require>';
					xuiDoc.createComponent("$/UI2/system/components/justep/resource#require",resouce.getAttribute("d_id"),{templateContent:templateContent,paintComponent:true});
				}
			});
		}
		
	});
	
	var Require = ViewComponent.extend({
		init: function(value, bindingContext){
			this.callParent(value, bindingContext);
			this.$domNode = $(this.domNode);
			this.$domNode.hide(); 
			var url = this.$domNode.attr("url");
			this.set({url:url});
		},
        set: function(values){ 
        	if('url' in values){
        		var url = values['url'];
        		if(url && url.indexOf("css!") !=-1){
        			loadCss(url)
        		}
        	}
        }
		
	});
	
	return {'$/UI2/system/components/justep/resource':Resource,'$/UI2/system/components/justep/resource#require':Require};
});