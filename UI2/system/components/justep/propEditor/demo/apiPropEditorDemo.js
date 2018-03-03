define(function(require){
	var $ = require("jquery");
	var justep = require("$UI/system/lib/justep");
	
	var PropEditorMng = require("$UI/system/designer/webIde/base/propEditor/propEditorMng");
	
	var xdocService = require("$UI/system/designer/webIde/common/xdocService");
	var compConfigService = require("$UI/system/designer/webIde/common/compConfigService");
	
	var Model = function(){
		this.callParent();
	};
	
	/**
	 * 获取模板后放入合适的位置后再构建编辑器
	 */
	Model.prototype.createPropEdtiorsByTemplate = function($parent){
		this.propEditorMng.clearEditor();
		var propEditorMng = this.propEditorMng;
		var propConfig = [{name:'id'},
		                  {name:'label',editor:{name:"dropListEditor",staticData:[['true','是'],['false','否']]}},
		                  {text:"分组",isGroup:true,properties:[
		                                                      {name:'a1',text:"属性2",editor:"dropListEditor"},
		                                                      {name:'a2',text:"属性1",editor:"dropListEditor"},
		                                                      ]},
		                  {name:'cfg',editor:{url:"$UI/system/designer/webIde/quickIde/propPages/styleSelector/styleParam.w"}}];
		var buf = [];
		for(var i=0;i<propConfig.length;i+=1){
			var item = propConfig[i];
			buf.push(propEditorMng.buildEditorTemplate(item));
		}
		$("<div>"+buf.join("")+"</div>").appendTo($parent);
		
		propEditorMng.initPropEditor();
	}
	
	/**
	 * 获取属性编辑器上下文信息--以组件方式创建属性编辑器时调用
	 */
	Model.prototype.getPropEditorContext = function(){
	   return {mainModel:this.getParentModel()};
	}
	
	Model.prototype.loadMethodList = function(path){
		var $parent = $(this.getElementByXid("col3"));
		this.propEditorMng.clearEditor();
		$parent.children().remove();
	  //  var path = "$UI/system/components/justep/data/data";
		var list = xdocService.queryMethodList([{path:path}]);
		var $configNode = compConfigService.getConfig(path);
 
		var propList = []; 
		 for(var i = 0;i<list.length;i+=1){
			 var item = list[i];
			 var methodList = item.methodList;
			 if(methodList){
				 for(var j = 0;j<methodList.length;j+=1){
					 var params = methodList[j].params;
					 if(params && params.length>0){
						 for(var n = 0;n<params.length;n+=1){
							 params[n]["compName"] = methodList[j].memberof;
							 params[n]["ownerFunctionName"] = methodList[j].name;
						 }
						 propList.push({text:methodList[j].name,isGroup:true,properties:params});
					 }
				 }
			 }
		 }
	 
		 this.propEditorMng.loadPropEditor(path,function(){
			 this.directCreatePropEdtiors($(this.getElementByXid("col3")),propList);
		 },this);
		
	};
	
	/**
	 * 直接创建属性编辑器
	 * @param $parent
	 */
	Model.prototype.directCreatePropEdtiors = function($parent,propConfig){
 
		var propEditorMng = this.propEditorMng;
		var propConfig = propConfig || [];
		var buf = []; 
		for(var i=0;i<propConfig.length;i+=1){
			var editor = propEditorMng.createPropEditor(propConfig[i],$.extend(this.context,{$parent:$parent,mainModel:this.getParentModel().getParentModel()}));
			 
		}
	}
	/**
	 * 直接创建属性编辑器
	 * @param $parent
	 */
 
	Model.prototype.modelLoad = function(event){
		var parentNode = this.getElementByXid("col3");
		this.propEditorMng = new PropEditorMng({propContainer:parentNode});
		var list = xdocService.getAllApiDoc();
		var targetData = this.comp("data2");
		list= list.sort(function(a,b){
			a = a.name;
			b = b.name;
//			var idx = a.lastIndexOf("/");
//			if(idx>0){
//				a = a.substring(idx);
//			}
//			var idx = b.lastIndexOf("/");
//			if(idx>0){
//				b = b.substring(idx);
//			}
			return a<b;
		});
		targetData.loadData({rows:list});
	};

	Model.prototype.button1Click = function(event){
		this.createPropEdtiorsByTemplate($(this.getElementByXid("div1")));
		
		this.propEditorMng.setPropValues({id:"ddfd",label:"a",cfg:"ffffffffff"});
	};

	Model.prototype.button2Click = function(event){
		this.propEditorMng.clearEditor();
	};

	Model.prototype.button3Click = function(event){
		this.directCreatePropEdtiors($(this.getElementByXid("div1")));
		this.propEditorMng.setPropValues({id:"ddfd",label:"a",cfg:"ffffffffff"});
	};

	Model.prototype.modelParamsReceive = function(event){
	    
	};

	Model.prototype.output1Click = function(event){
		
	};

	Model.prototype.list1Click = function(event){
		var targetData = this.comp("data2");
		var path = targetData.getValue('name');
		this.loadMethodList(path);
	};

	return Model;
});