define(function(require){
	var IDEService = require("$UI/system/designer/webIde/common/IDEService");
		
	var Model = function(){
		this.callParent();
		this.filterValue = "";
		this.multiSelect = justep.Bind.observable(true);
 
	};
 
	/**
	 * 参数接收
	 * @param event
	 */
	Model.prototype.modelParamsReceive = function(event){ 
		var params = event.params;
		if(params){
			this.modelName = params.modelName;		
		} 
		var dataTables1 = this.comp('dataTables1'); 
		var dataTables3 = this.comp('dataTables3'); 
		this.propName = params.propName; 
		if(params.multiSelect == false){
			this.multiSelect.set(false);
		}
				
		//获取数据
		var data = IDEService.callService({name:"com.justep.studio.servicehanler.RelationDatasource.getDatasource",params:params});

		for ( var i = data.length-1; i >= 0 ; i--) {
			//删除主键列、版本列
			if(data[i].label == undefined || data[i].name == "version" ){
				data.splice(i,1);
			}
		}
		var columnData = this.comp('data1');
		columnData.loadData({
			"@type" : "table",
			"rows" : data
		});
		columnData.first();
	
		dataTables1.reload();
		dataTables3.reload();
		
		if(this.multiSelect.get() == true){
			var value = params.value;
			var arr = [];
			if(value){
				arr = value.split(',')
			}
			for(var i = 0; i<arr.length; i++){
				var row = columnData.getRowByID(arr[i]);
				dataTables1.setRowChecked(row,true);
			}
		}
		
		
		//处理数据
		
		 
	};
	
	
	Model.prototype.getReturnValue = function(){
		var config = {};
		var me = this;
		if(this.propName){
			var arr = [];
			if(me.multiSelect.get() == true){
				var rows = me.comp('dataTables1').getCheckeds();
				for(var i = 0; i<rows.length; i++){
					arr.push(rows[i].val('name'));
				}
			}else{
				var row = me.comp('dataTables3').getSelection();
					arr.push(row.val('name'));
			}

			config[this.propName] = arr.join(',');//选中的值在这里返回，选择多个用逗号分隔
			return config;
		}else{ 
			var arr = [];
			if(me.multiSelect.get() == true){
				var rows = me.comp('dataTables1').getCheckeds();
				for(var i = 0; i<rows.length; i++){
					arr.push({
						name:rows[i].val('name'),
						label:rows[i].val('label'),
						"data-type":rows[i].val('data-type'),
						alias:rows[i].val('alias'),
						type:rows[i].val('type'),
						required:rows[i].val('required'),
						selected:rows[i].val('selected')
					});
				}
			}else{
				var row = me.comp('dataTables3').getSelection();
					arr.push({
						name:row.val('name'),
						label:row.val('label'),
						"data-type":row.val('data-type'),
						alias:row.val('alias'),
						type:row.val('type'),
						required:row.val('required'),
						selected:row.val('selected')
					
					});
			}
			return arr;
		}
		
	};
	
	Model.prototype.filter = function(name){
		if(this.filterValue === ""){
			return true;
		}else{
			if(name.toLowerCase().indexOf(this.filterValue.toLowerCase()) > -1){
				return true;
			}else{
				return false;
			}
		}
	};
	Model.prototype.filter2 = function(name){
		if(this.filterValue === ""){
			return true;
		}else{
			if(name.toLowerCase().indexOf(this.filterValue.toLowerCase()) > -1){
				return true;
			}else{
				return false;
			}
		}
	};


	Model.prototype.searchInputKeyup = function(event){
		if(this.timer){
		  clearTimeout(this.timer);
		}
		var self = this;
		this.timer = setTimeout(function(){
		   var v = self.comp("searchInput").$domNode.val();
		   self.filterValue = v;
			self.comp('dataTables1').reload();
			self.comp('dataTables3').reload();
		   //
		},100)
		
	};
	
	
	return Model;
});