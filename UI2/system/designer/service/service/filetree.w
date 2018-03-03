<?xml version="1.0" encoding="utf-8"?>

<div xmlns="http://www.w3.org/1999/xhtml" xid="window" class="window" component="$UI/system/components/justep/window/window"
  design="device:m;">  
  <div component="$UI/system/components/justep/model/model" xid="model" onLoad="modelLoad"
    onParamsReceive="modelParamsReceive"/>  
  <div component="$UI/system/components/justep/panel/panel" class="x-panel x-full"
    xid="panel"> 
    <div class="x-panel-content" style="overflow:hidden;" xid="content"/>  
    <div class="x-panel-bottom" xid="bottom1">
      <div xid="div1" style="padding-right:30px;margin-top:10px;"> 
        <a component="$UI/system/components/justep/button/button" class="btn btn-default pull-right"
          label="取消" xid="noBtn" onClick="noBtnClick"> 
          <i xid="i2"/>  
          <span xid="span2">取消</span> 
        </a> 
      <a component="$UI/system/components/justep/button/button" class="btn btn-success pull-right" label="确认" xid="okBtn" onClick="okBtnClick"> 
          <i xid="i1" />  
          <span xid="span1">确认</span> 
        </a></div>
    </div> 
  </div> 
</div>
