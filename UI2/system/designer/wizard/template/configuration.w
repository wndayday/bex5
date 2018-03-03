<?xml version="1.0" encoding="utf-8"?>

<div xmlns="http://www.w3.org/1999/xhtml" component="$UI/system/components/justep/window/window" class="window container-fluid">  
  <div component="$UI/system/components/justep/model/model" xid="model" style="height:auto;top:34px;left:522px;"
    onLoad="modelLoad"> 
    <div component="$UI/system/components/justep/data/data" xid="data" confirm-delete="false"
      confirm-refresh="false" idColumn="id" onIndexChanged="dataIndexChanged"> 
      <column label="配置项" name="setting" type="String" xid="column1"/>  
      <column label="id" name="id" type="String" xid="xid1"/>  
      <column label="配置页" name="configPage" type="String" xid="xid2"/>  
      <column label="模板文件" name="file" type="String" xid="xid3"/>  
      <column label="对话框" name="dialog" type="String" xid="xid4"/>
    </div> 
  </div>  
  <div class="row" style="height:100%;"> 
    <div class="col-xs-2 scroll nav-container"> 
      <ul class="nav cfg-nav" id="sidebar" bind-foreach="data.datas"> 
        <li class="center-block text-center"> 
          <i xid="i1" class="linear linear-arrowdown btn-block" bind-visible="$index()&gt;0"></i><a href="#" bind-text="ref('setting')" bind-click="pageClick" bind-css="{currentRow: $model.data.currentRow.get() == $object}"/> 
        </li> 
      </ul> 
    </div>  
    <div class="col-xs-10" style="height:100%;"> 
      <div xid="composeParent" class="composeParent"/> 
    </div> 
  </div> 
</div>
