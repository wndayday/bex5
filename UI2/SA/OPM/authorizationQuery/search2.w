<?xml version="1.0" encoding="UTF-8"?>

<div xmlns="http://www.w3.org/1999/xhtml" xid="window" class="window" component="$UI/system/components/justep/window/window" design="device:pc">  
  <div component="$UI/system/components/justep/model/model" xid="model" onParamsReceive="modelParamsReceive"><div component="$UI/system/components/justep/data/data" autoLoad="true" xid="funcListData" idColumn="id" isTree="false" onCustomRefresh="funcListDataCustomRefresh" confirmRefresh="false">
   <treeOption delayLoad="false" nodeKindRelation="nodeKind" parentRelation="parent" xid="default21"></treeOption>
  <column name="id" type="String" xid="column34"></column>
  <column label="权限" name="label" type="String" xid="column33"></column>
  <column label="全路径名" name="path" type="String" xid="column28"></column>
  <column name="isFolder" type="String" xid="column27"></column>
  <column name="process" type="String" xid="column26"></column>
  <column name="activity" type="String" xid="column31"></column>
  <column name="url" type="String" xid="column29"></column>
  <column name="parent" type="String" xid="column30"></column>
  <column name="nodeKind" type="String" xid="column32"></column>
  <rule xid="rule3">
   <col name="nodeKind" xid="ruleCol3">
    <calculate xid="calculate3">
     <expr xid="default20">$row.val(&quot;isFolder&quot;) ? '' : 'nkLeaf'</expr></calculate> </col> </rule></div></div> 
<div component="$UI/system/components/justep/panel/panel" class="x-panel x-full" xid="panel1">
   <div class="x-panel-content" xid="content1">
    <div component="$UI/system/components/justep/toolBar/toolBar" class="x-toolbar form-inline x-toolbar-spliter" xid="toolBar2">
     <div class="input-group" component="$UI/system/components/bootstrap/inputGroup/inputGroup" xid="inputGroup1">
      <input type="text" class="form-control" component="$UI/system/components/justep/input/input" xid="filter" bind-keypress="filterKeypress" valueUpdateMode="input" onChange="filterChange"></input>
      <div class="input-group-btn" xid="div10">
       <a component="$UI/system/components/justep/button/button" class="btn btn-default btn-only-icon" xid="searchBtn" icon="icon-android-search" onClick="searchBtnClick">
        <i xid="i5" class="icon-android-search"></i>
        <span xid="span22"></span></a> </div> </div> </div> 
    <div xid="searchDiv" class="x-bordered">
     <div component="$UI/system/components/justep/dataTables/dataTables" flexibleWidth="true" responsive="true" rowActiveClass="active" class="table table-hover table-striped" xid="searchGrid" ordering="false" data="funcListData" filter="$model.filter($row)">
      <columns xid="columns4">
       <column name="path" xid="column1"></column></columns> </div> </div> </div> 
   <div class="x-panel-bottom" xid="bottom1">
    <a component="$UI/system/components/justep/button/button" class="btn btn-default" label="定位" xid="positionBtn" icon="icon-ios7-redo-outline" style="margin-top:10px" onClick="positionBtnClick">
     <i xid="i1" class="icon-ios7-redo-outline"></i>
     <span xid="span1">定位</span></a> </div> </div>
  <span component="$UI/system/components/justep/windowReceiver/windowReceiver" xid="windowReceiver"></span></div>