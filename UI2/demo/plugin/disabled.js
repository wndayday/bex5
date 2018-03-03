define(function(require){
	var $=require("jquery");
	return {
		state:function(parentSelector,ownSelector){
			var eles=$(parentSelector).find(ownSelector);
			if(eles.length==1){
				$(eles[0]).attr('disabled',true);
			}else {
				$.each(eles,function(i,v){
					$(v).attr("disabled",true);
				})
			}
		}
	}
})