<?xml version="1.0" encoding="utf-8"?>

<div xmlns="http://www.w3.org/1999/xhtml" component="$UI/system/components/justep/window/window" xid="window" class="window"
  sysParam="false">  
  <div component="$UI/system/components/justep/model/model" xid="model" style="position:absolute;;left:248px;top:63px"
    onParamsReceive="modelParamsReceive"/>  
  <div component="$UI/system/components/justep/panel/panel" class="x-panel x-full" xid="panel3">
   <div class="x-panel-top" xid="top1" height="32">
    <label xid="label1"><![CDATA[微服务模型编译向导]]></label></div> 
   <div class="x-panel-content" xid="content4">
    <div component="$UI/system/components/justep/panel/panel" class="x-panel x-full" xid="panel4">
     <div class="x-panel-top" xid="top1" height="32" style="font-size: 18px;padding-left: 8px;">
      <i class="icon-loading-b" bind-css="{'icon-loading-b':state.get()==='','icon-alert':state.get()!=='','error':state.get()==='error'}" xid="i3"></i>
      <label xid="label1" bind-css="{'error':state.get()==='error'}" bind-text="info"><![CDATA[微服务模型资源编译中,请稍后...]]></label></div> 
     <div class="x-panel-content" xid="content3">
      <textarea component="$UI/system/components/justep/textarea/textarea" class="form-control" xid="textarea2" style="height:100%;overflow-y:scroll;" readonly="true" bind-value="compileText"></textarea></div> 
      </div> </div> <div class="x-panel-bottom" xid="bottom1" height="45">
      <a class="btn btn-primary btn-only-label x-dialog-button" component="$UI/system/components/justep/button/button" label="关闭" xid="button1" onClick='{"operation":"window.close"}' bind-enable="canClose" style="margin-right:30px;">
       <i xid="i2"></i>
       <span xid="span2">关闭</span></a> </div></div></div>
