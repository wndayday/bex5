<?xml version="1.0" encoding="UTF-8"?>

<div xmlns="http://www.w3.org/1999/xhtml" xid="window" class="window" component="$UI/system/components/justep/window/window" design="device:pc">  
  <div component="$UI/system/components/justep/model/model" xid="model" onLoad="modelLoad" style="top:593px;left:740px;height:auto;">
  <div component="$UI/system/components/justep/data/data" autoLoad="true" xid="tableData" idColumn="label">
   <column name="label" type="String" xid="xid1"></column>
  <column name="name" type="String" xid="xid2"></column>
  <column name="path" type="String" xid="xid3"></column>
  <column name="isOrNotSync" type="String" xid="xid4"></column>
  <column name="title" type="String" xid="xid5"></column></div></div> 
<div component="$UI/system/components/justep/panel/panel" class="x-panel x-full" xid="panel1">
   <div class="x-panel-content" xid="content1" style="padding:20px;">
    <div component="$UI/system/components/justep/row/row" class="x-row" xid="row1">
   <div class="x-col" xid="col1"><span component="$UI/system/components/justep/button/checkbox" class="x-checkbox" xid="checkbox2" label="是否同步系统数据"></span></div>
   <div class="x-col" xid="col2"></div>
   <div class="x-col" xid="col3"></div></div><table component="$UI/system/components/justep/list/list" class="x-list table table-hover table-striped" xid="list1" data="tableData">
     <thead xid="thead1">
      <tr xid="tr1">
       <th xid="default1">数据对象</th>
       <th xid="default1">操作</th></tr> </thead> 
     <tbody class="x-list-template x-min-height" xid="listTemplate1">
      <tr xid="tr2" bind-css="{success:$object==$model.tableData.getCurrentRow()}">
       <td xid="td1">
        <div component="$UI/system/components/justep/output/output" class="x-output" xid="output1" bind-ref='ref("label")'></div></td> 
       <td xid="td1">
        <span component="$UI/system/components/justep/button/checkbox" class="x-checkbox" xid="checkbox1" label="是否同步数据" bind-ref='ref("isOrNotSync")' checkedValue="true"></span></td> </tr> </tbody> 
  </table> 
    <p xid="p1" bind-visible="isOrNotShow">暂无数据。</p>
  </div> 
   <div class="x-panel-bottom" xid="bottom1"></div></div></div>