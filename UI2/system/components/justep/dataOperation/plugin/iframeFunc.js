define(function(require) {
	var $ = require("jquery");
	var justep = require("$UI/system/lib/justep");
	require("./jquery.iframe");
	
	var Model = function() {
		this.iframePromise = null;
		this.iframe = null;
		this.callParent();
	};
	
	Model.prototype.modelLoad = function(event){
		if(justep.Browser.isIOS) $(this.getRootNode()).css({overflow:'auto'});//ios特殊支持,其他系统内部滚动条
		//创建iframe打开UI的功能
		var context = this.getContext();
		var url = context.getRequestParameter("iframeFunc");
		if(url){
			var dtd = $.Deferred();
			this.iframePromise = dtd.promise();
			var frame = $('<iframe frameBorder=0 class="portal-frame"></iframe>');
			this.iframe = frame[0];
			$(this.getRootNode()).append(frame);
			frame.src(require.toUrl(url), function(iframe, duration){
				dtd.resolve({
					iframe:this
				});				
			});
		}
	};
	
	Model.prototype.modelActive = function(event){
		if(this.iframePromise){
			this.iframePromise.then(function(data){
			});
		}
	};
	
	return Model;
});