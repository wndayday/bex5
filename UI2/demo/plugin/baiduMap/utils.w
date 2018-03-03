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
   <div xid="titleBar" title="计算转换"  xui:update-mode="merge"/>
    <div class="x-panel x-full" component="$UI/system/components/justep/panel/panel" xid="panel1_4" xui:parent="demoContent" xui:update-mode="insert" >
<div class="x-panel-content baiduMap-content" xid="content1_4" >
<div style="padding:10px" xid="div1_4" >
<a class="btn btn-default" component="$UI/system/components/justep/button/button" label="根据坐标获取地名" onClick="getNameByCoorClick" style="width:45%;" xid="getNameByCoor" >
<i xid="i1_4" />
<span xid="span1_4" >




根据坐标获取地名</span>
</a>
<a class="btn btn-default" component="$UI/system/components/justep/button/button" label="根据地名获取坐标" onClick="getCoorByNameClick" style="width:45%;" xid="getCoorByName" >
<i xid="i2_4" />
<span xid="span2_4" >




根据地名获取坐标</span>
</a>
</div>
<div style="padding:10px" xid="div2_4" >
<a class="btn btn-default" component="$UI/system/components/justep/button/button" label="计算实际距离" onClick="getRealDisClick" style="width:45%;" xid="getRealDis" >
<i xid="i3_4" />
<span xid="span3_4" >




计算实际距离</span>
</a>
<a class="btn btn-default" component="$UI/system/components/justep/button/button" label="转换坐标" onClick="transCoorClick" style="width:45%;" xid="transCoor" >
<i xid="i4_4" />
<span xid="span4_4" >




转换坐标</span>
</a>
</div>
<div style="padding:10px" xid="div3_4" />
<div xid="div4_4" />
</div>
<div class="x-panel-bottom baiduMap-bottom" xid="bottom1_4" />
</div>
   <div xid="codeContent" style="padding:10px"  xui:update-mode="merge"/>
    <div style="height:20px;" xid="div1_3" xui:parent="codeContent" xui:update-mode="insert" />
    <p xid="p1_3" xui:parent="codeContent" xui:update-mode="insert" >
<![CDATA[根据经纬度获取地名]]>
</p>
    <div xid="getNameByCoorClick" xui:parent="codeContent" xui:update-mode="insert" />
    <p xid="p2_3" xui:parent="codeContent" xui:update-mode="insert" >
<![CDATA[根据地名获取经纬度]]>
</p>
    <div xid="getCoorByNameClick" xui:parent="codeContent" xui:update-mode="insert" />
    <p xid="p3_3" xui:parent="codeContent" xui:update-mode="insert" >
<![CDATA[获取地图上两点间的实际距离]]>
</p>
    <div xid="getRealDisClick" xui:parent="codeContent" xui:update-mode="insert" />
    <p xid="p4_3" xui:parent="codeContent" xui:update-mode="insert" >
<![CDATA[将其他坐标转换为百度坐标]]>
</p>
    <div xid="transCoorClick" xui:parent="codeContent" xui:update-mode="insert" />
    <p xid="p5_3" xui:parent="codeContent" xui:update-mode="insert" />
   <a xid="demo" onClick="demoClick"  xui:update-mode="merge"/>
   <a xid="code" onClick="codeClick"  xui:update-mode="merge"/>

</div>