<?xml version="1.0" encoding="utf-8"?>
<div xmlns="http://www.w3.org/1999/xhtml" component="$UI/system/components/justep/window/window" design="device:m;" xid="window" class="window">  
  <div component="$UI/system/components/justep/model/model" xid="model" style="top:227px;left:377px;height:auto;" onLoad="modelLoad"> 
  <div component="$UI/system/components/justep/data/data" autoLoad="true" xid="sendData" idColumn="targets"><column label="消息接收者" name="targets" type="String" xid="xid1"></column>
  <column label="消息内容" name="message" type="String" xid="xid2"></column>
  <data xid="default1">[{}]</data></div>
  <div component="$UI/system/components/justep/data/data" autoLoad="true" xid="receiveData" idColumn="message"><column label="消息内容" name="message" type="String" xid="xid3"></column></div></div>  
  <div component="$UI/system/components/justep/panel/panel" 
    class="x-panel x-full" xid="panel1"> 
      <div class="x-panel-top" xid="top1"> 
        <div component="$UI/system/components/justep/titleBar/titleBar" title="消息推送"
          class="x-titlebar">
          <div class="x-titlebar-left"> 
            <a component="$UI/system/components/justep/button/button"
              label="" class="btn btn-link btn-only-icon" icon="icon-chevron-left"
              onClick="{operation:'window.close'}" xid="backBtn"> 
              <i class="icon-chevron-left"/>  
              <span></span> 
            </a> 
          </div>  
          <div class="x-titlebar-title">消息推送</div>  
          <div class="x-titlebar-right reverse"> 
          </div>
        </div> 
      </div>  
    <div class="x-panel-content" xid="content1"><div component="$UI/system/components/justep/labelEdit/labelEdit" class="x-label-edit x-label30" xid="labelEdit1">
   <label class="x-label" xid="targetsLabel"><![CDATA[消息接收者]]></label>
   <input component="$UI/system/components/justep/input/input" class="form-control x-edit" xid="targets" bind-ref='$model.sendData.ref("targets")'></input></div>
  <div component="$UI/system/components/justep/labelEdit/labelEdit" class="x-label-edit x-label30" xid="labelEdit2">
   <label class="x-label" xid="messageLabel"><![CDATA[消息内容]]></label>
   <textarea component="$UI/system/components/justep/textarea/textarea" class="form-control x-edit" xid="message" bind-ref='$model.sendData.ref("message")'></textarea></div>
  <a component="$UI/system/components/justep/button/button" class="btn btn-default center-block" label="发送消息" xid="sendBtn" onClick="sendBtnClick">
   <i xid="i1"></i>
   <span xid="span1">发送消息</span></a>
  <div component="$UI/system/components/justep/list/list" class="x-list" xid="list1" data="receiveData">
   <ul class="x-list-template" xid="listTemplateUl1">
    <li xid="li1"><div component="$UI/system/components/justep/output/output" class="x-output" xid="output1" bind-ref='ref("message")'></div></li></ul> </div></div>
  </div> 
</div>