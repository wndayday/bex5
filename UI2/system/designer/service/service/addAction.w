<?xml version="1.0" encoding="utf-8"?>

<div xmlns="http://www.w3.org/1999/xhtml" xid="window" class="window" component="$UI/system/components/justep/window/window"
  design="device:m;">  
  <div component="$UI/system/components/justep/model/model" xid="model" style="height:auto;top:317px;left:529px;"
    onLoad="modelLoad" onParamsReceive="modelParamsReceive">
    <div component="$UI/system/components/justep/data/data" autoLoad="true"
      xid="basicData" idColumn="name">
      <column label="参数名称" name="name" type="String" xid="xid1"/>  
      <column label="数据类型" name="dataType" type="String" xid="xid3"/>
    </div>  
    <div component="$UI/system/components/justep/data/data" autoLoad="true"
      xid="assemblyData" idColumn="value">
      <column label="集合值" name="value" type="String" xid="xid4"/>
    </div>  
    <div component="$UI/system/components/justep/data/data" autoLoad="true"
      xid="modeTypeData" idColumn="type">
      <column label="数据类型" name="type" type="String" xid="xid5"/>
    </div>  
    <div component="$UI/system/components/justep/data/data" autoLoad="true"
      xid="qutoData" idColumn="name">
      <column isCalculate="false" label="名称" name="name" type="String" xid="xid6"></column><column label="集合类型" name="dataType" type="String" xid="xid7"/>
    </div>
  <div component="$UI/system/components/justep/data/data" autoLoad="true" xid="nameData" idColumn="name"><column label="名称" name="name" type="String" xid="xid2"></column></div>
  <div component="$UI/system/components/justep/data/data" autoLoad="true" xid="actionData" idColumn="name"><column label="名称" name="name" type="String" xid="xid8"></column>
  <column label="描述" name="dec" type="String" xid="xid9"></column>
  <column label="说明" name="content" type="String" xid="xid10"></column></div></div>  
  <div component="$UI/system/components/justep/panel/panel" class="x-panel x-full"
    xid="panel2"> 
    <div class="x-panel-content" xid="content3"> 
      <div xid="div3">
                  <div component="$UI/system/components/justep/labelEdit/labelEdit" class="x-label-edit x-label30" xid="labelEdit1"> 
                    <label class="x-label" xid="label1" style="text-align:right;"><![CDATA[action名称：]]></label>  
                    <input component="$UI/system/components/justep/input/input" class="form-control x-edit" xid="input3" bind-ref='$model.actionData.ref("name")' style="border:1px solid #aaa;" />
                  </div>
                </div> 
    <div xid="div1">
   <div component="$UI/system/components/justep/labelEdit/labelEdit" class="x-label-edit x-label30" xid="labelEdit5">
    <label class="x-label" xid="label5" style="text-align:right;"><![CDATA[action描述：]]></label>
    <input component="$UI/system/components/justep/input/input" class="form-control x-edit" xid="input1" bind-ref='$model.actionData.ref("dec")' style="border:1px solid #aaa;"></input></div> </div>
  <div xid="div2">
   <div component="$UI/system/components/justep/labelEdit/labelEdit" class="x-label-edit x-label30" xid="labelEdit7">
    <label class="x-label" xid="label7" style="text-align:right;"><![CDATA[action说明：]]></label>
    <textarea component="$UI/system/components/justep/textarea/textarea" class="form-control x-edit" xid="textarea1" bind-ref='$model.actionData.ref("content")' style="min-height:70px;border:1px solid #aaa;"></textarea></div> </div></div>  
    <div class="x-panel-bottom" xid="bottom2"> 
      <a component="$UI/system/components/justep/button/button" class="btn btn-link pull-right"
        label="取消" style="margin-right:12%" xid="NOBtn" onClick="NOBtnClick"> 
        <i xid="i1"/>  
        <span xid="span1">取消</span>
      </a>  
      <a component="$UI/system/components/justep/button/button" class="btn btn-default pull-right"
        label="确定" style="margin-right:20px;" xid="OkBtn" onClick="OkBtnClick"> 
        <i xid="i2"/>  
        <span xid="span2">确定</span>
      </a> 
    </div>
  </div> 
</div>
