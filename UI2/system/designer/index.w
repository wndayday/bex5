<?xml version="1.0" encoding="utf-8"?>

<div xmlns="http://www.w3.org/1999/xhtml" component="$UI/system/components/justep/window/window">  
  <div component="$UI/system/components/justep/model/model" style="top:217px;left:780px;height:auto;"
    xid="model" onLoad="{&quot;operation&quot;:&quot;shell.showPage&quot;,&quot;args&quot;:{&quot;url&quot;:&quot;js:\&quot;ui\&quot;&quot;}}"> 
    <div component="$UI/system/components/justep/shell/shellImpl" contentsXid="pages"
      xid="shellImpl"> 
      <mapping name="ui" url="$UI/system/designer/webIde/main/main.w"/>  
      <mapping name="baas" url="$UI/system/designer/baas/main/main.w"/>  
      <mapping name="db" url="$UI/system/designer/db/index.w"/>  
      <mapping name="app" url="$UI/system/deploy/index.w"/> 
    </div>  
    <div component="$UI/system/components/justep/shell/shell" xid="shell"/> 
  </div>  
  <div class="x-panel x-full" component="$UI/system/components/justep/panel/panel"
    xid="panel1"> 
    <div class="x-panel-content" xid="content1"> 
      <div active="0" class="x-contents x-full" component="$UI/system/components/justep/contents/contents"
        xid="pages"/> 
    </div> 
  </div> 
</div>
