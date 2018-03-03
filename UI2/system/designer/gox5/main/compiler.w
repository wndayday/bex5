<?xml version="1.0" encoding="utf-8"?>

<div xmlns="http://www.w3.org/1999/xhtml" xid="window" class="window" component="$UI/system/components/justep/window/window"
  design="device:pc;">  
  <div component="$UI/system/components/justep/model/model" xid="model" style="height:auto;top:504px;left:37px;"
    onParamsReceive="modelParamsReceive">
    <div component="$UI/system/components/justep/data/data" autoLoad="true" xid="protocolData" idColumn="pName">
   <column label="协议名称" name="pName" type="String" xid="xid2"></column>
   <column label="是否选中" name="check" type="String" xid="xid5"></column>
   <data xid="default2">[]</data></div></div>  
  <div component="$UI/system/components/justep/panel/panel" class="x-panel x-full"
    xid="panel1"> 
    <div class="x-panel-content" xid="content1" style="padding: 15px;"> 
      <div xid="showMsg"><div class="x-label-edit x-label30" component="$UI/system/components/justep/labelEdit/labelEdit" xid="labelEdit4">
   <label class="x-label" xid="label4" style="text-align:right;"><![CDATA[服务名称：]]></label>
   <div class="x-output  form-control" component="$UI/system/components/justep/output/output" xid="output1" bind-ref="name" style="width:70%;"></div></div><div component="$UI/system/components/justep/labelEdit/labelEdit" class="x-label-edit x-label30" xid="labelEdit6">
   <label class="x-label" xid="label6" style="text-align:right;"><![CDATA[开发语言：]]></label>
   <div class="x-output form-control" component="$UI/system/components/justep/output/output" xid="output2" bind-ref="language" style="width:70%;"></div></div>
  <div component="$UI/system/components/justep/labelEdit/labelEdit" class="x-label-edit x-label30" xid="labelEdit1">
   <label class="x-label" xid="label5" style="text-align:right;"><![CDATA[支持 RPC服务协议：]]></label>
   <div class="x-edit" xid="div2"><div component="$UI/system/components/justep/list/list" class="x-list" xid="list1" data="protocolData">
    <ul class="x-list-template" xid="listTemplateUl1">
     <li xid="li1" class="pull-left">
      <div component="$UI/system/components/justep/labelEdit/labelEdit" class="x-label-edit x-label100" xid="labelEdit3"><span component="$UI/system/components/justep/button/checkbox" class="x-checkbox" xid="protocolCheck" onChange="protocolCheckChange" bind-checked=' val("check")=="1"'></span><label class="x-label" xid="label1" bind-text='val("pName")'></label></div></li> </ul> </div></div></div></div>
  
  <div xid="compileModel" style="height:100%;" class="compile-models"><div class="panel-top" xid="top2" height="32" style="font-size: 18px;padding-left: 8px;">
    <i class="icon-loading-b" bind-css="{'icon-loading-b':state.get()==='','icon-alert':state.get()!=='','error':state.get()==='error'}" xid="i5" bind-visible="state.get()!='success'"></i>
    <label xid="label3" bind-css="{'error':state.get()==='error'}" bind-text="info">Baas模型资源编译中,请稍后......</label>
  <i class="icon-android-checkmark" xid="i4" bind-visible="state.get()=='success'" bind-css="{'success': state.get()=='success'}"></i></div><div xid="div3" style="height:100%;"><textarea component="$UI/system/components/justep/textarea/textarea" class="form-control" xid="textarea2" style="height:100%;" readonly="true" bind-value="compileText" bind-ref="compileText"></textarea></div></div>
  </div>  
    <div class="x-panel-bottom" xid="bottom1">
  <div xid="div1" style="padding-right:30px;"><a component="$UI/system/components/justep/button/button" class="btn btn-link btn-only-label x-dialog-button" label="取消" xid="cancelBtn" onClick="{operation:'window.close'}"> 
        <i xid="i1" />  
        <span xid="span1">取消</span> 
      </a><a component="$UI/system/components/justep/button/button" class="btn btn-primary x-dialog-button" label="确定编译" xid="OKBtn" onClick="OKBtnClick"> 
        <i xid="i2" />  
        <span xid="span2">确定编译</span> 
      </a><a component="$UI/system/components/justep/button/button" class="btn btn-primary btn-only-label x-dialog-button x-btn-close" label="关闭" xid="closeBtn" onClick="{operation:'window.close'}" style="background:#4fc7c5;border:none;margin-right:.4em;">
   <i xid="i3"></i>
   <span xid="span3">关闭</span></a></div></div> 
  </div> 
<span component="$UI/system/components/justep/windowDialog/windowDialog" xid="compilerDig" showTitle="true" status="normal" forceRefreshOnOpen="true" src="$UI/system/designer/gox5/compile/compileDialog.w" title="编译窗口" width="660px" height="520px" style="top:357px;left:140px;"></span></div>
