<?xml version="1.0" encoding="utf-8"?>

<div xmlns="http://www.w3.org/1999/xhtml" xmlns:xui="http://www.justep.com/xui" component="$UI/system/components/justep/window/window" class="window"
  sysParam="false">  
  <div component="$UI/system/components/justep/model/model" xid="model" style="height:auto;left:171px;top:339px;"
    onLoad="modelLoad"> 
    <div component="$UI/system/components/justep/data/data" autoLoad="true"
      xid="configData" idColumn="webIDE">
      <column label="WebIDE" name="webIDE" type="Boolean" xid="xid1"/>  
      <column label="模式" name="mode" type="Integer" xid="xid2"/>  
      <column name="appID" type="String" xid="xid3"/>
    </div>
  </div>  
  <div xid="appNameDiv">
   <div component="$UI/system/components/justep/labelEdit/labelEdit" class="x-label-edit x-label20" xid="labelEdit1">
    <label class="x-label" xid="appNameLabel"><![CDATA[应用名称 *：]]></label>
    <input component="$UI/system/components/justep/input/input" class="form-control x-edit" xid="appNameInput" placeHolder="例：仿淘宝"></input>
    </div> </div><div xid="serverDiv"> 
    <div component="$UI/system/components/justep/labelEdit/labelEdit" class="x-label-edit x-label20"
      xid="labelInput1"> 
      <label class="x-label" xid="serverURLLabel"><![CDATA[部署方式 *：]]></label>  
      <input component="$UI/system/components/justep/input/input" class="form-control x-edit"
        xid="serverURL" placeHolder="例：http://ip:port"/>  
      <a component="$UI/system/components/justep/button/button" class="btn btn-link btn-only-icon"
        label="button" xid="selectIPButton" icon="icon-arrow-down-b" onClick="selectIPButtonClick"> 
        <i xid="i1" class="icon-arrow-down-b"/>  
        <span xid="span1"/>
      </a>
    </div>  
    </div>  
  <!--   
  <div xid="div1" style="margin-left: 60px; float: left;"><div style='margin-top: 10px;'><div xid='jqxCheckBox'>Three Check States</div></div></div>
  -->  
  <div component="$UI/system/components/justep/row/row" class="x-row" xid="row3">
   <div xid="col5" class="x-col x-col-20">
    <label xid="label4" class="x-label"><![CDATA[应用图标：]]></label></div><div xid="iconCol">
    
    <img alt="" xid="iconImage" class="iconImage"></img>
  <span xid="span3"><![CDATA[ （96X96）]]></span></div> 
    </div><div component="$UI/system/components/justep/row/row" class="x-row" xid="row1">
   <div class="x-col x-col-20"><label xid="label1" class="x-label"><![CDATA[选择欢迎图片：]]></label></div>
   <div class="x-col" xid="splashPortCol">
    <label xid="label1" class="x-label" style="width:100%;">纵向欢迎图片（720x1280）</label>
    <img alt="" class="splashPortImage" xid="splashPortImage"></img>
  </div> 
   <div class="x-col" xid="splashLandCol">
    <label xid="label3" class="x-label" style="width:100%;">横向欢迎图片（1280x720）</label>
    <img alt="" class="splashLandImage" xid="splashLandImage"></img>
  </div> </div><div component="$UI/system/components/justep/row/row" class="x-row" xid="row2">
   <div class="x-col x-col-20" xid="col1"><div xid="div4" class="h5"></div><label xid="label5" class="x-label"><![CDATA[选择平台：]]></label>
  </div>
   <div class="x-col x-col-20" xid="col2"><span component="$UI/system/components/justep/button/checkbox" class="x-checkbox" xid="androidCheckbox" checked="true"></span><img src="$UI2/system/deploy/package/img/android.png" alt="" xid="androidImage" bind-click="androidImageClick" class="ptImg"></img></div>
   <div class="x-col" xid="col3"><span component="$UI/system/components/justep/button/checkbox" class="x-checkbox" xid="iosCheckbox"></span><img src="$UI2/system/deploy/package/img/apple.png" alt="" xid="iosImage" bind-click="iosImageClick" class="ptImg"></img></div>
   </div><div component="$UI/system/components/justep/popMenu/popMenu" class="x-popMenu"
    xid="popMenu" anchor="selectIPButton" direction="right-bottom"> 
    <div class="x-popMenu-overlay" xid="div2"/>  
    <ul component="$UI/system/components/justep/menu/menu" class="x-menu dropdown-menu x-popMenu-content"
      xid="menu"/>
  </div>  
  <div component="$UI/system/components/justep/popOver/popOver" class="x-popOver"
    direction="auto" xid="finishPopOver" dismissible="false"> 
    <div class="x-popOver-overlay" xid="div8"/>  
    <div class="x-popOver-content" xid="div9"/>
  </div>

  
  
  <span component="$UI/system/components/justep/messageDialog/messageDialog" xid="messageDialogGotoHost" title="提示" message="尚未购买主机或者主机到期或者主机尚未审核，是否现在处理？" type="YesNo"></span></div>
