<?xml version="1.0" encoding="utf-8"?>

<div xmlns="http://www.w3.org/1999/xhtml" xid="window" class="window" component="$UI/system/components/justep/window/window"
  design="device:pc" sysParam="false">  
  <div component="$UI/system/components/justep/model/model" xid="model"/>  
  <div style="overflow:hidden"> 
    <h1 xid="h11" class="text-center"><![CDATA[初始化系统数据库]]></h1>  
    <a component="$UI/system/components/justep/button/button" class="btn btn-primary btn-block clearfix center-block"
      label="初始化系统库" xid="initBtn" onClick="initBtnClick" bind-enable=" $model.initBtnEnabled.get()"> 
      <i xid="i1"/>  
      <span xid="span1">初始化系统库</span> 
    </a> 
  </div> 
</div>
