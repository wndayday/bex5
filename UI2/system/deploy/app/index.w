<?xml version="1.0" encoding="utf-8"?>

<div xmlns="http://www.w3.org/1999/xhtml" component="$UI/system/components/justep/window/window" xid="window" class="window">  
  <div component="$UI/system/components/justep/model/model" xid="model" style="height:auto;top:55px;left:561px;"
    onLoad="modelLoad"/>  
  <div component="$UI/system/components/justep/panel/panel" class="x-panel x-full o-containerParentApp"
    xid="panel1"> 
    <div class="x-panel-top" xid="top1" height="56"> 
      <nav class="navbar navbar-default" role="navigation"> 
        <a class="navbar-brand" bind-text="$model.title"/> 
      </nav> 
    </div>
    <div class="x-panel-content" xid="content1"> 
      <div xid="containerParentApp"/> 
    </div>  
    <div class="x-panel-bottom" xid="bottom1"> 
      <nav class="navbar navbar-default" role="navigation"> 
        <div class="navbar-buttons-container"> 
          <span style="display:inline-block;width:60px;"><![CDATA[应用名：]]></span>  
          <input component="$UI/system/components/justep/input/input" class="form-control"
            style="width:240px;display:inline" xid="appName" value="mainActivity"/>
          <a component="$UI/system/components/justep/button/button" class="btn btn-link btn-only-label btn-dialog-senior"
              bind-css="{hide: !$model.hasSimpleBtn.get()}" xid="simpleBtn" label="简洁模式"
              onClick="simpleBtnClick"> 
              <i xid="i7"/>  
              <span xid="span1">简洁模式</span> 
            </a>
          <div xid="dropMenu" class="dropup" style="display:inline"/>  
          <div class="btn-group-single pull-right" style="display:inline-block"> 
              
            <a component="$UI/system/components/justep/button/button" class="btn btn-default btn-dialog-back"
              bind-css="{hide: !$model.hasSkipEditBtn.get()}" onClick="skipEditBtnClick"
              xid="skipEditBtn" label="直接打包"> 
              <i xid="i1"/>  
              <span xid="span1">直接打包</span> 
            </a>  
            <a component="$UI/system/components/justep/button/button" class="btn btn-default btn-dialog-back"
              bind-css="{hide: !$model.hasBackBtn.get()}" onClick="backBtnClick" xid="backBtn"
              label="上一步"> 
              <i/>  
              <span>上一步</span> 
            </a>  
            <a component="$UI/system/components/justep/button/button" class="btn btn-primary btn-dialog-next"
              bind-css="{hide: !$model.hasNextBtn.get()}" onClick="nextBtnClick" xid="nextBtn"
              label="下一步"> 
              <i/>  
              <span>下一步</span> 
            </a>  
            <a component="$UI/system/components/justep/button/button" class="btn btn-primary btn-dialog-finish"
              bind-css="{hide: !$model.hasFinishBtn.get()}" onClick="finishBtnClick"
              xid="finishBtn" label="完成"> 
              <i/>  
              <span>完成</span> 
            </a>  
            <a component="$UI/system/components/justep/button/button" class="btn btn-default btn-dialog-cancel"
              bind-css="{hide: !$model.hasCancelBtn.get()}" onClick="cancelBtnClick"
              xid="cancelBtn" label="取消"> 
              <i/>  
              <span>取消</span> 
            </a> 
          </div> 
        </div> 
      </nav> 
    </div> 
  </div>  
  <link rel="stylesheet" href="../common/common.css"/> 
</div>
