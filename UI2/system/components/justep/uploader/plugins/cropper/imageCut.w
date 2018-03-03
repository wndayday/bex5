<?xml version="1.0" encoding="utf-8"?>

<div xmlns="http://www.w3.org/1999/xhtml" component="$UI/system/components/justep/window/window" design="device:mobile"
  xid="window">  
  <div component="$UI/system/components/justep/model/model" xid="model" style="height:auto;left:123px;top:232px;"
    onLoad="modelLoad" onParamsReceive="modelParamsReceive"/>  
  <div component="$UI/system/components/justep/panel/panel" class="x-panel x-full"> 
    <div class="x-panel-top"> 
      <div component="$UI/system/components/justep/titleBar/titleBar" class="x-titlebar"
        style="background-color:#808080;"> 
        <div class="x-titlebar-left"> 
          <a component="$UI/system/components/justep/button/button" label=""
            class="btn btn-link btn-only-icon" icon="icon-chevron-left" onClick='{"operation":"window.close"}'
            xid="backBtn"> 
            <i class="icon-chevron-left"/>  
            <span/> 
          </a> 
        </div>  
        <div class="x-titlebar-title"/>  
        <div class="x-titlebar-right flex3 reverse"> 
          <a component="$UI/system/components/justep/button/button" class="btn btn-default"
            xid="OKBtn" onClick="OKBtnClick" label="使用"> 
            <i xid="i2"/>  
            <span xid="span2">使用</span> 
          </a> 
        <a component="$UI/system/components/justep/button/button" class="btn btn-link btn-only-icon" label="button" xid="rotateRightBtn" icon="linear linear-redo" onClick="rotateRightBtnClick">
   <i xid="i1" class="linear linear-redo"></i>
   <span xid="span1"></span></a>
  <a component="$UI/system/components/justep/button/button" class="btn btn-link btn-only-icon" label="button" xid="rotateLeftBtn" onClick="rotateLeftBtnClick" icon="linear linear-undo">
   <i xid="i3" class="icon-refresh linear linear-undo"></i>
   <span xid="span3"></span></a></div> 
      </div> 
    </div>  
    <div class="x-panel-content"> 
      <div class="cropper-example-1" style="height:100%;width:100%;"> 
        <img xid="cutImage" src="" alt="Picture"/> 
      </div> 
    </div> 
  </div> 
</div>
