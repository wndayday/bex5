<?xml version="1.0" encoding="utf-8"?>

<div xmlns="http://www.w3.org/1999/xhtml" xid="window" class="window" component="$UI/system/components/justep/window/window">  
  <div component="$UI/system/components/justep/model/model" xid="model" onLoad="modelLoad"
    style="top:162px;left:62px;height:auto;" onParamsReceive="modelParamsReceive"> 
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
  </div>  
  <a component="$UI/system/components/justep/button/button" class="btn btn-default"
    label="清除属性编辑器" xid="button2" onClick="button2Click"> 
    <i xid="i2"/>  
    <span xid="span2">清除属性编辑器</span>
  </a>  
  <a component="$UI/system/components/justep/button/button" class="btn btn-default"
    label="获取模板自定义构建创建编辑器" xid="button1" onClick="button1Click"> 
    <i xid="i1"/>  
    <span xid="span1">获取模板自定义构建创建编辑器</span>
  </a>
  <a component="$UI/system/components/justep/button/button" class="btn btn-default"
    label="直接创建编辑器" xid="button3" onClick="button3Click"> 
    <i xid="i3"/>  
    <span xid="span3">直接创建编辑器</span>
  </a>
  <div xid="div1" style="margin:15px;width:500px;"/>  
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
</div>
