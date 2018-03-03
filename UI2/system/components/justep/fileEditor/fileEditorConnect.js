define(function(require) {
	var Observable = require("$UI/system/lib/base/observable");
	var Object = require("$UI/system/lib/base/object");

	var FileEditorConnect = Object.extend({
		mixins : Observable,
		constructor : function(args) {
			this.callParent();
			Observable.prototype.constructor.call(this);
			this._connection();
		},
		//重新连接
		_reConnect : function(){
			  this.ws.onopen = function() {
			  this.isConnected = true;
			};
		},
		//连接websocket
		_connection : function() {
			this.ws = new WebSocket("ws://localhost:9090/wps/");
			this.isConnected = false;
			var self = this;

			self.ws.onopen = function() {
				self.isConnected = true;
				console.log("onopen:" + self.isConnected);
			};
			self.ws.onclose = function() {
				self.isConnected = false;
				self._reConnect();
				// 等待2秒判断是否连接
				setTimeout(function() {
					if (self.isConnected === false) {
						if (self.ws.readyState != 1) {
							var message = {
								type : 'connect',
								errorMsg : '连接异常'
							};
							var _data = {
								source : this,
								data : message,
								cancel : false
							};
							console.error('connection error');
							self.fireEvent('onEditError', _data);// 连接异常
						}
					}
				}, 2000);
			};
			self.ws.onmessage = function(evt) {
				 var msg = JSON.parse(evt.data);
				 console.log("receive message form backend:" + JSON.stringify(msg));
				 var _data = { 
						 source : this ,
						 data : msg ,
						 cancel : false
					 };
				 self.fireEvent("onMessage",_data); 
			};
		}
	});	
	return new FileEditorConnect();
});