<?xml version="1.0" encoding="utf-8"?>

<div xmlns="http://www.w3.org/1999/xhtml" xid="window" class="window" component="$UI/system/components/justep/window/window"
  design="device:m;">  
  <div component="$UI/system/components/justep/model/model" xid="model" style="height:auto;left:201px;top:457px;"
    onunLoad="modelUnLoad" onLoad="modelLoad"></div>  
  <audio xid="audio" src="kacha.mp3" autoplay="autoplay" preload="preload"/>  
  <div component="$UI/system/components/justep/panel/panel" class="x-panel x-full"
    xid="panel2"> 
    <div class="x-panel-top" xid="top2"> 
      <div component="$UI/system/components/justep/titleBar/titleBar" class="x-titlebar"
        xid="titleBar3" title="摇一摇"> 
        <div class="x-titlebar-left" xid="div10"> 
          <a component="$UI/system/components/justep/button/button" class="btn btn-link"
            xid="yBackBtn" icon="icon-chevron-left" onClick="yBackBtnClick"> 
            <i xid="i1" class="icon-chevron-left"/>  
            <span xid="span2"/> 
          </a> 
        </div>  
        <div class="x-titlebar-title" xid="div11">摇一摇</div>  
        <div class="x-titlebar-right reverse" xid="div12"> 
          </div> 
      </div> 
    </div>  
    <div class="x-panel-content" xid="content2"> 
      <div style="position:relative;height:100%;"> 
        <div alt="" xid="centerImage" style="width:100%;height:100%;"/>  
        <img src="top.jpg" alt="" xid="topImage" style="position:absolute;height:50%;width:100%;left:0;top:0;"
          height="50%"/>  
        <img src="bottom.jpg" alt="" xid="bottomImage" style="position: absolute;height:50%;width:100%;top:50%;left:0;"
          height="50%"/> 
      </div> 
    </div> 
  </div>
</div>
