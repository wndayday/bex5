<?xml version="1.0" encoding="utf-8"?>

<div xmlns="http://www.w3.org/1999/xhtml" xid="window" class="window" component="$UI/system/components/justep/window/window"
  design="device:pc;">  
  <div component="$UI/system/components/justep/model/model" xid="model" style="height:auto;left:35px;top:224px;"/>  
  
  <div component="$UI/system/components/justep/panel/panel" class="x-panel x-full" xid="panel1">
   <div class="x-panel-content" xid="content1"></div><div class="x-panel-bottom" xid="bottom1">
      <a component="$UI/system/components/justep/button/button" class="btn btn-default btn-only-label x-dialog-button" label="取消" xid="cancelBtn" onClick="{&quot;operation&quot;:&quot;wReceiver.windowCancel&quot;}"> 
        <i xid="i2" />  
        <span xid="span2">取消</span>
      </a>  
      <a component="$UI/system/components/justep/button/button" class="btn btn-info x-dialog-button" label="确定" xid="OKBtn" onClick="OKBtnClick"> 
        <i xid="i1" />  
        <span xid="span1">确定</span>
      </a>
    </div></div><span component="$UI/system/components/justep/windowReceiver/windowReceiver"
    xid="wReceiver" style="left:228px;top:114px;"/>
</div>
