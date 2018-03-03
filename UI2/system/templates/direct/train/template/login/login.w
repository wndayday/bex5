<?xml version="1.0" encoding="utf-8"?>

<div xmlns="http://www.w3.org/1999/xhtml" xid="window" class="window" component="$UI/system/components/justep/window/window"
  design="device:m;">  
  <div component="$UI/system/components/justep/model/model" xid="model" style="height:auto;left:101px;top:40px;"/>  
  <div component="$UI/system/components/justep/panel/panel" class="x-panel x-full"
    xid="panel2"> 
    <div class="x-panel-top" xid="top2" height="48" style="background-color:black;"> 
      <div component="$UI/system/components/justep/titleBar/titleBar" class="x-titlebar"
        xid="titleBar1" style="font-size:large;background-color:black;height:48px;" title="教育培训"> 
        <div class="x-titlebar-left" xid="div2"> 
          <a component="$UI/system/components/justep/button/button" class="btn btn-link btn-only-icon"
            label="button" xid="backBtn" icon="icon-chevron-left" onClick="{operation:'window.close'}"> 
            <i xid="i2" class="icon-chevron-left"/>  
            <span xid="span2"/> 
          </a> 
        </div>  
        <div class="x-titlebar-title" xid="div2">教育培训</div>  
        <div class="x-titlebar-right reverse" xid="div3"/> 
      </div> 
    </div>  
    <div class="x-panel-content" xid="content3"> 
      <div component="$UI/system/components/justep/controlGroup/controlGroup"
        class="x-control-group" title="用户登录" xid="controlGroup1"> 
        <div class="x-control-group-title" xid="controlGroupTitle1"> 
          <span xid="span6">用户登录</span>
        </div>  
        <div component="$UI/system/components/justep/row/row" class="x-row"
          xid="row1"> 
          <div class="x-col x-col-fixed" xid="col2" style="width:auto;">
            <a component="$UI/system/components/justep/button/button" class="btn btn-link"
              label="账号：" xid="button2" style="color:#000000;"> 
              <i xid="i4"/>  
              <span xid="span7">账号：</span>
            </a>
          </div>  
          <div class="x-col" xid="col3">
            <input component="$UI/system/components/justep/input/input" class="form-control"
              xid="input1"/>
          </div> 
        </div>  
        <div component="$UI/system/components/justep/row/row" class="x-row"
          xid="row2"> 
          <div class="x-col x-col-fixed" xid="col5" style="width:auto;">
            <a component="$UI/system/components/justep/button/button" class="btn btn-link"
              label="密码：" xid="button3" style="color:#000000;"> 
              <i xid="i6"/>  
              <span xid="span10">密码：</span>
            </a>
          </div>  
          <div class="x-col" xid="col6">
            <input component="$UI/system/components/justep/input/input" class="form-control"
              xid="input2"/>
          </div> 
        </div>  
        <a component="$UI/system/components/justep/button/button" class="btn btn-default center-block" label="登录" xid="loginBtn" style="margin-bottom:20px;background-color:#25362f;border-color:#C0C0C0 #C0C0C0 #C0C0C0 #C0C0C0;" onClick="first">
   <i xid="i7"></i>
   <span xid="span11">登录</span></a>
  <a component="$UI/system/components/justep/button/button" class="btn btn-link" label="注册新用户" xid="regBtn" style="color:#2D2D2D;" onClick="login">
   <i xid="i1"></i>
   <span xid="span1">注册新用户</span></a></div> 
    </div>  
    </div> 
</div>
