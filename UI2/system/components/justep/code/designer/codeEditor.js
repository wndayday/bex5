define(function(require){
	//var $ = require("jquery");
	require("css!$UI/system/designer/webIde/lib/codemirror/lib/codemirror").load();
	var justep = require("$UI/system/lib/justep");
	var xuiService = require("$UI/system/components/designerCommon/js/xuiService");
	var xuiDoc = xuiService.getXuiDoc();

	var CodeMirror = require("$UI/system/designer/webIde/lib/codemirror/lib/codemirror");
	require("$UI/system/designer/webIde/lib/codemirror/mode/javascript/javascript");
	
	var Model = function(){
		this.callParent();
		this.code = justep.Bind.observable("");
	};

	Model.prototype.createJSEditor = function(textarea){
		this.cm = CodeMirror.fromTextArea(textarea, {
			lineNumbers: true,
			value: this.code.peek()||" ",
			mode: "javascript"
		});
		this.cm.setSize('100%','200px');
	};
	  
	Model.prototype.modelLoad = function(event){ 
		var initData = xuiService.getPageParams();// 获取传入的参数
		var params = initData.codeParams || initData.propValue;
		if(params){
			if(params){
				try{
					params = eval('('+params+')');
				}catch(e){
					//忽略json序列化错误}
				}
			}
			this.comp('mainData').loadData(params);
		}
		var code = xuiDoc.getJSMethodContent({
			name : initData.name
		});
		var content = code.content||"";
		if(content[0]==='{' && content[content.length-1]==='}') content = content.substring(1, content.length-1);
		this.code.set(content);
		var self = this;
		window.setTimeout(function(){//延迟创建
			self.createJSEditor(self.comp('code').domNode);
		},100);
	};

	Model.prototype.getReturnValue = function(){
		this.code.set(this.cm.doc.getValue());
		var params = []; 
		var data = this.comp('mainData');
		data.each(function(param){
			var row = param.row,o = {};
			o.name = row.val('name');
			o.displayName = row.val('displayName');
			o.type = row.val('type');
			o.defaultValue = row.val('defaultValue');
			o.required = !!row.val('required');
			params.push(o);
		});
		return {
			params: params,
			code : "{"+this.code.peek()+"}"
		}; 
	};
	
	return Model;
});