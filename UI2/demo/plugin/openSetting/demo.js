define(function(require){
	require("cordova!cordova-open-native-settings");
	require("cordova!cordova-plugin-device");
	var utils = require("$UI/demo/plugin/utils");
	var $ = require("jquery");
	var Model = function(){
		this.callParent();
	};
	Model.prototype.openSettingClick = function(event){
		if (device.platform == "Android") {
			//Android可以选填的参数
//			open
//			accessibility
//			add_account
//			airplane_mode
//			apn
//			application_details
//			application_development
//			application
//			bluetooth
//			captioning
//			cast
//			data_roaming
//			date
//			device_info
//			display
//			dream
//			home
//			input_method
//			input_method_subtype
//			internal_storage
//			locale
//			location_source
//			manage_all_applications
//			manage_applications
//			memory_card
//			network_operator
//			nfcsharing
//			nfc_payment
//			nfc_settings
//			print
//			privacy
//			quick_launch
//			search
//			security
//			settings
//			show_regulatory_info
//			sound
//			sync
//			usage_access
//			user_dictionary
//			voice_input
//			wifi_ip
//			wifi
//			wireless
			if(typeof cordova.plugins.settings.openSetting != undefined){
				cordova.plugins.settings.openSetting("bluetooth", function(){
		            alert("打开蓝牙设置");
		        },
		        function(){
		            alert("打开蓝牙设置失败");
		        });
			}
		} else {
			//iOS无需添加参数
		    cordova.plugins.settings.open(function(){
	            console.log("opened settings")
	        },
	        function(){
	            console.log("failed to open settings")
	        });
		}

	};
	Model.prototype.modelModelConstructDone = function(event) {
		utils.showCode(this,"openSettingClick").prettyPrint();
	};
	return Model;
});