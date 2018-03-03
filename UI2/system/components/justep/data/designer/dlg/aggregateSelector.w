<?xml version="1.0" encoding="utf-8"?>

<div xmlns="http://www.w3.org/1999/xhtml" xid="window" class="window" component="$UI/system/components/justep/window/window"
  design="device:pc;">  
  <div component="$UI/system/components/justep/model/model" xid="model" style="height:auto;top:413px;left:311px;">
    <div component="$UI/system/components/justep/data/data" autoLoad="true"
      xid="propertyData" idColumn="name"> 
      <column name="name" type="String" xid="column1"></column>
  <column name="label" type="String" xid="xid9"></column>
  <column name="dataType" type="String" xid="xid8"></column></div>
  <div component="$UI/system/components/justep/data/data" autoLoad="true" xid="operatorsData" idColumn="value"><column name="value" type="String" xid="xid1"></column>
  <column name="label" type="String" xid="xid6"></column>
  <data xid="default2">[{&quot;value&quot;:&quot;count&quot;,&quot;label&quot;:&quot;计数(count)&quot;},{&quot;value&quot;:&quot;sum&quot;,&quot;label&quot;:&quot;合计(sum)&quot;},{&quot;value&quot;:&quot;avg&quot;,&quot;label&quot;:&quot;平均值(avg)&quot;},{&quot;value&quot;:&quot;min&quot;,&quot;label&quot;:&quot;最小值(min)&quot;},{&quot;value&quot;:&quot;max&quot;,&quot;label&quot;:&quot;最大值(max)&quot;}]</data></div>
  <div component="$UI/system/components/justep/data/data" autoLoad="true" xid="aggData" idColumn="column" onValueChange="aggDataValueChange"><column name="column" type="String" xid="xid2"></column>
  <column name="operator" type="String" xid="xid3"></column>
  <column name="label" type="String" xid="xid4"></column>
  <column name="name" type="String" xid="xidname"></column>
  <column name="columnLabel" type="String" xid="xid5"></column>
  <column name="operatorLabel" type="String" xid="xid7"></column></div></div>  
    
    
  <span component="$UI/system/components/justep/windowReceiver/windowReceiver"
    xid="windowReceiver1" onReceive="windowReceiver1Receive" style="top:312px;left:454px;"/>
<div component="$UI/system/components/justep/panel/panel" class="x-panel x-full" xid="panel1">
   <div class="x-panel-top" xid="top1"><div component="$UI/system/components/justep/toolBar/toolBar" class="x-toolbar form-inline x-toolbar-spliter" xid="toolBar1">
    <a component="$UI/system/components/justep/button/button" class="btn btn-default" label="新增" xid="addBtn" onClick="addBtnClick" icon="icon-android-add"> 
      <i xid="i1" class="icon-android-add"/>  
      <span xid="span1">新增</span>
    </a>  
    <a component="$UI/system/components/justep/button/button" class="btn btn-default" label="删除" xid="deleteBtn" icon="icon-android-close" onClick="deleteBtnClick"> 
      <i xid="i2" class="icon-android-close"/>  
      <span xid="span2">删除</span>
    </a> 
  </div></div>
   <div class="x-panel-content" xid="content1"><table component="$UI/system/components/justep/list/list" class="x-list table" xid="list1" data="aggData"> 
    <thead xid="thead1"> 
      <tr xid="tr1"> 
        <th xid="default1">列</th>  
        <th xid="default2">统计函数</th>  
        <th xid="default4">别名</th>  
        <th xid="default3">显示名</th>  
      </tr> 
    </thead>  
    <tbody class="x-list-template x-min-height" xid="listTemplate1"> 
      <tr xid="tr2" bind-css="{success:$object == $model.aggData.getCurrentRow()}"> 
        <td xid="td1">
          <select component="$UI/system/components/justep/select/select" bind-optionsCaption="请选择..." class="form-control" xid="select1" bind-options="$model.propertyData" bind-optionsValue="name" bind-optionsLabel="label" bind-ref='ref("column")'></select></td>  
        <td xid="td2">
          <select component="$UI/system/components/justep/select/select" bind-optionsCaption="请选择..." class="form-control" xid="select2" bind-options="$model.operatorsData" bind-optionsValue="value" bind-optionsLabel="label" bind-ref='ref("operator")'></select></td>  
        <td xid="td3" style="width:25%;">
          
   <input type="text" class="form-control" component="$UI/system/components/justep/input/input" xid="input1" bind-ref='ref("name")'></input>
  </td>
  <td xid="td4" style="width:25%;">
          
   <input type="text" class="form-control" component="$UI/system/components/justep/input/input" xid="inputLabel" bind-ref='ref("label")'></input>
  </td>  
      </tr> 
    </tbody> 
  </table>
  
  
  </div>
   <div class="x-panel-bottom" xid="bottom1"><a component="$UI/system/components/justep/button/button" class="btn btn-link btn-only-label x-dialog-button" label="取消" xid="cancelBtn" onClick="cancelBtnClick">
   <i xid="i5"></i>
   <span xid="span4">取消</span></a>
  <a component="$UI/system/components/justep/button/button" class="btn btn-primary btn-only-label x-dialog-button" label="确定" xid="okBtn" onClick="okBtnClick">
   <i xid="i4"></i>
   <span xid="span5">确定</span></a></div></div></div>
