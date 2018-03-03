<?xml version="1.0" encoding="utf-8"?>

<div xmlns="http://www.w3.org/1999/xhtml" component="$UI/system/components/justep/window/window" class="window container-fluid">  
  <div component="$UI/system/components/justep/model/model" xid="model" style="height:auto;top:473px;left:386px;"
    onParamsReceive="modelParamsReceive"> 
    <div component="$UI/system/components/justep/data/data" xid="data" idColumn="name"
      confirm-delete="false" confirm-refresh="false" confirmDeleteText="确定删除当前列定义?" autoLoad="true"> 
      <column label="名称" name="name" type="String" xid="default1"/>  
      <column label="显示名称" name="label" type="String" xid="default4"/>  
		<data xid="default3">[{"name":"all","label":"全部"},{"name":"today","label":"今天"},{"name":"yesterday","label":"昨天"},{"name":"thisWeek","label":"本周"},{"name":"lastWeek","label":"上周"},{"name":"thisMonth","label":"本月"},{"name":"lastMonth","label":"上月"},{"name":"thisYear","label":"本年"},{"name":"lastYear","label":"去年"},{"name":"custom","label":"自定义"}]</data> 
      </div>  
    </div>  
  <div component="$UI/system/components/justep/dataTables/dataTables" flexibleWidth="true" responsive="true" rowActiveClass="active" class="table table-hover table-striped" xid="dataTables1" data="data" multiSelect="true">
   <columns xid="columns1"><column name="label" xid="column2"></column><column name="name" xid="column1"></column>
  </columns></div></div>
