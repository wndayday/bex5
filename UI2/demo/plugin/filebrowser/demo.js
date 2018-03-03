define(function(require){
	var justep = require("$UI/system/lib/justep");
	var browser = require("$UI/system/lib/base/browser");
	require("cordova!com.justep.cordova.plugin.filebrowser");
	var utils = require("$UI/demo/plugin/utils");
	var setState=require("$UI/demo/plugin/disabled");
		
	var Model = function(){
		this.callParent();
		this.callBack();
	};
	
	//回调方法
	Model.prototype.callBack = function(){
		this.success = function (result) {
			justep.Util.hint(JSON.stringify(result));
		};
		
		this.error = function () {
			justep.Util.hint("获取失败");
		};
	};
	
	//打开文件浏览器
	Model.prototype.openBtnClick = function(event){
		window.FileBrowser.open(this.success,this.error);
	};
	
	//选择文件，图片，拍照和拍摄
	Model.prototype.selectfilesBtnClick = function(event){
		window.FileBrowser.select(this.success,this.error);
	};
	
	//选择拍照，拍摄和相册中国的图片
	Model.prototype.selectImageBtnClick = function(event){
	      window.FileBrowser.select(this.success,this.error,
                  {
                  "type":"image/*;doc/-;video/*;doc/-;image/*"
                  }
                  );
	};
	
	Model.prototype.modelModelConstructDone = function(event){
	    utils.showCode(this, "callBack");
		utils.showCode(this, "openBtnClick");
		utils.showCode(this, "selectfilesBtnClick");
		utils.showCode(this, "selectImageBtnClick");
		utils.prettyPrint();
	};
	
	Model.prototype.modelLoad = function(event){
		if(this.wx){
			setState.state(".version-content",".a-version");
		}
	};
	
	Model.prototype.modelModelConstruct = function(event){
		if(browser.isX5App){
		}else{
		 justep.Util.hint("此demo只在应用内正常运行");
		}
	};
	
	return Model;
});