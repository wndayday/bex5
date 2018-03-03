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
   <div xid="titleBar" title="路线图相关"  xui:update-mode="merge"/>
    <div class="x-panel x-full" component="$UI/system/components/justep/panel/panel" xid="panel1_6" xui:parent="demoContent" xui:update-mode="insert" >
<div class="x-panel-content baiduMap-content" xid="content1_6" >
<div style="padding:10px" xid="div1_6" >
<a class="btn btn-default" component="$UI/system/components/justep/button/button" label="搜索步行线路" onClick="SearchWalkClick" style="width:45%;" xid="SearchWalk" >
<i xid="i1_6" />
<span xid="span1_6" >








搜索步行线路</span>
</a>
<a class="btn btn-default" component="$UI/system/components/justep/button/button" label="显示步行线路" onClick="drawWalkClick" style="width:45%;" xid="drawWalk" >
<i xid="i4_6" />
<span xid="span4_6" >








显示步行线路</span>
</a>
</div>
<div style="padding:10px" xid="div2_6" >
<a class="btn btn-default" component="$UI/system/components/justep/button/button" label="搜索乘车线路" onClick="searchTransitClick" style="width:45%;" xid="searchTransit" >
<i xid="i3_6" />
<span xid="span3_6" >








搜索乘车线路</span>
</a>
<a class="btn btn-default" component="$UI/system/components/justep/button/button" label="显示乘车线路" onClick="drawTransitClick" style="width:45%;" xid="drawTransit" >
<i xid="i5_6" />
<span xid="span5_6" >








显示乘车线路</span>
</a>
</div>
<div style="padding:10px" xid="div3_6" >
<a class="btn btn-default" component="$UI/system/components/justep/button/button" label="搜索自驾线路" onClick="searchDriveClick" style="width:45%;" xid="searchDrive" >
<i xid="i2_6" />
<span xid="span2_6" >








搜索自驾线路</span>
</a>
<a class="btn btn-default" component="$UI/system/components/justep/button/button" label="显示驾车线路" onClick="drawDriveClick" style="width:45%;" xid="drawDrive" >
<i xid="i6_6" />
<span xid="span6_6" >








显示驾车线路</span>
</a>
</div>
<div style="padding:10px" xid="div4_6" >
<a class="btn btn-default" component="$UI/system/components/justep/button/button" label="搜索公交线路" onClick="searchBusClick" style="width:45%;" xid="searchBus" >
<i xid="i7_6" />
<span xid="span7_6" >








搜索公交线路</span>
</a>
<a class="btn btn-default" component="$UI/system/components/justep/button/button" label="显示公交线路" onClick="drawBusClick" style="width:45%;" xid="drawBus" >
<i xid="i8_6" />
<span xid="span8_6" >








显示公交线路</span>
</a>
</div>
<div style="padding:10px" xid="div5_6" >
<a class="btn btn-default" component="$UI/system/components/justep/button/button" label="移除线路" onClick="removeRouteClick" style="width:45%;" xid="removeRoute" >
<i xid="i9_6" />
<span xid="span9_6" >








移除线路</span>
</a>
</div>
<div style="padding:10px" xid="div6_6" />
<div style="padding:10px" xid="div7_6" />
<div style="padding:10px" xid="div8_6" />
</div>
<div class="x-panel-bottom baiduMap-bottom" xid="bottom1_6" />
</div>
   <div xid="codeContent" style="padding:10px"  xui:update-mode="merge"/>
    <div style="height:20px;" xid="div1_18" xui:parent="codeContent" xui:update-mode="insert" />
    <p xid="p1_18" xui:parent="codeContent" xui:update-mode="insert" >
<![CDATA[搜索步行线路]]>
</p>
    <div xid="SearchWalkClick" xui:parent="codeContent" xui:update-mode="insert" />
    <p xid="p2_18" xui:parent="codeContent" xui:update-mode="insert" >
<![CDATA[显示步行线路]]>
</p>
    <div xid="drawWalkClick" xui:parent="codeContent" xui:update-mode="insert" />
    <p xid="p3_18" xui:parent="codeContent" xui:update-mode="insert" >
<![CDATA[搜索驾车线路]]>
</p>
    <div xid="searchDriveClick" xui:parent="codeContent" xui:update-mode="insert" />
    <p xid="p4_18" xui:parent="codeContent" xui:update-mode="insert" >
<![CDATA[显示驾车线路]]>
</p>
    <div xid="drawDriveClick" xui:parent="codeContent" xui:update-mode="insert" />
    <p xid="p5_18" xui:parent="codeContent" xui:update-mode="insert" >
<![CDATA[搜索乘车线路]]>
</p>
    <div xid="searchTransitClick" xui:parent="codeContent" xui:update-mode="insert" />
    <p xid="p6_18" xui:parent="codeContent" xui:update-mode="insert" >
<![CDATA[显示乘车线路]]>
</p>
    <div xid="drawTransitClick" xui:parent="codeContent" xui:update-mode="insert" />
    <p xid="p7_18" xui:parent="codeContent" xui:update-mode="insert" >
<![CDATA[搜索公交线路]]>
</p>
    <div xid="searchBusClick" xui:parent="codeContent" xui:update-mode="insert" />
    <p xid="p8_18" xui:parent="codeContent" xui:update-mode="insert" >
<![CDATA[显示公交线路]]>
</p>
    <div xid="drawBusClick" xui:parent="codeContent" xui:update-mode="insert" />
    <p xid="p9_18" xui:parent="codeContent" xui:update-mode="insert" >
<![CDATA[移除指定线路图]]>
</p>
    <div xid="removeRouteClick" xui:parent="codeContent" xui:update-mode="insert" />
    <p xid="p10_18" xui:parent="codeContent" xui:update-mode="insert" />
   <a xid="demo" onClick="demoClick"  xui:update-mode="merge"/>
   <a xid="code" onClick="codeClick"  xui:update-mode="merge"/>

</div>