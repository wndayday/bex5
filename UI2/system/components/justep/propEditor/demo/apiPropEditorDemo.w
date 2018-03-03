<?xml version="1.0" encoding="utf-8"?>

<div xmlns="http://www.w3.org/1999/xhtml" xid="window" class="window" component="$UI/system/components/justep/window/window">  
  <div component="$UI/system/components/justep/model/model" xid="model" onLoad="modelLoad"
    style="height:auto;top:166px;left:125px;" onParamsReceive="modelParamsReceive"> 
    <div component="$UI/system/components/justep/data/data" autoLoad="true"
      xid="data1" idColumn="id">
      <column name="className" type="String" xid="xid1"/>  
      <column name="methodName" type="String" xid="xid2"/>  
      <column name="type" type="String" xid="xid3"/>  
      <column name="target" type="String" xid="xid4"/>  
      <column name="paramName" type="String" xid="xid5"/>  
      <column name="value" type="String" xid="xid6"/>  
      <column name="id" type="String" xid="xid7"/>  
      <data>[{"className":"$UI/system/components/justep/data/data","methodName":"avgByAll","type":"string","target":"data1","paramName":"column","value":"","id":"001"},{"className":"$UI/system/components/justep/data/data","methodName":"amount","type":"string","target":"data1","paramName":"name"}]</data>
    </div>
  <div component="$UI/system/components/justep/data/data" autoLoad="true" xid="data2" idColumn="id"><column name="id" type="String" xid="xid8"></column>
  <column name="name" type="String" xid="xid9"></column>
  <column name="description" type="String" xid="xid10"></column></div></div>  
  <!-- 
  <div component="$UI/system/components/justep/output/output" class="x-output"
    xid="output1" bind-ref="$model.data1.ref(&quot;methodName&quot;)"/>  
  
  <input component="$UI/system/components/justep/input/input" class="form-control"
    xid="input1" bind-ref='$model.data1.ref("value")'/>  
            <div component="$UI/system/components/justep/propEditor/propEditor"
          bind-ref='$model.data1.ref("value")' targetData="data1" style="height:30px;width:306px;"
          xid="xsadf1"/>
   <label style="margin-top:10px;">在list中的属性编辑器</label>
  <div component="$UI/system/components/justep/list/list" class="x-list" xid="list1"
    data="data1"> 
    <ul class="x-list-template" xid="listTemplateUl1"> 
      <li xid="li1">
        <div component="$UI/system/components/justep/propEditor/propEditor"
          bind-ref="ref(&quot;value&quot;)" targetData="data1" style="height:30px;width:306px;"
          xid="xsadf"/>
      </li>
    </ul> 
  </div> -->
<div component="$UI/system/components/justep/row/row" class="x-row" xid="row1" style="height:100%;">
   <div class="x-col" xid="col1" style="height:100%;overflow:auto"><div component="$UI/system/components/justep/list/list" class="x-list" xid="list1" data="data2" bind-click="list1Click">
   <ul class="x-list-template" xid="listTemplateUl1">
    <li xid="li1"><div component="$UI/system/components/justep/output/output" class="x-output" xid="output1" bind-ref='ref("name")' bind-click="output1Click" style="cursor:pointer;background:#efefef;margin-top:2px"></div></li></ul> </div></div>
   <div class="x-col" xid="col3" style="padding:15px;height:100%;overflow:auto;"></div></div></div>
