<?xml version="1.0" encoding="utf-8"?>

<div xmlns="http://www.w3.org/1999/xhtml" xid="window" class="window" component="$UI/system/components/justep/window/window"
  design="device:m;">  
  <div component="$UI/system/components/justep/model/model" xid="model" style="height:auto;top:43px;left:599px;"> 
    <div component="$UI/system/components/justep/code/code" style="display:none;"
      xid="code2"> 
      <model style="display:none;" xid="default1"/>  
      <diagram style="display:none;" xid="default2"/>
    </div>  
    <div component="$UI/system/components/justep/code/code" style="display:none;"
      xid="code3"> 
      <model style="display:none;" xid="default3"/>  
      <diagram style="display:none;" xid="default4"/>
    </div>
    <div component="$UI/system/components/justep/code/code" xid="code1"/>
  </div>  
  <a component="$UI/system/components/justep/button/button" class="btn btn-default"
    label="call code test" xid="button1" onClick="{operation:'test.exec',args:{a:90,b:'bbb'}}"> 
    <i xid="i1"/>  
    <span xid="span1">call code test</span> 
  </a> 
</div>
