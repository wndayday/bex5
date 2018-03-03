<?xml version="1.0" encoding="utf-8"?>

<div xmlns="http://www.w3.org/1999/xhtml" component="$UI/system/components/justep/window/window" design="device:m;"
  xid="window" class="window">  
  <div component="$UI/system/components/justep/model/model" xid="model" style="top:-6px;left:20px;height:auto;"
    onLoad="modelLoad" onParamsReceive="modelParamsReceive"/>  
  <div component="$UI/system/components/justep/panel/panel" class="x-panel x-full x-has-iosstatusbar"
    xid="panel1"> 
    <div class="x-panel-top" xid="top1"> 
      <div component="$UI/system/components/justep/titleBar/titleBar" title="忘记密码"
        class="x-titlebar"> 
        <div class="x-titlebar-left"> 
          <a component="$UI/system/components/justep/button/button" label=""
            class="btn btn-link btn-only-icon" icon="icon-chevron-left" onClick="{operation:'window.close'}"
            xid="backBtn"> 
            <i class="icon-chevron-left"/>  
            <span/> 
          </a> 
        </div>  
        <div class="x-titlebar-title">忘记密码</div>  
        <div class="x-titlebar-right reverse"/> 
      </div> 
    </div>  
    <div class="x-panel-content" xid="content1"> 
      <div component="$UI/system/components/justep/row/row" class="x-row" xid="row1"> 
        <div class="x-col " xid="col1"> 
          <input component="$UI/system/components/justep/input/input" class="form-control"
            xid="phonenumber" placeHolder="请输入手机号码"/> 
        </div> 
      </div>  
      <div component="$UI/system/components/justep/row/row" class="x-row" xid="row2"> 
        <div class="x-col " xid="col21"> 
          <input component="$UI/system/components/justep/input/input" class="form-control"
            xid="verifyCode" placeHolder="请输入验证码"/> 
        </div>  
        <div class="x-col x-col-33" xid="col22" style="text-align:center;"> 
          <a component="$UI/system/components/justep/button/button" class="btn btn-default"
            label="获取验证码" xid="sendSmsBtn" onClick="sendSmsBtnClick"> 
            <i xid="i2"/>  
            <span xid="span2">获取验证码</span> 
          </a> 
        </div> 
      </div>  
      <div component="$UI/system/components/justep/row/row" class="x-row" xid="row3"> 
        <div class="x-col " xid="col3"> 
          <input component="$UI/system/components/justep/input/password" class="form-control"
            xid="newPassword" placeHolder="请输入密码（6-16位字母和数字的组合）"/> 
        </div> 
      </div>  
      <div component="$UI/system/components/justep/row/row" class="x-row" xid="row4"> 
        <div class="x-col " xid="col4"> 
          <input component="$UI/system/components/justep/input/password" class="form-control"
            xid="confirmPassword" placeHolder="请确认密码（6-16位字母和数字的组合）"/> 
        </div> 
      </div>  
      <div component="$UI/system/components/justep/row/row" class="x-row" xid="row5"> 
        <div class="x-col" xid="col5"> 
          <a component="$UI/system/components/justep/button/button" class="btn btn-default center-block"
            label="确定" xid="okBtn" style="margin:5px 15px 5px 15px;" onClick="okBtnClick"> 
            <i xid="i1"/>  
            <span xid="span1">确定</span> 
          </a> 
        </div> 
      </div> 
    </div> 
  </div> 
</div>
