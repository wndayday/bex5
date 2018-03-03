define(function(require) {
	var $ = require("jquery");
	var justep = require("$UI/system/lib/justep");

	var Model = function() {
		this.callParent();
	};
	
	//加载数据
	Model.prototype.audioDataCustomRefresh = function(event){
		var audioData = event.source;
        $.ajax({
            type: "GET",
            url: require.toUrl('./json/audioData_in_server.json'),
            dataType: 'json',
            async: false,
            cache: false,
            success: function(data){
            	audioData.loadData(data);//将返回的数据加载到data组件
            },
            error: function(){
              throw justep.Error.create("加载数据失败");
            }
        });	
	};
	Model.prototype.classDataCustomRefresh = function(event){
		var classData = event.source;
        $.ajax({
            type: "GET",
            url: require.toUrl('./json/classData_in_server.json'),
            dataType: 'json',
            async: false,
            cache: false,
            success: function(data){
            	classData.loadData(data);//将返回的数据加载到data组件
            },
            error: function(){
              throw justep.Error.create("加载数据失败");
            }
        });	
	};
	/*
	Model.prototype.modelLoad = function(event){
		//删除模块
		$(".icon-android-close").each(function(){
			$(this).on("click",function(){
				$(this).parent().parent().parent().remove();
			});
		});
		
	};*/
	
	//进入列表页
	Model.prototype.listClick = function(event){
		justep.Shell.showPage("list");
	};
	
	//图片路径转换
	Model.prototype.getImageUrl = function(url){
		return require.toUrl(url);
	};
		
	//进入内容页
	Model.prototype.detailClick = function(event){
		justep.Shell.showPage("detail");
	};
	/*
	//进入登录页
	Model.prototype.loginBtnClick = function(event){
		justep.Shell.showPage("login");
	};
	*/
	
	return Model;
});