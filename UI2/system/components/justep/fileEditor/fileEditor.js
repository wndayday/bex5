define(function(require) {
	var Observable = require("$UI/system/lib/base/observable");
	var Object = require("$UI/system/lib/base/object");
	var justep = require("$UI/system/lib/justep");
	var fileEditorConnect = require("$UI/system/components/justep/fileEditor/fileEditorConnect");
	
	var FileEditor = Object.extend({
		mixins : Observable,
		constructor : function(args) {
			this.callParent();
			this.conn = fileEditorConnect;
			Observable.prototype.constructor.call(this);
			this.fileEditorId = justep.UUID.createUUID();
			this.createObject();
			this.initEvent(this.fileEditorId);
		},
		initEvent:function(fileEditorId){
			 var self = this;
			 this.conn.on('onMessage',function(event){
				 if(event.data.requireId != fileEditorId){
					 return;
				 }
				 var _data = { 
					 source : event.source ,
					 data : event.data ,
					 cancel : event.cancel
				 };
				
				if(event.data.type == "downloaded" && event.data.flag){//文件下载成功
					self.open(_data);
				}else if (event.data.type == "downloaded" && event.data.flag === false) {//文件下载失败 
					self.fileEditorFireEvent('onEditError',_data);
				}else if(event.data.type == "closed" && event.data.flag){ //文件编辑成功
					if(event.data.mode == '1')//判断是否修改 0，未修改；1，已修改
					self._upload(event.data);//编辑之后上传
				}else if (event.data.type == "closed" && event.data.flag === false) {//文件编辑失败 
					self.fileEditorFireEvent('onEditError',_data);
				}else if (event.data.type == "uploaded" && event.data.flag) {//文件上传成功
					self.fileEditorFireEvent('onAfterEdit',_data);
				}else if (event.data.type == "uploaded" && event.data.flag === false) {//文件上传失败
					self.fileEditorFireEvent('onEditError',_data);
				}
		   }); 
		},
		//初始化插件
		createObject:function(){
			this.id = justep.UUID.createUUID();
			var fileEditorObj = $("<embed id='"+this.id+"' type='application/x5-office-plugin' width='0%' height='0%'>");
			fileEditorObj.appendTo('body');
			var self = this;
			var loop = setInterval(function(){
				var fileEditorObj = $('#'+self.id).get(0);
				//等待组件初始化完成
				if(typeof(fileEditorObj.bar) != undefined){ 
					self.fileEditorObj = fileEditorObj;
					//self.fileEditorObj.init();
					clearInterval(loop);
				}
			},100);
			this.isCreateObject = true;
		},
		//打开
		open : function(event){
			 if(event.cancel){
				 console.warn('用户已经取消');
			 }else if(event.cancel === false){
				  this.fileEditorFireEvent('onBeforeFileOpen',event);
				  this._open(event.data);
				  this.fileEditorFireEvent('onAfterFileOpen', event);
			 }
		},
		//消息传送
		_sendMessage : function(message) {
			if (this.isConnected) {
				this.conn.ws.send(JSON.stringify(message));
			} else {
				var message = {
						type : 'unknown',
						errorMsg :' 未知异常，请稍后再试 '
					};
				var _data = { 
						source : this ,
						data : message ,
						cancel : false
					};
				this.fileEditorFireEvent('onEditError',_data);//连接异常
			}
		},
		//按url编辑
		_download : function(downParam) {	
			var message = {
				type : "download",
				url : downParam.url,
				headers : downParam.headers,
				requireId : this.fileEditorId
			};
			this._sendMessage(message);
		},
	    //编辑
		_edit:function(downParam){
			this.isConnected = this.conn.isConnected;
			if(this.isConnected){
				 this._download(downParam);
			 }else{
				 var message = { 
						 type : 'unknown',
						 errorMsg:' 未知异常，请稍后再试！ ' 
				  };
				 var _data = { 
						 source : this ,
						 data : message ,
						 cancel : false
				 };
				this.fileEditorFireEvent('onEditError',_data);
			 }
		},
		//打开
		_open:function(msg){
			var message = {
					type : "open",
					realFileName:msg.realFileName,
					storeFileName:msg.storeFileName,
					requireId:msg.requireId
			     };
			this._sendMessage(message);
		},
		//关闭
		_close:function(){
			var message = {type : "close" };
			this._sendMessage(message);
		},
		//上传
		_upload : function(msg) {
			var vUrl = '';
			if (this.upParam.url == '' || this.upParam.url == null) {
				vUrl = this.downUrl;
			} else {
				vUrl = this.upParam.url;
			}
			var message = {
				type : "upload",
				realFileName : msg.realFileName,
				storeFileName : msg.storeFileName,
				requireId : msg.requireId,
				headers : this.upParam.headers,
				fields : this.upParam.fields,
				url : vUrl
			};
			this._sendMessage(message);
		}
	});
    //插件安装
	FileEditor.prototype.initEditor = function(){
		if(this.isCreateObject){
			console.warn('插件已经安装！');
		}else{
			this.createObject();
		}
	};
	/** 编辑参数格式
	 *	var downParam = {url : downUrl,headers : downHeads,cancel : false};
	 *  var upParam = {url : upUrl,headers : upHeads,fields : upFields};
	 */
	 FileEditor.prototype.edit = function(downParam, upParam) {
		var _data = {
			source : this,
			data : downParam
		};
		this.fileEditorFireEvent('onEdit', _data);
		this.downUrl = downParam.url;
		this.upParam = upParam;
		if (downParam.cancel) {
			console.warn('用户已经取消');
		} else {
			this._edit(downParam);
		}
	};
	 // 事件
	 FileEditor.prototype.fileEditorFireEvent = function(evt,data){
		var self = this;
		self.fireEvent(evt,data);
	 }; 
	 
	return  FileEditor ;
});