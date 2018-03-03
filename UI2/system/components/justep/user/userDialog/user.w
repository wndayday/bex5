<?xml version="1.0" encoding="utf-8"?>

<div xmlns="http://www.w3.org/1999/xhtml" xmlns:xui="http://www.justep.com/xui" component="$UI/system/components/justep/window/window" design="device:m;"
  xid="window" class="window">  
  <div component="$UI/system/components/justep/model/model" xid="model" style="top:276px;left:194px;height:auto;" onParamsReceive="modelParamsReceive"/>  
  <div component="$UI/system/components/justep/panel/panel" class="x-panel x-full x-has-iosstatusbar"
    xid="panel1"> 
    <div class="x-panel-top" xid="top1"> 
      <div component="$UI/system/components/justep/titleBar/titleBar" title="个人信息"
        class="x-titlebar"> 
        <div class="x-titlebar-left"> 
          <a component="$UI/system/components/justep/button/button" label=""
            class="btn btn-link btn-only-icon" icon="icon-chevron-left" onClick="{operation:'window.close'}"
            xid="backBtn"> 
            <i class="icon-chevron-left"/>  
            <span/> 
          </a> 
        </div>  
        <div class="x-titlebar-title">个人信息</div>  
        <div class="x-titlebar-right reverse"/> 
      </div> 
    </div>  
    <div class="x-panel-content" xid="content1"> 
      <div class="panel panel-body x-card" style="margin:0;" 
        xid="panel5"> 
        <div class="media-left" xid="divAvatar"> 
          <div class="photoDiv" style="width:70px;height:70px;" xid="div9"
            xui:parent="divAvatar" xui:update-mode="insert"> 
            <span style="line-height:70px;font-size:1.5em;font-weight:bold;" xid="span9" bind-text="userNameChar"><![CDATA[测试]]></span> 
          </div> 
        </div>  
        <div class="media-body" xid="div7"> 
          <span xid="userName" class="user-name" bind-text="userName"><![CDATA[测试]]></span> 
        </div> 
      </div>  
      <div class="panel list-group o-noStytle" style="border:none;" 
        xid="panel6"> 
        <div component="$UI/system/components/justep/panel/panel" xid="phonePanel"
          class="list-group-item item-container item-container-temp"> 
          <div class="item-image" xid="div21"> 
            <a component="$UI/system/components/justep/button/button" class="btn btn-link btn-only-icon"
              label="button" xid="button1" icon="icon-android-call"> 
              <i xid="i1" class="icon-android-call" style="font-size:16pt;"/>  
              <span xid="span2"/> 
            </a> 
          </div>  
          <div class="item-row" xid="div22"> 
            <span class="item-desc" bind-text="phoneNumber"><![CDATA[手机号]]></span> 
          </div>  
          <div style="clear:both; height:0px;" xid="div23"/> 
        </div>  
        <div xid="emailPanel"
          class="list-group-item item-container item-container-temp"> 
          <div class="item-image" xid="div24"> 
            <a component="$UI/system/components/justep/button/button" class="btn btn-link btn-only-icon"
              label="button" xid="button1" icon="icon-email"> 
              <i xid="i1" class="icon-email" style="font-size:20pt;"/>  
              <span xid="span2"/> 
            </a> 
          </div>  
          <div class="item-row" xid="div25"> 
            <span class="item-desc" bind-text="email"><![CDATA[邮箱]]></span> 
          </div>  
          <div style="clear:both; height:0px;" xid="div26"/> 
        </div>
        </div>  
      <div class="panel list-group o-noStytle" style="border:none;margin-bottom:0px;"
        xid="panel7"> 
        <div class="list-group-item item-container" xid="div1"> 
          <div class="setup-title" xid="div27">设置</div>  
          <div style="clear:both;" xid="div28"/> 
        </div>  
        <div class="list-group-item item-container" xid="div3"> 
          <div class="item-image" xid="div29"> 
            <a component="$UI/system/components/justep/button/button" class="btn btn-link btn-only-icon"
              label="button" xid="button1" icon="icon-compose"> 
              <i xid="i1" class="icon-compose" style="font-size:20pt;"/>  
              <span xid="span2"/> 
            </a> 
          </div>  
          <div class="setup-item" xid="div30"> 
            <a component="$UI/system/components/justep/button/button" xid="changepwBtn" onClick="changepwBtnClick">修改密码</a> 
          </div>  
          <div style="clear:both;" xid="div31"/> 
        </div>  
        <div class="list-group-item item-container" xid="div3"> 
          <div class="item-image" xid="div32"> 
            <a component="$UI/system/components/justep/button/button" class="btn btn-link btn-only-icon"
              label="button" xid="button1" icon="icon-ios7-locked"> 
              <i xid="i1" class="icon-ios7-locked" style="font-size:20pt;"/>  
              <span xid="span2"/> 
            </a> 
          </div>  
          <div class="setup-item" xid="div33"> 
            <a component="$UI/system/components/justep/button/button" xid="quitBtn" onClick="quitBtnClick">退出</a> 
          </div>  
          <div style="clear:both;" xid="div34"/> 
        </div> 
      </div> 
    </div> 
  </div> 
<span component="$UI/system/components/justep/windowDialog/windowDialog" xid="dlgChangePassw" style="top:20px;left:109px;"></span></div>
