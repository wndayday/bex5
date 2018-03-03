<div 
  xmlns:xui="http://www.justep.com/xui" 
  xmlns:xu="http://www.xmldb.org/xupdate" 
  xmlns="http://www.w3.org/1999/xhtml" 
  component="$UI/system/components/justep/window/window" 
  xid="window" 
  extends="$UI/demo/plugin/template/demo.w" 
  __id="id_1" 
  design="device:m;" 
  class="window" >

  <div xid="div6" xui:update-mode="delete"/>
  <div xid="div7" xui:update-mode="delete"/>
   <div xid="model" onModelConstructDone="modelModelConstructDone"  xui:update-mode="merge"/>
   <div xid="titleBar" title="geolocation"  xui:update-mode="merge"/>
   <p xid="p1"  xui:update-mode="merge-and-replace">

ID：cordova-plugin-geolocation</p>   <p xid="introduceP"  xui:update-mode="merge-and-replace">
插件的功能是：1、获取坐标(可指定坐标类型：bd09,wgs84,gcj02,分别代表百度、gps和国测局坐标系)；2、坐标转换，支持bd09,wgs84,gcj02三种坐标系的相互转换。</p>   <p xid="platformP" style="width:100%;height:100%;"  xui:update-mode="merge-and-replace">
Android、iOS</p>    <div style="height:50px;padding:40px" xid="div11_1" xui:parent="demoContent" xui:update-mode="insert" >
<a class="btn btn-default" component="$UI/system/components/justep/button/button" label="获取坐标" onClick="getCurrentPositionClick" style="width:100%;" xid="button11_1" >
<i xid="i11_1" />
<span xid="span11_1" >






获取坐标</span>
</a>
</div>
    <div style="height:50px;padding:40px" xid="div12_1" xui:parent="demoContent" xui:update-mode="insert" >
<a class="btn btn-default" component="$UI/system/components/justep/button/button" label="坐标转换" onClick="transformClick" style="width:100%;" xid="button12_1" >
<i xid="i12_1" />
<span xid="span12_1" >






坐标转换</span>
</a>
</div>
   <p xid="accountP"  xui:update-mode="merge-and-replace">
支持的坐标系有三种gcj02(国测局坐标系)，bd09(百度坐标系)，wgs84(gps坐标系)。</p>    <p xid="p11111_1" xui:parent="codeContent" xui:update-mode="insert" >
<![CDATA[获取坐标]]>
</p>
    <div style="padding:10px;" xid="getCurrentPositionClick" xui:parent="codeContent" xui:update-mode="insert" />
    <p xid="p11_1" xui:parent="codeContent" xui:update-mode="insert" >
<![CDATA[坐标转换]]>
</p>
    <div style="padding:10px;" xid="transformClick" xui:parent="codeContent" xui:update-mode="insert" />

</div>