define(function(require){
	var $ = require("jquery");
	require("cordova!cordova-plugin-ble-central");
	var justep = require("$UI/system/lib/justep");
	var Model = function(){
		this.callParent();
	};
	var utils = require("$UI/demo/plugin/utils");
	var suCallBack = function(info){
		justep.Util.hint("成功："+JSON.stringify(info));
		console.log(info);
	};
	var errCallBack = function(info){
		justep.Util.hint("失败："+JSON.stringify(info));
		console.log(info);
	};
	var characteristics;
	var device_id;
	var service_uuid;
	var characteristic_uuid;
	var ble = window.ble;
	var data = new Uint8Array(1);
	data[0] = 1;
	Model.prototype.scanClick = function(event){
		//每发现一个设备就会成功回调一次，会记录最后一个被发现设备的id
		var second = 15;
		alert("扫描"+second+"秒后自动停止扫描")
		ble.scan([],second,function(info){
			suCallBack(info);
			device_id = info.id;
		},errCallBack);
	};
	Model.prototype.startScanClick = function(event){
		////每发现一个设备就会成功回调一次，会记录最后一个被发现设备的id
		ble.startScan([], function(info){
			suCallBack(info);
			device_id = info.id;
		}, errCallBack);
	};
	Model.prototype.stopScanClick = function(event){
		ble.stopScan( suCallBack, errCallBack);
	};
	Model.prototype.connectClick = function(event){
		//连接最后一个被发现的设备
		ble.connect(device_id,  function(info){
			suCallBack(info);
			characteristics  = info.characteristics;
		}, errCallBack);
	};
	Model.prototype.disconnectClick = function(event){
		ble.disconnect(device_id,  suCallBack, errCallBack);
	};
	Model.prototype.readClick = function(event){
		for(var i in characteristics){
			var cha = characteristics[i];
			if (cha.properties[0] == "Read"){
				service_uuid = cha.service;
				characteristic_uuid = cha.characteristic;
				break;
			}
		}
		ble.read(device_id, service_uuid, characteristic_uuid, function(buffer){
			var string = String.fromCharCode.apply(null, new Uint8Array(buffer));
			suCallBack(string);
		}, errCallBack);
	};
	Model.prototype.writeClick = function(event){
		for(var i in characteristics){
			var cha = characteristics[i];
			if (cha.properties[0] == "Write"){
				service_uuid = cha.service;
				characteristic_uuid = cha.characteristic;
				debugger;
				break;
			}
		}
		ble.write(device_id, service_uuid, characteristic_uuid, data.buffer, suCallBack, errCallBack);
	};
	Model.prototype.writeWithoutResponseClick = function(event){
		for(var i in characteristics){
			var cha = characteristics[i];
			if (cha.properties[0] == "Write"){
				service_uuid = cha.service;
				characteristic_uuid = cha.characteristic;
				break;
			}
		}
		ble.writeWithoutResponse(device_id, service_uuid, characteristic_uuid, data.buffer, suCallBack, errCallBack);
	};
	Model.prototype.startNotificationClick = function(event){
		var onData = function(buffer) {
			// Decode the ArrayBuffer into a typed Array based on the data you expect
			var data2 = new Uint8Array(buffer);
			alert("Button state changed to " + data2[0]);
		};
		ble.startNotification(device_id, service_uuid, characteristic_uuid, onData, errCallBack);
	};
	Model.prototype.stopNotificationClick = function(event){
		ble.stopNotification(device_id, service_uuid, characteristic_uuid, suCallBack, errCallBack);
	};
	Model.prototype.isConnectedClick = function(event){
		ble.isConnected(device_id, suCallBack, errCallBack);
	};
	Model.prototype.isEnabledClick = function(event){
		ble.isEnabled(suCallBack, errCallBack);
	};
//	Model.prototype.startStateNotificationsClick = function(event){
//		ble.startStateNotifications(suCallBack, errCallBack);
//	};
//	Model.prototype.stopStateNotificationsClick = function(event){
//		ble.stopStateNotifications(suCallBack, errCallBack);
//	};
	Model.prototype.showBluetoothSettingsClick = function(event){
		ble.showBluetoothSettings(suCallBack, errCallBack);
	};
	Model.prototype.enableClick = function(event){
		ble.enable(suCallBack, errCallBack);
	};
	
	Model.prototype.modelModelConstructDone = function(event){
		utils.showCode(this, "scanClick");
		utils.showCode(this, "startScanClick");
		utils.showCode(this, "stopScanClick");
		utils.showCode(this, "connectClick");
		utils.showCode(this, "disconnectClick");
		utils.showCode(this, "readClick");
		utils.showCode(this, "writeClick");
		utils.showCode(this, "writeWithoutResponseClick");
		utils.showCode(this, "startNotificationClick");
		utils.showCode(this, "stopNotificationClick");
		utils.showCode(this, "isConnectedClick");
		utils.showCode(this, "isEnabledClick");
//		utils.showCode(this, "startStateNotificationsClick");
//		utils.showCode(this, "stopStateNotificationsClick");
		utils.showCode(this, "showBluetoothSettingsClick");
		utils.showCode(this, "enableClick");
		utils.prettyPrint();
	};
	
	return Model;
});