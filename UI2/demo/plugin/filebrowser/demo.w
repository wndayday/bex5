<?xml version="1.0" encoding="utf-8"?>
<div xmlns="http://www.w3.org/1999/xhtml" component="$UI/system/components/justep/window/window" design="device:m;" xid="window" class="window">  
  <div component="$UI/system/components/justep/model/model" xid="model" style="height:auto;top:535px;left:20px;" onModelConstructDone="modelModelConstructDone" onModelConstruct="modelModelConstruct"> 
  </div>  
  <div component="$UI/system/components/justep/panel/panel" 
    class="x-panel x-full" xid="panel1"> 
      <div class="x-panel-top" xid="top1"> 
        <div component="$UI/system/components/justep/titleBar/titleBar" title="插件的名字"
          class="x-titlebar" xid="titleBar">
          <div class="x-titlebar-left"> 
            <a component="$UI/system/components/justep/button/button" class="btn btn-link btn-only-icon" xid="backBtn" icon="icon-chevron-left" onClick="{operation:'window.close'}">
   <i xid="i6" class="icon-chevron-left"></i>
   <span xid="span6"></span></a></div>  
          <div class="x-titlebar-title">插件的名字</div>  
          <div class="x-titlebar-right reverse"> 
          </div>
        </div> 
      </div>  
    <div class="x-panel-content" xid="content1"><div component="$UI/system/components/justep/contents/contents" class="x-contents x-full" active="0" xid="contents1">
   <div class="x-contents-content" xid="infoContent" style="padding:10px;"><h3 xid="h31" style="text-align:center;"><![CDATA[插件概述]]></h3><h4 xid="h41"><![CDATA[介绍：]]></h4><p xid="p1"><![CDATA[ID：com.justep.cordova.plugin.filebrowser]]></p><p xid="introduceP"><![CDATA[文件浏览器，文件图片选择器，可以完成ios应用沙盒文件管理，图片相册，照片和视频拍摄选取功能，android应用的目录为：/storage/emulated/0/[应用名]]]></p><div xid="div4" style="height:30px;"></div>
  <h4 xid="h42"><![CDATA[适用平台：]]></h4>
  <p xid="platformP"><![CDATA[ios， andoid]]></p>
  
  
  
  </div>
  <div class="x-contents-content" xid="demoContent" style="padding:10px;width:100%;"><div xid="div6" style="padding:40px;height:130px;"><p xid="accountP"><![CDATA[打开文件浏览器接口，无返回]]></p><a component="$UI/system/components/justep/button/button" class="btn btn-default" label="打开文件浏览器" xid="openBtn" style="width:100%;" onClick="openBtnClick">
   <i xid="i4"></i>
   <span xid="span4">打开文件浏览器</span></a></div>
  <div xid="div7" style="padding:40px;height:130px;"><p xid="p2"><![CDATA[选择拍照，摄像，图片和文件，返回选择的文件url json数组格式]]></p><a component="$UI/system/components/justep/button/button" class="btn btn-default" label="文件选择接口" xid="selectfilesBtn" style="width:100%;" onClick="selectfilesBtnClick">
   <i xid="i5"></i>
   <span xid="span5">文件选择接口</span></a>
  </div>
  
  <div xid="div1" style="padding:40px;height:130px;">
  <p xid="p3"><![CDATA[选择拍照，摄像，相册文件，返回选择的文件url json数组格式]]></p><a component="$UI/system/components/justep/button/button" class="btn btn-default" label="拍照，摄像，相册选择" xid="selectImageBtn" style="width:100%;" onClick="selectImageBtnClick">
   <i xid="i7"></i>
   <span xid="span7">拍照，摄像，相册选择</span></a>
  </div></div>
  <div class="x-contents-content" xid="codeContent"><p xid="p4"><![CDATA[回调方法]]>
  </p>
  <div xid="callBack"></div>
  <p xid="p5"><![CDATA[打开文件浏览器]]></p>
  <div xid="openBtnClick"></div>
  <p xid="p6"><![CDATA[文件选择(包括拍照，摄像，相册和文件夹)]]></p>
  <div xid="selectfilesBtnClick"></div>
  <p xid="p7"><![CDATA[拍照，摄像和相册选择]]></p>
  <div xid="selectImageBtnClick"></div></div></div></div>
  <div class="x-panel-bottom" xid="bottom1"><div component="$UI/system/components/justep/button/buttonGroup" class="btn-group btn-group-justified x-card " tabbed="true" xid="buttonGroup1"><a component="$UI/system/components/justep/button/button" class="btn btn-default btn-icon-top" label="info" xid="info" target="infoContent">
   <i xid="i1"></i>
   <span xid="span1">info</span></a>
  <a component="$UI/system/components/justep/button/button" class="btn btn-default btn-icon-top" label="demo" xid="demo" target="demoContent">
   <i xid="i2"></i>
   <span xid="span2">demo</span></a>
  <a component="$UI/system/components/justep/button/button" class="btn btn-default btn-icon-top" label="code" xid="code" target="codeContent">
   <i xid="i3"></i>
   <span xid="span3">code</span></a></div></div></div> 
</div>