define(function(require){
	var $=require("jquery");
	var justep=require("$UI/system/lib/justep")
	return {
		onAlert:function(){
			justep.Util.hint("暂时不支持微信平台");
		}
	}
})