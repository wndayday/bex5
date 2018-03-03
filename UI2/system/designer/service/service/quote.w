<?xml version="1.0" encoding="utf-8"?>

<div xmlns="http://www.w3.org/1999/xhtml" xid="window" class="window" component="$UI/system/components/justep/window/window"
  design="device:m;">  
  <div component="$UI/system/components/justep/model/model" xid="model"/>  
  <div component="$UI/system/components/justep/panel/panel" class="x-panel x-full"
    xid="panel1"> 
    <div class="x-panel-content" xid="content1" style="overflow:hidden;">
      <div component="$UI/system/components/justep/row/row" class="x-row" xid="row1"> 
        <div class="x-col" xid="col1"> 
          <div component="$UI/system/components/justep/labelEdit/labelEdit"
            class="x-label-edit x-label30" xid="labelEdit1"> 
            <label class="x-label" xid="label1"><![CDATA[应用名称：]]></label>  
            <div component="$UI/system/components/justep/output/output" class="form-control x-edit"
              xid="output1" bind-ref="appName"/>
            <a component="$UI/system/components/justep/button/button" class="btn btn-link btn-only-icon"
              label="button" xid="chooseApp" icon="linear linear-book" onClick="chooseAppClick"> 
              <i xid="i1" class="linear linear-book"/>  
              <span xid="span1"/>
            </a>
          </div>
        </div>  
        <div class="x-col" xid="col2"> 
          <div component="$UI/system/components/justep/labelEdit/labelEdit"
            class="x-label-edit x-label30" xid="labelEdit3"> 
            <label class="x-label" xid="label3"><![CDATA[服务名称：]]></label>  
            <div component="$UI/system/components/justep/output/output" class="form-control x-edit"
              xid="output2" bind-ref="serveName"/>
            <a component="$UI/system/components/justep/button/button" class="btn btn-link btn-only-icon"
              label="button" xid="chooseService" icon="linear linear-book" onClick="chooseServiceClick"> 
              <i xid="i2" class="linear linear-book"/>  
              <span xid="span2"/>
            </a>
          </div>
        </div> 
      </div> 
    <div xid="div1" class="pull-right"> 
        <a component="$UI/system/components/justep/button/button" class="btn btn-default" label="确认" xid="okBtn" onClick="okBtnClick" style="border:none;background:#4fc7c5; color:#fff;margin-right:1.4em;"> 
          <i xid="i1" />  
          <span xid="span1">确认</span> 
        </a>  
        <a component="$UI/system/components/justep/button/button" class="btn btn-default" label="取消" xid="noBtn" onClick="noBtnClick" style="border:none;background:#4fc7c5; color:#fff;"> 
          <i xid="i2" />  
          <span xid="span2">取消</span> 
        </a> 
      </div></div>  
    <div class="x-panel-bottom" xid="bottom1">
    	
    </div>
  </div>  
  <span component="$UI/system/components/justep/windowDialog/windowDialog" xid="filetreeDialog"
    src="$UI/system/designer/service/service/filetree.w" status="normal" width="800px"
    showTitle="true" title="选择文件：" onReceive="filetreeDialogReceive"/>
</div>
