define(function(require) {
	function Uses(data, node,$$__uses,__useTags) {
		this.data = data;
		this.node = node;
		this.$$__uses=$$__uses;
		this.__useTags=__useTags;
	}
	Uses.prototype = {
		// 查询uses
		queryUses : function($$__uses) {
			var self = this;
			this.node.queryAsJson(this.$$__uses, function($node, jsonItem) {
				var $arr = $node.children();
				$.each($arr, function(i, v) {
					self.data.newData({
						defaultValues : [ {
							quoteName : $(v).attr("useName") || "",
							name : "",
							status : "quote"
						} ]
					});
				})
			});
		},
		// 弹出对话框
		addQuoteClick : function(quoteDialog) {
			quoteDialog.open();
		},
		// 根据参数new Data
		addQuoteData :function(quoteName, appNames, sevName) {
			this.data.newData({
				"defaultValues" : [ {
					quoteName : quoteName,
					status : "quote",
					name : ""
				} ]
			});

			this.adduseAttr({
				service : sevName,
				name : appNames,
				useName : quoteName
			});
			this.addQuoteParamsData({
				name : appNames,
				serName : sevName,
				parentName : quoteName,
			})
		},
		adduseAttr:function(attr){
			var attr=attr||{};
			this.addUsesTag();
			// 生成uses结构
			this.bizDoc.append(this.$$__uses, this.__useTags, attr);
		},
		addQuoteParamsData:function(paramsData,data){
			var paramsData=paramsData||{};
			data.newData({
				"defaultValues" : [paramsData ]
			})
		}
	}
	return Uses;
})