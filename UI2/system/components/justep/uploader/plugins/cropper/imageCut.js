define(function(require) {
	var $ = require("jquery");
	require("./js/cropper.min");
	require("css!./js/cropper.min").load();

	var Model = function() {
		this.callParent();
	};

	Model.prototype.modelLoad = function(event) {
		var options = {
			// data: {
			// x: 420,
			// y: 60,
			// width: 640,
			// height: 360
			// },
			strict: false, //是否严格要求取景框必须在图片内, 默认是true
			// background: true, //是否设置背景，默认是 true
			// doubleClickToggle: true,
			//preview : '.img-preview', // 剪裁完成后，剪裁出来的图片存放地址
			// responsive: false,
			// checkImageOrigin: false

			//canvas（图片）相关
			movable : true, // 图片是否可以移动
			rotatable: true, //图片是否可以旋转
			zoomable : true, // 是否允许缩放图片
			touchDragZoom : true, // 是否支持手势缩放，默认为true
			ouseWheelZoom: true, //是否支持鼠标的滚轮缩放，默认为true
			
			//crop(裁剪框)相关
			aspectRatio : 1 / 1, // 取景框的宽高比
			modal : true, // 是否突出显示取景框，默认为true
			cropBoxMovable : false, // 取景框是否可以移动，默认是 true
			cropBoxResizable : false, // 用户是否能够调节取景框大小，默认为true
			// autoCrop: true, //是否到自动剪切模式,默认 true
			autoCropArea: 0.9, //初始化完成后，取景框高度占预览图片的比例, 默认0.6
			// highlight: false, //这个没看明白，楼下解释
			// guides: false, //取景框里是否有辅助线，默认是true
			dragCrop : false, // 是否允许用户生成取景框, 默认是true

			//大小相关
			// minContainerWidth: 320,
			// minContainerHeight: 180,
			// minCanvasWidth: 320,
			// minCanvasHeight: 180,
			// minCropBoxWidth: 160,
			// minCropBoxHeight: 90,

			//监听触发的方法
			// build: null,
			// built: null,
			// dragstart: null,
			// dragmove: null,
			// dragend: null,
			// zoomin: null,
			// zoomout: null,

		/*
		 * crop: function (data) {
		 * //初始化剪切后的回调函数，可以拿到剪裁后图片在原图上的x,y,width,height,rotate
		 * $dataX.val(Math.round(data.x)); $dataY.val(Math.round(data.y));
		 * $dataHeight.val(Math.round(data.height));
		 * $dataWidth.val(Math.round(data.width));
		 * $dataRotate.val(Math.round(data.rotate)); }
		 */
		};
		//$('.cropper-example-1 > img').cropper(options);
		var $image = $(this.getElementByXid("cutImage"));
		$image.cropper(options);
	};
	
	Model.prototype.modelParamsReceive = function(event){
		var $image = $(this.getElementByXid("cutImage"));
		var file = event.params.file;
		if (/^image\/\w+$/.test(file.type)) {
			var blobURL = URL.createObjectURL(file);
			$image.one('built.cropper', function() {
				URL.revokeObjectURL(blobURL); // Revoke when load complete
			}).cropper('reset').cropper('replace', blobURL);
		}
	};
	
	Model.prototype.OKBtnClick = function(event) {
		var $image = $(this.getElementByXid("cutImage"));
		var result = $image.cropper("getCroppedCanvas");
		var base64 = result.toDataURL();
		this.owner.send(base64);
		this.close();
	};

	Model.prototype.rotateRightBtnClick = function(event){
		var $image = $(this.getElementByXid("cutImage"));
		$image.cropper('rotate', 90);
	};

	Model.prototype.rotateLeftBtnClick = function(event){
		var $image = $(this.getElementByXid("cutImage"));
		$image.cropper('rotate', -90);
	};

	return Model;
});