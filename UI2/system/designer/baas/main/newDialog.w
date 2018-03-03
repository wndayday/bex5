<div xmlns="http://www.w3.org/1999/xhtml" class="window" component="$UI/system/components/justep/window/window" design="device:pc;" xid="window">
<div component="$UI/system/components/justep/model/model" style="top:144px;left:834px;height:auto;" xid="model" onParamsReceive="modelParamsReceive"></div>
<div class="x-panel x-full" component="$UI/system/components/justep/panel/panel" xid="panel1">
<div class="x-panel-content" xid="content1">
<div class="x-control-group" component="$UI/system/components/justep/controlGroup/controlGroup" xid="controlGroup1">
<div class="x-control-group-title" xid="controlGroupTitle1">
<span xid="span3"><![CDATA[
title]]></span>
</div>
<div class="x-label-edit x-label15 " component="$UI/system/components/justep/labelEdit/labelEdit" xid="labelEdit1">
<label class="x-label" xid="label1">
<![CDATA[路径]]>
</label>
<div class="x-output x-edit" component="$UI/system/components/justep/output/output" xid="output1" bind-ref="path"></div>
</div>
<div class="x-label-edit x-label15 " component="$UI/system/components/justep/labelEdit/labelEdit" xid="labelEdit2">
<label class="x-label" xid="label2">
<![CDATA[名称]]>
</label>
<input class="form-control x-edit" component="$UI/system/components/justep/input/input" xid="input1" placeHolder="请输入服务名" valueUpdateMode="input" bind-ref="name" bind-keypress="input1Keypress"/>
</div>
</div>
</div>
<div class="x-panel-bottom" xid="bottom1">
<a class="btn btn-link btn-only-label x-dialog-button" component="$UI/system/components/justep/button/button" label="取消" onClick="{&quot;operation&quot;:&quot;window.close&quot;}" xid="cancelBtn">
<i xid="i2"></i>
<span xid="span2">
取消</span>
</a>
<a class="btn btn-primary x-dialog-button" component="$UI/system/components/justep/button/button" label="确定" onClick="OKBtnClick" xid="OKBtn" bind-enable="name">
<i xid="i1"></i>
<span xid="span1">
确定</span>
</a>
</div>
</div>
</div>