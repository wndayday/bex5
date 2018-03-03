define(function(require) {
	var $ = require("jquery");
	//require("$UI/system/designer/webIde/quickIde/js/jquery.qrcode.min");
	//var util = require("$UI/system/designer/webIde/quickIde/js/util");
	var IDEService = require("$UI/system/designer/webIde/common/IDEService");
	var xCloudService = IDEService.getXCloudService();
	var clsName = "com.justep.studio.servicehanler.BizAppService";
	
	var Model = function() {
		this.callParent();
		this.type = justep.Bind.observable(100);
		this.userId = justep.Bind.observable("");
	};

	Model.prototype.callService = function(name, params, success) {
		return IDEService.callService({
			name : clsName + "." + name,
			params : params,
			success : success
		});
	};

	Model.prototype.modelLoad = function(event) {
		var self = this;
		$(".allkind").click(function() {
			$(self.getElementByXid("sortsButtonGroup")).find("a").removeClass("active")
			$(this).addClass("active");
		});
	};

	Model.prototype.catalogDataCustomRefresh = function(event) {
		var self = this;
		var limit = event.limit, offset = event.offset / limit + 1;
		var append = event.options && event.options.append;
		if (this.type.get() == 100) {// 全部模板
			this.callService("getUsefulComponent", {
				"limit" : limit,
				"offset" : offset
			}, function(results) {
				var result = JSON.parse(results.result);
				//var result = {"@type":"table","totalNum":"2","rows":[{"APPROVAL_STATUS":{"value":"3"},"CATALOG_ID":{},"CATEGORY":{"value":"2"},"CATEGORY_NAME":{"value":"生活"},"coverUrl":{"value":"data:image/jpeg;base64,/9j/4QAYRXhpZgAASUkqAAgAAAAAAAAAAAAAAP/sABFEdWNreQAB…g9HyB+SH4PR8gfkh+D0fIH5Ifg9HyB+SH4PR8gfkh+D0fIH5JB/wDx6PkD8kn8H3UfIcfkH//Z"},"CREATE_AT":{"value":"2016-12-23T15:02:33.000Z"},"CREATE_BY":{"value":"33d632e3338211e68cc9025e88e866ab"},"CREATE_BY_NAME":{"value":"justep"},"CYCLE":{},"DESCRIPTION":{},"DEVICE_TYPE":{"value":"1"},"INDEX_URL":{},"IS_SELL_SOURCE":{},"LOCKED":{},"npmName":{"value":"UI2"},"PATH":{},"price":{"value":"0.00"},"PROJECT_ID":{"value":"fdc109aeac9f11e6b119005056261c08"},"REMARK":{},"SCHEMA_ID":{},"TAG":{"value":"1"},"TEMP_ID":{},"TEMP_PATH":{"value":"/ide/templates/33d7f936338211e68cc9025e88e866ab/C75932AA14200001347E16B03C2D1F98/UI2.zip"},"TENANT_ID":{"value":"33d7f936338211e68cc9025e88e866ab"},"TITLE":{"value":"temp"},"TYPE":{"value":"1"},"TYPE_NAME":{},"UPDATE_AT":{},"UPDATE_BY":{},"USABLE_STATUS":{"value":"1"},"VERSION":{"value":"1.1"},"VIEW_COUNT":{"value":3},"userdata":{"isModified":false,"id":{"value":"0d659d72c8de11e6ac6b005056261c08"}}},{"APPROVAL_STATUS":{"value":"3"},"CATALOG_ID":{},"CATEGORY":{"value":"2"},"CATEGORY_NAME":{"value":"生活"},"coverUrl":{"value":"data:image/jpeg;base64,/9j/4QAYRXhpZgAASUkqAAgAAAAAAAAAAAAAAP/sABFEdWNreQAB…fOjIwYbe2+jJH7XN+dGRgnBZudGf3m/OmRMjAMC09hagMyjdTvCWBk0h1DT3EIweSUk/SiA//Z"},"CREATE_AT":{"value":"2016-12-30T17:09:18.000Z"},"CREATE_BY":{"value":"33d632e3338211e68cc9025e88e866ab"},"CREATE_BY_NAME":{"value":"justep"},"CYCLE":{},"DESCRIPTION":{},"DEVICE_TYPE":{"value":"1"},"INDEX_URL":{},"IS_SELL_SOURCE":{},"LOCKED":{},"npmName":{"value":"taobao2117018"},"PATH":{},"price":{"value":"0.00"},"PROJECT_ID":{},"REMARK":{},"SCHEMA_ID":{},"TAG":{"value":"1"},"TEMP_ID":{},"TEMP_PATH":{"value":"/ide/templates/33d7f936338211e68cc9025e88e866ab/C75B7AB309800001697F376310B2F190/taobao2117018.zip"},"TENANT_ID":{"value":"33d7f936338211e68cc9025e88e866ab"},"TITLE":{"value":"bbbbbbbbb"},"TYPE":{"value":"1"},"TYPE_NAME":{},"UPDATE_AT":{},"UPDATE_BY":{},"USABLE_STATUS":{"value":"0"},"VERSION":{"value":"1.1"},"VIEW_COUNT":{"value":20},"userdata":{"isModified":false,"id":{"value":"ed1324b4ce6f11e6ac6b005056261c08"}}}],"userdata":{"idColumnDefine":"Catalog","idColumnName":"Catalog","idColumnType":"String","model":"/erp/app/data","relationAlias":"APPROVAL_STATUS,CATALOG_ID,CATEGORY,CATEGORY_NAME,coverUrl,CREATE_AT,CREATE_BY,CREATE_BY_NAME,CYCLE,DESCRIPTION,DEVICE_TYPE,INDEX_URL,IS_SELL_SOURCE,LOCKED,npmName,PATH,price,PROJECT_ID,REMARK,SCHEMA_ID,TAG,TEMP_ID,TEMP_PATH,TENANT_ID,TITLE,TYPE,TYPE_NAME,UPDATE_AT,UPDATE_BY,USABLE_STATUS,VERSION,VIEW_COUNT","relationTypes":"String,String,String,String,String,DateTime,String,String,Integer,String,String,String,Integer,String,String,String,Decimal,String,String,String,String,String,String,String,String,String,String,DateTime,String,String,String,Integer","relations":"Catalog.APPROVAL_STATUS,Catalog.CATALOG_ID,Catalog.CATEGORY,Catalog.CATEGORY_NAME,Catalog.coverUrl,Catalog.CREATE_AT,Catalog.CREATE_BY,Catalog.CREATE_BY_NAME,Catalog.CYCLE,Catalog.DESCRIPTION,Catalog.DEVICE_TYPE,Catalog.INDEX_URL,Catalog.IS_SELL_SOURCE,Catalog.LOCKED,Catalog.npmName,Catalog.PATH,Catalog.price,Catalog.PROJECT_ID,Catalog.REMARK,Catalog.SCHEMA_ID,Catalog.TAG,Catalog.TEMP_ID,Catalog.TEMP_PATH,Catalog.TENANT_ID,Catalog.TITLE,Catalog.TYPE,Catalog.TYPE_NAME,Catalog.UPDATE_AT,Catalog.UPDATE_BY,Catalog.USABLE_STATUS,Catalog.VERSION,Catalog.VIEW_COUNT","sys.count":2,"sys.rowid":"Catalog","updateMode":"whereVersion"}};
				event.source.setTotal(result.totalNum)
				event.source.loadData(result.rows);
				event.source.first();
				event.source.doRefreshAfter(true, event.options)
			});
			$("[xid=modelAdmin]").css("display", "block");
		} else {// 分类筛选
			var code = this.type.get()
			this.callService("getUsefulComponent", {
				"category" : code,
				"limit" : limit,
				"offset" : offset
			}, function(results) {
				var result = JSON.parse(results.result);
				//var result = {"@type":"table","totalNum":"2","rows":[{"APPROVAL_STATUS":{"value":"3"},"CATALOG_ID":{},"CATEGORY":{"value":"2"},"CATEGORY_NAME":{"value":"生活"},"coverUrl":{"value":"data:image/jpeg;base64,/9j/4QAYRXhpZgAASUkqAAgAAAAAAAAAAAAAAP/sABFEdWNreQAB…g9HyB+SH4PR8gfkh+D0fIH5Ifg9HyB+SH4PR8gfkh+D0fIH5JB/wDx6PkD8kn8H3UfIcfkH//Z"},"CREATE_AT":{"value":"2016-12-23T15:02:33.000Z"},"CREATE_BY":{"value":"33d632e3338211e68cc9025e88e866ab"},"CREATE_BY_NAME":{"value":"justep"},"CYCLE":{},"DESCRIPTION":{},"DEVICE_TYPE":{"value":"1"},"INDEX_URL":{},"IS_SELL_SOURCE":{},"LOCKED":{},"npmName":{"value":"UI2"},"PATH":{},"price":{"value":"0.00"},"PROJECT_ID":{"value":"fdc109aeac9f11e6b119005056261c08"},"REMARK":{},"SCHEMA_ID":{},"TAG":{"value":"1"},"TEMP_ID":{},"TEMP_PATH":{"value":"/ide/templates/33d7f936338211e68cc9025e88e866ab/C75932AA14200001347E16B03C2D1F98/UI2.zip"},"TENANT_ID":{"value":"33d7f936338211e68cc9025e88e866ab"},"TITLE":{"value":"temp"},"TYPE":{"value":"1"},"TYPE_NAME":{},"UPDATE_AT":{},"UPDATE_BY":{},"USABLE_STATUS":{"value":"1"},"VERSION":{"value":"1.1"},"VIEW_COUNT":{"value":3},"userdata":{"isModified":false,"id":{"value":"0d659d72c8de11e6ac6b005056261c08"}}},{"APPROVAL_STATUS":{"value":"3"},"CATALOG_ID":{},"CATEGORY":{"value":"2"},"CATEGORY_NAME":{"value":"生活"},"coverUrl":{"value":"data:image/jpeg;base64,/9j/4QAYRXhpZgAASUkqAAgAAAAAAAAAAAAAAP/sABFEdWNreQAB…fOjIwYbe2+jJH7XN+dGRgnBZudGf3m/OmRMjAMC09hagMyjdTvCWBk0h1DT3EIweSUk/SiA//Z"},"CREATE_AT":{"value":"2016-12-30T17:09:18.000Z"},"CREATE_BY":{"value":"33d632e3338211e68cc9025e88e866ab"},"CREATE_BY_NAME":{"value":"justep"},"CYCLE":{},"DESCRIPTION":{},"DEVICE_TYPE":{"value":"1"},"INDEX_URL":{},"IS_SELL_SOURCE":{},"LOCKED":{},"npmName":{"value":"taobao2117018"},"PATH":{},"price":{"value":"0.00"},"PROJECT_ID":{},"REMARK":{},"SCHEMA_ID":{},"TAG":{"value":"1"},"TEMP_ID":{},"TEMP_PATH":{"value":"/ide/templates/33d7f936338211e68cc9025e88e866ab/C75B7AB309800001697F376310B2F190/taobao2117018.zip"},"TENANT_ID":{"value":"33d7f936338211e68cc9025e88e866ab"},"TITLE":{"value":"bbbbbbbbb"},"TYPE":{"value":"1"},"TYPE_NAME":{},"UPDATE_AT":{},"UPDATE_BY":{},"USABLE_STATUS":{"value":"0"},"VERSION":{"value":"1.1"},"VIEW_COUNT":{"value":20},"userdata":{"isModified":false,"id":{"value":"ed1324b4ce6f11e6ac6b005056261c08"}}}],"userdata":{"idColumnDefine":"Catalog","idColumnName":"Catalog","idColumnType":"String","model":"/erp/app/data","relationAlias":"APPROVAL_STATUS,CATALOG_ID,CATEGORY,CATEGORY_NAME,coverUrl,CREATE_AT,CREATE_BY,CREATE_BY_NAME,CYCLE,DESCRIPTION,DEVICE_TYPE,INDEX_URL,IS_SELL_SOURCE,LOCKED,npmName,PATH,price,PROJECT_ID,REMARK,SCHEMA_ID,TAG,TEMP_ID,TEMP_PATH,TENANT_ID,TITLE,TYPE,TYPE_NAME,UPDATE_AT,UPDATE_BY,USABLE_STATUS,VERSION,VIEW_COUNT","relationTypes":"String,String,String,String,String,DateTime,String,String,Integer,String,String,String,Integer,String,String,String,Decimal,String,String,String,String,String,String,String,String,String,String,DateTime,String,String,String,Integer","relations":"Catalog.APPROVAL_STATUS,Catalog.CATALOG_ID,Catalog.CATEGORY,Catalog.CATEGORY_NAME,Catalog.coverUrl,Catalog.CREATE_AT,Catalog.CREATE_BY,Catalog.CREATE_BY_NAME,Catalog.CYCLE,Catalog.DESCRIPTION,Catalog.DEVICE_TYPE,Catalog.INDEX_URL,Catalog.IS_SELL_SOURCE,Catalog.LOCKED,Catalog.npmName,Catalog.PATH,Catalog.price,Catalog.PROJECT_ID,Catalog.REMARK,Catalog.SCHEMA_ID,Catalog.TAG,Catalog.TEMP_ID,Catalog.TEMP_PATH,Catalog.TENANT_ID,Catalog.TITLE,Catalog.TYPE,Catalog.TYPE_NAME,Catalog.UPDATE_AT,Catalog.UPDATE_BY,Catalog.USABLE_STATUS,Catalog.VERSION,Catalog.VIEW_COUNT","sys.count":2,"sys.rowid":"Catalog","updateMode":"whereVersion"}};

				self.comp("catalogData").clear()
				event.source.setTotal(result.totalNum)
				event.source.loadData(result.rows);
				event.source.first();
				event.source.doRefreshAfter(true, event.options)
			})
		}
				
		var dirs = xCloudService.getFileTree({
				filePath : "UI2/comp",
				extName : ""
			});
		if(dirs.children[0]){
			var componentsArr = dirs.children[0].children;
			for(var i = 0; i<componentsArr.length; i++){
				var rows = event.source.find(["npmName"], [componentsArr[i].title]);
				if(rows.length>0){
					event.source.setValue("isOrNotChoose","true",rows[0]);
				}
				
			}
		}
	};

	Model.prototype.categoryCustomRefresh = function(event) {
		var self = this;
		var limit = event.limit, offset = event.offset / limit + 1;
		var append = event.options && event.options.append;
		this.callService("getCategory", {
			"id" : "d04694f7854a11e6a01a02ece95c05ec"
		}, function(result) {
			//var result = {"@type":"table","rows":[{"CODE":{"value":"3"},"CREATE_AT":{"value":"2016-12-28T13:53:06.000Z"},"CREATE_BY":{"value":"63d24622-93e6-11e5-b15f-8c89a50daed8"},"DESCRIPTION":{},"LEVEL":{},"name":{"value":"企业类3"},"PARENTCODE":{"value":"c624e9f5854a11e6a01a02ece95c05ec"},"SCOPE":{"value":"ent_catalog_type"},"SEQUENCE":{},"UPDATE_AT":{},"UPDATE_BY":{},"USESTATUS":{"value":1},"USESTATUSNAME":{"value":"启用"},"userdata":{"isModified":false,"id":{"value":"2f4b538cccc211e6ac6b005056261c08"}}},{"code":{"value":"1"},"CREATE_AT":{"value":"2016-12-28T15:34:24.000Z"},"CREATE_BY":{"value":"63d24622-93e6-11e5-b15f-8c89a50daed8"},"DESCRIPTION":{},"LEVEL":{"value":2},"name":{"value":"企业组件类"},"PARENTCODE":{"value":"f5066483c03e11e6a097005056261c08"},"SCOPE":{"value":"ent_catalog_type"},"SEQUENCE":{},"UPDATE_AT":{},"UPDATE_BY":{},"USESTATUS":{"value":1},"USESTATUSNAME":{"value":"启用"},"userdata":{"isModified":false,"id":{"value":"55861841ccd011e6ac6b005056261c08"}}},{"code":{"value":"1"},"CREATE_AT":{"value":"2016-12-28T15:34:46.000Z"},"CREATE_BY":{"value":"63d24622-93e6-11e5-b15f-8c89a50daed8"},"DESCRIPTION":{},"LEVEL":{"value":2},"name":{"value":"企业单页类1"},"PARENTCODE":{"value":"d04694f7854a11e6a01a02ece95c05ec"},"SCOPE":{"value":"ent_catalog_type"},"SEQUENCE":{},"UPDATE_AT":{},"UPDATE_BY":{},"USESTATUS":{"value":1},"USESTATUSNAME":{"value":"启用"},"userdata":{"isModified":false,"id":{"value":"62fd363fccd011e6ac6b005056261c08"}}},{"code":{"value":"1"},"CREATE_AT":{"value":"2016-12-28T13:51:29.000Z"},"CREATE_BY":{"value":"63d24622-93e6-11e5-b15f-8c89a50daed8"},"DESCRIPTION":{},"LEVEL":{},"name":{"value":"企业类1"},"PARENTCODE":{"value":"c624e9f5854a11e6a01a02ece95c05ec"},"SCOPE":{"value":"ent_catalog_type"},"SEQUENCE":{},"UPDATE_AT":{"value":"2016-12-28T13:52:40.000Z"},"UPDATE_BY":{"value":"63d24622-93e6-11e5-b15f-8c89a50daed8"},"USESTATUS":{"value":1},"USESTATUSNAME":{"value":"启用"},"userdata":{"isModified":false,"id":{"value":"f53043d8ccc111e6ac6b005056261c08"}}},{"code":{"value":"2"},"CREATE_AT":{"value":"2016-12-28T13:51:39.000Z"},"CREATE_BY":{"value":"63d24622-93e6-11e5-b15f-8c89a50daed8"},"DESCRIPTION":{},"LEVEL":{},"name":{"value":"企业类2"},"PARENTCODE":{"value":"c624e9f5854a11e6a01a02ece95c05ec"},"SCOPE":{"value":"ent_catalog_type"},"SEQUENCE":{},"UPDATE_AT":{"value":"2016-12-28T13:52:36.000Z"},"UPDATE_BY":{"value":"63d24622-93e6-11e5-b15f-8c89a50daed8"},"USESTATUS":{"value":1},"USESTATUSNAME":{"value":"启用"},"userdata":{"isModified":false,"id":{"value":"fb84c336ccc111e6ac6b005056261c08"}}}],"userdata":{"idColumnDefine":"Base_code","idColumnName":"Base_code","idColumnType":"String","model":"/erp/app/data","relationAlias":"code,CREATE_AT,CREATE_BY,DESCRIPTION,LEVEL,name,PARENTCODE,SCOPE,SEQUENCE,UPDATE_AT,UPDATE_BY,USESTATUS,USESTATUSNAME","relationTypes":"String,DateTime,String,String,Integer,String,String,String,String,DateTime,String,Integer,String","relations":"Base_code.code,Base_code.CREATE_AT,Base_code.CREATE_BY,Base_code.DESCRIPTION,Base_code.LEVEL,Base_code.name,Base_code.PARENTCODE,Base_code.SCOPE,Base_code.SEQUENCE,Base_code.UPDATE_AT,Base_code.UPDATE_BY,Base_code.USESTATUS,Base_code.USESTATUSNAME","sys.count":5,"sys.rowid":"Base_code","updateMode":"whereVersion"}};
			//var templatesKind = result.rows;

			var templatesKind = JSON.parse(result.result).rows;
			self.comp("category").loadData(templatesKind);
		})
	};
	
	//全部按钮
	Model.prototype.allBtnClick = function(event){
		this.type.set(100);
		this.comp("catalogData").refreshData()
	};

	//分类过滤
	Model.prototype.catagoryBtnClick = function(event){
		$(".allkind").removeClass("active");
		$(this.getElementByXid("sortsButtonGroup")).find("a").removeClass("active");
		$(event.target.closest("a")).addClass("active");
		var row = event.bindingContext.$object;
		var code = row.val("code");// category字段
		this.type.set(code)
		this.comp("catalogData").refreshData()
	};

	//选择模板
	Model.prototype.selectBtnClick = function(event){
		var self = this;
		var row = event.bindingContext.$object;
		this.callService("valiSecurity", {
			"id" : row.val('id')
		}, function(result) {
			if (JSON.parse(result.validationId).success === true) {
				$(".createModel").removeClass("active-item");
				$(event.target).closest("li").toggleClass("active-item").siblings().removeClass("active-item");
				
			} else {
				alert(result.msg);
			}
		})
	};

	Model.prototype.getUrl = function(url) {
		return require.toUrl(url)

	};
	
	Model.prototype.getTitle = function(title,useful) {
		/*if(useful == "true"){
			return title+"(已引入)"
			
		}else{
			return title;
		}*/
		return title
	}

	Model.prototype.OKBtnClick = function(event) {
		var row = this.comp('catalogData').getCurrentRow();
		if(!row){
			return
		}
		var componentName = row.val('npmName');
		var self = this;
		this.callService("addComponent", {componentName:componentName
			},function(result) {
				if(result.result == "success"){
					justep.Util.hint("模板添加成功", {});
					self.owner.send({
						"result":"success"
					});
					self.close();
				}else{
					justep.Util.hint("模板添加失败", {});
				}
		}); 
	};
	
	return Model;
});
