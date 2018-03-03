<?xml version="1.0" encoding="utf-8"?>

<div xmlns="http://www.w3.org/1999/xhtml" component="$UI/system/components/justep/window/window" class="window container-fluid">  
  <div component="$UI/system/components/justep/model/model" xid="model" style="height:auto;top:473px;left:386px;"
    onLoad="modelLoad" onParamsReceive="modelParamsReceive"> 
    <div component="$UI/system/components/justep/data/data" xid="data" idColumn="name"
      confirm-delete="false" confirm-refresh="false" confirmDeleteText="确定删除当前列定义?"> 
      <column label="名称" name="name" type="String" xid="default1"/>  
      <column label="数据类型" name="data-type" type="String" xid="default2"/>  
      <column label="显示名称" name="label" type="String" xid="default4"/>  
      <column label="列索引" name="colNum" type="Integer" xid="xid1"/> 
    </div>  
    <div component="$UI/system/components/justep/data/data" autoLoad="false"
      xid="cfgData" idColumn="id" autoNew="true" onAfterNew="cfgDataAfterNew">
      <column label="id" name="id" type="String" xid="default13"/>  
      <column label="全部页" name="allSheet" type="String" xid="default17"/>  
      <column label="开始页" name="sheetStart" type="String" xid="default18"/>  
      <column label="结束页" name="sheetEnd" type="String" xid="default19"/>  
      <column label="全部行" name="allRow" type="String" xid="default20"/>  
      <column label="开始行" name="rowStart" type="String" xid="default21"/>  
      <column label="结束行" name="rowEnd" type="String" xid="default22"/> 
      </div>
  </div>  
  <div component="$UI/system/components/justep/controlGroup/controlGroup" class="x-control-group"
    title="参数" xid="controlGroup2" collapsible="true"> 
    <div class="x-control-group-title" xid="controlGroupTitle2"> 
      <span xid="span4"><![CDATA[参数设置]]></span>
    </div>  
    <div class="form-horizontal container-fluid" component="$UI/system/components/bootstrap/form/form"
      xid="form2"> 
      <div class="form-group" xid="formGroup3"> 
        <div class="col-xs-2" xid="col9"> 
          <label class="control-label" xid="controlLabel4" bind-text=" $model.cfgData.label(&quot;allSheet&quot;)"/>
        </div>  
        <div class="col-xs-2" xid="col10"> 
          <span component="$UI/system/components/justep/button/checkbox" class="x-checkbox"
            xid="checkbox3" checkedValue="true" bind-ref="cfgData.ref('allSheet')" uncheckedValue="false"/>
        </div> 
      <div class="col-xs-2" xid="col13"> 
          <label class="control-label" xid="controlLabel5" bind-text=" $model.cfgData.label(&quot;sheetStart&quot;)" />
        </div><div class="col-xs-2" xid="col14"> 
          <input component="$UI/system/components/justep/input/input" class="form-control" xid="input1" bind-ref="cfgData.ref('sheetStart')" />
        </div><div class="col-xs-2" xid="col15"> 
          <label class="control-label" xid="controlLabel6" bind-text=" $model.cfgData.label(&quot;sheetEnd&quot;)" />
        </div><div class="col-xs-2" xid="col16"> 
          <input component="$UI/system/components/justep/input/input" class="form-control" xid="input3" bind-ref="cfgData.ref('sheetEnd')" />
        </div></div>  
      <div class="form-group" xid="formGroup5"> 
        <div class="col-xs-2" xid="col17"> 
          <label class="control-label" xid="controlLabel7" bind-text=" $model.cfgData.label(&quot;allRow&quot;)"/>
        </div>  
        <div class="col-xs-2" xid="col18"> 
          <span component="$UI/system/components/justep/button/checkbox" class="x-checkbox"
            xid="checkbox4" checkedValue="true" bind-ref="cfgData.ref('allRow')" uncheckedValue="false"/>
        </div> 
      <div class="col-xs-2" xid="col21"> 
          <label class="control-label" xid="controlLabel8" bind-text=" $model.cfgData.label(&quot;rowStart&quot;)" />
        </div><div class="col-xs-2" xid="col22"> 
          <input component="$UI/system/components/justep/input/input" class="form-control" xid="input6" bind-ref="cfgData.ref('rowStart')" />
        </div><div class="col-xs-2" xid="col23"> 
          <label class="control-label" xid="controlLabel9" bind-text=" $model.cfgData.label(&quot;rowEnd&quot;)" />
        </div><div class="col-xs-2" xid="col24"> 
          <input component="$UI/system/components/justep/input/input" class="form-control" xid="input7" bind-ref="cfgData.ref('rowEnd')" />
        </div></div>  
      </div> 
  </div>  
  <div component="$UI/system/components/justep/controlGroup/controlGroup" class="x-control-group"
    title="title" xid="controlGroup1"> 
    <div class="x-control-group-title" xid="controlGroupTitle1"> 
      <span xid="span1"><![CDATA[列索引设置]]></span>
    </div>  
    <div component="$UI/system/components/justep/list/list" class="x-list"
      data="data"> 
      <div component="$UI/system/components/bootstrap/row/row" class="row"> 
        <div class="col col-xs-3"> 
          <label xid="label1" bind-text="data.label('name')">label</label> 
        </div>  
        <div class="col col-xs-3"> 
          <label xid="label2" bind-text="data.label('data-type')">label</label> 
        </div>  
        <div class="col col-xs-3"> 
          <label xid="label3" bind-text="data.label('label')">label</label> 
        </div>  
        <div class="col col-xs-3"> 
          <label xid="label4" bind-text="data.label('colNum')">label</label> 
        </div> 
      </div>  
      <div class="x-list-template" style="margin:0;"> 
        <div component="$UI/system/components/bootstrap/row/row" class="row"
          bind-css="{'x-currentRow':$object==$model.data.getCurrentRow()}" style="padding: 6px 0;"> 
          <div class="col col-xs-3"> 
            <div component="$UI/system/components/justep/output/output" class="x-output"
              xid="output3" bind-ref="ref(&quot;name&quot;)"/> 
          </div>  
          <div class="col col-xs-3"> 
            <div component="$UI/system/components/justep/output/output" class="x-output"
              xid="output1" bind-ref="ref(&quot;data-type&quot;)"/> 
          </div>  
          <div class="col col-xs-3"> 
            <div component="$UI/system/components/justep/output/output" class="x-output"
              xid="output2" bind-ref="ref(&quot;label&quot;)"/> 
          </div>  
          <div class="col col-xs-3"> 
            <input component="$UI/system/components/justep/input/input" class="form-control"
              xid="input2" bind-ref="ref(&quot;colNum&quot;)"/> 
          </div> 
        </div> 
      </div> 
    </div>
  </div>
</div>
