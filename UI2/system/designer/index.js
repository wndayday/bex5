define(function(require){
	var $ = require("jquery");
	var webSocket = require("$UI/system/components/designerCommon/js/webSocketMng");
	var appService = require("$UI/system/designer/webIde/common/IDEService");
	var justep = require("$UI/system/lib/justep");


	webSocket._callJava = function(className, methodName, params, callback) { 
		if(methodName == 'closeDialog'){
			return;
		}
		params = params || {}; 
 		var result = appService.callService({name:className+"."+methodName,params:params});
 		if(callback){
 			callback(result);
 		}
 		return result;
	};
	
	webSocket.isOverite = true;
	
	var key = [20,54,68,73,25,11,86,34,97,33,20,20];
	var encrypt = function(str,key){
		var ret = '', keyLen = key.length;
		for(var i = 0; i<str.length; i++){
		ret += String.fromCharCode(str.charCodeAt(i) ^ key[i%keyLen]);
		}
		return ret;
	};
	
	var Model = function(){
		this.callParent();
		
		var urlParams = this.getContext().getRequestParameters();
		if(urlParams){
			/*打开可以使用明文参数传递
			$.each(urlParams,function(n,v){
				if(n!=='k')sessionStorage.setItem(n, v);
			});
			*/
			var k=urlParams['key'];
			if(k){
				try{
					k=justep.Base64.decode(k);
					k=encrypt(k,key);
					try{
						k=JSON.parse(k);
					}catch(e){
						k = eval('('+k+')');
					}
					if($.isPlainObject(k)) $.each(k,function(n,v){
						sessionStorage.setItem(n,v);
					});
				}catch(e){}
			}
		}
	};

	return Model;
});
