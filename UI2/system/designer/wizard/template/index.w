<?xml version="1.0" encoding="utf-8"?>

<div xmlns="http://www.w3.org/1999/xhtml" component="$UI/system/components/justep/window/window" xid="window" class="window">  
  <div component="$UI/system/components/justep/model/model" xid="model" style="height:auto;top:86px;left:225px;"
    onLoad="modelLoad"> 
    <div component="$UI/system/components/justep/data/data" autoLoad="true"
      xid="stepData" idColumn="id" onIndexChanging="stepDataIndexChanging"> 
      <column label="ID" name="id" type="String" xid="xid2"/>  
      <column isCalculate="false" label="步骤" name="step" type="String" xid="xid1"/>  
      <data xid="default1">[{"id":"selection","step":"选择模板"},{"id":"configuration","step":"模板配置"},{"id":"filename","step":"功能确认"}]</data>
    </div> 
  </div>  
  <div component="$UI/system/components/justep/panel/panel" class="x-panel x-full"
    xid="panel1"> 
    <div class="x-panel-top" xid="top1" height="48"> 
      <!--
      <nav class="navbar navbar-default " role="navigation"> 
         <a class="navbar-brand" bind-text="$model.title"/> 
       </nav>  
 -->  
      <div component="$UI/system/components/justep/list/list" class="x-list"
        xid="list1" data="stepData"> 
        <ul class="x-list-template" xid="listTemplateUl1"> 
          <li xid="li1" class="pull-left text-center"> 
            <div xid="div1" class="o-point" bind-css="{'x-currentRowPoint': $model.stepData.currentRow.get()==$object}"/>  
            <div xid="div2" class="o-line" bind-visible="$index()&lt;2" bind-css="{'x-currentRowLine': $model.stepData.currentRow.get()==$object}"/>
            <span xid="span1" bind-text="val(&quot;step&quot;)" bind-css="{'x-currentRow': $model.stepData.currentRow.get()==$object}"
              class="text-block"/>
          </li> 
        </ul> 
      </div> 
    </div>  
    <div class="x-panel-content" xid="content1"> 
      <div xid="composeParent" class="composeParent"/> 
    </div>  
    <div class="x-panel-bottom" xid="bottom1" height="48"> 
      <!--       <nav class="navbar navbar-default" role="navigation"> 
        <div class="navbar-buttons-container"></div> 
      </nav>  
 -->  
      <a component="$UI/system/components/justep/button/button" class="btn btn-link x-dialog-button"
        bind-css="{hide: !$model.hasCancelBtn.get()}" onClick="cancelBtnClick" xid="cancelBtn"
        label="取消"> 
        <i/>  
        <span>取消</span> 
      </a>  
      <a component="$UI/system/components/justep/button/button" class="btn btn-default x-dialog-button"
        bind-css="{hide: !$model.hasFinishBtn.get()}" onClick="finishBtnClick" xid="finishBtn"
        label="完成"> 
        <i/>  
        <span>完成</span> 
      </a>
      <a component="$UI/system/components/justep/button/button" class="btn btn-default x-dialog-button"
        bind-css="{hide: !$model.hasNextBtn.get()}" onClick="nextBtnClick" xid="nextBtn"
        label="下一步"> 
        <i/>  
        <span>下一步</span> 
      </a>
      <a component="$UI/system/components/justep/button/button" class="btn btn-link x-dialog-button"
        bind-css="{hide: !$model.hasBackBtn.get()}" onClick="backBtnClick" xid="backBtn"
        label="上一步"> 
        <i/>  
        <span>上一步</span> 
      </a>
      <div xid="div3" bind-visible="$model.title.get() == '选择模板'">
        <a component="$UI/system/components/justep/button/button" class="btn btn-link btn-only-icon"
          label="button" xid="downloadBtn" icon="linear linear-bus" onClick="downloadBtnClick"> 
          <i xid="i1" class="linear linear-bus h4"/>  
          <span xid="span2"/> 
        </a>
        <a component="$UI/system/components/justep/button/button" class="btn btn-link btn-only-icon"
          label="button" xid="updateBtn" icon="linear linear-redo" onClick="updateBtnClick"> 
          <i xid="i3" class="linear linear-redo h4"/>  
          <span xid="span3"/> 
        </a>
      </div>  
      <input component="$UI/system/components/justep/input/input" xid="fileName"
        style="display:none;"/> 
    </div> 
  </div>  
  <link rel="stylesheet" href="../common/common.css"/>  
  <span component="$UI/system/components/justep/windowDialog/windowDialog" xid="propEditorDlg"
    style="position:absolute;left:138px;top:364px;" src="$UI/system/designer/webIde/editors/index/index.w"
    title="属性编辑" status="normal" width="800" height="600" onReceived="editorDlgReceived"
    showTitle="true" resizable="true" forceRefreshOnOpen="true"/>  
  <span component="$UI/system/components/justep/windowDialog/windowDialog" xid="downloadDialog"
    title="下载模板" showTitle="true" status="normal" forceRefreshOnOpen="true" width="80%"
    height="80%" src="$UI/system/designer/webIde/quickIde/addComponent.w" onReceive="downloadDialogReceive"/>  
  <span component="$UI/system/components/justep/windowDialog/windowDialog" xid="updateDialog"
    showTitle="true" status="normal" forceRefreshOnOpen="true" width="80%" height="80%"
    src="$UI/system/designer/webIde/quickIde/componentUpdate.w" title="更新模板" onReceive="updateDialogReceive"/>
</div>
