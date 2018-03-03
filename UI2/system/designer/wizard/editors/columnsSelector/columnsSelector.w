<?xml version="1.0" encoding="utf-8"?>

<div xmlns="http://www.w3.org/1999/xhtml" xid="window" class="window" component="$UI/system/components/justep/window/window"
  design="device:m;">  
  <div component="$UI/system/components/justep/model/model" xid="model" style="height:auto;left:288px;top:190px;"
    onParamsReceive="modelParamsReceive"> 
    <div component="$UI/system/components/justep/data/data" autoLoad="true"
      xid="data1" idColumn="alias"> 
      <column label="别名" name="alias" type="String" xid="xid1"/>  
      <column label="类型" name="data-type" type="String" xid="xid2"/>  
      <column label="名称" name="label" type="String" xid="xid3"/>  
      <column label="标识" name="name" type="String" xid="xid4"/>  
      <column name="required" type="String" xid="xid5"/>  
      <column name="selected" type="String" xid="xid6"/>  
      <column name="type" type="String" xid="xid7"/> 
    </div> 
  </div>  
  <div component="$UI/system/components/justep/toolBar/toolBar" class="x-toolbar form-inline x-toolbar-spliter"
    xid="toolBar1"> 
    <input type="text" class="form-control  search" component="$UI/system/components/justep/input/input"
      xid="searchInput" placeHolder="输入过滤器文本" bind-keyup="searchInputKeyup" name="search"/> 
  </div>  
  <div xid="div1" bind-visible="multiSelect">
    <div component="$UI/system/components/justep/dataTables/dataTables" flexibleWidth="true"
      responsive="true" rowActiveClass="active" class="table table-hover table-striped"
      xid="dataTables1" data="data1" filter="$model.filter($row.val('name'))" multiSelect="true"> 
      <columns xid="columns1"> 
        <column name="name" xid="column4" /><column name="label" xid="column3" /><column name="data-type" xid="column2"/>  
          
         
      </columns> 
    </div>
  </div>  
  <div xid="div2" bind-visible="!multiSelect.get()">
    <div component="$UI/system/components/justep/dataTables/dataTables" flexibleWidth="true"
      responsive="true" rowActiveClass="active" class="table table-hover table-striped"
      xid="dataTables3" data="data1" filter="$model.filter2($row.val('name'))" multiSelect="false"> 
      <columns xid="columns3"> 
        <column name="name" xid="column6" /><column name="label" xid="column7" /><column name="data-type" xid="column8"/>  
          
        
      </columns> 
    </div>
  </div>
</div>
