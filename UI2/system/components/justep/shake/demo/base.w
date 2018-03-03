<?xml version="1.0" encoding="utf-8"?>

<div xmlns="http://www.w3.org/1999/xhtml" component="$UI/system/components/justep/window/window" xid="root">  
  <div component="$UI/system/components/justep/model/model" xid="model" style="height:auto;left:99px;top:26px;"
    onLoad="modelLoad"/>  
  <span component="$UI/system/components/justep/windowDialog/windowDialog" xid="windowDialog"
    src="$UI/system/components/justep/shake/shakePage/mainActivity.w" style="left:409px;top:268px;"/>  
  <div component="$UI/system/components/justep/panel/panel" class="x-panel x-full"
    xid="panel1"> 
    <div class="x-panel-top" xid="top1"> 
      <div component="$UI/system/components/justep/titleBar/titleBar" class="x-titlebar"
        xid="titleBar1" title="row"> 
        <div class="x-titlebar-left" xid="div1"> 
          <a component="$UI/system/components/justep/button/button" class="btn btn-link"
            xid="button2" icon="icon-chevron-left" onClick="closeWin"> 
            <i xid="i2" class="icon-chevron-left"/>  
            <span xid="span2"/> 
          </a> 
        </div>  
        <div class="x-titlebar-right reverse" xid="div3"/> 
      </div> 
    </div>  
    <div class="x-panel-content" xid="content1"> 
      <a component="$UI/system/components/justep/button/button" class="btn btn-default"
        label="button" xid="button1" onClick="{&quot;operation&quot;:&quot;shake1.openShakePage&quot;}"> 
        <i xid="i1"/>  
        <span xid="span1"/>
      </a>  
      <a component="$UI/system/components/justep/button/button" class="btn btn-default"
        label="button" xid="button3" onClick="button3Click"> 
        <i xid="i3"/>  
        <span xid="span3"/>
      </a>  
      <div component="$UI/system/components/justep/shake/shake" xid="shake1"
        onShakeSuccess="shake1ShakeSuccess" onShakeFail="shake1ShakeFail"/>
    </div> 
  </div> 
</div>
