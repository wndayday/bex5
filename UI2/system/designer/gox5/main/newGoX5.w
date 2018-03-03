<?xml version="1.0" encoding="UTF-8"?>

<div xmlns="http://www.w3.org/1999/xhtml" xid="window" class="window" component="$UI/system/components/justep/window/window" design="device:pc;">  
  <div component="$UI/system/components/justep/model/model" xid="model" style="height:auto;top:416px;left:403px;" onParamsReceive="modelParamsReceive"></div> 
<div component="$UI/system/components/justep/panel/panel" class="x-panel x-full" xid="panel1">
   <div class="x-panel-content" xid="content1" style="padding: 15px;"><div class="x-label-edit x-label30" component="$UI/system/components/justep/labelEdit/labelEdit" xid="labelEdit4">
   <label class="x-label" xid="label4">路径</label>
   <div class="x-output x-edit" component="$UI/system/components/justep/output/output" xid="output1" bind-ref="path" style="text-overflow: ellipsis;overflow:hidden;"></div></div><div component="$UI/system/components/justep/labelEdit/labelEdit" class="x-label-edit x-label30" xid="labelEdit1">
   <label class="x-label" xid="label1"><![CDATA[名称]]></label>
   <input component="$UI/system/components/justep/input/input" class="form-control x-edit" xid="name" bind-ref="name"></input></div>
  </div>
   <div class="x-panel-bottom" xid="bottom1"><a component="$UI/system/components/justep/button/button" class="btn btn-link btn-only-label x-dialog-button" label="取消" xid="cancelBtn" onClick="{operation:'window.close'}">
   <i xid="i1"></i>
   <span xid="span1">取消</span></a>
  <a component="$UI/system/components/justep/button/button" class="btn btn-primary x-dialog-button" label="确定" xid="OKBtn" onClick="OKBtnClick">
   <i xid="i2"></i>
   <span xid="span2">确定</span></a></div></div></div>