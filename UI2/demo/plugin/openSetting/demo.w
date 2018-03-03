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
   <div xid="model" onModelConstructDone="modelModelConstructDone" style="height:auto;left:591px;top:540px;"  xui:update-mode="merge"/>
   <div xid="titleBar" title="settings"  xui:update-mode="merge"/>
   <p xid="p1"  xui:update-mode="merge-and-replace">



ID：cordova-open-native-settings</p>   <p xid="introduceP"  xui:update-mode="merge-and-replace">

本插件的功能是打开系统设置。适用于Android和iOS。Android能打开指定的设置。</p>   <p xid="platformP"  xui:update-mode="merge-and-replace">


Android、iOS</p>    <div style="height:50px;padding:40px" xid="div11_1" xui:parent="demoContent" xui:update-mode="insert" >
<a class="btn btn-default" component="$UI/system/components/justep/button/button" label="打开设置" onClick="openSettingClick" style="width:100%;" xid="openSetting" >
<i xid="i11_1" />
<span xid="span11_1" >






打开设置</span>
</a>
</div>
   <p xid="accountP"  xui:update-mode="merge-and-replace">


打开系统设置(Android)或者应用设置(iOS)</p>    <p xid="p1_1" xui:parent="codeContent" xui:update-mode="insert" >
<![CDATA[打开设置]]>
</p>
    <div xid="openSettingClick" xui:parent="codeContent" xui:update-mode="insert" />

</div>