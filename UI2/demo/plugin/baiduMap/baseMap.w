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
   <div xid="titleBar" title="基础地图"  xui:update-mode="merge"/>
   <div xid="contents1" slidable="true" swipe="true" wrap="true"  xui:update-mode="merge"/>
    <div class="x-panel x-full" component="$UI/system/components/justep/panel/panel" xid="panel1_3" xui:parent="demoContent" xui:update-mode="insert" >
<div class="x-panel-content baiduMap-content" xid="content1_3" >
<div style="padding:10px" xid="div1_2" xui:parent="demoContent" xui:update-mode="insert" >
<a class="btn btn-default" component="$UI/system/components/justep/button/button" label="移除单击" onClick="removeClickClick" style="width:45%;" xid="removeClick" xui:parent="demoContent" xui:update-mode="insert" >
<i xid="i1_2" />
<span xid="span1_2" >








移除单击</span>
</a>
<a class="btn btn-default" component="$UI/system/components/justep/button/button" label="移除双击" onClick="removeDBClickClick" style="width:45%;" xid="removeDBClick" xui:parent="demoContent" xui:update-mode="insert" >
<i xid="i2_2" />
<span xid="span2_2" >








移除双击</span>
</a>
</div>
<div style="padding:10px" xid="div2_1" xui:parent="demoContent" xui:update-mode="insert" >
<a class="btn btn-default" component="$UI/system/components/justep/button/button" label="关闭地图" onClick="closeClick" style="width:45%;" xid="close" xui:parent="demoContent" xui:update-mode="insert" >
<i xid="i7_1" />
<span xid="span7_1" >






关闭地图</span>
</a>
<a class="btn btn-default" component="$UI/system/components/justep/button/button" label="打开地图" onClick="openClick" style="width:45%;" xid="open" xui:parent="demoContent" xui:update-mode="insert" >
<i xid="i8_1" />
<span xid="span8_1" >






打开地图</span>
</a>
</div>
</div>
<div class="x-panel-bottom baiduMap-bottom" xid="bottom1_3" />
</div>
   <div xid="codeContent" style="padding:10px;"  xui:update-mode="merge"/>
    <div style="height:20px;" xid="div1_14" xui:parent="codeContent" xui:update-mode="insert" />
    <p xid="p1_14" xui:parent="codeContent" xui:update-mode="insert" >
<![CDATA[打开百度地图]]>
</p>
    <div xid="openClick" xui:parent="codeContent" xui:update-mode="insert" />
    <p xid="p2_14" xui:parent="codeContent" xui:update-mode="insert" >
<![CDATA[关闭百度地图]]>
</p>
    <div xid="closeClick" xui:parent="codeContent" xui:update-mode="insert" />
    <p xid="p3_14" xui:parent="codeContent" xui:update-mode="insert" >
<![CDATA[移除双击事件]]>
</p>
    <div xid="removeDBClickClick" xui:parent="codeContent" xui:update-mode="insert" />
    <p xid="p4_14" xui:parent="codeContent" xui:update-mode="insert" >
<![CDATA[移除单击事件]]>
</p>
    <div xid="removeClickClick" xui:parent="codeContent" xui:update-mode="insert" />
    <div xid="div6_14" xui:parent="codeContent" xui:update-mode="insert" />
   <a xid="demo" onClick="demoClick"  xui:update-mode="merge"/>
   <a xid="code" onClick="codeClick"  xui:update-mode="merge"/>

</div>