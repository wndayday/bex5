define(function(require){
	var $ = require("jquery");
	var justep = require("$UI/system/lib/justep");
	require("cordova!com.justep.cordova.plugin.videoPlayer");
	require("cordova!cordova-plugin-screen-orientation");
	
	var Model = function(){
		this.callParent();
		this.grade = 4.3;
	};
//星星评分
	
	var didResumeCallBack = function(){
		justep.Util.hint("恢复播放");
	};
	Model.prototype.showStar = function(event) {
		var col = this.getElementByXid("starCol");
		var children = $(col).children('a');
		if (this.grade) {
			var num = parseInt(this.grade);
			var dec = this.grade.toString().substr(2, 3);
			var preStar = $(children[num]).prevAll();
			for (var j = 0; j < preStar.length; j++) {
				preStar[j].style.color = "#FACF47";
			}
			if (dec >= 5) {
				children[num].style.color = "#FACF47";
			} else if (0 <= dec & dec < 5) {
				var xid = $(children[num]).attr("xid");
				this.comp(xid).set("icon", "dataControl dataControl-starl");
				children[num].style.color = "#FACF47";
			}
		}

	}
//视频
	Model.prototype.modelModelConstruct = function(event){
		var url = "http://vjs.zencdn.net/v/oceans.mp4";//http://vjs.zencdn.net/v/oceans.ogv  http://vjs.zencdn.net/v/oceans.webm
		//由于网络问题，有可能出现卡顿现象，用户可以自己更换url路径
		var position = {x:0, y:20, w:$(window).width(), h:300};
		var noop =function(){
			console.log("noop");
		};
		var func1 = function(){
			alert("点击了topBtn1");
		};
		var func2 = function(){
			alert("点击了bottomBtn1");
		};
		var func3 = function(){
			alert("点击了leftBtn1");
		};
		var func4 = function(){
			alert("点击了rightBtn1");
		};
		var args = {
			url:url,
			title:"我就是一个标题",
			position :position,
			willPlayCallBack:noop,
			didPauseCallBack:noop,
			didResumeCallBack:noop,
			didFinishCallBack:noop,
			customBtnInfo:[
			               {position:"top",onClick:func1, tag:"topBtn1"},
//			               {position:"bottom,left",onClick:func2,tag:"bottomBtn1"},
			               {position:"left",onClick:func3,tag:"leftBtn1"},
			               {position:"right",onClick:func4,tag:"rightBtn1"}
			               ]
		};
		navigator.videoPlayer.open(args, function(){
			alert("成功");
		}, function(){
			alert("失败");
		});
	};
	

	Model.prototype.modelLoad = function(event){
		
		this.showStar(event)	;
	};
	

	return Model;
});