define(function(require){
	var $ = require("jquery");
	var justep = require("$UI/system/lib/justep");
	var XML = require("$UI/system/lib/base/xml");
	var xuiService = require("$UI/system/components/designerCommon/js/xuiService");
	var bizModel = require("$UI/system/designer/webIde/bizDesigner/common/bizModel");
	var OperateMfile = require("$UI/system/designer/webIde/quickIde/propPages/common/operateMfile");
	
	var Model = function(){
		this.callParent();
		this.datas = [];
		this.temp = 1;
		this.returnResult;
	};
	
	Model.prototype.beforeOkAction = function() {
		var data = this.comp('tableData').getCurrentRow();
		if(!data.val('name')){
			return "数据集名称必须填写!";
		}else if(!data.val('groupBy')){
			return "分组列必须填写!";
		}else if(!data.val('cols')){
			return "必须定义统计列!";
		} else{
			return "";
		}
		
	};
	
	//点击确定按钮后执行操作，返回xid
	Model.prototype.getReturnValue = function() {
		var self = this;
		var data = this.comp('tableData').getCurrentRow();

		//删除原有data片段
		var xid = data.val('xid');
		var did, i;
		for(i = 0; i<self.datas.length; i++){
			if($(self.datas[i]).attr('xid') == xid){
				did = $(self.datas[i]).attr('d_id');
				self.mainModel.callDesignerMethod("removeSelections",{noUpdatePropEditor:true,ids:[did]});
			}
		}
		
		
		//拼接返回data片段
		var arr = ["component","url","groupBy","className","xid","autoLoad","orderBy","_orderBy_label"];
		
		var str = "<div></div>";
		var content = $(XML.fromString(str).documentElement);
		for(i=0; i<arr.length; i++){
			if(arr[i] == "className"){
					if(data.val(arr[i])){
						content.attr(arr[i],self.appPath+"/"+data.val(arr[i]));
							}
				}else{
					if(data.val(arr[i])){
						content.attr(arr[i],data.val(arr[i]));
							}
				}
			
		}
		if(did){
			content.attr("d_id",did);
		}
		var colsDef = data.val("cols");
		if(colsDef){
				colsDef = JSON.parse(colsDef);
				if($.isArray(colsDef) && colsDef.length>0)
					$.each(colsDef, function(i,v){
						var $item = $("<column></column>");
						if(v.name) $item.attr("name",v.name);
						if(v.label) $item.attr("label",v.label);
						if(v.fn) $item.attr("fn",v.fn);
						if(v.field) $item.attr("field",v.field);
						content.append($item);
					});
			}
		if(data.val("filter")){
				var $f = $("<filter></filter>");
				$f.attr("name","_system_");
				$f.attr("_filter_label",data.val('_filter_label'));
				$f.text(data.val("filter"));
				content.append($f);
			}
		if(data.val("having")){
				var $h = $("<having></having>");
				$h.attr("name","_system_");
				$h.attr("_having_label",data.val('_having_label'));
				$h.text(data.val("having"));
				content.append($h);
			}
		if(data.val("name")){
			  content.attr("label",data.val("name"));
				//content.append("<label>"+data.val("name")+"</label>");
			}
		//获取model——did
		var xml = this.modelXml.find("div[component='$UI/system/components/justep/model/model']");
		var d_id = $(xml[0]).attr("d_id");
		//新增data片段
		this.mainModel.callDesignerMethod("createComponent",{templateContent:content[0].outerHTML,autoSelect:false,componentName:"$UI/system/components/justep/data/aggregateData",parent:d_id},function(result){     });
	
		var row = this.comp('tableData').getCurrentRow();
		if(row){
			xid = row.val('xid');
		}
		var ret = {
		};
		ret[self.returnResult] = xid;
		
		return ret;
	};



	Model.prototype.modelLoad = function(event){
		var path = sessionStorage.getItem("appPath");
		this.appPath = path.substring(path.indexOf("/"));
		var list = OperateMfile.getAllFilesName();
		this.comp('dataObjects').loadData({
			"@type" : "table",
			"rows" : list
		}); 

		var initData = xuiService.getPageParams();
		this.returnResult = initData.propName;
		this.mainModel = initData.mainModel;
		this.modelXml = $(XML.fromString(initData.modelXml).documentElement);
		this.datas = this.modelXml.find("div[component='$UI/system/components/justep/data/aggregateData']");
	
		
		
		if(!initData.xid){
			var xid = this.mainModel.callDesignerMethod("genaId","$UI/system/components/justep/data/aggregateData");
			this.comp('tableData').newData({
				defaultValues:[{
					xid: xid,
					component:"$UI/system/components/justep/data/aggregateData",
					url:"/dbrest",
					autoLoad:'true'
				}]
			});
		}else{
			var jsonList =  []; 
			var xml = this.modelXml.find("div[xid='"+initData.xid+"']");
			var attrs = xml[0].attributes;
			var item = {};
			for(var j = 0;j<attrs.length;j+=1){
				var attr = attrs[j];
				item[attr.name] = attr.value;
			}
			if('false'!==item['autoLoad']) item['autoLoad']='true'; 
			var $filter = $(xml[0]).find(">filter");
			if($filter.length>0){
				item["filter"] = $filter.text().trim();
				item["_filter_label"] = $filter.attr("_filter_label") || item["filter"];
			}
			var $having = $(xml[0]).find(">having");
			if($having.length>0){
				item["having"] = $having.text().trim();
				item["_having_label"] = $having.attr("_having_label") || item["having"];
			}
			var $cols = $(xml[0]).find(">column");
			if($cols.length>0){
				var cols = [],colsLabel = [];
				$cols.each(function(){
					var $item = $(this);
					var label = $item.attr("label");
					var fn = $item.attr("fn");
					var name = $item.attr("name");
					var field = $item.attr("field");
					cols.push({
						name : name,
						label : label,
						fn : fn,
						field : field
					});					
					if(fn) colsLabel.push(justep.String.format("{0}[{1}({2})]", label, fn, field));
					else colsLabel.push(justep.String.format("{0}[{1}]", label, field));
				});
				item["cols"] = JSON.stringify(cols);
				item["_cols_label"] = colsLabel.join();
			}
			item["name"] = $(xml[0]).attr("label");
			item["groupBy"] = $(xml[0]).attr("groupBy");
			item["_groupBy_label"] = $(xml[0]).attr("_groupBy_label") || item["groupBy"];
			var className2 = item.className;
			item.className = className2.substring(className2.lastIndexOf("/")+1);
			jsonList.push(item);
			this.comp('tableData').loadData(jsonList);
			this.comp('tableData').first();			
		}		
	};




//新增数据对象按钮
	Model.prototype.addDataObjectBtnClick = function(event){		
		this.comp('windowDialog').open({data:{
			flag:"add"
		}});
	};
	
	
	//修改数据对象
	Model.prototype.editDataObjectBtnClick = function(event){
		var className = this.comp('tableData').val('className');
		if(!className){
			justep.Util.hint("编辑前请先选中一个数据对象!");
			return;
		}
		var rows = this.comp('dataObjects').find(["name"],[className]);
		var path = rows[0].val('path');
		this.comp('windowDialog').open({data:{
			path:path,
			flag:"edit",
			name:className
		}});
	};
	
	//选择分组列按钮
	Model.prototype.chooseGroupByBtnClick = function(event){
		var row = this.comp('tableData').getCurrentRow();
		if(!row.val('className')){
			justep.Util.hint("请先选择数据对象");
			return;
		}
		var rows = this.comp('dataObjects').find(['name'],[row.val('className')]);
		var path = rows[0].val('path');
		this.comp('windowDialog1').open({data:path});
	};
	
	//接收选择列返回参数
	Model.prototype.windowDialog1Receive = function(event){
		var rows = event.data.data;
		var columnLabel = [];
		var columns = [];
		for(var i = 0; i<rows.length; i++){
			columns.push(rows[i].val('name'));
			if(!rows[i].val('label')){
				columnLabel.push(rows[i].val('name'));
			}else{
				columnLabel.push(rows[i].val('label'));
			}
		}
		this.comp('tableData').setValue("_groupBy_label",columnLabel.join(","));
		this.comp('tableData').setValue("groupBy",columns.join(","));		
	};
	
	//接收新增对象返回
	Model.prototype.windowDialogReceive = function(event){
		var self = this;
		if(event.data.data.flag == "add"){
			var path = "service"+self.appPath+"/"+event.data.data.name+".data.m";
			this.bizDoc = bizModel.loadFile(path, true);
			var label = event.data.data.label;
			this.comp('dataObjects').newData({
				defaultValues:[{
					name:event.data.data.name,
					path:"service"+self.appPath+"/"+event.data.data.name+".data.m",
					label: label
				}]
			});
			this.comp('tableData').setValue("className",event.data.data.name);
		}else if(event.data.data.flag == "edit"){
			var rows = this.comp('dataObjects').find(['name'],[event.data.data.name]);
			this.comp('dataObjects').setValue("label",event.data.data.label,rows[0]);
		}
		
	};

	Model.prototype.tableDataValueChange = function(event){
		if(event.col == "className"){
			event.row.val("groupBy","");
			event.row.val("_groupBy_label","");
			event.row.val("having","");
			event.row.val("_having_label","");
			event.row.val("filter","");
			event.row.val("_filter_label","");
			event.row.val("cols","");
			event.row.val("_cols_label","");
			
			if(!event.row.val('name')){
				var data = this.comp('dataObjects');
				var row = data.getRowByID(event.newValue);
				event.row.val('name',row?row.val('label'):event.newValue);
			}
		}
	};

	/*//新增data
	Model.prototype.addBtnClick = function(event){
		this.comp('tableData').newData({
				defaultValues:[{
					xid: justep.UUID.createUUID(),
					component:"$UI/system/components/justep/data/restData",
					url:"https://postgrest.herokuapp.com",
					name:"示例数据"+this.temp++
				}]
			});
	};*/

	Model.prototype.filterBtnClick = function(event){
		var row = this.comp('tableData').getCurrentRow();
		if(!row.val('className')){
			justep.Util.hint("请先选择数据对象");
			return;
		}
		var filterValue = row.val('filter');
		var rows = this.comp('dataObjects').find(['name'],[row.val('className')]);
		var path = rows[0].val('path');
		var data = {
				path:path,
				filterValue:filterValue
		};
		this.comp('filterDialog').open({data:data});		
	};	

	Model.prototype.filterDialogReceive = function(event){
		var data = event.data.data;
		var filterLabelArr = [];
		var filterArr = [];
		data.each(function(option){
			filterLabelArr.push(option.row.val('columnLabel')+option.row.val('operatorLabel')+option.row.val('value'));
			filterArr.push(option.row.val('operator')+"("+option.row.val('column')+","+option.row.val('value')+")");
		});
		this.comp('tableData').setValue("_filter_label",filterLabelArr.join("并且"));
		this.comp('tableData').setValue("filter",filterArr.join("."));
	};	

	
	//鼠标移入提示框
	Model.prototype.button2Mouseover = function(event){
		this.getElementByXid("div2").style.visibility = "visible";
	};
	
	//鼠标移出提示框
	Model.prototype.button2Mouseout = function(event){
		this.getElementByXid("div2").style.visibility = "hidden";
	};
	
	Model.prototype.chooseColsBtnClick = function(event){
		var tableData = this.comp('tableData');
		var agg = tableData.val('cols');
		var aggLabel = tableData.val('_cols_label');
		var groupBy = tableData.val('groupBy');
		var name = tableData.val('className');
		if(!name){
			justep.Util.hint("请先选择数据对象");
			return;
		}
		var data = {};
		var rows = this.comp('dataObjects').find(['name'],[name]);
		var path = rows[0].val('path');
		data.path=path;
		data.agg = agg;
		data.aggLabel = aggLabel;
		data.groupBy = groupBy;
		this.comp('colsDialog').open({data:data});
	};
	

	Model.prototype.havingBtnClick = function(event){
		var row = this.comp('tableData').getCurrentRow();
		if(!row.val('className')){
			justep.Util.hint("请先选择数据对象");
			return;
		}
		var havingValue = row.val('having');
		var rows = this.comp('dataObjects').find(['name'],[row.val('className')]);
		var path = rows[0].val('path');
		var data = {
				path:path,
				havingValue:havingValue
		};
		this.comp('havingDialog').open({data:data});		
	};
	

	Model.prototype.colsDialogReceive = function(event){
		var colsDef = event.data.data||{};
		this.comp('tableData').setValue("_cols_label",colsDef.aggLabel||"");
		this.comp('tableData').setValue("cols",colsDef.agg||"");		
	};
	
	//排序选择按钮
	Model.prototype.orderByBtnClick = function(event){
		var className = this.comp('tableData').val('className');
		if(!className){
			justep.Util.hint("请先选择数据对象");
			return;
		}
		var value = this.comp('tableData').val('orderBy');
		var rows = this.comp('dataObjects').find(['name'],[className]);
		var path = rows[0].val('path');
		var data = {
				path:path,
				value:value
		};

		
		this.comp('orderByDialog').open({data:data});
	};
	
	//接收排序返回参数
	Model.prototype.orderByDialogReceive = function(event){
		var orderBy = "";
		var orderByLabel = "";
		if(event.data.data){
			orderBy = event.data.data.orderby;
			orderByLabel = event.data.data.orderbyLabel;
		}
		this.comp('tableData').setValue("orderBy",orderBy);
		this.comp('tableData').setValue("_orderBy_label",orderByLabel);
	};

	Model.prototype.havingDialogReceive = function(event){
		var data = event.data.data;
		var havingLabelArr = [];
		var havingArr = [];
		data.each(function(option){
			havingLabelArr.push(justep.String.format("{0}({1}){2}{3}",
					option.row.val('aggOpLabel'),
					option.row.val('columnLabel'),
					option.row.val('operatorLabel'),
					option.row.val('value')));
			//havingLabelArr.push(option.row.val('columnLabel')+option.row.val('operatorLabel')+option.row.val('value'));
			havingArr.push(justep.String.format("{0}('{1}({2})',{3})",
					option.row.val('operator'),
					option.row.val('aggOp'),
					option.row.val('column'),
					option.row.val('value')));
			//havingArr.push(+"("+option.row.val('column')+","+option.row.val('value')+")");
		});
		this.comp('tableData').setValue("_having_label",havingLabelArr.join("并且"));
		this.comp('tableData').setValue("having",havingArr.join("."));
	};

	return Model;
});