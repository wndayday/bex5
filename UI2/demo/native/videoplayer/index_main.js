define(function(require) {
	var $ = require("jquery");
	var justep = require("$UI/system/lib/justep");
	var base=require("$UI/system/api/native/base");
	require("$UI/system/lib/cordova/cordova");
	require("cordova!com.phonegap.plugins.videoplayer");
	
	var Model = function() {
		this.callParent();
		this.wx=base.getWx();
	};

	Model.prototype.playVideoClick = function(event) {
		if(this.wx){
			return;
		}else {
			
			var url = this.comp("url").val();
			if(!url){
				justep.Util.hint("请输入视频路径", {type : "danger"});
				return false;
			}
			cordova.plugins.videoPlayer.play(url);
		}
	};

	Model.prototype.localBtnClick = function(event){
		if(this.wx){
			return;
		}else {
			
			justep.Shell.showPage(require.toUrl("./fileSystem.w"));
		}
	};

	Model.prototype.modelLoad = function(event){
		if(this.wx){
			justep.Util.hint("本应用暂时只支持android和ios平台");
		}
		var web = "http://doc.wex5.com/wp-content/uploads/2016/04/2.mp4"
		this.comp("url").val(web);
	};

	Model.prototype.backBtnClick = function(event){
		justep.Shell.closePage();
	};

	return Model;
});