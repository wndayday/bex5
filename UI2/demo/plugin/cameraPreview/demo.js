define(function(require){
	var $ = require("jquery");
	require("cordova!com.mbppower.camerapreview");
	require("cordova!cordova-plugin-file");
	var utils = require("$UI/demo/plugin/utils");
	var CameraPreview = cordova.plugins.camerapreview;
	var path;
	var Model = function(){
		this.callParent();
	};
	
	Model.prototype.switchBtnClick = function(event){
		CameraPreview.switchCamera();
	};
	Model.prototype.startClick = function(event){
		CameraPreview.startCamera({x: 0, y: $(window).height()-300-100, width: $(window).width(), height:300}, "front", false, true, false);
	};
	Model.prototype.stopClick = function(event){
		CameraPreview.stopCamera();
	};
	Model.prototype.takePictureClick = function(event){
		var self = this;
		CameraPreview.takePicture({maxWidth:640, maxHeight:640});
		CameraPreview.setOnPictureTakenHandler(function(imagePath){
			path = imagePath[0];
			console.log("图片的原始路径为： "+ imagePath[0]);
			console.log("图片的预览路径为： "+ imagePath[1]);
			var pos = imagePath[1].lastIndexOf("/");
			var filename =  imagePath[1].substring(pos + 1);
			console.log("图片名称： "+ filename);
	         window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function (fs) {  
	             console.log('打开的文件系统: ' + fs.name);  
	             fs.root.getFile(filename, { create: false, exclusive: false },  
	              function (fileEntry) {  
	            	 console.log('fs.root.getFile');  
	            	 fileEntry.file(function (file) {  
	                     var reader = new FileReader();  
	                     reader.onloadend = function() {  
	                         //加载成功显示图片  
	                    	 console.log('加载成功显示图片'); 
	                         var blob = new Blob([new Uint8Array(this.result)], { type: "image/*" });  
	                         self.getElementByXid("image").src = window.URL.createObjectURL(blob);
	                     };  
	                     reader.readAsArrayBuffer(file);  
	                 }, null);   
	             }, null);
	           }, null);	
		});
	};
	Model.prototype.infoClick = function(event){
		CameraPreview.hide();
	};
	Model.prototype.demoClick = function(event){
		CameraPreview.show();
	};
	Model.prototype.codeClick = function(event){
		CameraPreview.hide();
	};
	Model.prototype.modelModelConstructDone = function(event){
		utils.showCode(this, "switchBtnClick");
		utils.showCode(this, "startClick");
		utils.showCode(this, "stopClick");
		utils.showCode(this, "takePictureClick");
		
	};
	return Model;
});