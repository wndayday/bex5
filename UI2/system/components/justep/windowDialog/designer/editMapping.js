define(function(require){
	var $ = require("jquery");
	var justep = require("$UI/system/lib/justep");
	var XML = require("$UI/system/lib/base/xml");
	var xuiService = require("$UI/system/components/designerCommon/js/xuiService");
	var ideService = require("$UI/system/designer/webIde/common/IDEService");
	var xCloudService = ideService.getXCloudService();
	var xuiDoc = xuiService.getXuiDoc();
	 
	
	var getFileContent = function(filePath){
		var result = xCloudService.getFileContent({filePath:filePath});
		 
		return result.content;
	};
	
	var Model = function(){
		this.callParent();
		this.toDatas = justep.Bind.observableArray();
		this.fromDatas = justep.Bind.observableArray();
		this.toData = justep.Bind.observable();
		this.fromData = justep.Bind.observable();
		this.doKind = justep.Bind.observable("edit");
	};

	Model.prototype.getSelfDatas = function(){
		var ret = [];
		this.$modelRoot.find("[component^='$UI/system/components/justep/data/']").each(function(){
			ret.push({
				xid : $(this).attr("xid"),
				did: $(this).attr("d_id")
			});
		});
		return ret;
	};
	
	Model.prototype.getSelfDataCols = function(data_did){
		var cols = xuiDoc.getEditorDataSource("RuleRelationDatasource.getDatasource",{},data_did);
		var ret = [];
		$.each(cols,function(i,col){
			ret.push({
				xid: col.name,
				name: col.label+"["+col.name+"]"
			});
		});	
		return ret;
	};
	
	Model.prototype.getOriDatas = function(){
		var ret = [];
		this.$oriModelRoot.find("[component^='$UI/system/components/justep/data/']").each(function(){
			ret.push({
				xid : $(this).attr("xid"),
				did: $(this).attr("d_id"),
				nodeXml: XML.toString(this)
			});
		});
		return ret;
	};
	
	Model.prototype.getOriDataCols = function(data_nodeXml){
		var cols = ideService.callService({name:"com.justep.studio.servicehanler.RuleRelationDatasource.getDatasource",
			params:{
				nodeXml: data_nodeXml,
				filePath: this.oriSrc
			}});
		var ret = [];
		$.each(cols,function(i,col){
			ret.push({
				xid: col.name,
				name: col.label+"["+col.name+"]"
			});
		});	
		return ret;
	};
	
	Model.prototype.modelLoad = function(event){
		var initData = xuiService.getPageParams();// 获取传入的参数
		this.$modelRoot = $(initData.modelRoot);
		this.oriSrc = initData.src;
		if(this.oriSrc.indexOf("$UI/")===0) this.oriSrc = this.oriSrc.substring(4); 
		var oriModelRoot = getFileContent(this.oriSrc);
		this.$oriModelRoot = $(XML.fromString(oriModelRoot).documentElement);
		this.toDatas.push.apply(this.toDatas,this.getSelfDatas());
		this.fromDatas.push.apply(this.fromDatas,this.getOriDatas());
		var self = this;
		this.fromData.subscribe(function(val) {//变化后
			var datas = self.fromDatas.peek(),data;
			$.each(datas,function(i,v){
				if(v.xid===val){
				  data = v;
				  return false;
				}
			});
			self.comp('dataFrom').clear();
			if(data){
				var cols = self.getOriDataCols(data.nodeXml);
				self.comp('dataFrom').loadData(cols,true);
				self.comp('dataFrom').first();
			}
		});
		this.toData.subscribe(function(val) {//变化后
			var datas = self.toDatas.peek(),data;
			$.each(datas,function(i,v){
				if(v.xid===val){
				  data = v;
				  return false;
				}
			});
			self.comp('dataTo').clear();
			if(data){
				var cols = self.getSelfDataCols(data.did);
				self.comp('dataTo').loadData(cols,true);
				self.comp('dataTo').first();
			}
		});
		
		var $xml = $(initData.xml);
		var $mapping = $xml.children("result");
		if($mapping.size()>=0){
			this.toData.set($mapping.attr("concept"));
			this.fromData.set($mapping.attr("origin"));
			this.doKind.set($mapping.attr("operation")||'edit');
			var rows = [];
			var dataTo = this.comp('dataTo');
			var dataFrom = this.comp('dataFrom');
			$mapping.children('mapping').each(function(){
				var $m = $(this);
				var toCol = $m.attr('to');
				var r = dataTo.getRowByID(toCol);
				var toColName = r?r.val('name'):toCol;
				var fromCol = $m.attr('from');
				r = dataFrom.getRowByID(fromCol);
				var fromColName = r?r.val('name'):fromCol;
				var locator = $m.attr('locator')==='true';
				rows.push({
					id:fromCol+"_"+toCol,   
					fromCol:fromCol,  
					toCol: toCol,  
					fromColName:fromColName,  
					toColName: toColName,  
					locator: locator 
				});
			});
			if(rows.length>0)
				this.comp('dataMapping').newData({defaultValues:rows});
		}
	};

	Model.prototype.beforeOkAction = function(){
		var data = this.comp('dataMapping');
		if(!this.toData.peek()||!this.fromData.peek()||data.getCount()<=0){
			return "请先设置映射关系";
		}		
	};
	
	/**
	 * 获取返回值，点击确定后调用的方法,必须是一个json格式的数据 .
	 */
	Model.prototype.getReturnValue = function(){
    /*
    <result concept="data" operation="edit" origin="data" xid="default6"> 
      <mapping from="id" to="id" locator="true" xid="default7"/>  
      <mapping from="name" to="name" xid="default8"/>  
      <mapping from="age" to="age" xid="default9"/>
    </result>
    */
		var ret = [];
		var data = this.comp('dataMapping');
		var toData = this.toData.peek();
		var fromData = this.fromData.peek();
		var doKind = this.doKind.peek();
		ret.push(justep.String.format("<result operation='{0}' concept='{1}' origin='{2}'>",doKind,toData,fromData));
		data.each(function(param){
			ret.push(justep.String.format("<mapping from='{0}' to='{1}' {2}/>",param.row.val('fromCol'),param.row.val('toCol'),(!param.row.val('locator')?"":"locator='true'")));
		});
		ret.push("</result>");
		return {mapping:ret.join("")};
    };

	Model.prototype.btnAddClick = function(event){
		var toCol = this.comp('dataTo').val('xid');
		var toColName = this.comp('dataTo').val('name');
		var fromCol = this.comp('dataFrom').val('xid');
		var fromColName = this.comp('dataFrom').val('name');
		var data = this.comp('dataMapping');
		data.newData({defaultValues:[{
			id:fromCol+"_"+toCol,   
			fromCol:fromCol,  
			toCol: toCol,  
			fromColName:fromColName,  
			toColName: toColName,  
			locator: false 
		}]});
		this.comp('dataTo').next();
		this.comp('dataFrom').next();
	};

	Model.prototype.btnDeleteClick = function(event){
		var data = this.comp('dataMapping');
		data.deleteData();
	};

	Model.prototype.btnDelAllClick = function(event){
		this.comp('dataMapping').clear();
	};

	return Model;
});