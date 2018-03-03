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
   <div xid="titleBar" title="覆盖物展示"  xui:update-mode="merge"/>
    <div class="x-panel x-full" component="$UI/system/components/justep/panel/panel" xid="panel2_8" xui:parent="demoContent" xui:update-mode="insert" >
<div class="x-panel-content baiduMap-content" xid="content2_8" >
<div style="padding:10px" xid="div1_8" xui:parent="demoContent" xui:update-mode="insert" >
<a class="btn btn-default" component="$UI/system/components/justep/button/button" label="添加大头针" onClick="addAnnotationClick" style="width:45%;" xid="addAnnotation" >
<i xid="i1_8" />
<span xid="span1_8" >










添加大头针</span>
</a>
<a class="btn btn-default" component="$UI/system/components/justep/button/button" label="调整大头针经纬度" onClick="updateAnnoCoorClick" style="width:45%;" xid="updateAnnoCoor" >
<i xid="i1_4" />
<span xid="span1_4" >








调整大头针经纬度</span>
</a>
</div>
<div style="padding:10px" xid="div5_2" >
<a class="btn btn-default" component="$UI/system/components/justep/button/button" label="获取大头针经纬度" onClick="getAnnoCoorClick" style="width:45%;" xid="getAnnoCoor" >
<i xid="i2_4" />
<span xid="span2_4" >








获取大头针经纬度</span>
</a>
<a class="btn btn-default" component="$UI/system/components/justep/button/button" label="移除大头针" onClick="removeAnnoClick" style="width:45%;" xid="removeAnno" >
<i xid="i2_8" />
<span xid="span2_8" >










移除大头针</span>
</a>
</div>
<div style="padding:10px" xid="div1_2" >
<a class="btn btn-default" component="$UI/system/components/justep/button/button" label="判断是否存在" onClick="isExistClick" style="width:45%;" xid="isExist" >
<i xid="i3_8" />
<span xid="span3_8" >










判断是否存在</span>
</a>
<a class="btn btn-default" component="$UI/system/components/justep/button/button" label="移除所有大头针" onClick="removeAllAnnoClick" style="width:45%;" xid="removeAllAnno" >
<i xid="i4_8" />
<span xid="span4_8" >










移除所有大头针</span>
</a>
</div>
<div style="padding:10px" xid="div2_2" >
<a class="btn btn-default" component="$UI/system/components/justep/button/button" label="添加圆" onClick="addCircleClick" style="width:45%;" xid="addCircle" >
<i xid="i5_8" />
<span xid="span5_8" >










添加圆</span>
</a>
<a class="btn btn-default" component="$UI/system/components/justep/button/button" label="添加折线" onClick="addLineClick" style="width:45%;" xid="addLine" >
<i xid="i6_8" />
<span xid="span6_8" >










添加折线</span>
</a>
</div>
<div style="padding:10px" xid="div3_2" >
<a class="btn btn-default" component="$UI/system/components/justep/button/button" label="添加多边形" onClick="addPolygonClick" style="width:45%;" xid="addPolygon" >
<i xid="i7_8" />
<span xid="span7_8" >










添加多边形</span>
</a>
<a class="btn btn-default" component="$UI/system/components/justep/button/button" label="添加弧" onClick="addArcClick" style="width:45%;" xid="addArc" >
<i xid="i8_8" />
<span xid="span8_8" >










添加弧</span>
</a>
</div>
<div style="padding:10px" xid="div4_2" >
<a class="btn btn-default" component="$UI/system/components/justep/button/button" label="移除图形" onClick="removeOverlayClick" style="width:45%;" xid="removeOverlay" >
<i xid="i9_8" />
<span xid="span9_8" >










移除图形</span>
</a>
</div>
<div xid="div6_2" />
</div>
<div class="x-panel-bottom baiduMap-bottom" xid="bottom2_8" >
</div>
</div>
   <div xid="codeContent" style="padding:10px"  xui:update-mode="merge"/>
    <div style="height:20px;" xid="div1_15" xui:parent="codeContent" xui:update-mode="insert" />
    <p xid="p1_15" xui:parent="codeContent" xui:update-mode="insert" >
<![CDATA[添加标注]]>
</p>
    <div xid="addAnnotationClick" xui:parent="codeContent" xui:update-mode="insert" />
    <p xid="p3_15" xui:parent="codeContent" xui:update-mode="insert" >
<![CDATA[更新标注的经纬度]]>
</p>
    <div xid="updateAnnoCoorClick" xui:parent="codeContent" xui:update-mode="insert" />
    <p xid="p4_15" xui:parent="codeContent" xui:update-mode="insert" >
<![CDATA[获取标注的经纬度]]>
</p>
    <div xid="getAnnoCoorClick" xui:parent="codeContent" xui:update-mode="insert" />
    <p xid="p5_15" xui:parent="codeContent" xui:update-mode="insert" >
<![CDATA[判判断标注是否存在]]>
</p>
    <div xid="isExistClick" xui:parent="codeContent" xui:update-mode="insert" />
    <p xid="p6_15" xui:parent="codeContent" xui:update-mode="insert" >
<![CDATA[移除指定标注]]>
</p>
    <div xid="removeAnnoClick" xui:parent="codeContent" xui:update-mode="insert" />
    <p xid="p7_15" xui:parent="codeContent" xui:update-mode="insert" >
<![CDATA[移除所有标注]]>
</p>
    <div xid="removeAllAnnoClick" xui:parent="codeContent" xui:update-mode="insert" />
    <p xid="p8_15" xui:parent="codeContent" xui:update-mode="insert" >
<![CDATA[添加圆形]]>
</p>
    <div xid="addCircleClick" xui:parent="codeContent" xui:update-mode="insert" />
    <p xid="p9_15" xui:parent="codeContent" xui:update-mode="insert" >
<![CDATA[添加弧形]]>
</p>
    <div xid="addArcClick" xui:parent="codeContent" xui:update-mode="insert" />
    <p xid="p10_15" xui:parent="codeContent" xui:update-mode="insert" >
<![CDATA[添加折线]]>
</p>
    <div xid="addLineClick" xui:parent="codeContent" xui:update-mode="insert" />
    <p xid="p11_15" xui:parent="codeContent" xui:update-mode="insert" >
<![CDATA[添加多边形]]>
</p>
    <div xid="addPolygonClick" xui:parent="codeContent" xui:update-mode="insert" />
    <p xid="p12_15" xui:parent="codeContent" xui:update-mode="insert" >
<![CDATA[移除指定图形]]>
</p>
    <div xid="removeOverlayClick" xui:parent="codeContent" xui:update-mode="insert" />
   <a xid="demo" onClick="demoClick"  xui:update-mode="merge"/>
   <a xid="code" onClick="codeClick"  xui:update-mode="merge"/>

</div>