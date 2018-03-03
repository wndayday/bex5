define(function(require) {
	var $ = require("jquery");
	var justep = require("$UI/system/lib/justep");
	var base=require("$UI/system/api/native/base");
	var warning=require("$UI/demo/plugin/warning");
	require("cordova!com.justep.cordova.plugin.iFlytek");

	var Model = function() {
		this.callParent();
		this.wx=base.getWx();
	};

	Model.prototype.getImageUrl = function(url) {
		return require.toUrl(url);
	};

	Model.prototype.sayingTouchstart = function(event) {
		if(this.wx){
			warning.onAlert();
			return;
		}else {
			this.comp('popOver1').show();
			var search = this.comp('search');
			navigator.speech.startListening({
				"asr_ptt" : 0
			}, function(res) {
				
				search.val(res);
			});
		}
	};

	Model.prototype.sayingTouchend = function(event) {
		if(this.wx){
			warning.onAlert();
			return;
		}else {
			this.comp('popOver1').hide();
			var search = this.comp('search');
			navigator.speech.stopListening(function(res) {
				//alert("stopListen OK :" + JSON.stringify(res));
				search.val(res.results);
			}, function(res) {
				alert("stopListen NO :" + JSON.stringify(res))
			});
		}

	};



	Model.prototype.modelLoad = function(event){
		if(this.wx){
			justep.Util.hint("本应用暂时只支持android和ios平台");
		}
	};

	Model.prototype.backBtnClick = function(event){
		justep.Shell.closePage();
	};



	return Model;
});