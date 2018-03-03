<?xml version="1.0" encoding="UTF-8"?>

<div xmlns="http://www.w3.org/1999/xhtml" xid="window" class="window" component="$UI/system/components/justep/window/window" design="device:pc">  
  <div component="$UI/system/components/justep/model/model" xid="model" style="top:294px;left:720px;height:auto;"><div component="$UI/system/components/justep/data/data" autoLoad="true" xid="propertyData" idColumn="name">
   <column label="名称" name="name" type="String" xid="xid1"></column>
  <column label="类型" name="dataType" type="String" xid="xid2"></column>
  <column name="required" type="String" xid="xid3"></column>
  <column name="primary" type="String" xid="xid4"></column>
  <column name="unique" type="String" xid="xid5"></column>
  <column name="length" type="String" xid="xid6"></column></div></div> 
<div component="$UI/system/components/justep/panel/panel" class="x-panel x-full" xid="panel1">
   <div class="x-panel-top" xid="top1"><div component="$UI/system/components/justep/toolBar/toolBar" class="x-toolbar form-inline x-toolbar-spliter" xid="toolBar1"><input type="text" class="form-control  search" component="$UI/system/components/justep/input/input" xid="searchInput" placeHolder="输入过滤器文本" bind-keyup="searchInputKeyup" name="search"></input></div></div><div class="x-panel-content" xid="content1">
  <div component="$UI/system/components/justep/dataTables/dataTables" flexibleWidth="true" responsive="true" rowActiveClass="active" class="table table-hover table-striped property-table" xid="dataTables" multiSelect="true" filter="$model.filter($row.val('name'))" data="propertyData">
   <columns xid="columns1"><column name="name" xid="column1"></column>
  <column name="dataType" xid="column2"></column></columns></div>
  </div>
   <div class="x-panel-bottom" xid="bottom1" height="48"><a component="$UI/system/components/justep/button/button" class="btn btn-link btn-only-label x-dialog-button" label="取消" xid="cancel" onClick="cancelClick">
   <i xid="i5"></i>
   <span xid="span4">取消</span></a>
  <a component="$UI/system/components/justep/button/button" class="btn btn-primary btn-only-label x-dialog-button" label="确定" xid="okbtn" onClick="okbtnClick">
   <i xid="i4"></i>
   <span xid="span5">确定</span></a>
  </div></div>
  <span component="$UI/system/components/justep/windowReceiver/windowReceiver" xid="windowReceiver" onReceive="windowReceiverReceive"></span></div>