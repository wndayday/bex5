<?xml version="1.0" encoding="UTF-8"?>

<div xmlns="http://www.w3.org/1999/xhtml" xid="window" class="window" component="$UI/system/components/justep/window/window" design="device:pc">  
  <div component="$UI/system/components/justep/model/model" xid="model" style="top:43px;left:77px;height:auto;"/> 
<div component="$UI/system/components/justep/panel/panel" class="x-panel x-full" xid="panel1">
   <div class="x-panel-content" xid="content1">
  <div class="panel panel-default" component="$UI/system/components/bootstrap/panel/panel" xid="panel2">
   <div class="panel-heading" xid="heading1">
    <h4 class="panel-title" xid="h41"><![CDATA[服务名称：]]></h4></div> 
   <div class="panel-body" xid="body1"><div xid="div3"></div>
  <div component="$UI/system/components/justep/row/row" class="x-row" xid="row1">
   <div class="x-col" xid="col1" style="padding-right:0px;"><input component="$UI/system/components/justep/input/input" class="form-control" xid="rpcNameInput"></input></div>
   <div class="x-col x-col-fixed" xid="col3" style="width:auto;padding-left:0px;"><a component="$UI/system/components/justep/button/button" class="btn btn-default btn-only-icon" label="button" xid="chooseBtn" icon="icon-android-more" onClick="chooseBtnClick">
   <i xid="i3" class="icon-android-more"></i>
   <span xid="span3"></span></a></div></div></div>
   </div></div>
   <div class="x-panel-bottom" xid="bottom1"><div component="$UI/system/components/justep/button/buttonGroup" class="btn-group pull-right" tabbed="true" xid="buttonGroup1" style="height:100%;">
   <a component="$UI/system/components/justep/button/button" class="btn btn-default" label="确认" xid="okBtn" onClick="okBtnClick" style="border:none;background:#4fc7c5; color:#fff;">
    <i xid="i1"></i>
    <span xid="span1">确认</span></a> 
   <a component="$UI/system/components/justep/button/button" class="btn btn-default" label="取消" xid="noBtn" onClick="noBtnClick" style="border:none;background:#4fc7c5; color:#fff;">
    <i xid="i2"></i>
    <span xid="span2">取消</span></a> </div></div></div>
  <span component="$UI/system/components/justep/windowDialog/windowDialog" xid="serviceDialog" src="./createService.w" status="normal" forceRefreshOnOpen="true" width="50%" height="70%" onReceive="serviceDialogReceive"></span></div>