<?xml version="1.0" encoding="utf-8"?>

<div xmlns="http://www.w3.org/1999/xhtml" component="$UI/system/components/justep/window/window" design="device:m;"
  xid="window" class="window">  
  <div component="$UI/system/components/justep/model/model" xid="model" style="position:absolute;top:18px;left:104px;height:auto;" onParamsReceive="modelParamsReceive"/>
  <div component="$UI/system/components/justep/panel/panel" class="x-panel x-full x-has-iosstatusbar"
    xid="panel1"> 
    <div class="x-panel-top" xid="top1"> 
      <div component="$UI/system/components/justep/titleBar/titleBar" title="修改密码"
        class="x-titlebar"> 
        <div class="x-titlebar-left"> 
          <a component="$UI/system/components/justep/button/button" label=""
            class="btn btn-link btn-only-icon" icon="icon-chevron-left" onClick="{operation:'window.close'}"
            xid="backBtn"> 
            <i class="icon-chevron-left"/>  
            <span/> 
          </a> 
        </div>  
        <div class="x-titlebar-title">修改密码</div>  
        <div class="x-titlebar-right reverse"></div> 
      </div> 
    </div>  
    <div class="x-panel-content" xid="content1">
      <div xid="div1" style="max-width:420px;padding:0 15px;margin-top:50px;margin-right:auto;margin-left:auto;"
        class="form-container">
        <div class="form-horizontal container-fluid" component="$UI/system/components/bootstrap/form/form"
          xid="form1">
          <div class="form-group" xid="formGroup1"> 
            <div class="col-sm-3" xid="col9">
              <label class="control-label" xid="controlLabel1"><![CDATA[当前密码]]></label>
            </div>  
            <div class="col-sm-9" xid="col10">
              <input component="$UI/system/components/justep/input/password"
                class="form-control" xid="oldPassword" placeHolder="请输入当前密码"/> 
            </div> 
          </div>  
          <div class="form-group" xid="formGroup2"> 
            <div class="col-sm-3" xid="col13"> 
              <label class="control-label" xid="controlLabel2"><![CDATA[新密码]]></label>
            </div>  
            <div class="col-sm-9" xid="col14"> 
              <input component="$UI/system/components/justep/input/password"
                class="form-control" xid="newPassword" placeHolder="新密码由6-16位字母和数字的组合"/>
            </div> 
          </div>  
          <div class="form-group" xid="formGroup3"> 
            <div class="col-sm-3" xid="col15"> 
              <label class="control-label" xid="controlLabel3"><![CDATA[确认新密码]]></label>
            </div>  
            <div class="col-sm-9" xid="col16"> 
              <input component="$UI/system/components/justep/input/password"
                class="form-control" xid="confirmPasswd" placeHolder="确认新密码由6-16位字母和数字的组合"/>
            </div> 
          </div>  
          <div class="form-group" xid="formGroup5"> 
            <div class="col-sm-2" xid="col21"/> 
          </div>
          <div class="form-group" xid="formGroup4"> 
            <div class="col-sm-12" xid="col17">
              <a component="$UI/system/components/justep/button/button" class="btn btn-default btn-block"
                label="确认" xid="passwordSaveBtn" onClick="passwordSaveBtnClick"> 
                <i xid="i2"/>  
                <span xid="span3">确认</span>
              </a>
            </div> 
          </div> 
        </div>
      </div>
    </div> 
  </div> 
</div>
