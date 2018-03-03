<?xml version="1.0" encoding="utf-8"?>

<div xmlns="http://www.w3.org/1999/xhtml" component="$UI/system/components/justep/window/window" xid="root">  
  <div component="$UI/system/components/justep/model/model" xid="model" style="height:auto;left:99px;top:26px;"
    onLoad="modelLoad"/>  
  <span component="$UI/system/components/justep/windowDialog/windowDialog" xid="windowDialog"
    src="$UI/system/components/justep/common/demo/dialog.w" style="left:409px;top:268px;"
    status="normal"/>  
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
    	<a component="$UI/system/components/justep/button/button" class="btn btn-default" xid="button1" onClick='{"operation":"scan1.scanQRCode"}'>
   <i xid="i1"></i>
   <span xid="span1"></span></a>
  <div component="$UI/system/components/justep/scan/scan" style="top:16px;left:572px;width:51px;height:51px;" xid="scan1" onScanQRCodeSuccess='{"operation":"scan1.openScanResultAsFile"}'></div>
  <div component="$UI/system/components/justep/geolocation/geolocation" style="width:0;height:0;" xid="geolocation1" onGetLocationSuccess='{"operation":"geolocation1.openLocationInBaiduMap"}'></div>
  <a component="$UI/system/components/justep/button/button" class="btn btn-default" label="button" xid="button3" onClick='{"operation":"geolocation1.getLocation"}'>
   <i xid="i3"></i>
   <span xid="span3"></span></a>
  <div component="$UI/system/components/justep/shake/shake" style="widht:0;top:23px;left:491px;width:51px;height:51px;" xid="shake1" onShakeSuccess="shake1ShakeSuccess"></div>
  <a component="$UI/system/components/justep/button/button" class="btn btn-default" label="button" xid="button4" onClick='{"operation":"shake1.openShakePage"}'>
   <i xid="i4"></i>
   <span xid="span4"></span></a></div> 
  </div> 
</div>
