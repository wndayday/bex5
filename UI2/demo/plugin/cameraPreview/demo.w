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

  <div xid="div2" xui:update-mode="delete"/>
  <div xid="div6" xui:update-mode="delete"/>
  <div xid="div7" xui:update-mode="delete"/>
  <div xid="accountP" xui:update-mode="delete"/>
   <div xid="model" onModelConstructDone="modelModelConstructDone"  xui:update-mode="merge"/>
   <div xid="titleBar" title="cameraPreview"  xui:update-mode="merge"/>
   <p xid="p1"  xui:update-mode="merge-and-replace">






ID：com.mbppower.camerapreview</p>   <p xid="introduceP"  xui:update-mode="merge-and-replace">






在HTML页面实现相机预览，拍照，并且可以自定义相机的滤镜类型，拍照成功后会返回照片的原始路径和预览路径。</p>   <p xid="platformP"  xui:update-mode="merge-and-replace">






iOS、Android</p>    <div class="x-panel x-full" component="$UI/system/components/justep/panel/panel" xid="panel1_3" xui:before="div3" xui:parent="demoContent" xui:update-mode="insert" >
<div class="x-panel-content" xid="content1_3" >
<div style="padding:20px" xid="div1_3" >
<label style="width:100%;text-align:center;" xid="label1_3" >
<![CDATA[拍照成功后会自动保存至相册，并且会将图片显示在下面的标签中,关闭相机即可看到效果]]>
</label>
</div>
<div style="text-align:center;" xid="div2_3" >
<img alt="" src="" xid="image" />
</div>
</div>
<div class="x-panel-bottom" xid="bottom1_3" >
<div class="btn-group btn-group-justified x-card " component="$UI/system/components/justep/button/buttonGroup" tabbed="true" xid="buttonGroup2_3" >
<a class="btn btn-default btn-icon-top" component="$UI/system/components/justep/button/button" label="启动" onClick="startClick" style="height:100%;" xid="start" >
<i xid="i2_3" />
<span xid="span2_3" >






启动</span>
</a>
<a class="btn btn-default" component="$UI/system/components/justep/button/button" label="切换" onClick="switchBtnClick" xid="switchBtn" >
<i xid="i2_1" />
<span xid="span2_1" >










切换</span>
</a>
<a class="btn btn-default" component="$UI/system/components/justep/button/button" label="关闭" onClick="stopClick" xid="stop" >
<i xid="i3_3" />
<span xid="span3_3" >










关闭</span>
</a>
<a class="btn btn-default" component="$UI/system/components/justep/button/button" label="拍照" onClick="takePictureClick" xid="takePicture" >
<i xid="i4_3" />
<span xid="span4_3" >










拍照</span>
</a>
</div>
</div>
</div>
   <div xid="codeContent" style="padding:10px"  xui:update-mode="merge"/>
    <p xid="p1_4" xui:parent="codeContent" xui:update-mode="insert" >
<![CDATA[打开系统相机。参数说明："rect"相机位置及大小,"which"前/后相机,"tapEnabled"是否支持点击拍照,"dragEnabled"是否可拖拽,"toBack"是否显示在网页下]]>
</p>
    <div xid="startClick" xui:parent="codeContent" xui:update-mode="insert" />
    <p xid="p2_4" xui:parent="codeContent" xui:update-mode="insert" >
<![CDATA[切换相机]]>
</p>
    <div xid="switchBtnClick" xui:parent="codeContent" xui:update-mode="insert" />
    <p xid="p3_4" xui:parent="codeContent" xui:update-mode="insert" >
<![CDATA[关闭相机]]>
</p>
    <div xid="stopClick" xui:parent="codeContent" xui:update-mode="insert" />
    <p xid="p4_4" xui:parent="codeContent" xui:update-mode="insert" >
<![CDATA[拍照，成功拍照后会在相册保存两张图片，一张是预览图片，一张是原始图片]]>
</p>
    <div xid="takePictureClick" xui:parent="codeContent" xui:update-mode="insert" />
    <div xid="div7_3" xui:parent="codeContent" xui:update-mode="insert" />
   <a xid="info" onClick="infoClick"  xui:update-mode="merge"/>
   <a xid="demo" onClick="demoClick"  xui:update-mode="merge"/>
   <a xid="code" onClick="codeClick"  xui:update-mode="merge"/>

</div>