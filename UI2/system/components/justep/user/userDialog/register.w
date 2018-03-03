<?xml version="1.0" encoding="utf-8"?>

<div xmlns="http://www.w3.org/1999/xhtml" component="$UI/system/components/justep/window/window" design="device:m;"
  xid="window" class="window">  
  <div component="$UI/system/components/justep/model/model" style="height:auto;top:477px;left:104px;"
    xid="model" onParamsReceive="modelParamsReceive" onLoad="modelLoad"/>  
  <div component="$UI/system/components/justep/panel/panel" class="x-panel x-full x-has-iosstatusbar"
    xid="panel1"> 
    <div class="x-panel-top" xid="top1"> 
      <div component="$UI/system/components/justep/titleBar/titleBar" title="注册"
        class="x-titlebar"> 
        <div class="x-titlebar-left"> 
          <a component="$UI/system/components/justep/button/button" label=""
            class="btn btn-link btn-only-icon" icon="icon-chevron-left" onClick="{operation:'window.close'}"
            xid="backBtn"> 
            <i class="icon-chevron-left"/>  
            <span/> 
          </a> 
        </div>  
        <div class="x-titlebar-title">注册</div>  
        <div class="x-titlebar-right reverse"/> 
      </div> 
    </div>  
    <div class="x-panel-content" xid="content1"> 
      <div component="$UI/system/components/justep/row/row" class="x-row" xid="row2"> 
        <div class="x-col" xid="col2"> 
          <input component="$UI/system/components/justep/input/input" class="form-control"
            xid="phonenumber" placeHolder="请输入您的手机号"/> 
        </div> 
      </div>  
      <div component="$UI/system/components/justep/row/row" class="x-row" xid="row3"> 
        <div class="x-col " xid="col31"> 
          <input component="$UI/system/components/justep/input/input" class="form-control"
            xid="verifyCode" placeHolder="请输入验证码"/> 
        </div>  
        <div class="x-col x-col-33" xid="col32" style="text-align:center;"> 
          <a component="$UI/system/components/justep/button/button" class="btn btn-default"
            label="获取验证码" xid="sendSmsBtn" onClick="sendSmsBtnClick"> 
            <i xid="i2"/>  
            <span xid="span2">获取验证码</span> 
          </a> 
        </div> 
      </div>  
      <div component="$UI/system/components/justep/row/row" class="x-row" xid="row5"> 
        <div class="x-col" xid="col5"> 
          <input component="$UI/system/components/justep/input/password" class="form-control"
            xid="userPassword" placeHolder="请输入密码（6-16位字母和数字的组合）"/> 
        </div> 
      </div>  
      <div component="$UI/system/components/justep/row/row" class="x-row" xid="row6"> 
        <div class="x-col" xid="col6"> 
          <input component="$UI/system/components/justep/input/password" class="form-control"
            xid="passwordAgain" placeHolder="请确认您的密码（6-16位字母和数字的组合）"/> 
        </div> 
      </div>  
      <div xid="div1"> 
        <a component="$UI/system/components/justep/button/button" class="btn btn-link"
          label="更多信息" xid="moreBtn" onClick="moreBtnClick"> 
          <i xid="i1"/>  
          <span xid="span1">更多信息</span> 
        </a> 
      </div>  
      <div xid="moreInfo" class="hide"> 
        <div component="$UI/system/components/justep/row/row" class="x-row"
          xid="row1"> 
          <div class="x-col" xid="col1"> 
            <input component="$UI/system/components/justep/input/input" class="form-control"
              xid="nameInput" placeHolder="请输入您的名字"/> 
          </div> 
        </div>  
        <div component="$UI/system/components/justep/row/row" class="x-row"
          xid="row4"> 
          <div class="x-col" xid="col4"> 
            <input component="$UI/system/components/justep/input/input" class="form-control"
              xid="emailInput" placeHolder="请输入您的邮箱"/> 
          </div> 
        </div> 
      </div>  
      <div component="$UI/system/components/justep/row/row" class="x-row" xid="row7"> 
        <div class="x-col" xid="col7"> 
          <a component="$UI/system/components/justep/button/button" class="btn btn-default center-block"
            xid="okBtn" style="font-size:medium;margin:auto;" onClick="okBtnClick"
            label="立即注册"> 
            <i xid="i2"/>  
            <span xid="span2">立即注册</span> 
          </a> 
        </div> 
      </div> 
    </div> 
  </div> 
</div>
