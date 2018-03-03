<?xml version="1.0" encoding="UTF-8"?>

<div xmlns="http://www.w3.org/1999/xhtml" xid="window" class="window" component="$UI/system/components/justep/window/window" design="device:pc">  
  <div component="$UI/system/components/justep/model/model" xid="model" style="top:607px;left:716px;height:auto;"><div component="$UI/system/components/justep/data/data" autoLoad="true" xid="typeData" idColumn="value"><column label="值" name="value" type="String" xid="xid1"></column>
  <data xid="default1">[]</data></div></div> 
<div component="$UI/system/components/justep/panel/panel" class="x-panel x-full" xid="panel1">
   <div class="x-panel-content" xid="content1"><div component="$UI/system/components/justep/labelEdit/labelEdit" class="x-label-edit x-label20" xid="labelEdit1">
   <label class="x-label" xid="label1" style="text-align:right;"><![CDATA[列名称：]]></label>
   <input component="$UI/system/components/justep/input/input" class="form-control x-edit" xid="nameInput"></input></div><div component="$UI/system/components/justep/labelEdit/labelEdit" class="x-label-edit x-label20" xid="labelEdit3">
   <label class="x-label" xid="label3" style="text-align:right;"><![CDATA[数据类型：]]></label>
   <select component="$UI/system/components/justep/select/select" class="form-control x-edit" xid="typeSelect" bind-options="typeData" bind-optionsValue="value" bind-optionsLabel="value"></select></div></div>
   <div class="x-panel-bottom" xid="bottom1"><a component="$UI/system/components/justep/button/button" class="btn btn-link btn-only-label x-dialog-button" label="取消" xid="cancelBtn" onClick="cancelBtnClick">
   <i xid="i5"></i>
   <span xid="span4">取消</span></a>
  <a component="$UI/system/components/justep/button/button" class="btn btn-primary btn-only-label x-dialog-button" label="确定" xid="okBtn" onClick="okBtnClick">
   <i xid="i4"></i>
   <span xid="span5">确定</span></a></div></div>
  
  <span component="$UI/system/components/justep/windowReceiver/windowReceiver" xid="windowReceiver" onReceive="windowReceiverReceive"></span></div>