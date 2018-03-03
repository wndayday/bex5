define(function(require) {
	var $ = require("jquery");
	var justep = require("$UI/system/lib/justep");
	var constraintsArr = require("../lib/constraintsTags");

	var Model = function() {
		this.callParent();
		this.fieldName = justep.Bind.observable("");
	};

	Model.prototype.NOBtnClick = function(event) {
		this.comp('windowReceiver1').windowCancel();

	};

	Model.prototype.OkBtnClick = function(event) {
		this.isEmpty=false;
		var xmlStrs=this.sendAllcontrants();
		if(this.isEmpty)return;
		this.comp('windowReceiver1').windowEnsure({
			data : {
				xmlStrs : xmlStrs,
				target:this.fieldName.get()
			}
		});
	};


	// 向 ontology·页面传入数据：

	Model.prototype.sendAllcontrants = function() {
		var len = constraintsArr.length;
		var xmlStrs="";
		for (var i = 0; i < len; i++) {
			var item = constraintsArr[i];
			var data = this.comp(item + "Data");
			if (data.count() > 0) {
				var newCols = data.getColumnIDs().split(',').filter(function(item) {
					return item != "name"
				});
				var str="";
				for (var k = 0; k < newCols.length; k++) {
					if(!data.getValue(newCols[k])){
						justep.Util.hint(newCols[k]+"不能为空");
						this.isEmpty=true;
						break;
					}
					str+=" "+newCols[k]+"='"+data.getValue(newCols[k])+"' ";
				}
				xmlStrs+="<"+data.getValue("name")+str+"/>\n";
			}
		}
		return xmlStrs;
	}

	// 接收传过来的数据
	Model.prototype.windowReceiver1Receive = function(event) {
		this.fieldName.set(event.params.field);
		var contranList = event.params.data;
		this.loadAllData(contranList);
		debugger
	};

	// 加载所有的传过来的数据
	Model.prototype.loadAllData = function(list) {
		if (!list)
			return

		for (var i = 0; i < list.length; i++) {
			this.comp(list[i].name + "Data").loadData([ list[i] ], true);
			this.comp(list[i].name + "Data").first();
		}
	}

	// 添加data的方法
	Model.prototype.addData = function(data, tagName) {
		data.newData();
		data.setValue("name", tagName)
	}

	// 删除数据的方法
	Model.prototype.deleteRowsAll = function(data, row) {
		var confirmDelete = data.confirmDelete;
		var directDeleteMode = data.directDeleteMode;
		data.confirmDelete = false;
		data.directDeleteMode = true;
		data.deleteData(row);
	}

	Model.prototype.addBtnClick = function(event) {
		this.addData(this.comp("asserttrueData"), "asserttrue");
	};

	Model.prototype.deleteBtnClick = function(event) {
		var row = this.comp("asserttrueData").getCurrentRow();
		this.deleteRowsAll(this.comp("asserttrueData"), row)
	};

	Model.prototype.addFalseClick = function(event) {
		this.addData(this.comp("assertfalseData"), "assertfalse");
	};

	Model.prototype.delFalseClick = function(event) {
		var row = this.comp("assertfalseData").getCurrentRow();
		this.deleteRowsAll(this.comp("assertfalseData"), row)
	};

	Model.prototype.addNumClick = function(event) {
		this.addData(this.comp("digitsData"), "digits");
	};

	Model.prototype.delNumClick = function(event) {
		var row = this.comp("digitsData").getCurrentRow();
		this.deleteRowsAll(this.comp("digitsData"), row)
	};

	Model.prototype.addSizeClick = function(event) {
		this.addData(this.comp("sizeData"), "size");
	};

	Model.prototype.delSizeClick = function(event) {
		var row = this.comp("sizeData").getCurrentRow();
		this.deleteRowsAll(this.comp("sizeData"), row)
	};

	Model.prototype.addMaxClick = function(event) {
		this.addData(this.comp("maxData"), "max");
	};

	Model.prototype.delMaxClick = function(event) {
		var row = this.comp("maxData").getCurrentRow();
		this.deleteRowsAll(this.comp("maxData"), row)
	};

	Model.prototype.addMinClick = function(event) {
		this.addData(this.comp("minData"), "min");
	};

	Model.prototype.delMinClick = function(event) {
		var row = this.comp("minData").getCurrentRow();
		this.deleteRowsAll(this.comp("minData"), row)
	};

	Model.prototype.addUrlClick = function(event) {
		this.addData(this.comp("urlData"), "url");
	};

	Model.prototype.delUrlClick = function(event) {
		var row = this.comp("urlData").getCurrentRow();
		this.deleteRowsAll(this.comp("urlData"), row)
	};

	Model.prototype.addEmailClick = function(event) {
		this.addData(this.comp("emailData"), "email");
	};

	Model.prototype.delEmailClick = function(event) {
		var row = this.comp("emailData").getCurrentRow();
		this.deleteRowsAll(this.comp("emailData"), row)
	};

	Model.prototype.addRegexpClick = function(event) {
		this.addData(this.comp("patternData"), "pattern");
	};

	Model.prototype.delRegexpClick = function(event) {
		var row = this.comp("patternData").getCurrentRow();
		this.deleteRowsAll(this.comp("patternData"), row)
	};

	Model.prototype.addNollClick = function(event) {
		this.addData(this.comp("notnullData"), "notnull");
	};

	Model.prototype.delNollClick = function(event) {
		var row = this.comp("notnullData").getCurrentRow();
		this.deleteRowsAll(this.comp("notnullData"), row)
	};

	Model.prototype.addEmptyClick = function(event) {
		this.addData(this.comp("notemptyData"), "notempty");
	};

	Model.prototype.delEmptyClick = function(event) {
		var row = this.comp("notemptyData").getCurrentRow();
		this.deleteRowsAll(this.comp("notemptyData"), row)
	};

	Model.prototype.addBlankClick = function(event) {
		this.addData(this.comp("notblankData"), "notblank");
	};

	Model.prototype.delBlankClick = function(event) {
		var row = this.comp("notblankData").getCurrentRow();
		this.deleteRowsAll(this.comp("notblankData"), row)
	};

	Model.prototype.addSafeHtmlClick = function(event) {
		this.addData(this.comp("safehtmlData"), "safehtml");
	};

	Model.prototype.delSafeHtmlClick = function(event) {
		var row = this.comp("safehtmlData").getCurrentRow();
		this.deleteRowsAll(this.comp("safehtmlData"), row)
	};

	Model.prototype.addPastClick = function(event) {
		this.addData(this.comp("pastData"), "past");
	};

	Model.prototype.delPastClick = function(event) {
		var row = this.comp("pastData").getCurrentRow();
		this.deleteRowsAll(this.comp("pastData"), row)
	};

	Model.prototype.addFutureClick = function(event) {
		this.addData(this.comp("futureData"), "future");
	};

	Model.prototype.delFutureClick = function(event) {
		var row = this.comp("futureData").getCurrentRow();
		this.deleteRowsAll(this.comp("futureDatas"), row)
	};

	return Model;
});