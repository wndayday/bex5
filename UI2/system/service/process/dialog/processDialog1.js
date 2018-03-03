/*! 
* BeX5 v3 (http://www.justep.com) 
* Copyright 2015 Justep, Inc.
*/ 
define(function(require){
	require("$UI/system/resources/system.res");
	//将来通过justep.Portal就能引用portal相关的api
	var justep = require("$UI/system/lib/justep");
	var WindowDialog = require("$UI/system/components/justep/windowDialog/windowDialog");	
	var MessageDialog = require("$UI/system/components/justep/messageDialog/messageDialog");	
	var ProcessControl = require("$UI/system/components/justep/process/js/processControl");
	var OrgUtils = require("$UI/system/service/process/dialog/orgUtils");
	
	var TASK_RELATIONS = ["sName", "sExecuteMode", "sPreemptMode", "sExecuteMode2"];
	
	//var testData = require("./control");

	var Model = function(){
		this.callParent();
		/**
			params的格式：
			{
				title: "",
				task: "",
				action: "",
				control: processControl,
				options, {}
			}
		*/
		this.task = null;
		this.action = null;
		this.control = null;
		this.options = {};
		
		/*
		this.on("onLoad", function(event){
			var control = new ProcessControl(testData);
			var evt = {};
			evt.data = {
				title: "流转信息",
				task: "",
				action: "advanceAction",
				control: control,
				options: {}
			};
			
			this.windowReceiveReceive(evt);
		}, this);
		*/
		
	};
	
	
	Model.prototype.advanceBtnClick = function(event){
		var flowToData = this.comp("flowToData");
		if (!this.activityAdvanceDialog){
			var dialogs = this.getElementByXid("dialogs");
			var config = {parentNode: dialogs, src: require.toUrl("$UI/system/service/process/dialog/activityAdvanceDialog.a")};
			this.activityAdvanceDialog = new WindowDialog(config);
			this.activityAdvanceDialog.on("onReceive", function(event){
				for (var i=0; i<TASK_RELATIONS.length; i++){
					flowToData.setValueByID(TASK_RELATIONS[i], event.data[TASK_RELATIONS[i]], event.data.options.rowid);
				}
			}, this);
		}
		var rowid = justep.Bind.contextFor(event.source.domNode).$object.val("rowid");
		var data = {};
		data.options = {
			rowid:rowid,
			action: this.action
		};
		for (var i=0; i<TASK_RELATIONS.length; i++){
			data[TASK_RELATIONS[i]] = flowToData.getValueByID(TASK_RELATIONS[i], rowid);
		}
		this.activityAdvanceDialog.open({data: data});
	};
	
	Model.prototype.deleteToExecutorBtnClick = function(event){
		this.deleteExecutor(event.source);
	};
	
	Model.prototype.deleteNoticeExecutorBtnClick = function(event){
		this.deleteExecutor(event.source);
	};

	Model.prototype._getMessageDialog = function(){
		if(!this.msgDialog) this.msgDialog = new MessageDialog({parentNode: this.getElementByXid("window")});
		return this.msgDialog;
	};

	Model.prototype.okBtnClick = function(event){
		this.updateControl();
		if (this.checkControl()){
			var receiver = this.comp("windowReceive");
			receiver.windowEnsure({task: this.task, action: this.action, control: this.control, options: this.options});
		}
	};
	
	Model.prototype.showError = function(title, message){
		var dialog = this._getMessageDialog();
		dialog.show({type:"OK", title: title, message: message});
	};
	
	Model.prototype.checkControl = function(){
		var hasSelected = false;
		var toItems = this.control.getToItems() || [];
		if (toItems.length > 0){
			for (var i=0; i<toItems.length; i++){
				if (toItems[i].isSelected()){
					hasSelected = true;
					if (!toItems[i].isEnd()){
						var executors = toItems[i].getExecutors() || [];
						if (executors.length == 0){
							var label = this.control.getActivityByID(toItems[i].getActivityID()).getLabel();
							var title = new justep.Message(justep.Message.JUSTEP230086).getMessage();
							var message = new justep.Message(justep.Message.JUSTEP230087, label).getMessage();
							this.showError(title, message);
							return false;
						}
					}
				}
			}
			
			if (!hasSelected){
				var title = new justep.Message(justep.Message.JUSTEP230086).getMessage();
				var message = new justep.Message(justep.Message.JUSTEP230085).getMessage();
				this.showError(title, message);
				return false;	
			}
		}
		
		var noticeItems = this.control.getNoticeItems() || [];
		for (var i=0; i<noticeItems.length; i++){
			if (noticeItems[i].isSelected()){
				var executors = noticeItems[i].getExecutors() || [];
				if (executors.length == 0){
					var label = noticeItems[i].getTaskRelationValue("sName");
					var title = new justep.Message(justep.Message.JUSTEP230086).getMessage();
					var message = new justep.Message(justep.Message.JUSTEP230087, label).getMessage();
					this.showError(title, message);
					return false;
				}
			}
		}
		
		return true;
	};
	
	Model.prototype.cancelBtnClick = function(event){
		var receiver = this.comp("windowReceive");
		receiver.windowCancel();
	};
	
	Model.prototype.windowReceiveReceive = function(event){
		var data = event.data || {};
		this.task = data.task;
		this.action = data.action;
		this.options = data.options;
		this.control = data.control;
		this.control.reset();

		this.reset(); //将来可以放到process组件中

		this.setTitle(data.title || "");
		this.initControlData(this.control);
		this.initActivityData(this.control);
		this.initFlowToData(this.control);
		this.initNoticeData(this.control);
	};
	
	Model.prototype.checkbox2Change = function(event){
		var context = justep.Bind.contextFor(event.source.domNode).$object;
		this.control.updateActivityStatus(context.val("rowid"), event.checked);
		var self = this;
		context.data.each(function(options){
			var row = options.row;
			var id = row.val("rowid");
			var activity = self.control.getActivityByID(id);
			row.ref("selected").set(activity.isSelected());
		});
	};
	
	Model.prototype.addToExecutorBtnClick = function(event){
		var context = justep.Bind.contextFor(event.source.domNode).$object;
		var owner = context.val("rowid");
		var item = this.control.getToItemByID(owner);
		this.showExecutorDialog(owner, item);
	};
	
	Model.prototype.addNoticeExecutorBtnClick = function(event){
		var context = justep.Bind.contextFor(event.source.domNode).$object;
		var owner = context.val("rowid");
		var item = this.control.getNoticeItemByID(owner);
		this.showExecutorDialog(owner, item);
	};
	

	Model.prototype.showExecutorDialog = function(owner, item){
		if (!this.executorDialog){
			var dialogs = this.getElementByXid("dialogs");
			var config = {parentNode: dialogs, src: require.toUrl("$UI/system/service/process/dialog/orgDialog.a")};
			this.executorDialog = new WindowDialog(config);
			this.executorDialog.on("onReceive", function(evt){
				var data = {rows: []};
				var rows = evt.data.rows || [];
				var owner = evt.data.options.owner;
				for (var i=0; i<rows.length; i++){
					data.rows.push({
						rowid: justep.UUID.createUUID(),
						owner: owner,
						sFID: rows[i].sFID,
						sFName: rows[i].sFName,
						sName: rows[i].sName
					});
				}	
				this.comp("executorData").loadData(data, true);
			}, this);
		}
		
		var data = {};
		data.options = {owner: owner};
		//data.range = [{fid : "/ORG01.ogn/PSN01@ORG01.psm", fname : "/起步软件/system"},
		//              {fid : "/ORG01.ogn", fname : "/起步软件"}];
		data.range = item.getExecutorRange() || [];
		data.orgKinds = OrgUtils.stringToArray(item.getExecutorKinds(), " ");
		this.executorDialog.open({data: data});
	};
	
	
	/************************以上是直接和界面绑定的api********************/
	Model.prototype.updateControl = function(){
		var postscript = this.comp("controlData").val("postscript") || "";
		this.control.setPostscript(postscript);
		
		var self = this;
		this.comp("activityData").each(function(options){
			var row = options.row;
			var rowid = row.val("rowid");
			var selected = row.val("selected");
			self.control.getToItemByID(rowid).setSelected(selected);
		});
		
		this.comp("flowToData").each(function(options){
			var row = options.row;
			var rowid = row.val("rowid");
			var item = self.control.getToItemByID(rowid);
			if (!item.isEnd()){
				for (var i=0; i<TASK_RELATIONS.length; i++){
					item.setTaskRelationValue(TASK_RELATIONS[i], row.val(TASK_RELATIONS[i])||"");
				}
			}
		});
		
		this.comp("noticeData").each(function(options){
			var row = options.row;
			var rowid = row.val("rowid");
			var item = self.control.getNoticeItemByID(rowid);
			item.setSelected(row.val("selected"));
			item.setTaskRelationValue("sName", row.val("sName")||"");
		});
		
		var toItems = this.control.getToItems() || [];
		for (var i=0; i<toItems.length; i++){
			toItems[i].clearExecutors();
		}
		
		var noticeItems = this.control.getNoticeItems() || [];
		for (var i=0; i<noticeItems.length; i++){
			noticeItems[i].clearExecutors();
		}
		
		this.comp("executorData").each(function(options){
			var row = options.row;
			var owner = row.val("owner");
			var item = self.control.getToItemByID(owner) || self.control.getNoticeItemByID(owner);
			if (!item.isEnd()){
				var fid = row.val("sFID") || "";
				var fname = row.val("sFName") || "";
				var responsible = (row.val("responsible") === 1);
				item.addExecutor(fid, fname, responsible);
			}
		});
	};
	
	Model.prototype.deleteExecutor = function(btn){
		var context = justep.Bind.contextFor(btn.domNode);
		var data = context.$object.data;
		data.deleteData([context.$object]);
	};
	
	Model.prototype.reset = function(){
		this.setTitle("");
		
		var controlData = this.comp("controlData");
		controlData.setValue("message", "");
		controlData.setValue("postscript", "");
	
		this.comp("activityData").clear();
		this.comp("flowToData").clear();
		this.comp("noticeData").clear();
		this.comp("executorData").clear();
	};
	
	/*******************初始化noticeData 开始*****************************/
	Model.prototype.initNoticeData = function(control){
		var noticeContent = {rows: []};
		var executorContent = {rows: []};
		var items = control.getNoticeItems() || [];
		for (var i=0; i<items.length; i++){
			this.addNotice(noticeContent.rows, executorContent.rows, items[i], control);
		}
		this.comp("noticeData").loadData(noticeContent);
		this.comp("executorData").loadData(executorContent, true);
	};
	
	Model.prototype.addNotice = function(noticeRows, executorRows, item, control){
		var row = {rowid: "", selected: 0, sName: ""};
		row.rowid = item.getActivityID();
		row.selected = item.isSelected();
		row.sName = item.getTaskRelationValue("sName") || "";
		noticeRows.push(row);
		this.addExecutors(executorRows, item);
	};
	/*******************初始化noticeData 结束*****************************/
	
	/*******************初始化flowToData 开始*****************************/
	Model.prototype.initFlowToData = function(control){
		var data = {rows: []};
		var items = control.getToItems() || [];
		for (var i=0; i<items.length; i++){
			this.addFlowTo(data.rows, items[i], control);
		}
		this.comp("flowToData").loadData(data);
	};
	
	Model.prototype.addFlowTo = function(rows, item, control){
		var row = {};
		row.rowid = item.getActivityID();
		if (!item.isEnd()){
			for (var i=0; i<TASK_RELATIONS.length; i++){
				row[TASK_RELATIONS[i]] = item.getTaskRelationValue(TASK_RELATIONS[i]) || "";
			}
		}
		rows.push(row);
	};
	
	/*******************初始化flowToData 结束*****************************/
	
	/*******************初始化activityData 开始*****************************/
	Model.prototype.initActivityData = function(control){
		var activityContent = {rows: []};
		var executorContent = {rows: []};
		var activities = control.getActivities() || [];
		for (var i=0; i<activities.length; i++){
			this.addActivity(activityContent.rows, executorContent.rows, activities[i], control);
		}
		this.comp("activityData").loadData(activityContent);
		this.comp("executorData").loadData(executorContent, true);
	};
	
	Model.prototype.addExecutors = function(executorRows, controlItem){
		var executors = controlItem.getExecutors() || [];
		for (var i=0; i<executors.length; i++){
			var executor = executors[i];
			
			executorRows.push({rowid: justep.UUID.createUUID(), 
				owner: controlItem.getActivityID(),
				sFName: executor.fname, 
				sFID: executor.fid, 
				responsible: (executor.responsible=="true" ? 1 : 0),
				sName: OrgUtils.getNameByFName(executor.fname)});
		}
	};
	
	Model.prototype.addActivity = function(activityRows, executorRows, activity, control){
		if (activity.isSelectable()){
			var toItem = control.getToItemByID(activity.getID());
			var isEnd = toItem.isEnd();
			var selected = toItem.isSelected();
			activityRows.push({rowid: activity.getID(), selected: selected, isEnd: isEnd, label:activity.getLabel()});
			
			this.addExecutors(executorRows, toItem);
		}
		
		var children = activity.getChildren();
		if (children && children.length>0){
			for (var i=0; i<children.length; i++){
				this.addActivity(activityRows, executorRows, children[i], control);
			}
		}
	};
	
	/*******************初始化activityData 结束*****************************/
	
	Model.prototype.initControlData = function(control){
		var controlData = this.comp("controlData");
		controlData.setValue("message", control.getMessage());
		controlData.setValue("postscript", control.getPostscript());
	};
	
	
	Model.prototype.setTitle = function(title){
		var bar = this.comp("bar");
		bar.set({title: title});
	};
	
	return Model;
});
