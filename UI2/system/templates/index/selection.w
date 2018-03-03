<?xml version="1.0" encoding="utf-8"?>

<div xmlns="http://www.w3.org/1999/xhtml" component="$UI/system/components/justep/window/window" class="window">  
  <div component="$UI/system/components/justep/model/model" xid="model" style="height:auto;top:34px;left:522px;"
    onLoad="modelLoad"/>  
  <div xid="index" style="height:100%;" class="container-fluid"> 
    <div class="row" style="height:100%;"> 
      <div class="col-xs-4 scroll" style="height:100%;"> 
        <div class="nav-container scroll" style="border: none;" id="jqxTree"/> 
      </div>  
      <div class="col-xs-8 scroll" id="descriptionDiv" style="height:100%;"> 
        <div bind-css="{hide: $model.templateSelected.get()}" style="margin-top:12px;font-size:x-large;">请选择一个模版</div>
        <div bind-css="{hide: !$model.templateSelected.get()}" style="padding-right:12px"> 
          <h4 id="templateDesc" style="margin-top:12px;"/>  
          <div id="imgWindow" style="margin-top:12px;"> 
            <div id="container"> 
              <div id="imgContainer"/> 
            </div> 
          </div>  
          <a class="lr-btn arrow-left" bind-mousedown="leftMousedown"/>  
          <a class="lr-btn arrow-right" bind-mousedown="rightMousedown"/> 
        </div>
      </div> 
    </div> 
  </div> 
</div>
