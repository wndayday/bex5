define(function(require) { 
	require('css!../css/form').load();
	 require("$UI/system/components/justep/common/res");
	 var Component = require("$UI/system/lib/base/component");
	 var ViewComponent = require("$UI/system/lib/base/viewComponent");
	 var url = require.normalizeName("./formRow5Btn2");
	 Component.register(url, ViewComponent);
	 var quickIdeEx = {
				"$UI/system/components/fragment/form/formRow5Btn2":{
					properties:["xid","text"],
					styleConfig:function(designer){
						return [
							      designer.getCommonStyleItem('baseStyle'),
							      designer.getCommonStyleItem('font'),
							      designer.getCommonStyleItem('border'),
							      designer.getCommonStyleItem('position'),
						];
					}
				}
		};
	 return {"$UI/system/components/fragment/form/formRow5Btn2":ViewComponent,quickIdeEx:quickIdeEx
		 };
	});