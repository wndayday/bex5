define(function(require){
	var justep = require("$UI/system/lib/justep");
	var browser = require("$UI/system/lib/base/browser");
	require("cordova!com.justep.cordova.plugin.signature");
	var utils = require("$UI/demo/plugin/utils");
	var setState=require("$UI/demo/plugin/disabled");
		
	var Model = function(){
		this.callParent();
		this.callBack();
	};
	
	//回调方法
	Model.prototype.callBack = function(){
		this.success = function (imgData) {
            /* This is the "success" callback. */
            if(!imgData) {
              alert('没有获取到笔迹数据');
              return; // User clicked cancel, we got no image data.
            }
            
            var canvas = document.getElementById('myCanvas'),
            ctx = canvas.getContext('2d');
            canvas.width = imgData.width;
            canvas.height = imgData.height;
            
            console.log("canvas: width=" + canvas.width + ", height=" + canvas.height);
            
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.putImageData(imgData, 0, 0);
		};
		
		this.error = function () {
			justep.Util.hint("获取笔迹数据失败");
		};
	};
	
	Model.prototype.modelModelConstructDone = function(event){
	    utils.showCode(this, "callBack");
		utils.showCode(this, "getSignatureBtnClick");
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
	
	//获取签名笔迹数据
	Model.prototype.getSignatureBtnClick = function(event){
	      var position = {x:10, y:200, w:window.screen.width * 0.9, h:window.screen.height * 0.4};
	      justep.signature.getSignature(position, this.success, this.error);
	};
	
	return Model;
});