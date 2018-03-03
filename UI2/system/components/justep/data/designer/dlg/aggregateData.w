<?xml version="1.0" encoding="utf-8"?>

<div xmlns="http://www.w3.org/1999/xhtml" xid="window" class="window" component="$UI/system/components/justep/window/window"
  design="device:pc">  
  <div component="$UI/system/components/justep/model/model" xid="model" style="top:491px;left:365px;height:auto;"
    onLoad="modelLoad"> 
    <div component="$UI/system/components/justep/data/data" autoLoad="true"
      xid="tableData" idColumn="name" onValueChange="tableDataValueChange"> 
      <column name="xid" type="String" xid="xid17"/>  
      <column name="name" type="String" xid="xid2"/>  
      <column name="url" type="String" xid="xid16"/>  
      <column name="className" type="String" xid="xid5"/>  
      <column name="cols" type="String" xid="xid3-1"/>  
      <column name="_cols_label" type="String" xid="xid20-1"/>
      <column name="filter" type="String" xid="xid3"/>  
      <column name="_filter_label" type="String" xid="xid20"/>
      <column name="having" type="String" xid="xid4"/>  
      <column name="_having_label" type="String" xid="xid7"/>  
      <column name="groupBy" type="String" xid="xid12"/>  
      <column name="_groupBy_label" type="String" xid="xid13"/>  
      <column name="orderBy" type="String" xid="xid12-1"/>  
      <column name="_orderBy_label" type="String" xid="xid13-1"/>  
      <column name="component" type="String" xid="xid18"/>  
      <column name="autoLoad" type="String" xid="xid9"/>  
    </div>  
    <div component="$UI/system/components/justep/data/data" autoLoad="true"
      xid="dataObjects" idColumn="name"> 
      <column name="name" type="String" xid="xid11"/>  
      <column name="path" type="String" xid="xid14"/>  
      <column name="label" type="String" xid="xid8"/>
    </div>  
  </div>  
  <span component="$UI/system/components/justep/windowDialog/windowDialog" xid="windowDialog1"
    src="$UI/system/designer/webIde/quickIde/propPages/dataSetting/chooseColumns.w"
    title="设置分组列" showTitle="true" status="normal" forceRefreshOnOpen="true" width="800"
    height="600" onReceive="windowDialog1Receive" style="top:468px;left:250px;"/>  
  <span component="$UI/system/components/justep/windowDialog/windowDialog" xid="windowDialog"
    src="$UI/system/designer/webIde/quickIde/propPages/dataSetting/chooseDataObject.w" showTitle="false" status="normal" forceRefreshOnOpen="true"
    width="800" height="600" style="top:489px;left:169px;" onReceive="windowDialogReceive"/>  
  <span component="$UI/system/components/justep/windowDialog/windowDialog" xid="colsDialog"
    title="统计列设置" src="./aggregateSelector.w" showTitle="true" status="normal" forceRefreshOnOpen="true"
    width="800" height="600" style="top:491px;left:293px;" onReceive="colsDialogReceive"/>  
  <div component="$UI/system/components/justep/panel/panel" class="x-panel x-full"
    xid="panel1"> 
    <div class="x-panel-content" xid="content1"> 
      <span component="$UI/system/components/justep/button/checkbox" class="x-checkbox" xid="checkbox1" label="自动加载数据" checkedValue="true" uncheckedValue="false" bind-ref='$model.tableData.ref("autoLoad")'></span><div component="$UI/system/components/justep/labelEdit/labelEdit" class="x-label-edit x-label30"
        xid="labelEdit1"> 
        <label class="x-label" xid="label1"><![CDATA[数据集名称：]]></label>  
        <input component="$UI/system/components/justep/input/input" class="form-control x-edit"
          xid="input1" bind-ref="$model.tableData.ref(&quot;name&quot;)"/>
      </div>  
      <div component="$UI/system/components/justep/labelEdit/labelEdit" class="x-label-edit x-label30"
        xid="labelEdit2"> 
        <label class="x-label" xid="label2"><![CDATA[数据集对应的数据对象：]]></label>  
        <select component="$UI/system/components/justep/select/select" class="form-control x-edit"
          xid="select2" bind-options="dataObjects" bind-optionsValue="name" bind-optionsLabel="label"
          bind-ref="$model.tableData.ref(&quot;className&quot;)" bind-optionsCaption="请选择..."/>  
        <a component="$UI/system/components/justep/button/button" class="btn btn-default btn-only-icon"
          label="button" xid="addDataObjectBtn" icon="icon-android-add" onClick="addDataObjectBtnClick"> 
          <i xid="i3" class="icon-android-add"/>  
          <span xid="span4"/>
        </a>  
        <a component="$UI/system/components/justep/button/button" class="btn btn-default btn-only-icon"
          label="button" xid="editDataObjectBtn" icon="glyphicon glyphicon-pencil"
          style="margin-left:8px;margin-right:8px;" onClick="editDataObjectBtnClick"> 
          <i xid="i1" class="glyphicon glyphicon-pencil"/>  
          <span xid="span1"/>
        </a>
        <a component="$UI/system/components/justep/button/button" class="btn btn-default btn-only-icon"
          label="button" xid="button2" icon="icon-android-lightbulb" bind-mouseover="button2Mouseover"
          bind-mouseout="button2Mouseout"> 
          <i xid="i2" class="icon-android-lightbulb"/>  
          <span xid="span2"/>
        </a>
      </div>  
      <div xid="div2" class="promptStyle">每个页面上的数据集都要对应一个数据对象，数据对象进行实际数据的存储。数据集是数据对象的一个具体实例。</div>
      <div component="$UI/system/components/justep/labelEdit/labelEdit" class="x-label-edit x-label30"
        xid="labelEdit6"> 
        <label class="x-label" xid="label6"><![CDATA[分组列：]]></label>  
        <input component="$UI/system/components/justep/input/input" class="form-control x-edit"
          xid="groupByInput" bind-ref='$model.tableData.ref("_groupBy_label")' disabled="true"/>  
        <a component="$UI/system/components/justep/button/button" class="btn btn-default btn-only-icon"
          label="button" xid="chooseGroupByBtn" icon="glyphicon glyphicon-option-horizontal"
          onClick="chooseGroupByBtnClick"> 
          <i xid="i6" class="glyphicon glyphicon-option-horizontal"/>  
          <span xid="span6"/>
        </a> 
      </div>  
      <div component="$UI/system/components/justep/labelEdit/labelEdit" class="x-label-edit x-label30"
        xid="labelEdit6-1"> 
        <label class="x-label" xid="label6-1"><![CDATA[统计列：]]></label>  
        <input component="$UI/system/components/justep/input/input" class="form-control x-edit"
          xid="colsInput" bind-ref='$model.tableData.ref("_cols_label")' disabled="true"/>  
        <a component="$UI/system/components/justep/button/button" class="btn btn-default btn-only-icon"
          label="button" xid="chooseColsBtn" icon="glyphicon glyphicon-option-horizontal"
          onClick="chooseColsBtnClick"> 
          <i xid="i6-1" class="glyphicon glyphicon-option-horizontal"/>  
          <span xid="span6-1"/>
        </a> 
      </div>  
      <div component="$UI/system/components/justep/labelEdit/labelEdit" class="x-label-edit x-label30"
        xid="labelEdit3"> 
        <label class="x-label" xid="label3">过滤：</label>  
        <input component="$UI/system/components/justep/input/input" class="form-control x-edit"
          xid="input3" bind-ref="$model.tableData.ref(&quot;_filter_label&quot;)" disabled="true"/>  
        <a component="$UI/system/components/justep/button/button" class="btn btn-default btn-only-icon"
          label="选择" xid="filterBtn" icon="glyphicon glyphicon-option-horizontal"
          onClick="filterBtnClick"> 
          <i xid="i4" class="glyphicon glyphicon-option-horizontal"/>  
          <span xid="span3">选择</span>
        </a> 
      </div> 
      <div component="$UI/system/components/justep/labelEdit/labelEdit" class="x-label-edit x-label30"
        xid="labelEdit3-1"> 
        <label class="x-label" xid="label3-1">统计过滤：</label>  
        <input component="$UI/system/components/justep/input/input" class="form-control x-edit"
          xid="input3-1" bind-ref="$model.tableData.ref(&quot;_having_label&quot;)" disabled="true"/>  
        <a component="$UI/system/components/justep/button/button" class="btn btn-default btn-only-icon"
          label="选择" xid="havingBtn" icon="glyphicon glyphicon-option-horizontal"
          onClick="havingBtnClick"> 
          <i xid="i4-1" class="glyphicon glyphicon-option-horizontal"/>  
          <span xid="span3-1">选择</span>
        </a> 
      </div> 
    <div component="$UI/system/components/justep/labelEdit/labelEdit" class="x-label-edit x-label30" xid="labelEdit4">
   <label class="x-label" xid="label4">排序：</label>
   <input component="$UI/system/components/justep/input/input" class="form-control x-edit" xid="input4" bind-ref='$model.tableData.ref("_orderBy_label")' disabled="true"></input>
   <a component="$UI/system/components/justep/button/button" class="btn btn-default btn-only-icon" label="选择" xid="orderByBtn" icon="glyphicon glyphicon-option-horizontal" onClick="orderByBtnClick">
    <i xid="i5" class="glyphicon glyphicon-option-horizontal"></i>
    <span xid="span5">选择</span></a> </div></div> 
  </div>  
  <span component="$UI/system/components/justep/windowDialog/windowDialog" xid="filterDialog"
    src="$UI/system/designer/webIde/quickIde/propPages/dataSetting/editFilter.w" title="过滤设置" showTitle="true" status="normal" forceRefreshOnOpen="true"
    width="800" height="600" onReceive="filterDialogReceive" style="top:239px;left:26px;"/>
<span component="$UI/system/components/justep/windowDialog/windowDialog" xid="orderByDialog" title="排序设置" src="$UI/system/designer/webIde/quickIde/propPages/dataSetting/orderBySelector.w" showTitle="true" status="normal" forceRefreshOnOpen="true" width="800" height="600" onReceive="orderByDialogReceive" style="top:491px;left:293px;"></span>
  <span component="$UI/system/components/justep/windowDialog/windowDialog" xid="havingDialog" title="统计过滤设置" src="./editHaving.w" showTitle="true" status="normal" forceRefreshOnOpen="true" width="800" height="600" style="top:510px;left:244px;" onReceive="havingDialogReceive"></span></div>
