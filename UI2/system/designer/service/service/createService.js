define(function(require){
	var $ = require("jquery");
	var justep = require("$UI/system/lib/justep");
	var bizModel = require("$UI/system/designer/webIde/bizDesigner/common/bizModel");
	var IDEService = require("$UI/system/designer/webIde/common/IDEService");
	var xCloudService = IDEService.getXCloudService();
	
	var AllownerMethodHandler = require("$UI/system/designer/service/lib/ownerMethods")
	
	
	var Model = function(){
		this.callParent();
		
		//保存传递的数据
		this.sendData=[];
	};
	Model.prototype.noBtnClick = function(event){
		this.owner.close();
	};

	Model.prototype.modelLoad = function(event){
		var me=this;
		var rpcData=this.comp("rpcNameData");
		var tableNameData=this.comp("tableNameData");
		var methodData=this.comp("methodData");
		//传过来的参数
		var filePath= this.params.data.path;
		this.quoteFilePath = this.params.data.path
		var data=this.params.data.result;
		//加载数据到rpcNameData中
		rpcData.loadData(data,true);
		//获取节点下的所有.xml文件
		var item=xCloudService.getFileTree({filePath:filePath,extName:"m"});
		var itemFiles=item.children[0].children;
		this.dataFiles=[];
		var dataNameArr=[];
		if (itemFiles.length > 0){
			for(var i=0;i<itemFiles.length;i++) {
				var title=itemFiles[i].title;
				if(title.slice(title.indexOf(".")+1,title.lastIndexOf("."))=="data"){
					//获取所有的data.xml文件
					console.log(itemFiles[i])
					me.dataFiles.push(itemFiles[i]);
					//获取所有data文件名
					dataNameArr.push({
						name:itemFiles[i].title
					});
				}
			}
			if(dataNameArr.length>0) {
				tableNameData.loadData(dataNameArr,true);
				tableNameData.first();
			}
			this.dataFiles.length > 0 && this.loadMethodData(this.dataFiles[0])
		}
			
	};
	
	Model.prototype.firstNameToUpperCase = function(name){
		return name.replace(name.slice(0,1),function(key){
			return key.toUpperCase()
		})
	}
	
	//查询access中的method
	Model.prototype.queryMethodList = function(filePath) { debugger
		var me=this;
		var instanceName = this.firstNameToUpperCase(filePath.slice(filePath.lastIndexOf('/')+1,filePath.indexOf('.')))
		this.bizDoc = bizModel.loadFile(filePath, true);
		var list = this.bizDoc.queryAsJson("access>method", function($node, jsonItem) {
			//method标签的属性 
			var method={};
			var name = $node.attr('name')
			/*var pageable=$node.attr("pageable");
			if(pageable){
				method.name = $node.attr('name')
				method.pageable=pageable;
			}*/
			jsonItem.desc = $node.attr('name')
			jsonItem.impl = instanceName+'.'+jsonItem.desc  
			
			//param标签的属性
			if($node.find("param")){
				var arr = me.bizDoc.queryAsJson("access>method[name='"+name+"']>param",function($node,jsonItem){
				})
				jsonItem.param = arr.map(function(item) {
					return {
						name:item.name,
						dataType:item.dataType
					}
				})
			};
			
			//result标签属性
			if($node.find("result")){
				jsonItem.reply=me.bizDoc.queryAsJson("access>method[name='"+name+"']>result",function($node,jsonItem){
					var name=$node.attr("name");
					if(name){
						jsonItem.name=name;
					}
					jsonItem.name = 'result'
					var dataType=$node.attr('dataType');
					if(dataType){
						jsonItem.dataType=dataType;
					}
				});
			}
			var modify = $node.find("sql").attr("modify");
			if(modify){
				jsonItem.modify = modify;
			}
			var query = $node.find("sql").attr("query");
			if(query){
				jsonItem.query = query;
			}
		});
		return list;
	}
	
	
	// /*** 查询 获取 主键id *************/
	
	Model.prototype.getPrimaryTypeByCurrentData = function(dataFile){ 
		this.bizDoc = bizModel.loadFile(dataFile.key, true);
		var list = this.bizDoc.queryAsJson("class>property",function($node,jsonItem){
		});
		if(list && list.length>0){
			var current = list.find(function(item){
				return !!item.primary
			})
			if(current){
				return current.dataType
			}
			return false
		} 
		return false
	}
	//加载方法列表的数据 
	
	Model.prototype.loadMethodData=function(dataFile){ 
		var me=this;
		this.methodNameArr=[];
		this.comp("methodData").clear();
		var dataName = this.firstNameToUpperCase(dataFile.title.substr(0,dataFile.title.indexOf(".")))
		var list = this.queryMethodList(dataFile.key)
		 var primary_type = this.getPrimaryTypeByCurrentData(dataFile)
		 if(!primary_type){
			 justep.Util.hint('数据模型的主键id不能为空',{
				 type:'danger'
			 })
			 return 
		 }
		this.allOwnerMethod = AllownerMethodHandler.replaceTempByInstance({
			instance:dataName,
			id_type:primary_type
		});
		this.allMethod = this.queryMethodList(dataFile.key).concat(this.allOwnerMethod)
		this.comp("methodData").loadData((this.allMethod),true);
	}
	
	//是否选中
	Model.prototype.radio1Change = function(event){
		var row = event.bindingContext.$object;
		var methodData=this.comp("methodData");
		if(event.checked){
			row.val("checked","1");
		}else {
			row.val("checked","0");
		} 
	};
	
	
	//点击data列表
	Model.prototype.tr2Click = function(event){
		var row = event.bindingContext.$object;
		var dataName=row.val("name");
		var filePath="";
		for (var i=0;i<this.dataFiles.length;i++){
			if(dataName==this.dataFiles[i].title){
				this.loadMethodData(this.dataFiles[i]);
			}
		}
	};
	
	
	//点击确认
	Model.prototype.okBtnClick = function(event){
	//获得自定义输入框的值
		var me=this;
		var methodData=this.comp("methodData");
		/*var dataFile=methodData.getFirstRow().row.tableName;
		var dataName=dataFile.substr(0,dataFile.indexOf(".")).replace(/[a-z]/,function(keys){
			return keys.toUpperCase();
		})
		if(inputVal){
			this.owner.send({data:inputVal,state:"custom"});
			this.owner.close();
		}*/
			var rows=methodData.find(["checked"],["1"]);
			if(rows.length>0){
				var currentOwnerMethod=this.allMethod.find(function(item){
					return item.desc === rows[0].val('desc')
				})
				if(!currentOwnerMethod){
					return
				}
				this.owner.send({data:currentOwnerMethod})
				me.owner.close();
			}else{
				justep.Util.hint("至少选择一个服务！");
				return 
			}
		};
	
	
	
	Model.prototype.input1Change = function(event){
		var rpcName=event.value;
		var data = this.comp("rpcNameData");
		if(rpcName){
			var rows = data.find([ "name" ], [ rpcName ]);
			if (rows.length > 0) {
				justep.Util.hint("服务名称不能重复!", {
					type : "danger"
				});
			$('[xid="okBtn"]').attr("disabled",true);
			}else {
				this.comp("customData").setValue("customName",rpcName);
				$('[xid="okBtn"]').attr("disabled",false);
			}
		}
	};
	
	
	
	
	
	
	return Model;
});