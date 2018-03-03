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
   <div xid="titleBar" title="图层展示"  xui:update-mode="merge"/>
    <div class="x-panel x-full" component="$UI/system/components/justep/panel/panel" xid="panel1_4" xui:parent="demoContent" xui:update-mode="insert" >
<div class="x-panel-content baiduMap-content" xid="content1_4" >
<div style="padding:10px" xid="div1_5" xui:parent="demoContent" xui:update-mode="insert" >
<a class="btn btn-default" component="$UI/system/components/justep/button/button" label="路况" onClick="trafficClick" style="width:45%;" xid="traffic" xui:parent="demoContent" xui:update-mode="insert" >
<i xid="i1_5" />
<span xid="span1_5" >














路况</span>
</a>
<a class="btn btn-default" component="$UI/system/components/justep/button/button" label="3D" onClick="threeClick" style="width:45%;" xid="three" xui:parent="demoContent" xui:update-mode="insert" >
<i xid="i2_5" />
<span xid="span2_5" >












3D</span>
</a>
</div>
<div style="padding:10px" xid="div1_4" >
<a class="btn btn-default" component="$UI/system/components/justep/button/button" label="热力图" onClick="heatMapClick" style="width:45%;" xid="heatMap" xui:parent="demoContent" xui:update-mode="insert" >
<i xid="i3_5" />
<span xid="span3_5" >












热力图</span>
</a>
<a class="btn btn-default" component="$UI/system/components/justep/button/button" label="地图属性" onClick="setMapAttrClick" style="width:45%;" xid="setMapAttr" xui:parent="demoContent" xui:update-mode="insert" >
<i xid="i4_5" />
<span xid="span4_5" >












地图属性</span>
</a>
</div>
<div style="padding:10px" xid="div2_4" >
<a class="btn btn-default" component="$UI/system/components/justep/button/button" label="比例尺" onClick="setScaleBarClick" style="width:45%;" xid="setScaleBar" >
<i xid="i1_6" />
<span xid="span1_6" >












比例尺</span>
</a>
<a class="btn btn-default" component="$UI/system/components/justep/button/button" label="还原" onClick="reSetClick" style="width:45%;" xid="reSet" xui:parent="demoContent" xui:update-mode="insert" >
<i xid="i5_5" />
<span xid="span5_5" >












还原</span>
</a>
</div>
<div style="padding:10px" xid="div3_4" >
<a class="btn btn-default" component="$UI/system/components/justep/button/button" label="缩小地图,放大视角" onClick="zoomInClick" style="width:45%;" xid="zoomIn" >
<i xid="i1_4" />
<span xid="span1_4" >










缩小地图,放大视角</span>
</a>
<a class="btn btn-default" component="$UI/system/components/justep/button/button" label="放大地图,缩小视角" onClick="zoomOutClick" style="width:45%;" xid="zoomOut" >
<i xid="i2_4" />
<span xid="span2_4" >










放大地图,缩小视角</span>
</a>
</div>
<div style="padding:10px" xid="div4_4" >
<a class="btn btn-default" component="$UI/system/components/justep/button/button" label="旋转" onClick="setRotationClick" style="width:45%;" xid="setRotation" >
<i xid="i3_4" />
<span xid="span3_4" >










旋转</span>
</a>
<a class="btn btn-default" component="$UI/system/components/justep/button/button" label="俯视" onClick="setOverlookClick" style="width:45%;" xid="setOverlook" >
<i xid="i4_4" />
<span xid="span4_4" >










俯视</span>
</a>
</div>
<div style="padding:10px" xid="div5_4" >
<a class="btn btn-default" component="$UI/system/components/justep/button/button" label="设置地图中心经纬度" onClick="setCenterClick" style="width:45%;" xid="setCenter" >
<i xid="i5_4" />
<span xid="span5_4" >










设置地图中心经纬度</span>
</a>
<a class="btn btn-default" component="$UI/system/components/justep/button/button" label="获取地图中心经纬度" onClick="getCenterClick" style="width:45%;" xid="getCenter" >
<i xid="i6_4" />
<span xid="span6_4" >










获取地图中心经纬度</span>
</a>
</div>
<div style="padding:10px" xid="div6_4" >
<a class="btn btn-default" component="$UI/system/components/justep/button/button" label="设置地图显示矩形区域" onClick="setRegionClick" style="width:45%;" xid="setRegion" >
<i xid="i7_4" />
<span xid="span7_4" >










