<?xml version="1.0" encoding="UTF-8"?>

<div xmlns="http://www.w3.org/1999/xhtml" xid="window" class="window" component="$UI/system/components/justep/window/window" design="device:pc">  
  <div component="$UI/system/components/justep/model/model" xid="model" onParamsReceive="modelParamsReceive" style="top:272px;left:519px;height:auto;"><div component="$UI/system/components/justep/data/bizData" xid="orgSearchData" concept="SA_OPOrg">
   <reader xid="default17" action="/system/logic/action/queryOrgAction"></reader></div></div> 

  
  <span component="$UI/system/components/justep/windowReceiver/windowReceiver" xid="windowReceiver"></span><div component="$UI/system/components/justep/panel/panel" class="x-panel x-full" xid="panel1">
   <div class="x-panel-content" xid="content1"><div component="$UI/system/components/justep/toolBar/toolBar" class="x-toolbar form-inline x-toolbar-spliter" xid="toolBar2">
   <div class="input-group" component="$UI/system/components/bootstrap/inputGroup/inputGroup" xid="inputGroup1">
    <input type="text" class="form-control" component="$UI/system/components/justep/input/input" xid="filter" bind-keypress="filterKeypress" valueUpdateMode="input" onChange="filterChange"></input>
    <div class="input-group-btn" xid="div10">
     <a component="$UI/system/components/justep/button/button" class="btn btn-default btn-only-icon" xid="searchBtn" icon="icon-android-search" onClick="searchBtnClick">
      <i xid="i5" class="icon-android-search"></i>
      <span xid="span22"></span></a> </div> </div> </div><div xid="searchDiv" class="x-bordered">
   <div component="$UI/system/components/justep/dataTables/dataTables" flexibleWidth="true" responsive="true" rowActiveClass="active" class="table table-hover table-striped" xid="searchGrid" data="orgSearchData" ordering="false">
    <columns xid="columns4">
     <column name="sFName" xid="column2"></column></columns> </div> </div>
  </div>
   <div class="x-panel-bottom" xid="bottom1"><a component="$UI/system/components/justep/button/button" class="btn btn-default" label="定位" xid="positionBtn" icon="icon-ios7-redo-outline" style="margin-top:10px" onClick="positionBtnClick">
   <i xid="i1" class="icon-ios7-redo-outline"></i>
   <span xid="span1">定位</span></a></div></div></div>