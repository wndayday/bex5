<?xml version="1.0" encoding="utf-8"?>
<div xmlns="http://www.w3.org/1999/xhtml" component="$UI/system/components/justep/window/window" design="device:m;" xid="window" class="window">  
  <div component="$UI/system/components/justep/model/model" xid="model" style="top:391px;left:126px;height:auto;" onLoad="modelLoad"> 
  </div>  
  <div component="$UI/system/components/justep/panel/panel" 
    class="x-panel x-full" xid="panel1"> 
      <div class="x-panel-top" xid="top1"> 
        </div>  
    <div class="x-panel-content" xid="content1"><div component="$UI/system/components/justep/contents/contents" class="x-contents x-full" active="0" xid="contents1">
   <div class="x-contents-content" xid="content3" style="padding:15px"><div xid="div2"><label xid="label2"><![CDATA[共发现]]></label><label xid="label4" bind-text="appNumberLabel"><![CDATA[]]></label><label xid="label5"><![CDATA[个调试设备]]></label></div><div xid="div3"><label xid="label6"><![CDATA[已经连接的设备：]]></label><label xid="label7" bind-text="modelLabel"><![CDATA[]]></label></div><div xid="div8" style="padding-left: 8px;">
  <label xid="label1" class="x-label"><![CDATA[当前检查到的IP是：]]></label>
  <select xid="ip" bind-change="ipChange" style="vertical-align:top;margin-top:8px;margin-right:4px"></select><label xid="label3" class="x-label"><![CDATA[如果IP地址不是无线网络IP，请从左边选择正确IP。]]></label>
  </div><div xid="div1"><label xid="label1"><![CDATA[小提示：如果您未在手机中安装apploader，则可扫码安装apploader，（iPhone设备请在safari中打开链接）。如果您已经安装apploader，但是apploader并未跳转至调试页面，则您可使用apploader中的扫码功能扫描此二维码，apploader会跳转至调试页面。]]></label></div><div xid="div7" style="padding: 8px">  
  <div xid="androidDiv" style="display:inline-block;"><img src="img/android.png" alt="" xid="androidImage" style="cursor:pointer;padding-right: 16px" bind-click="androidImageClick" /><div component="$UI/system/components/justep/barcode/barcodeImage" class="xui-barcodeImage" type="qr" templateName="templateName" xid="androidQR" style="height:180px;width:180px;" barcodeConfig="{mw:1.0}" /></div>
  <div xid="iosDiv" style="display:inline-block;"><img src="img/apple.png" alt="" xid="iosImage" style="cursor:pointer;padding-right: 16px" bind-click="iosImageClick" /><div component="$UI/system/components/justep/barcode/barcodeImage" class="xui-barcodeImage" type="qr" templateName="templateName" xid="iosQR" style="height:180px;width:180px;" barcodeConfig="{mw:1.0}" /></div>
  <label xid="tipLabel" class="x-label" style="font-size:x-large;font-weight:bold;display:none"><![CDATA[未生成android或者ios本地App]]></label></div>
  
  
  
  </div></div></div>
  </div> 
</div>