设置地图显示矩形区域</span>
</a>
<a class="btn btn-default" component="$UI/system/components/justep/button/button" label="获取地图显示矩形区域" onClick="getRegionClick" style="width:45%;" xid="getRegion" >
<i xid="i8_4" />
<span xid="span8_4" >










获取地图显示矩形区域</span>
</a>
</div>
</div>
<div class="x-panel-bottom baiduMap-bottom" height="48" xid="bottom1_4" >
</div>
</div>
   <div xid="codeContent" style="padding:10px"  xui:update-mode="merge"/>
    <div xid="div1_19" xui:parent="codeContent" xui:update-mode="insert" />
    <p xid="p1_19" xui:parent="codeContent" xui:update-mode="insert" >
<![CDATA[显示交通状况]]>
</p>
    <div xid="trafficClick" xui:parent="codeContent" xui:update-mode="insert" />
    <p xid="p2_19" xui:parent="codeContent" xui:update-mode="insert" >
<![CDATA[显示3D楼块]]>
</p>
    <div xid="threeClick" xui:parent="codeContent" xui:update-mode="insert" />
    <p xid="p3_19" xui:parent="codeContent" xui:update-mode="insert" >
<![CDATA[显示热力图]]>
</p>
    <div xid="heatMapClick" xui:parent="codeContent" xui:update-mode="insert" />
    <p xid="p4_19" xui:parent="codeContent" xui:update-mode="insert" >
<![CDATA[还原设置]]>
</p>
    <div xid="reSetClick" xui:parent="codeContent" xui:update-mode="insert" />
    <p xid="p5_19" xui:parent="codeContent" xui:update-mode="insert" >
<![CDATA[设置地图属性，是否可拖拽，是否可缩放，显示样式]]>
</p>
    <div xid="setMapAttrClick" xui:parent="codeContent" xui:update-mode="insert" />
    <p xid="p6_19" xui:parent="codeContent" xui:update-mode="insert" >
<![CDATA[设置地图的比例尺]]>
</p>
    <div xid="setScaleBarClick" xui:parent="codeContent" xui:update-mode="insert" />
    <p xid="p7_19" xui:parent="codeContent" xui:update-mode="insert" >
<![CDATA[放大一级比例尺]]>
</p>
    <div xid="zoomInClick" xui:parent="codeContent" xui:update-mode="insert" />
    <p xid="p8_19" xui:parent="codeContent" xui:update-mode="insert" >
<![CDATA[缩小一级比例尺]]>
</p>
    <div xid="zoomOutClick" xui:parent="codeContent" xui:update-mode="insert" />
    <p xid="p9_19" xui:parent="codeContent" xui:update-mode="insert" >
<![CDATA[设置旋转角度]]>
</p>
    <div xid="setRotationClick" xui:parent="codeContent" xui:update-mode="insert" />
    <p xid="p10_19" xui:parent="codeContent" xui:update-mode="insert" >
<![CDATA[设置俯视角度]]>
</p>
    <div xid="setOverlookClick" xui:parent="codeContent" xui:update-mode="insert" />
    <p xid="p11_19" xui:parent="codeContent" xui:update-mode="insert" >
<![CDATA[设置地图中心点的经纬度]]>
</p>
    <div xid="setCenterClick" xui:parent="codeContent" xui:update-mode="insert" />
    <p xid="p12_19" xui:parent="codeContent" xui:update-mode="insert" >
<![CDATA[获取地图中心点的经纬度]]>
</p>
    <div xid="getCenterClick" xui:parent="codeContent" xui:update-mode="insert" />
    <p xid="p13_19" xui:parent="codeContent" xui:update-mode="insert" >
<![CDATA[设置地图的显示区域]]>
</p>
    <div xid="setRegionClick" xui:parent="codeContent" xui:update-mode="insert" />
    <p xid="p14_19" xui:parent="codeContent" xui:update-mode="insert" >
<![CDATA[获取地图的显示区域]]>
</p>
    <div xid="getRegionClick" xui:parent="codeContent" xui:update-mode="insert" />
    <p xid="p15_19" xui:parent="codeContent" xui:update-mode="insert" />
    <div xid="div16_19" xui:parent="codeContent" xui:update-mode="insert" />
   <a xid="demo" onClick="demoClick"  xui:update-mode="merge"/>
   <a xid="code" onClick="codeClick"  xui:update-mode="merge"/>

</div>