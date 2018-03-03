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
   <div xid="model" onModelConstructDone="modelModelConstructDone" style="height:auto;top:388px;left:135px;"  xui:update-mode="merge"/>
   <div xid="titleBar" title="离线地图"  xui:update-mode="merge"/>
    <div class="x-panel x-full" component="$UI/system/components/justep/panel/panel" xid="panel1_8" xui:parent="demoContent" xui:update-mode="insert" >
<div class="x-panel-content" xid="content1_8" >
<div style="padding:10px" xid="div1_8" >
<a class="btn btn-default" component="$UI/system/components/justep/button/button" label="离线地图初始化" onClick="offInitClick" style="width:45%;" xid="offInit" >
<i xid="i1_8" />
<span xid="span1_8" >








离线地图初始化</span>
</a>
<a class="btn btn-default" component="$UI/system/components/justep/button/button" label="获取热门城市列表" onClick="getHostClick" style="width:45%;" xid="getHost" >
<i xid="i2_8" />
<span xid="span2_8" >








获取热门城市列表</span>
</a>
</div>
<div style="padding:10px" xid="div1_3" >
<a class="btn btn-default" component="$UI/system/components/justep/button/button" label="添加监听事件" onClick="addOfflineListenerClick" style="width:45%;" xid="addOfflineListener" >
<i xid="i1_3" />
<span xid="span1_3" >




添加监听事件</span>
</a>
<a class="btn btn-default" component="$UI/system/components/justep/button/button" label="移除监听事件" onClick="removeOfflineListenerClick" style="width:45%;" xid="removeOfflineListener" >
<i xid="i2_3" />
<span xid="span2_3" >




移除监听事件</span>
</a>
</div>
<div style="padding:10px" xid="div2_8" >
<a class="btn btn-default" component="$UI/system/components/justep/button/button" label="获取支持下载列表" onClick="getListClick" style="width:45%;" xid="getList" >
<i xid="i3_8" />
<span xid="span3_8" >








获取支持下载列表</span>
</a>
<a class="btn btn-default" component="$UI/system/components/justep/button/button" label="搜索离线记录" onClick="searchOffLineClick" style="width:45%;" xid="searchOffLine" >
<i xid="i4_8" />
<span xid="span4_8" >








搜索离线记录</span>
</a>
</div>
<div style="padding:10px" xid="div3_8" >
<a class="btn btn-default" component="$UI/system/components/justep/button/button" label="获取全部离线地图更新信息" onClick="getUpdateInfoClick" style="width:45%;" xid="getUpdateInfo" >
<i xid="i5_8" />
<span xid="span5_8" >
获取全部离线地图更新信息</span>
</a>
<a class="btn btn-default" component="$UI/system/components/justep/button/button" label="下载离线地图" onClick="downloadClick" style="width:45%;" xid="download" >
<i xid="i6_8" />
<span xid="span6_8" >








下载离线地图</span>
</a>
</div>
<div style="padding:10px" xid="div4_8" >
<a class="btn btn-default" component="$UI/system/components/justep/button/button" label="更新离线地图" onClick="updateClick" style="width:45%;" xid="update" >
<i xid="i7_8" />
<span xid="span7_8" >








更新离线地图</span>
</a>
<a class="btn btn-default" component="$UI/system/components/justep/button/button" label="暂停下载" onClick="pauseClick" style="width:45%;" xid="pause" >
<i xid="i8_8" />
<span xid="span8_8" >








暂停下载</span>
</a>
</div>
<div style="padding:10px" xid="div5_8" >
<a class="btn btn-default" component="$UI/system/components/justep/button/button" label="删除离线地图" onClick="removeClick" style="width:45%;" xid="remove" >
<i xid="i9_8" />
<span xid="span9_8" >








删除离线地图</span>
</a>
<a class="btn btn-default" component="$UI/system/components/justep/button/button" label="获取某个城市的更新信息" onClick="getUpdateByIdClick" style="width:45%;" xid="getUpdateById" >
<i xid="i3_3" />
<span xid="span3_3" >
获取某个城市的更新信息</span>
</a>
</div>
</div>
</div>
   <div xid="codeContent" style="padding:10px"  xui:update-mode="merge"/>
    <div xid="div1_4" xui:parent="codeContent" xui:update-mode="insert" />
    <p xid="p1_4" xui:parent="codeContent" xui:update-mode="insert" >
<![CDATA[离线地图初始化]]>
</p>
    <div xid="offInitClick" xui:parent="codeContent" xui:update-mode="insert" />
    <p xid="p2_3" xui:parent="codeContent" xui:update-mode="insert" >
<![CDATA[添加监听事件]]>
</p>
    <div xid="addOfflineListenerClick" xui:parent="codeContent" xui:update-mode="insert" />
    <p xid="p3_3" xui:parent="codeContent" xui:update-mode="insert" >
<![CDATA[移除监听事件]]>
</p>
    <div xid="removeOfflineListenerClick" xui:parent="codeContent" xui:update-mode="insert" />
    <p xid="p2_4" xui:parent="codeContent" xui:update-mode="insert" >
<![CDATA[获取热门城市列表]]>
</p>
    <div xid="getHostClick" xui:parent="codeContent" xui:update-mode="insert" />
    <p xid="p3_4" xui:parent="codeContent" xui:update-mode="insert" >
<![CDATA[获取支持离线下载的城市列表]]>
</p>
    <div xid="getListClick" xui:parent="codeContent" xui:update-mode="insert" />
    <p xid="p4_4" xui:parent="codeContent" xui:update-mode="insert" >
<![CDATA[根据城市名搜索离线地图记录]]>
</p>
    <div xid="searchOffLineClick" xui:parent="codeContent" xui:update-mode="insert" />
    <p xid="p5_4" xui:parent="codeContent" xui:update-mode="insert" >
<![CDATA[获取各城市离线地图的更新信息]]>
</p>
    <div xid="getUpdateInfoClick" xui:parent="codeContent" xui:update-mode="insert" />
    <p xid="p1_3" xui:parent="codeContent" xui:update-mode="insert" >
<![CDATA[根据城市id获取离线地图的更新信息]]>
</p>
    <div xid="getUpdateByIdClick" xui:parent="codeContent" xui:update-mode="insert" />
    <p xid="p6_4" xui:parent="codeContent" xui:update-mode="insert" >
<![CDATA[下载指定城市的离线地图]]>
</p>
    <div xid="downloadClick" xui:parent="codeContent" xui:update-mode="insert" />
    <p xid="p7_4" xui:parent="codeContent" xui:update-mode="insert" >
<![CDATA[更新指定城市的离线地图]]>
</p>
    <div xid="updateClick" xui:parent="codeContent" xui:update-mode="insert" />
    <p xid="p8_4" xui:parent="codeContent" xui:update-mode="insert" >
<![CDATA[暂停下载离线地图]]>
</p>
    <div xid="pauseClick" xui:parent="codeContent" xui:update-mode="insert" />
    <p xid="p9_4" xui:parent="codeContent" xui:update-mode="insert" >
<![CDATA[移除已经下载的离线地图]]>
</p>
    <div xid="removeClick" xui:parent="codeContent" xui:update-mode="insert" />

</div>