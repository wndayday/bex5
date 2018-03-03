<?xml version="1.0" encoding="utf-8"?>

<div xmlns="http://www.w3.org/1999/xhtml" xid="window" class="window" component="$UI/system/components/justep/window/window"
  design="device:m;">  
  <div component="$UI/system/components/justep/model/model" xid="model" style="top:-8px;left:222px;height:auto;" onModelConstructDone="modelModelConstructDone" onLoad="modelLoad"> 
    
  <div component="$UI/system/components/justep/data/data" autoLoad="true" xid="roleGroupData" idColumn="id" onIndexChanged="roleGroupDataIndexChanged" onCustomRefresh="roleGroupDataCustomRefresh">
  	<column name="id" type="String" label="id列" xid="xid10"/> 
  	<column name="roleKind" type="String" label="图标" xid="xid122"/> 
  	<column name="name" type="String" label="群组名称" xid="xid123"/> 
  	<column name="code" type="String" label="群组授权" xid="xid11"/> 
  </div>
  <div component="$UI/system/components/justep/data/data" autoLoad="true" xid="permissionData" idColumn="id" limit="10" onCustomRefresh="permissionDataCustomRefresh" onCustomDelete="permissionDataCustomDelete">
  	<column name="id" type="String" label="id列" xid="xid12"/>
  	<column name="permissionKind" type="String" label="图标" xid="xid17"/>
  	<column name="name" type="String" lable="权限中文名" xid="xid210"/>
  	<column name="description" type="String" label="描述文件" xid="xid13"/>
  	<column name="code" type="String" label="功能code" xid="xid16"/>
  	<column name="actionsLabel" type="String" label="编辑" xid="xid16"/>
  	<column name="label" type="String" label="群组中文名" xid="xid15"/>  
  	<column name="role" type="String" label="群组id" xid="xid14"/>
  	<column name="condition" type="String" lable="条件" xid="xid20"/> 
  </div></div>  
  <div component="$UI/system/components/justep/panel/panel" class="x-panel x-full" xid="panel3">
   <div class="x-panel-top" xid="top3"></div>
   <div class="x-panel-content" xid="content3" style="overflow:hidden;"><div component="$UI/system/components/bootstrap/row/row" class="row" xid="row1">
   <div class="col col-xs-3" xid="col1" style="padding-left:16px;padding-top:0; box-shadow: 0 0 1px 1px #dadada;"><div xid="div15">
  <div component="$UI/system/components/justep/toolBar/toolBar" class="x-toolbar form-inline x-toolbar-spliter" xid="toolBar5"><div class="input-group pull-right" component="$UI/system/components/bootstrap/inputGroup/inputGroup" xid="inputGroup3" style="margin-bottom:4px;">
   <input type="text" class="form-control" component="$UI/system/components/justep/input/input" xid="searchRoleInput" placeHolder="搜索" style="border-radius:4px;" bind-keyup="searchRoleInputKeyup"></input></div>
  <a component="$UI/system/components/justep/button/button" class="btn btn-link btn-icon-left" label="删除" xid="delGroupBtn" icon="icon-android-close" hidden="true" style="visibility:hidden;">
   <i xid="i7" class="icon-android-close"></i>
   <span xid="span19">删除</span></a></div></div><div component="$UI/system/components/justep/dataTables/dataTables" flexibleWidth="true" responsive="true" rowActiveClass="success" class="table table-hover table-striped" xid="roleGroupdataTables" data="roleGroupData" multiSelect="false" onRowClick="roleGroupdataTablesRowClick" filter=" $model.filter($row.val('name'))" onCellRender="roleGroupdataTablesCellRender">
   <columns xid="columns4">
    <column name="roleKind" label="" xid="column8" width="20px" orderable="false" className="x-dt-cell-center"></column>
  <column name="name" xid="column9" label="群组名称"></column></columns> </div>
  </div>
   <div class="col col-xs-9" xid="col5" style="padding-right: 18px;"><div xid="div16">
  <div component="$UI/system/components/justep/toolBar/toolBar" class="x-toolbar form-inline x-toolbar-spliter" xid="toolBar4" style="padding-left:30px;">
   <div class="dropdown btn-group" component="$UI/system/components/bootstrap/dropdown/dropdown" xid="dropdown1">
   <a component="$UI/system/components/justep/button/button" class="btn btn-link btn-icon-left dropdown-toggle" label="添加" icon="icon-android-add" xid="button1">
    <i class="icon-android-add" xid="i1"></i>
    <span xid="span4">添加</span></a> 
   <ul component="$UI/system/components/justep/menu/menu" class="x-menu dropdown-menu" xid="menu1">
    <li class="x-menu-item" xid="item1">
     <a component="$UI/system/components/justep/button/button" class="btn btn-link newDataPermissionBtn" label="分配数据权限" xid="newDataPermissionBtn" icon="img:$UI/system/admin/roleBM/images/dataPermission.gif" onClick="newDataPermissionBtnClick">
      <i xid="i2"></i>
      <img src="$UI/system/admin/roleBM/images/dataPermission.gif" xid="image2"></img><span xid="span5" style="color:#000;">分配数据权限</span></a> </li> 
    <li class="x-menu-item" xid="item2">
     <a component="$UI/system/components/justep/button/button" class="btn btn-link newFunctionPermissionBtn" label="分配功能权限" xid="newFunctionPermissionBtn" icon="img:$UI/system/admin/roleBM/images/funPermission.gif" onClick="newFunctionPermissionBtnClick">
      <i xid="i4"></i>
      <img src="$UI/system/admin/roleBM/images/funPermission.gif" xid="image1"></img><span xid="span9" style="color:#000;">分配功能权限</span></a> </li> 
  <li class="x-menu-item" xid="item3">
   <a component="$UI/system/components/justep/button/button" class="btn btn-link newFunctionPermissionBtn" label="分配服务权限" xid="newServiceBtn" onClick="newServiceBtnClick" icon="img:$UI/system/admin/roleBM/images/servicePermission.gif">
    <i xid="i3"></i>
    <img src="$UI/system/admin/roleBM/images/servicePermission.gif" xid="image3"></img><span xid="span10" style="color:#000;">分配服务权限</span></a> </li></ul> </div><a component="$UI/system/components/justep/button/button" class="btn btn-link btn-icon-left" label="删除" xid="permissionsDelete" icon="icon-android-close" onClick="permissionsDeleteClick">
    <i xid="i6" class="icon-android-close"></i>
    <span xid="span18">删除</span></a> 
   <div class="input-group pull-right" component="$UI/system/components/bootstrap/inputGroup/inputGroup" xid="inputGroup4" style="margin-bottom:4px;">
   <input type="text" class="form-control" component="$UI/system/components/justep/input/input" xid="searchPermissionInput" placeHolder="搜索" style="border-radius:4px;" bind-keyup="input4Keyup"></input></div>
  </div></div><div xid="div2" style="height:auto;"><div component="$UI/system/components/justep/dataTables/dataTables" flexibleWidth="true" responsive="true" rowActiveClass="success" class="table table-hover table-striped" xid="permissiondataTables" data="permissionData" multiSelect="true" filter="$model.filter($row.val('description'))" onCellRender="permissiondataTablesCellRender">
   <columns xid="columns3">
    <column label="" name="permissionKind" xid="column5" visible="true" width="20px;" className="x-dt-cell-center" orderable="false"></column><column name="name" xid="column4" label="功能权限"></column><column name="condition" xid="column1" label="授权范围"></column><column name="actionsLabel" label="" xid="column6" orderable="false"></column><column name="description" xid="column2" label="描述"></column><column name="label" xid="column3" label="所属群组"></column>
  </columns> </div></div>
  <div component="$UI/system/components/justep/pagerBar/pagerBar" class="x-pagerbar container-fluid" xid="pagerBar2" data="permissionData">
   <div class="row" xid="div14">
    <div class="col-sm-3" xid="div13">
     <div class="x-pagerbar-length" xid="div12">
      <label component="$UI/system/components/justep/pagerLimitSelect/pagerLimitSelect" class="x-pagerlimitselect" xid="pagerLimitSelect1" defaultValue="10">
       <span xid="span1">显示</span>
       <select component="$UI/system/components/justep/select/select" class="form-control input-sm" xid="select1">
        <option value="10" xid="default4">10</option>
        <option value="20" xid="default2">20</option>
        <option value="50" xid="default3">50</option>
        <option value="100" xid="default5">100</option></select> 
       <span xid="span6">条</span></label> </div> </div> 
    <div class="col-sm-3" xid="div11">
     <div class="x-pagerbar-info" xid="div10">当前显示0条，共0条</div></div> 
    <div class="col-sm-6" xid="div9">
     <div class="x-pagerbar-pagination" xid="div1">
      <ul class="pagination" component="$UI/system/components/bootstrap/pagination/pagination" xid="pagination2">
       <li class="prev" xid="li4">
        <a href="#" xid="a3">
         <span aria-hidden="true" xid="span8">«</span>
         <span class="sr-only" xid="span7">Previous</span></a> </li> 
       <li class="next" xid="li3">
        <a href="#" xid="a4">
         <span aria-hidden="true" xid="span3">»</span>
         <span class="sr-only" xid="span2">Next</span></a> </li> </ul> </div> </div> </div> </div>
  </div></div></div>
   <div class="x-panel-bottom" xid="bottom2"></div></div>
  <span component="$UI/system/components/justep/windowDialog/windowDialog" xid="functionsDialog" status="normal" width="46%" height="60%" src="$UI/system/admin/roleBM/dialogs/selectMultiFunctions.w" forceRefreshOnOpen="true" showTitle="true" onReceived="functionsDialogReceived"></span>
  <span component="$UI/system/components/justep/windowDialog/windowDialog" xid="dataPermissionDialog" src="$UI/system/admin/roleBM/dialogs/dataPermission.w" showTitle="true" title="数据权限" status="normal" width="850px" height="600px" onReceived="dataPermissionDialogReceived" forceRefreshOnOpen="true"></span>
  <span component="$UI/system/components/justep/windowDialog/windowDialog" xid="servicesDialog" src="$UI/system/admin/roleBM/dialogs/selectMultiFunctions.w" showTitle="true" status="normal" width="46%" height="60%" forceRefreshOnOpen="true" onReceived="servicesDialogReceived"></span></div>
