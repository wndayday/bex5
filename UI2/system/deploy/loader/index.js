define(function(require){
	var $ = require("jquery");
	var justep = require("$UI/system/lib/justep");
	var AppEngine = require("$UI/system/deploy/common/js/appEngine");
	var Model = function(){
		this.callParent();
		this.appNumberLabel = justep.Bind.observable(0);
		this.modelLabel = justep.Bind.observable();
	};

	Model.prototype.modelLoad = function(event){
		var self = this;
		self.appEngine = new AppEngine('$UI/system/deploy/package/pack.j');
        var downloadInfo = self.appEngine.getDownloadInfo("apploader", "apploader");
        var ip = downloadInfo.ip.split(',');
        var ipNode = $(this.getElementByXid("ip"));
		for (var i = 0; i < ip.length; i++) {
			ipNode.append("<option value='" + ip[i] + "'>" + ip[i] + "</option>");
		}
        self.ip = ip[0];                
        self.port = location.port;
        self.refreshBarcode();
		//首先需要获取用户调试页面的路径 
		var overrideURL = this.getContext().getRequestParameter("overrideURL");
		overrideURL = require.toUrl(overrideURL);
		//判断是否有调试app连接
		$.ajax(  
        {  
            type : 'GET',  
            url : 'http://localhost:35729/apploader',    
            success : function(data)  
            {         
                console.log(data);
                var jsonData = JSON.parse(data);
                var uuidArray = new Array();
                if(jsonData.appInfo != {}){ 
                //此时存在调试设备   
                	for (var key in jsonData.appInfo){
                		uuidArray.push(key);
                	}
                	self.appNumberLabel.set(uuidArray.length);
                	var model = "";
                	for (var i = 0; i< uuidArray.length; i++){
                		var key = uuidArray[i];
                		var tmpStr= jsonData.appInfo[key].model;
                		model += tmpStr;
                		model += "/";
                	} 
                	self.modelLabel.set(model);
                	$.ajax(
                	{
                		type : 'GET',  
                		url : 'http://localhost:35729/reload?overrideURL='+overrideURL,
                	}
                	);                	
                }
            },  
            error : function()  
            {  
                alert("'http://localhost:35729/apploader'请求失败！请检查您是否开启了studio的即时刷新模式。");  
            }  
        }); 
        
	};
	
	Model.prototype.refreshBarcode = function(wizard) {
		
		this.appEngine.startIpaService(this.ip, "apploader");
		this.androidURL = "http://" + this.ip + ":" + this.port
				+ require.toUrl("$UI/system/deploy/package/download.j?platform=android&projectName=" + "apploader" + '&appName=' + "apploader");
		this.iosURL = "http://" + this.ip + ":" + "10000" + "/intro.html";
		this.comp('androidQR').set({
			"value" : this.androidURL
		});
		this.comp('iosQR').set({
			"value" : this.iosURL
		});
	}; 

	Model.prototype.ipChange = function(event){
		this.ip = $(this.getElementByXid("ip")).val();
		this.refreshBarcode();
	}; 

	return Model;
});