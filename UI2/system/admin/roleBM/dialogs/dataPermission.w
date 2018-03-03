<?xml version="1.0" encoding="utf-8"?>

<div xmlns="http://www.w3.org/1999/xhtml" xid="window" class="window" component="$UI/system/components/justep/window/window"
  design="device:m;">  
  <div component="$UI/system/components/justep/model/model" xid="model" style="height:auto;top:336px;left:198px;"
    onParamsReceive="modelParamsReceive"> 
    <div component="$UI/system/components/justep/data/data" autoLoad="true"
      xid="tableData" idColumn="id"> 
      <column name="id" type="String" xid="xid4"/>  
      <column name="label" type="String" label="数据对象：" xid="xid1"/>  
      <column name="name" type="String" xid="xid2"/>  
      <column name="path" type="String" xid="xid3"/> 
    </div>  
    <div component="$UI/system/components/justep/data/data" autoLoad="true"
      xid="permissionData"> 
      <column name="id" type="String" xid="xid5"/>  
      <column name="name" type="String" label="操作" xid="xid6"/>  
      <column name="code" type="String" label="路径名称" xid="xid9"/>  
      <column name="label" type="String" label="所属群组" xid="xid10"/>
      <column name="role" type="String" label="群组id" xid="xid11"/>  
      <column name="condition" type="String" label="授权范围" xid="xid8"/>
      <column name="description" type="String" label="描述" xid="xid12"/>  
      <column name="type" type="String" label="数据对象Path" xid="xid7"/> 
    </div> 
  <div component="$UI/system/components/justep/data/data" autoLoad="true" xid="conctrolData">
  	<column name="per_zh_name" dataType="String" xid="xid31" />
  	<column name="per_name" dataType="String" xid="xid32" />
  </div></div>  
  <div component="$UI/system/components/justep/panel/panel" class="x-panel x-full"
    xid="panel1"> 
    <div class="x-panel-top" xid="top1" height="68">
      <div component="$UI/system/components/bootstrap/row/row" class="row"
        xid="row2" style="display:flex;align-items:center"> 
        <div class="col col-xs-10" xid="col4">
          <div component="$UI/system/components/justep/labelEdit/labelEdit"
            class="x-label-edit x-label30" xid="labelEdit1"> 
            <label class="x-label text-right" xid="label1" bind-text="$model.tableData.label(&quot;label&quot;)"
              style="width:80px"/>  
            <input component="$UI/system/components/justep/input/input" class="form-control x-edit"
              xid="input1" bind-ref='$model.tableData.ref("label")' placeHolder="数据对象" readonly="true"/>
          </div>
        </div>  
        <div class="col col-xs-2" xid="col7">
          <a component="$UI/system/components/justep/button/button" class="btn btn-link btn-icon-left successBtn"
            label="选择对象" xid="chooseDataBtn" icon="icon-android-search" onClick="chooseDataBtnClick"> 
            <i xid="i1" class="icon-android-search"/>  
            <span xid="span1">选择对象</span>
          </a>
        </div>
      </div> 
    </div>  
    <div class="x-panel-content" xid="content1" style="overflow-x:hidden;"> 
      <div component="$UI/system/components/bootstrap/row/row" class="row"
        xid="row3"> 
        <div class="col col-xs-12" xid="col8">
          <div component="$UI/system/components/justep/toolBar/toolBar" class="x-toolbar form-inline x-toolbar-spliter"
            xid="toolBar1">
            <a component="$UI/system/components/justep/button/button" class="btn btn-link btn-icon-left"
              label="添加" xid="addPermissionBtn" icon="icon-android-add" onClick="addPermissionBtnClick"> 
              <i xid="i2" class="icon-android-add"/>  
              <span xid="span2">添加</span>
            </a>  
            
          </div>
        </div> 
      </div>
      <div component="$UI/system/components/bootstrap/row/row" class="row"
        xid="row1"> 
        <div class="col col-xs-12" xid="col3"> 
          <table component="$UI/system/components/justep/list/list" class="x-list table table-hover table-striped"
            xid="list1" data="permissionData" limit="20"> 
            <thead xid="thead1"> 
              <tr xid="tr1"> 
                <th xid="default1" width="200" class="text-center">授权操作</th>
                <th xid="default2" width="120" class="text-center">群组</th>
                <th xid="default3" class="text-center">授权范围</th>
                <th xid="default3" class="text-center">描述</th>
                <th xid="default4" class="text-center">操作</th>
              </tr> 
            </thead>  
            <tbody class="x-list-template x-min-height" xid="listTemplate1"> 
              <tr xid="tr2" bind-css="{success:$object == $model.permissionData.getCurrentRow()}"> 
                <td xid="td1"><select component="$UI/system/components/justep/select/select" bind-optionsCaption="请选择..." class="form-control" xid="select1" bind-ref='ref("name")' bind-options="$model.conctrolData" bind-optionsLabel="per_zh_name" bind-optionsValue="per_name"></select></td>
              <td xid="td4"><div component="$UI/system/components/justep/output/output" class="x-output text-center" xid="output1" bind-ref='ref("label")'></div></td>
  <td xid="td5"><input component="$UI/system/components/justep/input/input" class="form-control" xid="input4" bind-ref='ref("condition")'></input></td>
  <td xid="td3">
   <textarea component="$UI/system/components/justep/textarea/textarea" class="form-control" xid="textarea1" bind-ref='ref("description")'></textarea></td><td xid="td2">
   <a component="$UI/system/components/justep/button/button" class="btn btn-link btn-icon-left btn-only-label" label="删除" xid="removePermissionBtn" onClick="removePermissionBtnClick"> 
              <i xid="i3"/>  
              <span xid="span3">删除</span>
            </a></td>
  </tr> 
            </tbody> 
          </table>  
          </div> 
      </div> 
    </div>  
    <div class="x-panel-bottom" xid="bottom1"><a component="$UI/system/components/justep/button/button" class="btn btn-link btn-only-label x-dialog-button successBtn" label="取消" xid="cancelBtn" onClick="cancelBtnClick">
   <i xid="i5"></i>
   <span xid="span5">取消</span></a><a component="$UI/system/components/justep/button/button" class="btn btn-link btn-only-label x-dialog-button successBtn" label="确认" xid="okBtn" onClick="okBtnClick">
   <i xid="i4"></i>
   <span xid="span4">确认</span></a>
  </div> 
  </div> 
<span component="$UI/system/components/justep/windowDialog/windowDialog" xid="dataDialog" src="$UI/system/admin/roleBM/dialogs/dataMode.w" title="数据对象选择" showTitle="true" status="normal" forceRefreshOnOpen="true" width="700px" onReceived="dataDialogReceived"></span></div>
