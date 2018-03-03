<?xml version="1.0" encoding="utf-8"?>

<div xmlns="http://www.w3.org/1999/xhtml" component="$UI/system/components/justep/window/window" style="position:relative;-moz-user-select:none;-webkit-user-select:none;user-select:none;padding:0;margin:0;height:100%;width:100%;overflow:hidden;"
  xid="window" class="window">  
  <div component="$UI/system/components/justep/model/model" xid="model" style="position:absolute;height:auto;left:116px;top:456px;"
    onLoad="modelLoad" onActive="modelActive"/>  
  <div class="pc-ui border-box-sizing" style="height:100%;"> 
    <div class="pc-ui-title"/>  
    <div style="position:relative;  height:100%;width:100%;overflow:hidden;"
      class="border-box-sizing"> 
      <div class="pc-ui-content border-box-sizing" xid="appContainer" style="width:100%;height:100%;overflow:hidden;border:0px solid blue;"> 
        <div component="$UI/system/components/bootstrap/panel/panel"
          xid="panel1" class="o-dbFrame"> 
          <div xid="bodyOfDB" style="padding:2px;position:relative;height:100%;" class="panel-body"> 
            <div xid="composeParent"> 
              <div xid="dbContainer" style="overflow:hidden;height:100%;"/> 
            </div> 
          </div>  
          </div> 
      </div> 
    </div> 
  </div> 
</div>
