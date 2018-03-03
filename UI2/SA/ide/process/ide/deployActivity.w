<?xml version="1.0" encoding="utf-8"?>

<div xmlns="http://www.w3.org/1999/xhtml" xid="window" class="window" component="$UI/system/components/justep/window/window" style="overflow:hidden"
  design="device:pc">  
  <div component="$UI/system/components/justep/model/model" xid="model" onLoad="modelLoad" style="height:auto;top:243px;left:27px;"/>  
  <div component="$UI/system/components/bootstrap/row/row" class="row" xid="row2">
   <div class="col col-xs-12" xid="col4"><div component="$UI/system/components/justep/toolBar/toolBar" class="x-toolbar form-inline x-toolbar-spliter" xid="toolBar1"><div component="$UI/system/components/justep/button/buttonGroup" class="btn-group" tabbed="true" xid="buttonGroup1"><a component="$UI/system/components/justep/button/button" class="btn btn-primary" label="数据库发布" xid="tableBtn" onClick="tableBtnClick">
   <i xid="i3"></i>
   <span xid="span3">数据库发布</span></a>
  <a component="$UI/system/components/justep/button/button" class="btn btn-primary" label="资源发布" xid="resourceBtn" onClick="resourceBtnClick">
   <i xid="i4"></i>
   <span xid="span4">资源发布</span></a></div></div></div>
   </div>
  <span component="$UI/system/components/justep/windowDialog/windowDialog" xid="deployTableDialog" title="数据库发布" showTitle="true" status="normal" src="$UI/system/designer/webIde/bizDesigner/creteTable/createDatatabs/dataTabs2.w" forceRefreshOnOpen="true"></span><div component="$UI/system/components/bootstrap/row/row" class="row" xid="row1"
    style="height:100%;margin-left:0px;margin-right:0px"> 
    <div class="col col-xs-12" xid="col1" style="height:100%;position:relative">
    	<div>请选择发布的资源</div>
    	<div xid="resourcesContainer"></div>
    </div>  
    <!-- 
    <div class="col col-xs-7" xid="content" style="height:100%;"/>
     --> 
  </div>
  
  <span component="$UI/system/components/justep/dialog/dialog" xid="loadingDialog"
    width="300px" height="100px" title="提示" status="normal" showTitle="false">
    <h3 class="text-center">正在发布资源...</h3>
  </span>  
</div>
