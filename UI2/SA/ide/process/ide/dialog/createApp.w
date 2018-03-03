<?xml version="1.0" encoding="utf-8"?>

<div xmlns="http://www.w3.org/1999/xhtml" xid="window" class="window" component="$UI/system/components/justep/window/window"
  design="device:pc;">  
  <div component="$UI/system/components/justep/model/model" xid="model" onLoad="modelLoad"> 
    <div component="$UI/system/components/justep/data/data" autoLoad="true"
      xid="appData" autoNew="false" idColumn="id">  
    <column label="唯一标识" name="id" type="String" xid="default41"/>  
    <column label="应用" name="path" type="String" xid="default42"/>  
    <column label="数据源" name="datasource" type="String" xid="default43"/>  
    <data xid="default4">[{path: "", datasource: "system", id: "001"}]</data> 
    </div>
  </div>  
  <div component="$UI/system/components/justep/panel/panel" class="x-panel x-full"
    xid="panel1"> 
    <div class="x-panel-content" xid="content1">
      <div component="$UI/system/components/justep/labelEdit/labelEdit" class="x-label-edit x-label30"
        xid="labelEdit1"> 
        <label class="x-label" xid="label1"><![CDATA[应用名]]></label>  
        <input component="$UI/system/components/justep/input/input" class="form-control x-edit"
          xid="input1" bind-ref="$model.appData.ref(&quot;path&quot;)" placeHolder="必须以字母开头, 只能包含字母和数字式. "/>
      </div>
      <div component="$UI/system/components/justep/labelEdit/labelEdit" class="x-label-edit x-label30"
        xid="labelEdit2"> 
        <label class="x-label" xid="label2"><![CDATA[数据源]]></label>  
        <input component="$UI/system/components/justep/input/input" class="form-control x-edit"
          xid="input2" bind-ref="$model.appData.ref(&quot;datasource&quot;)"/>
      </div>
    </div>  
    <div class="x-panel-bottom" xid="bottom1"> 
      <a component="$UI/system/components/justep/button/button" class="btn btn-link btn-only-label x-dialog-button"
        label="取消" xid="cancelBtn" onClick="{&quot;operation&quot;:&quot;wReceiver.windowCancel&quot;}"> 
        <i xid="i2"/>  
        <span xid="span2">取消</span> 
      </a>  
      <a component="$UI/system/components/justep/button/button" class="btn btn-primary x-dialog-button"
        label="确定" xid="OKBtn" onClick="OKBtnClick"> 
        <i xid="i1"/>  
        <span xid="span1">确定</span> 
      </a> 
    </div> 
  </div>  
  <span component="$UI/system/components/justep/windowReceiver/windowReceiver"
    xid="wReceiver" style="left:443px;top:568px;"/> 
</div>
