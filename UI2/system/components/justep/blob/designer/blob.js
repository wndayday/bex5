/*! 
* WeX5 v3 (http://www.justep.com) 
* Copyright 2015 Justep, Inc.
* Licensed under Apache License, Version 2.0 (http://www.apache.org/licenses/LICENSE-2.0) 
*/ 
define(function(require) {
	var RTBlob = require("../blob");
	var RTBlobImage = require("../blobImage");

	var Blob = RTBlob.extend({
		doInit : function() {// 去除运行时的事件处理
		}
	});

	var BlobImage = RTBlobImage.extend({
		doInit : function() {// 去除运行时的事件处理
			this._getImg().attr('d_selectable', false);
		}
	});
	
	var quickIdeEx = {
			"$UI/system/components/justep/blob/blob":{
				properties:["xid",{name:"bind-ref",text:"引用"},{name:"blobDataModel",text:"关联数据目录",editor:"input"},
				            {name:"blobConcept",text:"关联数据对象",editor:"input"},{name:"blobRelation",text:"关联数据项"},
				            {name:"blobLastModifiedRelation",text:"关联修改时间数据项"},"limitSize","tabindex","accesskey","disabled",
				            {name:"onCreateURL",text:"生成Blob url",editor:"eventEditor",noLabel:true},
				            {name:"onRefresh",text:"刷新事件",editor:"eventEditor",noLabel:true},
				            {name:"onUploadStart",text:"开始提交数据",editor:"eventEditor",noLabel:true},
				            {name:"onUploadFileSelected",text:"选择文件后",editor:"eventEditor",noLabel:true},
				            {name:"onUploadSuccess",text:"提交数据成功",editor:"eventEditor",noLabel:true},
				            {name:"onDeleteSuccess",text:"清除数据成功",editor:"eventEditor",noLabel:true}],
				styleConfig:function(designer){
					return [
					        designer.getCommonStyleItem('pull'),
						    designer.getCommonStyleItem('baseStyle'),
						    designer.getCommonStyleItem('border'),
						    designer.getCommonStyleItem('position')
						];
				}
			},
			"$UI/system/components/justep/blob/blobImage":{
				properties:["xid",{name:"bind-ref",text:"引用"},{name:"blobDataModel",text:"关联数据目录",editor:"input"},
				            {name:"blobConcept",text:"关联数据对象",editor:"input"},{name:"blobRelation",text:"关联数据项"},
				            {name:"blobLastModifiedRelation",text:"关联修改时间数据项"},"limitSize",{name:"imageType",text:"图片类型"},"tabindex","accesskey","disabled",
				            {name:"onCreateURL",text:"生成Blob url",editor:"eventEditor",noLabel:true},
				            {name:"onRefresh",text:"刷新事件",editor:"eventEditor",noLabel:true},
				            {name:"onUploadStart",text:"开始提交数据",editor:"eventEditor",noLabel:true},
				            {name:"onUploadFileSelected",text:"选择文件后",editor:"eventEditor",noLabel:true},
				            {name:"onUploadSuccess",text:"提交数据成功",editor:"eventEditor",noLabel:true},
				            {name:"onDeleteSuccess",text:"清除数据成功",editor:"eventEditor",noLabel:true}],
				styleConfig:function(designer){
					return [
					        {
					        	text : '扩展样式',
									noLabel : false,//显示标签
									isGroup:true,
									
									//可选数据
									items : [{
										name : '扩展样式',
										noLabel : true,//不显示标签
										selectMode:"1", //选中无状态变化
										//可选数据
										optionData : [{propName : "class",value : "",text : "<button class='btn btn-success btn-sm' style='margin:6px'>无</button>"
										},{propName : "class",value : "x-blob-radius",text : "<button class='btn btn-success btn-sm' style='margin:6px'>x-blob-radius</button>"
										}],
										editor : "listEditor"
									} ]
								},
					        designer.getCommonStyleItem('pull'),
						    designer.getCommonStyleItem('baseStyle'),
						    designer.getCommonStyleItem('border'),
						    designer.getCommonStyleItem('position')
						];
				}
			}
	
	};

	return {
		'$UI/system/components/justep/blob/blob' : Blob,
		'$UI/system/components/justep/blob/blobImage' : BlobImage,
		quickIdeEx:quickIdeEx
	};
});