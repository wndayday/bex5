<?xml version="1.0" encoding="utf-8"?>

<div xmlns="http://www.w3.org/1999/xhtml" xid="window" class="window portal-login-page" component="$UI/system/components/justep/window/window"
  sysParam="false" design="device:pc;">  
  <div component="$UI/system/components/justep/model/model" xid="model" style="height:auto;left:256px;top:6px;"
    onLoad="modelLoad"> 
    <div component="$UI/system/components/justep/data/data" xid="langs" idColumn="fName"
      autoLoad="true"> 
      <column name="fName" type="String" label="名称"/>  
      <column name="fLabel" type="String" label="显示名称"/>  
      <rule xid="rule1"/>  
      <data><![CDATA[
      [{fName:'zh_CN', fLabel:'中文'}]
      ]]></data> 
    </div> 
  </div>  
  <span component="$UI/system/components/justep/windowReceiver/windowReceiver"
    xid="receiver" style="left:19px;top:14px;"/>  
  <!-- 
  <span component="$UI/system/components/justep/windowDialog/windowDialog" xid="registerDialog"
    routable="true" onReceive="registerDialogReceive"/>  
  -->
  <div class="page-login o-effect"> 
    <div class="page-header"> 
      <!-- <div class="form-container" align="center">CloudX5管理平台</div>  -->  
      <img alt="" xid="image1" src="$UI/system/admin/base/img/logo1.png"/> 
    </div>  
    <div class="page-body"> 
      <div class="form-container"> 
        <form class="form-horizontal ng-pristine ng-valid" autocomplete="off"> 
          <fieldset> 
            <div class="form-group"> 
              <div class="input-group"> 
                <span class="input-group-addon"> 
                  <span class="linear linear-chevronrightcircle"/> 
                </span>  
                <input component="$UI/system/components/justep/input/input" class="form-control"
                  xid="name" placeHolder="用户名/手机号"/> 
              </div> 
            </div>  
            <div class="form-group"> 
              <div class="input-group"> 
                <span class="input-group-addon"> 
                  <span class="linear linear-lock"/> 
                </span>  
                <input component="$UI/system/components/justep/input/password"
                  class="form-control" xid="password" placeHolder="密码"/> 
              </div> 
            </div>  
            <div class="form-group"> 
              <div component="$UI/system/components/justep/button/buttonGroup"
                class="btn-group btn-group-justified" tabbed="false" xid="buttonGroup1"> 
                <a component="$UI/system/components/justep/button/button"
                  class="btn btn-link" label="登录" xid="login" onClick="loginClick"> 
                  <i xid="i1"/>  
                  <span xid="span1">登录</span> 
                </a> 
              </div> 
            </div>  
            <div class="form-group"> 
              <div component="$UI/system/components/justep/row/row" class="row"
                xid="row1"> 
                <div class="col-xs-3" xid="col1"> 
                  <span component="$UI/system/components/justep/button/checkbox"
                    class="x-checkbox" xid="remember" label="记住我" onChange="rememberChange"/> 
                </div>  
                <div class="col-xs-6" xid="col2"> 
                  <span component="$UI/system/components/justep/button/checkbox"
                    class="x-checkbox" xid="autoLogin" label="自动登录" onChange="autoLoginChange"/> 
                </div>  
                <div class="col-xs-3 text-right" xid="col9"> 
                  <!--                   <a component="$UI/system/components/justep/button/button" -->  
                  <!--                     class="btn btn-link show-langs" label="显示语言选择" xid="showLangBtn" -->  
                  <!--                     style="padding-top: 0px;margin-top:-2px;float:right;" onClick="showLangBtnClick">  -->  
                  <!--                     <i xid="i3"/>   -->  
                  <!--                     <span xid="span3">显示语言选择</span>  -->  
                  <!--                   </a>   -->  
                  <!--                   <a component="$UI/system/components/justep/button/button" -->  
                  <!--                     class="btn btn-link hide-langs" label="隐藏语言选择" xid="hideLangBtn" -->  
                  <!--                     style="padding-top: 0px;margin-top:-2px;float:right;display:none;" -->  
                  <!--                     onClick="hideLangBtnClick">  -->  
                  <!--                     <i xid="i11"/>   -->  
                  <!--                     <span xid="span33">隐藏语言选择</span>  -->  
                  <!--                   </a>  -->  
                  <!--                   <a href="">找回密码</a>  --> 
                </div> 
              </div> 
            </div>  
            <div class="form-group"> 
              <div class="input-group login-lang" style="display:none;"> 
                <span class="input-group-addon"> 
                  <span class="glyphicon glyphicon-flag"/> 
                </span>  
                <select component="$UI/system/components/justep/select/select"
                  class="form-control" xid="lang" bind-options="langs" bind-optionsLabel="fLabel"
                  bind-optionsValue="fName" onChange="langChange"/> 
              </div> 
            </div>  
            <div xid="div1"></div>  
            </fieldset> 
        </form> 
      </div> 
    </div> 
  </div>  
  <resource xid="resource2">
    <require xid="require1" url="css!$UI/system/admin/base/css/default"/>
  </resource>
</div>
