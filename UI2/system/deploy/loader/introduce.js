define(function(require){
	var $ = require("jquery");
	var justep = require("$UI/system/lib/justep");
	require("cordova!phonegap-plugin-barcodescanner");
	require("cordova!com.justep.cordova.plugin.app.utils");
	require("cordova!cordova-plugin-app-preferences");
	require("cordova!cordova-plugin-device");
	var isfirst = true;
	var Model = function(){
		this.callParent();
		if (isfirst){
			isfirst = false;
			document.addEventListener("deviceready", onDeviceReady, false);
			function onDeviceReady() {
				var url = new justep.URL(location.href);
				var host = url.hostname;
				$.getScript("http://"+host+":35729/livereload.js");
				var value = "thisIsX5Apploader";
				plugins.appPreferences.store(function(){					
				},function(){					
				},"isApploaderOrNot",value);			
			}		
		}		
	};

	Model.prototype.ipBtnClick = function(event){
		var ip = this.comp("ipInput").val();		
		$.getScript(location.protocol + '//' + ip + ':8080/x5/UI2/system/lib/base/array.js').then(		
                function(){                	
                  var currentUrl = new justep.URL(location.href);
                  currentUrl.hostname = ip;
                  navigator.appUtils.setIndexPageUrl(currentUrl.toString());
                  location.href = currentUrl.toString();
                }).fail(function(){
                  justep.Util.hint("请检查【" + ip + "】的tomcat是否已经启动");
                });           
	};
	Model.prototype.scanBtnClick = function(event){
		var ValidateIPaddress = function (ipaddress){  
			if (/^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(ipaddress))  
			{  
				return (true);  
			} 
			return (false);  
		};
		cordova.plugins.barcodeScanner.scan(function(result){
			if(result.text !== ""){
				var url = new justep.URL(result.text);				
				var ip = url.hostname;				
				justep.Util.hint("发现服务："+ip);
				//检测是ip还是域名
				if(ValidateIPaddress(ip)) {
					$.getScript(location.protocol + '//' + ip + ':8080/x5/UI2/system/lib/base/array.js').then(		
			                function(){                	
			                  var currentUrl = new justep.URL(location.href);
			                  currentUrl.hostname = ip;
			                  navigator.appUtils.setIndexPageUrl(currentUrl.toString());
			                  location.href = currentUrl.toString();
			                }).fail(function(){
			                  justep.Util.hint("请检查【" + ip + "】的tomcat是否已经启动");
			                });	
				}else{
					//此时应该是域名
					location.href = url;
				}
				
			}		
		}, function(error){
			justep.Util.hint("扫描失败"+error+"您可以试试手动输入服务器ip");
		});
	};
	return Model;
});