<?xml version="1.0" encoding="utf-8"?>

<div xmlns="http://www.w3.org/1999/xhtml" component="$UI/system/components/justep/window/window" class="window">  
  <div component="$UI/system/components/justep/model/model" xid="model" style="height:auto;top:253px;left:296px;"
    onLoad="modelLoad" onParamsReceive="modelParamsReceive"> 
    <div component="$UI/system/components/justep/data/data" xid="formData"
      idColumn="name" confirmDelete="false"> 
      <rule xid="rule1"/>  
      <column label="序号" name="index" type="String" xid="index1"/>  
      <column label="数据项名称" name="name" type="String" xid="default1"/>  
      <column label="数据项类型" name="data-type" type="String" xid="default2"/>  
      <column label="列名" name="labelName" type="String" xid="default3"/>  
      <column label="编辑器(*)" name="colEditor" type="String" xid="default4"/>  
      <column label="对应ID" name="refID" type="String" xid="default7"/>  
      <column label="关联dataID" name="selectDataID" type="String" xid="default6"/>  
      <column label="数据项别名" name="alias" type="String" xid="default8"/>  
      <column label="编辑器" name="colEditorName" type="String" xid="xid3"/> 
    </div>  
    <div component="$UI/system/components/justep/data/data" autoLoad="true"
      xid="editorData" idColumn="code" confirmDelete="false"> 
      <column name="code" type="String" xid="xid1"/>  
      <column name="name" type="String" xid="xid2"/>  
      <data xid="default5">[{"code":"input","name":"输入框"},{"code":"textarea","name":"文本框"},{"code":"output","name":"输出框"},{"code":"range","name":"范围框"},{"code":"password","name":"密码框"}]</data> 
    </div> 
  </div>  
  <div component="$UI/system/components/justep/panel/panel" class="x-panel x-full"
    xid="panel1"> 
    <div class="x-panel-top" xid="top1" height="87"> 
      <div class="row form-navbar1"> 
        <label for="text1" class="control-label col-xs-2" xid="control" style="padding-top:10px;">详细页标题：</label>  
        <div class="col-xs-4" xid="col1"> 
          <input component="$UI/system/components/justep/input/input" class="form-control"
            xid="titleInput" placeholder="请输入标题" onChange="input1Change"/> 
        </div> 
      </div>  
      <div class="row form-navbar2 list-navbar"> 
        <ul class="nav navbar-nav" style="margin-left:15px"> 
          <li> 
            <a bind-click="addClick" href="#" role="button"> 
              <i class="glyphicon glyphicon-plus"/>新增
            </a> 
          </li>  
          <li> 
            <a bind-click="deleteClick" href="#" role="button"> 
              <i class="glyphicon glyphicon-minus"/>删除
            </a> 
          </li>  
          <li> 
            <a bind-click="upClick" href="#" role="button"> 
              <i class="glyphicon glyphicon-arrow-up"/>上移
            </a> 
          </li>  
          <li> 
            <a bind-click="downClick" href="#" role="button"> 
              <i class="glyphicon glyphicon-arrow-down"/>下移
            </a> 
          </li> 
        </ul> 
      </div> 
    </div>  
    <div class="x-panel-content panel-body" xid="content1"> 
      <div component="$UI/system/components/justep/grid/grid" hiddenCaptionbar="true"
        altRows="true" class="x-grid-no-bordered" xid="grid1" data="formData" height="100%"
        width="100%"> 
        <columns xid="columns2"> 
          <column name="labelName" xid="column5"/>  
<!--           <column name="data-type" xid="column4"/>  
 -->          <column name="colEditorName" xid="column6" editor="component" editable="true"
            disableEditorDisplay="false"> 
            <editor xid="editor1"> 
              <select bind-ref="ref('colEditor')" class="form-control x-edit-focusin"
                component="$UI/system/components/justep/select/select" xid="select1"
                bind-options="$model.editorData" bind-optionsValue="code" bind-optionsLabel="name"
                bind-labelRef="ref(&quot;colEditorName&quot;)"/> 
            </editor> 
          </column> 
        </columns> 
      </div> 
    </div> 
  </div> 
</div>
