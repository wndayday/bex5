<?xml version="1.0" encoding="utf-8"?>

<div xmlns="http://www.w3.org/1999/xhtml" xid="window" class="window" component="$UI/system/components/justep/window/window"
  design="device:pc">  
  <div component="$UI/system/components/justep/model/model" xid="model" style="height:auto;top:152px;left:135px;"> 
    <div component="$UI/system/components/justep/data/data" autoLoad="true"
      xid="appData" idColumn="appModel" onCustomRefresh="appDataCustomRefresh"> 
      <column label="应用模块" name="appModel" type="String" xid="xid1"/> 
    </div> 
  </div>  
  <div class="container-fluid"> 
    <div component="$UI/system/components/justep/toolBar/toolBar" class="x-toolbar form-inline x-toolbar-spliter"
      xid="toolBar2"> 
      <a component="$UI/system/components/justep/button/button" class="btn btn-primary btn-icon-left"
        xid="initBtn" label="初始化应用库" onClick="initBtnClick"> 
        <i xid="i3"/>  
        <span xid="span3">初始化应用库</span> 
      </a>  
      <a component="$UI/system/components/justep/button/button" class="btn btn-link btn-icon-left"
        label="刷新" xid="refreshBtn" icon="icon-refresh" onClick="refreshBtnClick"> 
        <i xid="i2" class="icon-refresh"/>  
        <span xid="span2">刷新</span> 
      </a> 
    </div>  
    <div component="$UI/system/components/justep/dataTables/dataTables" flexibleWidth="true"
      responsive="true" rowActiveClass="active" class="table table-hover table-striped"
      xid="appTable" multiSelect="true" data="appData"> 
      <columns xid="columns2"> 
        <column name="appModel" xid="column1"/> 
      </columns> 
    </div> 
  </div>  
  <span component="$UI/system/components/justep/dialog/dialog" xid="loadingDialog"
    width="300px" height="150px" title="提示" status="normal" showTitle="false">
    <h3 class="text-center">正在初始化...</h3>
  </span>  
</div>
