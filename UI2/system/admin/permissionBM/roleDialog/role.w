<?xml version="1.0" encoding="utf-8"?>

<div xmlns="http://www.w3.org/1999/xhtml" xid="window" class="window" component="$UI/system/components/justep/window/window"
  design="device:m;">  
  <div component="$UI/system/components/justep/model/model" xid="model" onParamsReceive="modelParamsReceive" style="top:19px;left:211px;height:auto;"> 
    <div component="$UI/system/components/justep/data/data" autoLoad="true"
      xid="permissionData" idColumn="permission">
      <column name="id" type="String" xid="xid19"/> 
      <column name="permission" type="String" xid="xid20"/>
      <column name="role_type" type="String" xid="xid23"/> 
      <column name="role" type="String" xid="xid21"/>  
      <column name="filter" type="String" xid="xid22"/>
      <column name="type" type="String" xid="xid24"/>
      <column name="description" type="String" xid="xid26"/>  
    </div>  
    <div component="$UI/system/components/justep/data/data" autoLoad="true"
      xid="rolesData"> 
      <column name="role_name" type="String" xid="xid23"/> 
    </div>  
    <div component="$UI/system/components/justep/data/data" autoLoad="true"
      xid="perData" idColumn="per_name">
      	<column name="per_zh_name" type="String" xid="xid22"/>
      	<column name="per_name" type="String" xid="xid23"/>
      </div>
  <div component="$UI/system/components/justep/data/data" autoLoad="true" xid="addPerData">
  	<column name="permission" type="String" xid="xid60"/>  
      <column name="role" type="String" xid="xid61"/>  
      <column name="filter" type="String" xid="xid62"/>
       <column name="description" type="String" xid="xid63"/>
  </div>
  </div>  
  <div component="$UI/system/components/justep/toolBar/toolBar" class="x-toolbar form-inline x-toolbar-spliter"
    xid="toolBar1"> 
    <a component="$UI/system/components/justep/button/button" class="btn btn-link"
      label="新增" xid="addBtn" icon="icon-android-add" onClick="addBtnClick"> 
      <i xid="i2" class="icon-android-add"/>  
      <span xid="span2">新增</span> 
    </a> 
  </div>  
  <table component="$UI/system/components/justep/list/list" class="x-list table"
    xid="list1" data="permissionData" filter=' $row.val("type")==dataPath.get()'> 
    <thead xid="thead1"> 
      <tr xid="tr1"> 
        <th class="permission-thead" width="200" xid="default1">授权</th>  
        <th class="permission-thead" width="200" xid="default1">群组</th>  
        <th class="permission-thead" width="200" xid="default2">授权范围</th>
        <th class="permission-thead" width="200" xid="default2">描述</th>  
        <th class="permission-thead" width="200" xid="default3">操作</th> 
      </tr> 
    </thead>  
    <tbody class="x-list-template x-min-height" xid="listTemplate1"> 
      <tr xid="tr2" bind-css="{success:$object==$model.permissionData.getCurrentRow()}"> 
        <td xid="td1"> 
          <div component="$UI/system/components/justep/output/output" class="x-output text-center" xid="output3" bind-ref='ref("permission")'></div></td>  
        <td xid="td2"><div component="$UI/system/components/justep/output/output" class="x-output text-center" xid="output1" bind-ref='ref("role")'></div></td>  
        <td xid="td3"> 
          <div component="$UI/system/components/justep/output/output" class="x-output text-center"
            xid="output2" bind-ref="ref(&quot;filter&quot;)"/> 
        </td>  
        <td xid="td4">
   <div component="$UI/system/components/justep/output/output" class="x-output text-center" xid="output4" bind-ref='ref("description")'></div></td><td xid="td5" style="text-align:center;"> 
          <a component="$UI/system/components/justep/button/button" class="btn btn-link"
            label="编辑" xid="editBtn" icon="icon-edit" onClick="editBtnClick"> 
            <i xid="i3" class="icon-edit"/>  
            <span xid="span3">编辑</span> 
          </a>  
          <a component="$UI/system/components/justep/button/button" class="btn btn-link"
            label="删除" xid="deleteData" icon="icon-android-close" onClick="deleteDataClick"> 
            <i xid="i1" class="icon-android-close"/>  
            <span xid="span1">删除</span> 
          </a> 
        </td> 
      </tr> 
    </tbody> 
  </table>  
  <div component="$UI/system/components/justep/popOver/popOver" class="x-popOver"
    direction="auto" xid="newPopOverRole" style="top:13px;left:90px;" dismissible="false"> 
    <div class="x-popOver-overlay" xid="div1" style="background-color: #000;"/>  
    <div class="x-popOver-content popOver-role" xid="div2"> 
      <div xid="div4" style="border-bottom:1px solid #ccc;"> 
        <div component="$UI/system/components/justep/row/row" class="x-row"
          xid="row4"> 
          <div class="x-col" xid="col6"> 
            <span xid="span4"><![CDATA[权限信息]]></span> 
          </div> 
        </div> 
      </div>  
      <div xid="div3"> 
        <div component="$UI/system/components/justep/row/row" class="x-row"
          xid="row2"> 
          <div class="x-col" xid="col4"> 
            <div component="$UI/system/components/justep/labelEdit/labelEdit"
              class="x-label-edit x-label30" xid="labelEdit2"> 
              <label class="x-label text-right" xid="label2" style="width:20%"><![CDATA[权限：]]></label>  
              <select component="$UI/system/components/justep/select/select" class="form-control x-edit"
                xid="select4" bind-options="perData" bind-optionsValue="per_name" bind-optionsCaption="请选择" bind-ref='$model.addPerData.ref("permission")' bind-optionsLabel="per_zh_name" optionsAutoLoad="true"/> 
            </div> 
          </div> 
        </div>  
        <div component="$UI/system/components/justep/row/row" class="x-row"
          xid="row1"> 
          <div class="x-col" xid="col1"> 
            <div component="$UI/system/components/justep/labelEdit/labelEdit"
              class="x-label-edit x-label30" xid="labelEdit1"> 
              <label class="x-label text-right" xid="label1" style="width:20%"><![CDATA[授权对象：]]></label>  
              <select component="$UI/system/components/justep/select/select" class="form-control x-edit"
                xid="selectRoles" bind-ref='$model.addPerData.ref("role")'/> 
            </div> 
          </div> 
        </div>  
        <div component="$UI/system/components/justep/row/row" class="x-row"
          xid="row3"> 
          <div class="x-col" xid="col5"> 
            <div component="$UI/system/components/justep/labelEdit/labelEdit"
              class="x-label-edit x-label30" xid="labelEdit3"> 
              <label class="x-label text-right" xid="label3" style="width:20%"><![CDATA[授权范围：]]></label>  
              <input component="$UI/system/components/justep/input/input" class="form-control x-edit"
                xid="input1" bind-ref='$model.addPerData.ref("filter")'/> 
            </div> 
          </div> 
        </div> 
      <div component="$UI/system/components/justep/row/row" class="x-row" xid="row6">
   <div class="x-col" xid="col2">
    <div component="$UI/system/components/justep/labelEdit/labelEdit" class="x-label-edit x-label30" xid="labelEdit6">
   <label class="x-label text-right" xid="label6" style="width:20%;"><![CDATA[描述：]]></label>
   <textarea component="$UI/system/components/justep/textarea/textarea" class="form-control x-edit" xid="textarea3" bind-ref='$model.addPerData.ref("description")'></textarea></div></div> </div></div>  
      <div component="$UI/system/components/justep/row/row" class="x-row" xid="row5"
        style="position:absolute;bottom:12px;"> 
        <div class="x-col role-btn" xid="col9"> 
          <a component="$UI/system/components/justep/button/button" class="btn btn-default"
            label="确定" xid="okBtn" style="margin-right:6px;" onClick="okBtnClick"> 
            <i xid="i4"/>  
            <span xid="span5">确定</span> 
          </a>  
          <a component="$UI/system/components/justep/button/button" class="btn btn-default"
            label="取消" xid="cancelBtn" onClick="cancelBtnClick"> 
            <i xid="i5"/>  
            <span xid="span6">取消</span> 
          </a> 
        </div> 
      </div> 
    
  </div> 
  </div> 
<span component="$UI/system/components/justep/windowDialog/windowDialog" xid="editRoleDialog" src="$UI/system/admin/permissionBM/roleDialog/editRole.w" onReceived="editRoleDialogReceived" status="normal" showTitle="true" width="60%" height="50%" title="编辑数据权限：" forceRefreshOnOpen="true"></span>
  </div>
