define(function(require){
	//var $ = require("jquery");
	var justep = require("$UI/system/lib/justep");
	var xuiService = require("$UI/system/components/designerCommon/js/xuiService");
	var IDEService = require("$UI/system/designer/webIde/common/IDEService");
	var fileService = IDEService.getXCloudService();// 文件服务
	var xmlUtil = require('$UI/system/lib/base/xml');
	
	var Model = function(){
		this.callParent();
		this.propName;
	};

	Model.prototype.getReturnValue = function(event){
			var ret = [];
			this.comp('paramData').each(function(param){
				var row = param.row;
				ret.push(row.val('name') +":"+ row.val('value'));
			});
			if(ret.length>0) return "js:{"+ret.join(',')+"}";
	};

	Model.prototype.modelLoad = function(event){
		var initData = xuiService.getPageParams();
		
		var pageUrl = initData.operationParams && initData.operationParams.url;
		var content = '';
		if(pageUrl){
			var fileContent = fileService.getFileContent({
				filePath : pageUrl.replace("$UI","UI2")
			});
			content = fileContent.content;
		}
		var rows = this.loadPageParam(content);
		
		var data = this.comp('paramData');
		if(rows.length>0){
			data.loadData(rows);
			data.first();
		}
		this.propName = initData.propName;
		var val = initData.propValue;
		if(val){
			val = justep.String.trim(val);
			if(val.substring(0,3) == 'js:')
				val = val.substring(3);
			rows = this.param2Array(val);
			if(rows.length>0){
				data.loadData(rows, true, undefined, undefined, true);	
				data.first();
			}
		}
	};

	Model.prototype.loadPageParam = function(content){
		var ret = [],self = this;
		this.pageParams = {};
		if(content){
			var docRoot = xmlUtil.fromString(content).documentElement;
			$(docRoot).find('[component="$UI/system/components/justep/model/model"] > param').each(function(){
				var o = {name:$(this).attr('name'),isPagaParam:true,label:$(this).attr('label')};
				ret.push(o);
				self.pageParams[o.name] = o;
			});
		}
		return ret;
	};
	
	Model.prototype.param2Array = function(param){
		var ret = [];
		if(param[0]=='{'&&param[param.length-1]=='}'){
			var o = {},c=0,c1=0,c2=0,ib=1,isName=true;
			for(var i=1;i<param.length-1;i++){
				if(param[i]==='{') c++;
				else if(param[i]==='}') c--;
				else if(param[i]==='"' && c2===0) c1===0?c1++:c1--;
				else if(param[i]==="'" && c1===0) c2===0?c2++:c2--;
				else if(param[i]===':' && isName){
					o.name = param.substring(ib,i);
					var p = this.pageParams[o.name];
					if(p){
						$.extend(o,p);
					}
					isName = false;
					ib = i+1;
				}else if(param[i]===',' && c===0 && c1===0 && c2===0 && !isName){
					o.value = param.substring(ib,i);
					isName = true;
					ib = i+1;
					ret.push(o);
					o = {};
				}
			}
			if(c===0 && c1===0 && c2===0 && i>=ib && !isName){
				o.value = param.substring(ib,i);
				ret.push(o);
			}
		}
		return ret;
	};
	
	Model.prototype.button1Click = function(event){
		var row = event.bindingContext.$object;
		xuiService.openEditor("jSExpressionEditor", {
			propName : "OPParam",
			propValue: row.val("value")
		}, function(result) {
			row.val("value", result.value);
		});
	};

	Model.prototype.addBtnClick = function(event){
		this.comp('paramData').newData();
	};

	Model.prototype.deleteBtnClick = function(event){
		this.comp('paramData').deleteData();
	};

	return Model;
});