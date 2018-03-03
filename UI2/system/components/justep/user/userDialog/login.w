<?xml version="1.0" encoding="utf-8"?>

<div xmlns="http://www.w3.org/1999/xhtml" xid="window" class="window" component="$UI/system/components/justep/window/window"
  sysParam="false" design="device:m;">  
  <div component="$UI/system/components/justep/model/model" xid="model" style="height:auto;top:2px;left:6px;"
    onParamsReceive="modelParamsReceive"/>  
  <div class="page-login" xid="div1"> 
    <div class="page-header" style="text-align: center;font-size: 24px; margin-top:0; padding-top: 48px;"
      xid="div2"> 
      <div class="form-container" align="center" xid="div3">登录</div> 
    </div>  
    <div class="page-body" style="padding: 10px;" xid="div4"> 
      <div class="form-container" style="max-width: 420px;margin: 0 auto;padding: 0 15px;"
        bind-keypress="div1Keypress" xid="div5"> 
        <form xid="form1"> 
          <fieldset xid="fieldset"> 
            <div class="form-group" xid="formgroup1"> 
              <div class="input-group" xid="col1"> 
                <span class="input-group-addon" xid="span2"> 
                  <span class="glyphicon glyphicon-envelope" xid="span4"/> 
                </span>  
                <input component="$UI/system/components/justep/input/input" class="form-control"
                  xid="name" placeHolder="电话号码"/> 
              </div> 
            </div>  
            <div class="form-group" xid="formgroup2"> 
              <div class="input-group" xid="col2"> 
                <span class="input-group-addon" xid="span3"> 
                  <span class="glyphicon glyphicon-lock" xid="span5"/> 
                </span>  
                <input component="$UI/system/components/justep/input/password"
                  class="form-control" xid="password" placeHolder="密码"/> 
              </div> 
            </div>  
            <div class="form-group" xid="formgroup3"> 
              <a component="$UI/system/components/justep/button/button" class="btn btn-default btn-block"
                label="登录" xid="login" onClick="loginBtnClick"> 
                <i xid="i1"/>  
                <span xid="span1">登录</span> 
              </a> 
            </div>  
            <div xid="div6" class="form-group"> 
              <div component="$UI/system/components/justep/row/row" class="x-row"
                xid="row2"> 
                <div class="x-col" xid="col6"> 
                  <a component="$UI/system/components/justep/button/button"
                    class="btn btn-link" label="忘记密码？" xid="btnForget" onClick="btnForgetClick"> 
                    <i xid="i3"/>  
                    <span xid="span7">忘记密码？</span> 
                  </a> 
                </div>  
                <div class="x-col " xid="col7"> 
                  <a component="$UI/system/components/justep/button/button"
                    class="btn btn-link pull-right" label="用户注册" xid="regBtn" onClick="regBtnClick"> 
                    <i xid="i4"/>  
                    <span xid="span8">用户注册</span> 
                  </a> 
                </div> 
              </div> 
            </div>  
            <div class="split-line"> 
              <span>使用其他帐号登录</span> 
            </div>  
            <div class="x-row other-login-row"> 
              <div class="icon-weixin" bind-click="weiXinLoginClick"/> 
            </div> 
          </fieldset> 
        </form> 
      </div> 
    </div> 
  </div>  
  <span component="$UI/system/components/justep/windowDialog/windowDialog" xid="dlgForget"
    style="top:5px;left:13px;"/>  
  <span component="$UI/system/components/justep/windowDialog/windowDialog" xid="dlgRegister"
    style="top:6px;left:11px;"/> 
</div>
