<?xml version="1.0" encoding="utf-8"?>
<div xmlns="http://www.w3.org/1999/xhtml" component="$UI/system/components/justep/window/window" design="device:mobile" xid="window">  
    <link href="./js/cropper.css" rel="stylesheet"/>
 
  <div component="$UI/system/components/justep/model/model" xid="model" style="height:auto;left:123px;top:232px;" onLoad="modelLoad"> 
  </div>  
  <span component="$UI/system/components/justep/windowReceiver/windowReceiver" xid="windowReceiver1" style="left:46px;top:16px;"></span><div component="$UI/system/components/justep/panel/panel" 
    class="x-panel x-full"> 
      <div class="x-panel-top"> 
        <div component="$UI/system/components/justep/titleBar/titleBar" title="上传头像"
          class="x-titlebar">
          <div class="x-titlebar-left"> 
            <a component="$UI/system/components/justep/button/button"
              label="" class="btn btn-link btn-only-icon" icon="icon-chevron-left"
              onClick="backBtnClick" xid="backBtn"> 
              <i class="icon-chevron-left"/>  
              <span></span> 
            </a> 
          </div>  
          <div class="x-titlebar-title">上传头像</div>  
          <div class="x-titlebar-right reverse"> 
          <a component="$UI/system/components/justep/button/button" class="btn btn-link btn-only-icon" label="选择" xid="button1" onClick="button1Click" icon="icon-android-search">
   <i xid="i1" class="icon-android-search"></i>
   <span xid="span1">选择</span></a>
  <a component="$UI/system/components/justep/button/button" class="btn btn-link btn-only-icon" label="上传" xid="button2" onClick="button2Click" icon="icon-arrow-up-a">
   <i xid="i2" class="icon-arrow-up-a"></i>
   <span xid="span2">上传</span></a></div>
        </div> 
      </div>  
    <div class="x-panel-content">
    
    
    <input type="file" value="" xid="inputImage" bind-change="file1Change" accept="image/*" style="display:none;"></input>
  <div component="$UI/system/components/justep/row/row" class="x-row" xid="row1">
   <div class="x-col" xid="col1"></div>
   <div class="x-col x-col-fixed x-col-center" xid="col2" style="width:auto;"><div xid="div1" style="height:90px;width:90px;" class="img-preview "></div>
  </div>
   <div class="x-col" xid="col3"></div></div><div class="cropper-example-1" style="width:436px;height:360px;">
  
  <img src="picture.jpg" alt="Picture"/>
	</div>
    
    
    
    
    
    </div>
  </div> 
<span component="$UI/system/components/justep/messageDialog/messageDialog" xid="messageDialog1" style="left:201px;top:169px;" onOK="messageDialog1OK"></span>
  <span component="$UI/system/components/justep/windowDialog/windowDialog" xid="windowDialog1" src="./savePic.w"></span></div>