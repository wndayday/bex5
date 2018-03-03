<?xml version="1.0" encoding="UTF-8"?>

<div xmlns="http://www.w3.org/1999/xhtml" xid="window" class="window" component="$UI/system/components/justep/window/window" design="device:pc">  
  <div component="$UI/system/components/justep/model/model" xid="model" style="top:465px;left:521px;height:auto;"><div component="$UI/system/components/justep/data/data" autoLoad="true" xid="tableData" idColumn="name">
   <column name="name" type="String" xid="xid2"></column>
  <column name="path" type="String" xid="xid3"></column></div></div> 
<span component="$UI/system/components/justep/windowReceiver/windowReceiver" xid="windowReceiver" onReceive="windowReceiverReceive"></span>
  <div component="$UI/system/components/justep/panel/panel" class="x-panel x-full" xid="panel1">
   <div class="x-panel-content" xid="content1"><div component="$UI/system/components/justep/dataTables/dataTables" flexibleWidth="true" responsive="true" rowActiveClass="active" class="table table-hover table-striped" xid="dataTables" data="tableData">
   <columns xid="columns1">
   <column name="name" xid="column2"></column></columns></div></div>
   <div class="x-panel-bottom" xid="bottom1"><a component="$UI/system/components/justep/button/button" class="btn btn-link btn-only-label x-dialog-button" label="取消" xid="cancel" onClick="cancelClick">
   <i xid="i5"></i>
   <span xid="span4">取消</span></a>
  <a component="$UI/system/components/justep/button/button" class="btn btn-primary btn-only-label x-dialog-button" label="确定" xid="okbtn" onClick="okbtnClick">
   <i xid="i4"></i>
   <span xid="span5">确定</span></a></div></div></div>