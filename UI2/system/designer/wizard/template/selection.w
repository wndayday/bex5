<?xml version="1.0" encoding="utf-8"?>

<div xmlns="http://www.w3.org/1999/xhtml" component="$UI/system/components/justep/window/window" class="window">  
  <div component="$UI/system/components/justep/model/model" xid="model" style="height:auto;top:34px;left:522px;"
    onLoad="modelLoad"/>  
  <div xid="index" style="height:100%;" class="container-fluid"> 
    <div class="row" style="height:100%;"> 
      <div class="col-xs-4 scroll o-nopadding" style="height:100%;"> 
        <div class="nav-container scroll" style="border: none; " id="jqxTree"/> 
      </div>
      <div class="col-xs-8 scroll" id="descriptionDiv" style="height:100%;"> 
        <!--         <div bind-css="{hide: !$model.templateSelected.get()}" style="padding-right:12px"> 
          <h4 id="templateDesc" style="margin-top:12px;"/>  
          <div id="imgWindow" style="margin-top:12px;"> 
            <div id="container"> 
              <div id="imgContainer"/> 
            </div> 
          </div>  
          <a class="lr-btn arrow-left" bind-mousedown="leftMousedown"/>  
          <a class="lr-btn arrow-right" bind-mousedown="rightMousedown"/> 
        </div> -->  
        <div component="$UI/system/components/justep/panel/panel" class="x-panel x-full"
          xid="panel2"> 
          <div class="x-panel-top" xid="top2" style="padding-left:15px;"> 
            <div bind-css="{hide: $model.templateSelected.get()}" style="margin-top:12px;font-size:x-large;">请选择一个模版</div>
            <h4 bind-css="{show: $model.templateSelected.get()}" id="templateDesc"
              style="margin-top:12px;" bind-visible="$model.templateSelected.get()"/>
          </div>  
          <div class="x-panel-content panel-body" xid="content5">
            <div component="$UI/system/components/bootstrap/carousel/carousel"
              class="x-carousel" xid="carousel2" auto="true" bind-visible="$model.templateSelected.get()"> 
              <ol class="carousel-indicators" xid="ol2"/>  
              <div class="x-contents carousel-inner" role="listbox" component="$UI/system/components/justep/contents/contents"
                active="0" slidable="true" wrap="true" swipe="true" routable="false"
                xid="contents2"> 
                <div class="x-contents-content" xid="content2">
                  <img src="" alt="" xid="image1" style="display:block; margin:0 auto;"/>
                </div>  
                <!-- <div class="x-contents-content" xid="content3"/> -->
              </div>  
              <a class="left carousel-control" role="button" xid="a3" bind-visible="$model.showArrow"> 
                <span class="glyphicon glyphicon-chevron-left" aria-hidden="true"
                  xid="span5"/>  
                <span class="sr-only" xid="span6">Previous</span>
              </a>  
              <a class="right carousel-control" role="button" xid="a4" bind-visible="$model.showArrow"> 
                <span class="glyphicon glyphicon-chevron-right" aria-hidden="true"
                  xid="span7"/>  
                <span class="sr-only" xid="span8">Next</span>
              </a> 
            </div>
          </div> 
        </div>
      </div> 
    </div> 
  </div> 
</div>
