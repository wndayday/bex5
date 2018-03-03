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

  <div xid="div3" xui:update-mode="delete"/>
  <div xid="div6" xui:update-mode="delete"/>
  <div xid="div7" xui:update-mode="delete"/>
    <a class="btn btn-default" component="$UI/system/components/justep/button/button" label="button" xid="button4_3" xui:before="model" xui:parent="window" xui:update-mode="insert" >
<i xid="i4_3" />
<span xid="span4_3" />
</a>
   <div xid="model" onModelConstructDone="modelModelConstructDone"  xui:update-mode="merge"/>
   <div xid="titleBar" title="brightness"  xui:update-mode="merge"/>
   <p xid="p1"  xui:update-mode="merge-and-replace">
ID：cordova-plugin-brightness</p>   <p xid="introduceP"  xui:update-mode="merge-and-replace">
屏幕亮度相关插件，获取/调整屏幕亮度，设置屏幕是否常亮</p>   <p xid="platformP"  xui:update-mode="merge-and-replace">
iOS、Android</p>    <div style="padding:20px" xid="div1_3" xui:parent="demoContent" xui:update-mode="insert" >
<a class="btn btn-default" component="$UI/system/components/justep/button/button" label="getBrightness" onClick="getBrightnessClick" style="width:100%;" xid="getBrightness" >
<i xid="i1_3" />
<span xid="span1_3" >


getBrightness</span>
</a>
</div>
    <div style="padding:20px" xid="div2_3" xui:parent="demoContent" xui:update-mode="insert" >
<a class="btn btn-default" component="$UI/system/components/justep/button/button" label="setBrightness" onClick="setClick" style="width:100%;" xid="set" xui:parent="div2" xui:update-mode="insert" >
<i xid="i5_3" />
<span xid="span5_3" >


setBrightness</span>
</a>
</div>
    <div style="padding:20px" xid="div3_3" xui:parent="demoContent" xui:update-mode="insert" >
<a class="btn btn-default" component="$UI/system/components/justep/button/button" label="setKeepScreenOn" onClick="setKeepScreenOnClick" style="width:100%;" xid="setKeepScreenOn" >
<i xid="i3_3" />
<span xid="span3_3" >


setKeepScreenOn</span>
</a>
</div>
   <div xid="codeContent" style="padding:10px"  xui:update-mode="merge"/>
    <p xid="p1_3" xui:parent="codeContent" xui:update-mode="insert" >
<![CDATA[获取当前屏幕亮度]]>
</p>
    <div xid="getBrightnessClick" xui:parent="codeContent" xui:update-mode="insert" />
    <p xid="p2_3" xui:parent="codeContent" xui:update-mode="insert" >
<![CDATA[设置当前屏幕亮度]]>
</p>
    <div xid="setClick" xui:parent="codeContent" xui:update-mode="insert" />
    <p xid="p3_3" xui:parent="codeContent" xui:update-mode="insert" >
<![CDATA[设置屏幕常亮]]>
</p>
    <div xid="setKeepScreenOnClick" xui:parent="codeContent" xui:update-mode="insert" />

</div>