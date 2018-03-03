<?xml version="1.0" encoding="UTF-8"?>

<div xmlns="http://www.w3.org/1999/xhtml" xid="window" class="window" component="$UI/system/components/justep/window/window" design="device:pc">  
  <div component="$UI/system/components/justep/model/model" xid="model" style="height:auto;top:369px;left:715px;" onLoad="modelLoad">
  <div component="$UI/system/components/justep/data/data" autoLoad="true" xid="tableData" idColumn="id">
  <column name="id" type="String" xid="xid4"></column>
  <column name="label" type="String" xid="xid1"></column>
  <column name="name" type="String" xid="xid2"></column>
  <column name="path" type="String" xid="xid3"></column></div></div> 
<div component="$UI/system/components/justep/panel/panel" class="x-panel x-full" xid="panel1">
   <div class="x-panel-content" xid="content1">
  <div component="$UI/system/components/justep/row/row" class="x-row" xid="row1" style="height:100%;">
   <div class="x-col x-col-25 o-left" xid="col1" style="margin-right:20px;"><table component="$UI/system/components/justep/list/list" class="x-list table" xid="list1" data="tableData">
   <thead xid="thead1">
    <tr xid="tr1">
     <th xid="default1">数据对象</th></tr> </thead> 
   <tbody class="x-list-template x-min-height" xid="listTemplate1">
    <tr xid="tr2" bind-css="{success:$object==$model.tableData.getCurrentRow() }" bind-click="tr2Click">
     <td xid="td1"><div component="$UI/system/components/justep/output/output" class="x-output" xid="output1" bind-ref='ref("label")'></div></td></tr> 
  </tbody> </table></div>
   <div class="x-col" xid="col2">
  <div component="$UI/system/components/justep/windowContainer/windowContainer" class="x-window-container" xid="windowContainer1" autoLoad="false"></div></div>
   </div></div>
   </div></div>