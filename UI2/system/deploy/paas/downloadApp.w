<?xml version="1.0" encoding="utf-8"?>

<div xmlns="http://www.w3.org/1999/xhtml" component="$UI/system/components/justep/window/window" class="window"
  sysParam="false">  
  <div component="$UI/system/components/justep/model/model" xid="model" style="height:auto;left:408px;top:314px;"
    onLoad="modelLoad"/>  
  <div xid="paasStateDiv" style="padding: 8px"> 
    <label class="x-label" xid="label3">应用状态：</label>  
    <label xid="showState" class="x-label"/>  
    <label xid="openPaaSBtn" class="x-label" style="cursor:pointer;margin-left:100px;" bind-click="openPaaSBtnClick"><![CDATA[打开CloudX5控制台]]></label> 
  </div>  
  <div xid="div6" style="padding-left: 8px;"> 
    <label class="x-label">服务地址：</label>  
    <label xid="showUrl" class="x-label" bind-click="showUrlClick" style="cursor:pointer;"><![CDATA[正在获取……]]></label>  
    <br/>  
    <div xid="div10" style="position:relative;display:inline-block;" class="clearfix"> 
      <div style="display:inline-block;margin-left:128px;text-align:center;"
        xid="div11"> 
        <div component="$UI/system/components/justep/barcode/barcodeImage"
          class="xui-barcodeImage" type="qr" templateName="templateName" xid="indexQR"
          style="height:180px;width:180px;display:block" barcodeConfig="{mw:1.0}"/>  
        <label xid="label6"><![CDATA[扫码打开]]></label> 
      </div>  
      <div xid="appDiv" style="position:relative;display:inline-block;" class="clearfix"> 
        <div style="display:inline-block;margin-left:128px;text-align:center;"
          xid="div8"> 
          <div component="$UI/system/components/justep/barcode/barcodeImage"
            class="xui-barcodeImage" type="qr" templateName="templateName" xid="appQR"
            style="height:180px;width:180px;display:block" barcodeConfig="{mw:1.0}"/>  
          <label xid="scandetail"><![CDATA[扫码下载应用]]></label> 
        </div> 
      </div> 
    </div> 
  </div>  
  <div xid="div9" style="padding: 8px"> 
    <!--     <label xid="tipLabel" class="x-label" style="font-size:x-large;font-weight:bold;display:none"><![CDATA[未生成android或者ios本地App]]></label> --> 
  </div>  
  <div xid="div1" style="padding-left: 8px;"> 
    <label xid="howInstallLabel" class="x-label" bind-click="howInstallLabelClick"
      style="cursor:pointer;display:block;"><![CDATA[如何安装？请点这里]]></label>  
    <label xid="importentLabel" class="x-label" bind-click="howInstallLabelClick"
      style="color:#FF8000;"><![CDATA[]]></label> 
  </div>  
  <div component="$UI/system/components/justep/popOver/popOver" class="x-popOver"
    xid="restartPopOver"> 
    <div class="x-popOver-overlay" xid="div2"/>  
    <div class="x-popOver-content" xid="div3"/> 
  </div> 
</div>
