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

  <div xid="infoContent" xui:update-mode="delete"/>
  <div xid="div2" xui:update-mode="delete"/>
  <div xid="div3" xui:update-mode="delete"/>
  <div xid="div6" xui:update-mode="delete"/>
  <div xid="div7" xui:update-mode="delete"/>
  <div xid="info" xui:update-mode="delete"/>
   <div xid="model" onInactive="modelInactive" onLoad="modelLoad" onModelConstructDone="modelModelConstructDone"  xui:update-mode="merge"/>
   <div xid="titleBar" title="定位功能"  xui:update-mode="merge"/>
    <div class="x-panel x-full" component="$UI/system/components/justep/panel/panel" xid="panel1_8" xui:parent="demoContent" xui:update-mode="insert" >
<div class="x-panel-content baiduMap-content" xid="content1_8" >
<div style="padding:10px" xid="div1_8" >
<a class="btn btn-default" component="$UI/system/components/justep/button/button" label="显示当前位置" onClick="showCurrentClick" style="width:45%;" xid="showCurrent" >
<i xid="i1_8" />
<span xid="span1_8" >










显示当前位置</span>
</a>
<a class="btn btn-default" component="$UI/system/components/justep/button/button" label="使用跟随" onClick="setFollowClick" style="width:45%;" xid="setFollow" >
<i xid="i2_8" />
<span xid="span2_8" >










使用跟随</span>
</a>
</div>
<div style="padding:10px" xid="div2_8" >
<a class="btn btn-default" component="$UI/system/components/justep/button/button" label="使用罗盘" onClick="setCompassClick" style="width:45%;" xid="setCompass" >
<i xid="i3_8" />
<span xid="span3_8" >










使用罗盘</span>
</a>
<a class="btn btn-default" component="$UI/system/components/justep/button/button" label="隐藏当前位置" onClick="hideUserLocationClick" style="width:45%;" xid="hideUserLocation" >
<i xid="i1_3" />
<span xid="span1_3" >
隐藏当前位置</span>
</a>
</div>
</div>
<div class="x-panel-bottom baiduMap-bottom" xid="bottom1_8" />
</div>
   <div xid="codeContent" style="padding:10px"  xui:update-mode="merge"/>
    <div style="height:20px;" xid="div1_15" xui:parent="codeContent" xui:update-mode="insert" />
    <p xid="p1_15" xui:parent="codeContent" xui:update-mode="insert" >
<![CDATA[显示当前位置]]>
</p>
    <div xid="showCurrentClick" xui:parent="codeContent" xui:update-mode="insert" />
    <p xid="p2_15" xui:parent="codeContent" xui:update-mode="insert" >
<![CDATA[设置为跟随模式]]>
</p>
    <div xid="setFollowClick" xui:parent="codeContent" xui:update-mode="insert" />
    <p xid="p3_15" xui:parent="codeContent" xui:update-mode="insert" >
<![CDATA[设置为罗盘模式]]>
</p>
    <div xid="setCompassClick" xui:parent="codeContent" xui:update-mode="insert" />
   <a xid="demo" onClick="demoClick"  xui:update-mode="merge"/>
   <a xid="code" onClick="codeClick"  xui:update-mode="merge"/>

</div>