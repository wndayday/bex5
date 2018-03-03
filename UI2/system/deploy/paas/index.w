<?xml version="1.0" encoding="utf-8"?>

<div xmlns="http://www.w3.org/1999/xhtml" component="$UI/system/components/justep/window/window" xid="window" class="window"
  sysParam="false">  
  <div component="$UI/system/components/justep/model/model" xid="model" style="height:auto;top:55px;left:561px;"
    onLoad="modelLoad" onParamsReceive="modelParamsReceive"/>  
  <div component="$UI/system/components/justep/panel/panel" class="x-panel x-full o-containerParentApp"
    xid="panel1"> 
    <div class="x-panel-top" xid="top1" height="56"> 
      <nav class="navbar navbar-default " role="navigation"> 
        <a class="navbar-brand" bind-text="$model.title"/> 
      </nav> 
    </div>  
    <div class="x-panel-content" xid="content1"> 
      <div xid="containerParentPaas"/> 
    </div>  
    <div class="x-panel-bottom" xid="bottom1" height="60" style="padding-top: 4px;"> 
      <nav class="navbar navbar-default" role="navigation"> 
        <div class="navbar-buttons-container"> 
          <div class="btn-group-single pull-right" style="display:inline-block"> 
            <a component="$UI/system/components/justep/button/button" class="btn btn-default btn-dialog-back"
              bind-css="{hide: !$model.hasDownloadBtn.get()}" onClick="downloadBtnClick"
              xid="downloadBtn" label="部署信息"> 
              <i/>  
              <span>部署信息</span> 
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
