<?xml version="1.0" encoding="utf-8"?>

<div xmlns="http://www.w3.org/1999/xhtml" xid="window" class="window" component="$UI/system/components/justep/window/window"
  design="device:m;">  
  <div component="$UI/system/components/justep/model/model" xid="model" onParamsReceive="modelParamsReceive"> 
    <div component="$UI/system/components/justep/data/data" autoLoad="true"
      xid="permissionData" idColumn="id"> 
      <column name="id" type="String" xid="xid30"/>  
      <column name="permission" type="String" xid="xid33"/>  
      <column name="role" type="String" xid="xid31"/>  
      <column name="filter" type="String" xid="xid32"/>
      <column name="description" type="String" xid="xid34"/> 
    </div>  
    <div component="$UI/system/components/justep/data/data" autoLoad="true"
      xid="perAllData" idColumn="per_name"> 
      <column name="per_zh_name" type="String" xid="xid23"/>  
      <column name="per_name" type="String" xid="xid24"/> 
    </div>
    
  <div component="$UI/system/components/justep/data/data" autoLoad="true" xid="rolesData" idColumn="role_name">
  	<column name="role_name" type="String" xid="xid61"/>  
  </div></div>  
  <div component="$UI/system/components/justep/panel/panel" class="x-panel x-full"
    xid="panel1"> 
    <div class="x-panel-content" xid="content1"> 
      <div xid="div3"> 
        <div component="$UI/system/components/justep/row/row" class="x-row"
          xid="row2"> 
          <div class="x-col" xid="col4"> 
            <div component="$UI/system/components/justep/labelEdit/labelEdit"
              class="x-label-edit x-label30" xid="labelEdit2"> 
              <label class="x-label text-right" xid="label2" style="width:20%"><![CDATA[权限：]]></label>  
              <select component="$UI/system/components/justep/select/select" class="form-control x-edit"
                xid="select4" bind-options="perAllData" bind-optionsValue="per_name"
                bind-ref="$model.permissionData.ref(&quot;permission&quot;)"
                bind-optionsLabel="per_zh_name"/> 
            </div> 
          </div> 
        </div>  
        <div component="$UI/system/components/justep/row/row" class="x-row"
          xid="row1"> 
          <div class="x-col" xid="col1"> 
            <div component="$UI/system/components/justep/labelEdit/labelEdit"
              class="x-label-edit x-label30" xid="labelEdit1"> 
              <label class="x-label text-right" xid="label1" style="width:20%"><![CDATA[群组：]]></label>  
              <select component="$UI/system/components/justep/select/select" class="form-control x-edit"
                xid="editSelectRole" bind-options="rolesData" bind-optionsValue="role_name"
                bind-optionsCaption="请选择" bind-ref="$model.permissionData.ref(&quot;role&quot;)"/>
            </div> 
          </div> 
        </div>  
        <div component="$UI/system/components/justep/row/row" class="x-row"
          xid="row3"> 
          <div class="x-col" xid="col5"> 
            <div component="$UI/system/components/justep/labelEdit/labelEdit"
              class="x-label-edit x-label30" xid="labelEdit3"> 
              <label class="x-label text-right" xid="label3" style="width:20%"><![CDATA[过滤条件：]]></label>  
              <input component="$UI/system/components/justep/input/input" class="form-control x-edit"
                xid="input1" bind-ref="$model.permissionData.ref(&quot;filter&quot;)"/> 
            </div> 
          </div> 
        </div> 
      <div component="$UI/system/components/justep/row/row" class="x-row" xid="row4">
   <div class="x-col" xid="col2">
    <div component="$UI/system/components/justep/labelEdit/labelEdit" class="x-label-edit x-label30" xid="labelEdit5">
   <label class="x-label text-right" xid="label5" style="width:20%;"><![CDATA[描述：]]></label>
   <textarea component="$UI/system/components/justep/textarea/textarea" class="form-control x-edit" xid="textarea1" bind-ref='$model.permissionData.ref("description")'></textarea></div></div> </div></div> 
    </div>  
    <div class="x-panel-bottom" xid="bottom1"> 
      <div component="$UI/system/components/justep/row/row" class="x-row" xid="row5"> 
        <div class="x-col role-btn" xid="col9" style="text-align:right"> 
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
</div>
