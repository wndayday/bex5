<?xml version="1.0" encoding="utf-8"?>
<div xmlns="http://www.w3.org/1999/xhtml" xid="window" class="window" component="$UI/system/components/justep/window/window" design="device:m;">  
    <div component="$UI/system/components/justep/model/model" xid="model" style="top:57px;left:516px;height:auto;">
	    <div component="$UI/system/components/justep/data/bizData" xid="bizData" 
	    concept="SA_DocNode" limit="8" autoLoad="true"> 
	      <reader xid="default4" action="/system/logic/action/queryDocNodeAction"/>  
	      <writer action="/system/logic/action/saveDocNodeAction"/>  
	      <creator action="/system/logic/action/createDocNodeAction"/> 
	    </div>
    </div>
    <div class="x-panel-top" xid="top1"> 
      <div component="$UI/system/components/justep/titleBar/titleBar" class="x-titlebar"
        xid="titleBar1" title="fileEditor"> 
        <div class="x-titlebar-left" xid="div1"> 
          <a component="$UI/system/components/justep/button/button" class="btn btn-link"
            xid="button2" icon="icon-chevron-left" onClick="backMain"> 
            <i xid="i2" class="icon-chevron-left"/>  
            <span xid="span2"/> 
          </a> 
        </div>  
        <div class="x-titlebar-title" xid="div2">fileEditor</div>  
        <div class="x-titlebar-right reverse" xid="div3"/> 
      </div> 
    </div> 
     <div class="x-panel-content x-flex x-flex-column" xid="content2">
      <h3>fileEditor</h3>  
      <p>fileEditor文件编辑组件</p>  
     </div> 
  <div component="$UI/system/components/justep/attachment/attachmentSimple" actionUrl="/baas/justep/attachment/simpleFileStore" xid="attachmentSimple"  bind-ref="bizData.ref('sDescription')" onEditError="attachmentSimpleEditError" onEdit="attachmentSimpleEdit" onBeforeFileOpen="attachmentSimpleBeforeFileOpen" onAfterEdit="attachmentSimpleAfterEdit" onAfterFileOpen="attachmentSimpleAfterFileOpen">
   <div class="x-attachment" xid="div15">
    <div class="x-attachment-content x-card-border" xid="div16">
     <div class="x-doc-process" xid="div17">
      <div class="progress-bar x-doc-process-bar" role="progressbar" style="width:0%;" xid="progressBar2"></div></div> 
     <div data-bind="foreach:$attachmentItems" xid="div18">
      <div class="x-attachment-cell" xid="div19">
       <div class="x-attachment-item x-item-other" data-bind="click:$model.editFile.bind($model),style:{backgroundImage:($model.previewPicture.bind($model,$object))()}" xid="div20" title="点击打开文件">
        <a data-bind="visible:$model.$state.get() == 'remove'" class="x-remove-barget" xid="a2" ></a></div> </div> </div> 
     <div class="x-attachment-cell" data-bind="visible:$state.get() == 'upload'" xid="div21">
      <div class="x-attachment-item x-item-upload" data-bind="visible:$state.get() == 'upload'" xid="div22"></div></div> 
     <div class="x-attachment-cell" data-bind="visible:$state.get() == 'upload' &amp;&amp; $attachmentItems.get().length &gt; 0" xid="div23">
      <div class="x-attachment-item x-item-remove" data-bind="click:changeState.bind($object,'remove')" xid="div24"></div></div> 
     <div style="clear:both;" xid="div25"></div></div> </div> </div>
     
 <input component="$UI/system/components/justep/input/input" class="form-control" xid="input2" bind-ref='$model.bizData.ref("sDescription")' ></input>
  <a component="$UI/system/components/justep/button/button" class="btn btn-default" label="保存" xid="button1" onClick='{"operation":"bizData.save"}'>
   <i xid="i1"></i>
   <span xid="span1">保存</span></a> 
  </div> 
