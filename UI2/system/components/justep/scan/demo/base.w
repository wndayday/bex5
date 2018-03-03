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
    	<div component="$UI/system/components/justep/scan/scan" xid="sdfasfd" onScanQRCodeSuccess='{"operation":"sdfasfd.openScanResultAsFile"}'>
      	</div> 
	      <div component="$UI/system/components/justep/scan/scan" xid="scan1"></div>
	      <div component="$UI/system/components/justep/scan/scan" xid="scan2"></div>
  <div component="$UI/system/components/justep/scan/scan" xid="scan3"></div>
  <a component="$UI/system/components/justep/button/button" class="btn btn-default" xid="button1" onClick='{"operation":"sdfasfd.scanQRCode"}'>
   <i xid="i1"></i>
   <span xid="span1"></span></a></div> 
  </div> 
</div>
