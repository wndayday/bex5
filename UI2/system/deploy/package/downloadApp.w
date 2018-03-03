<?xml version="1.0" encoding="utf-8"?>

<div xmlns="http://www.w3.org/1999/xhtml" component="$UI/system/components/justep/window/window" class="window"
  sysParam="false">  
  <div component="$UI/system/components/justep/model/model" xid="model" style="height:auto;left:408px;top:314px;"
    onLoad="modelLoad"/>  
  
    
  
<div xid="div8" style="padding-left: 8px;">
  <label xid="label1" class="x-label"><![CDATA[当前检查到的IP是：]]></label>
  <select xid="ip" bind-change="ipChange" style="vertical-align:top;margin-top:8px;margin-right:4px"></select><label xid="label3" class="x-label"><![CDATA[如果IP地址不是无线网络IP，请从左边选择正确IP。]]></label>
  </div><div xid="div6" class="panel-body">
    
    
  <label xid="label4" class="x-label"></label></div><div xid="div7" style="padding: 8px"> 
    
     
  <div xid="androidDiv" style="display:inline-block;"><img src="img/android.png" alt="" xid="androidImage" style="cursor:pointer;padding-right: 16px" bind-click="androidImageClick" /><div component="$UI/system/components/justep/barcode/barcodeImage" class="xui-barcodeImage" type="qr" templateName="templateName" xid="androidQR" style="height:180px;width:180px;" barcodeConfig="{mw:1.0}" /></div>
  <div xid="iosDiv" style="display:inline-block;"><img src="img/apple.png" alt="" xid="iosImage" style="cursor:pointer;padding-right: 16px" bind-click="iosImageClick" /><div component="$UI/system/components/justep/barcode/barcodeImage" class="xui-barcodeImage" type="qr" templateName="templateName" xid="iosQR" style="height:180px;width:180px;" barcodeConfig="{mw:1.0}" /></div>
  <label xid="tipLabel" class="x-label" style="font-size:x-large;font-weight:bold;display:none"><![CDATA[未生成android或ios App]]></label></div><div xid="div2" class="panel-body"></div><div xid="div1" style="padding-left: 8px;"><label xid="howInstallLabel" class="x-label" bind-click="howInstallLabelClick" style="cursor:pointer;display:block;"><![CDATA[如何安装？请点这里]]></label>
  <label xid="importentLabel" class="x-label text-red" bind-click="howInstallLabelClick"><![CDATA[]]></label>
  </div></div>
