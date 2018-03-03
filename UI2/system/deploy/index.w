<?xml version="1.0" encoding="utf-8"?>

<div xmlns="http://www.w3.org/1999/xhtml" component="$UI/system/components/justep/window/window" style="position:relative;-moz-user-select:none;-webkit-user-select:none;user-select:none;padding:0;margin:0;height:100%;width:100%;overflow:hidden;"
  xid="window" class="window">  
  <div component="$UI/system/components/justep/model/model" xid="model" style="position:absolute;height:auto;left:116px;top:456px;"
    onLoad="modelLoad" onunLoad="modelUnLoad"/>  
  <div class="pc-ui border-box-sizing" style=";height:100%"> 
    <div class="pc-ui-title"/>  
    <div style="position:relative;  height:100%;width:100%;overflow:hidden;"
      class="border-box-sizing"> 
      <div class="pc-ui-content border-box-sizing" xid="appContainer" style="width:100%;height:100%;overflow:hidden;"> 
        <div class="panel panel-default o-deployFrame" component="$UI/system/components/bootstrap/panel/panel"
          xid="panel1"> 
          <div class="panel-body " xid="body1"> 
              
             
          <div component="$UI/system/components/justep/contents/contents" class="x-contents x-full" active="0" xid="contents1">
   <div class="x-contents-content" xid="content1"><div style="height:100%;width:100%;"> 
              <div id="pageTree" class="pull-left resource-tree"> 
                <a component="$UI/system/components/justep/button/button" class="btn btn-link btn-block" label="概要" xid="appInfo"> 
                  <i xid="i4" />  
                  <span xid="span1">概要</span> 
                </a>  
                <a component="$UI/system/components/justep/button/button" class="btn btn-link  btn-block" label="编辑" xid="appConfig" onClick="appConfigClick"> 
                  <i xid="i5" />  
                  <span xid="span2">编辑</span> 
                </a>  
                <a component="$UI/system/components/justep/button/button" class="btn btn-link btn-block" xid="appPack" label="打包" onClick="appPackClick"> 
                  <i xid="i9" />  
                  <span xid="span5">打包</span> 
                </a> 
              <a component="$UI/system/components/justep/button/button" class="btn btn-link btn-block" label="发布" xid="appPublish" onClick="appPublishClick">
   <i xid="i1"></i>
   <span xid="span3">发布</span></a>
  <a component="$UI/system/components/justep/button/button" class="btn btn-link btn-block" label="导出App工程" xid="exportApp" onClick="exportAppClick">
   <i xid="i2"></i>
   <span xid="span4">导出App工程</span></a>
  </div> 
            <div xid="div1" class="o-content"> 
              <div xid="appInfoDiv" style="padding:8px;">
   <div component="$UI/system/components/justep/labelEdit/labelEdit" class="x-label-edit x-label20" xid="labelOutput2">
    <label class="x-label" xid="label2">应用名：</label>
    <div component="$UI/system/components/justep/output/output" class="x-output x-edit" xid="appName"></div></div> 
   <div component="$UI/system/components/justep/labelEdit/labelEdit" class="x-label-edit x-label20" xid="labelOutput3">
    <label class="x-label" xid="label3">版本号：</label>
    <div component="$UI/system/components/justep/output/output" class="x-output x-edit" xid="version"></div></div> 
   <div component="$UI/system/components/justep/labelEdit/labelEdit" class="x-label-edit x-label20" xid="labelOutput6">
    <label class="x-label" xid="label6">应用包名：</label>
    <div component="$UI/system/components/justep/output/output" class="x-output x-edit" xid="packageName" style="background-color:transparent;"></div></div> 
   <div component="$UI/system/components/justep/labelEdit/labelEdit" class="x-label-edit x-label20" xid="labelOutput1">
    <label class="x-label" xid="label7">服务地址：</label>
    <div component="$UI/system/components/justep/output/output" class="x-output x-edit" xid="serverURL"></div></div> 
   <div class="x-label-edit x-label20" component="$UI/system/components/justep/labelEdit/labelEdit" xid="labelOutput111">
    <label class="x-label" xid="label211">Web路径：</label>
    <div class="x-output x-edit" component="$UI/system/components/justep/output/output" xid="webPath"></div></div> 
   <div component="$UI/system/components/justep/labelEdit/labelEdit" class="x-label-edit x-label20" xid="labelOutput5">
    <label class="x-label" xid="label5">首页：</label>
    <div component="$UI/system/components/justep/output/output" class="x-output x-edit" xid="indexURL"></div></div> 
   <div component="$UI/system/components/justep/labelEdit/labelEdit" class="x-label-edit x-label20" xid="labelOutput4">
    <label class="x-label" xid="label4">包含UI资源：</label>
    <div component="$UI/system/components/justep/output/output" class="x-output x-edit" xid="uiResDirs"></div></div> 
   <div component="$UI/system/components/justep/labelEdit/labelEdit" class="x-label-edit x-label20" xid="labelTextarea1">
    <label class="x-label" xid="label1">本地插件：</label>
    <textarea component="$UI/system/components/justep/textarea/textarea" class="form-control x-edit" xid="plugins" readonly="true"></textarea></div> 
   <div xid="div2" style="padding-top:8px">
<!--     <span component="$UI/system/components/justep/button/checkbox" class="x-checkbox" xid="extBrowser" label="Andorid使用增强型浏览器" checked="true" disabled="true"></span> -->
    <span component="$UI/system/components/justep/button/checkbox" class="x-checkbox" xid="resEncryption" label="资源加密" style="padding-left:16px" disabled="true"></span>
    <span component="$UI/system/components/justep/button/checkbox" class="x-checkbox" xid="sourceMode" label="源码模式" style="padding-left:16px" disabled="true"></span></div> </div><div xid="containerParent" /> 
            </div></div></div></div></div>  
          </div> 
      </div> 
    </div> 
  </div> 
</div>
