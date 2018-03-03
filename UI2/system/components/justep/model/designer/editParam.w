<?xml version="1.0" encoding="utf-8"?>

<div xmlns="http://www.w3.org/1999/xhtml" component="$UI/system/components/justep/window/window" class="window container-fluid">  
  <div component="$UI/system/components/justep/model/model" xid="model" style="top:6px;height:auto;left:455px;"
    onLoad="modelLoad" onParamsReceive="modelParamsReceive"> 
    <div component="$UI/system/components/justep/data/data" xid="data" idColumn="name"
      confirm-delete="false" confirm-refresh="false" onBeforeDelete="dataBeforeDelete" confirmDeleteText="确定删除当前列定义?" onBeforeNew="dataBeforeNew"> 
      <column label="名称" name="name" type="String" xid="default1"></column>
	  <column label="数据类型" name="type" type="String" xid="default2"></column>
	  <column label="显示名称" name="displayName" type="String" xid="default4"></column>
	  <column label="xid" name="xid" type="String" xid="default6"></column>
   </div>  
    <div component="$UI/system/components/justep/data/data" autoLoad="true"
      xid="typeData" idColumn="name"> 
      <data xid="default3">[{"name":"String","label":"字符串"},{"name":"Integer","label":"整数"},{"name":"Double","label":"含小数数字(Double)"},{"name":"Decimal","label":"高精度数字(Decimal)"},{"name":"Boolean","label":"布尔值"},{"name":"DateTime","label":"日期时间"},{"name":"Object","label":"对象"},{"name":"Array","label":"数组"}]</data>  
      <column label="name" name="name" type="String" xid="default13"/>
      <column label="label" name="label" type="String" xid="default13_1"/>
    </div> 
  </div>  
  <div component="$UI/system/components/justep/toolBar/toolBar" class="x-toolbar form-inline x-toolbar-spliter"
    xid="toolBar1"> 
    <a component="$UI/system/components/justep/button/button" class="btn btn-default btn-icon-left"
      xid="add" onClick="{operation:'data.new'}"> 
      <i/>  
      <span/> 
    </a>  
    <a component="$UI/system/components/justep/button/button" class="btn btn-default btn-icon-left"
      xid="delete" onClick="{operation:'data.delete'}"> 
      <i/>  
      <span/> 
    </a>  
    </div>  
  <div component="$UI/system/components/justep/list/list" class="x-list" data="data"> 
    <div component="$UI/system/components/bootstrap/row/row" class="row"> 
      <div class="col col-xs-3"> 
        <label xid="label1" bind-text="data.label('name')">label</label> 
      </div>  
      <div class="col col-xs-2"> 
        <label xid="label2" bind-text="data.label('type')">label</label> 
      </div>  
      <div class="col col-xs-3"> 
        <label xid="label3" bind-text="data.label('displayName')">label</label> 
      </div>  
      </div>  
    <div class="x-list-template" style="margin:0;"> 
      <div component="$UI/system/components/bootstrap/row/row" class="row"
        bind-css="{'x-currentRow':$object==$model.data.getCurrentRow()}" style="padding: 6px 0;"> 
        <div class="col col-xs-3"> 
          <input component="$UI/system/components/justep/input/input" class="form-control"
            xid="input1" bind-ref="ref('name')"/> 
        </div>  
        <div class="col col-xs-2"> 
          <select component="$UI/system/components/justep/select/select" class="form-control"
            xid="select1" bind-ref="ref('type')" bind-options="$model.typeData" bind-optionsValue="name" bind-optionsLabel="label"/> 
        </div>  
        <div class="col col-xs-3"> 
          <input component="$UI/system/components/justep/input/input" class="form-control"
            xid="input3" bind-ref="ref('displayName')"/> 
        </div>  
        </div> 
    </div> 
  </div> 
</div>
