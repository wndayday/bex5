<?xml version="1.0" encoding="utf-8"?>

<div xmlns="http://www.w3.org/1999/xhtml" class="window" component="$UI/system/components/justep/window/window"
  style="position:relative;-moz-user-select:none;-webkit-user-select:none;user-select:none;padding:0;margin:0;height:100%;width:100%;overflow:hidden;"
  xid="window">  
  <div component="$UI/system/components/justep/model/model" onLoad="model1Load"
    style="position:absolute;height:auto;left:341px;top:432px;" xid="model1"> 
    <div autoLoad="true" component="$UI/system/components/justep/data/data"
      onCreate="{operation:'data1.newChild'}" xid="data1"/> 
  </div>  
  <span component="$UI/system/components/justep/windowDialog/windowDialog" xid="compileDlg"
    src="$UI/system/designer/baas/compile/compileDialog.w" title="编译BaaS模型" status="normal"
    forceRefreshOnOpen="true" style="top:114px;left:77px;"/>
  <div class="pc-ui border-box-sizing" style=";height:100%"> 
    <div class="pc-ui-title"/>  
    <div class="border-box-sizing" style="position:relative;  height:100%;width:100%;overflow:hidden;"> 
      <div class="pc-ui-content border-box-sizing" style="width:100%;height:100%;overflow:hidden;border:0px solid blue;"
        xid="designerContainer"> 
        <div class="panel panel-default o-layerPanel" component="$UI/system/components/bootstrap/panel/panel"
          xid="panel1"> 
          <div class="panel-heading" xid="heading1"> 
            <h4 class="panel-title pull-left" style="margin-top:8px;margin-right:20px; display:none;"
              xid="h41"><![CDATA[后端服务]]></h4>  
            <div xid="div8" class="o-line pull-left"></div><div class="o-tools pull-left"> 
              <a class="btn btn-link btn-icon-left " component="$UI/system/components/justep/button/button"
                icon="icon-document-text" label="新建" onClick="newBtnClick" xid="newBtn"> 
                <i class="icon-document-text" xid="i1"/>  
                <span xid="span3">新建</span> 
              </a>  
              <a component="$UI/system/components/justep/button/button" class="btn btn-link btn-icon-left "
                label="上传" xid="uploadBtn" onClick="uploadBtnClick" icon="icon-ios7-cloud-upload-outline"> 
                <i xid="i5" class="icon-ios7-cloud-upload-outline"/>  
                <span xid="span7">上传</span>
              </a>
              <a bind-enable="isModified" class="btn btn-link btn-icon-left "
                component="$UI/system/components/justep/button/button" icon="glyphicon glyphicon-floppy-save"
                label="保存" onClick="saveBtnClick" xid="saveBtn"> 
                <i class="glyphicon glyphicon-floppy-save" xid="i3"/>  
                <span xid="span6">保存</span> 
              </a>  
              <a class="btn btn-link btn-icon-left " component="$UI/system/components/justep/button/button"
                label="编译模型" xid="compileBtn" onClick="compileBtnClick" icon="icon-social-buffer"
                bind-disable="isModified"> 
                <i xid="i2" class="icon-social-buffer"/>  
                <span xid="span1"><![CDATA[编译模型]]></span> 
              </a> 
            </div>  
            <div xid="div1" class="o-line pull-left"></div><div xid="div2" class="pull-right o-page"><a class="btn btn-link" component="$UI/system/components/justep/button/button" label="界面设计" onClick="uiBtnClick" xid="uiBtn">
   <i xid="i6"></i>
   <span xid="span8">界面设计</span></a>
  <a component="$UI/system/components/justep/button/button" class="btn btn-link active" label="后端服务" xid="button1">
   <i xid="i4"></i>
   <span xid="span2">后端服务</span></a>
  <a class="btn btn-link" component="$UI/system/components/justep/button/button" label="数据库" onClick="dbBtnClick" xid="dbBtn">
   <i xid="i7"></i>
   <span xid="span9">数据库</span></a>
  <a class="btn btn-link" component="$UI/system/components/justep/button/button" label="移动应用" onClick="appBtnClick" xid="appBtn">
   <i xid="i8"></i>
   <span xid="span10">移动应用</span></a></div></div>  
          <div class="panel-body " xid="body1"> 
            <div class="o-resourceTreeContainer"> 
              <div class="border-box-sizing o-resourceTreeContainerInner"> 
                <div class="o-treeHead"> 
                  <div xid="div10" class="o-treeTitle">
   <span xid="span12">资源管理</span>
   <a title="隐藏资源树" component="$UI/system/components/justep/button/button" class="btn btn-link btn-sm btn-only-icon pull-right" label="button" xid="hideResourceTreeBtn" style="display:none;">
   <i xid="i12" class="minimize"></i>
   <span xid="span14"></span></a></div><input class="form-control input-sm tree-search-input" component="$UI/system/components/justep/input/input"
                    placeholder="搜索" type="text" xid="input3"/> 
                </div>  
                <div class="resource-tree" xid="pageTree"></div> 
              </div> 
            </div>  
            <div xid="composeParent" class="o-documentArea"></div> 
          </div>  
          <div class="panel-footer" xid="footer1"> 
            <label bind-click="currentFileLabelClick" title="点击可在资源树上定位到文件" xid="currentFileLabel" style="display:inline-block;"> <![CDATA[当前文件]]> </label> 
          </div> 
        </div> 
      </div> 
    </div> 
  </div>  
  <span component="$UI/system/components/justep/windowDialog/windowDialog" height="320px"
    onReceive="newDlgReceive" showTitle="true" src="$UI/system/designer/baas/main/newDialog.w"
    status="normal" width="420px" xid="newDlg" title="创建新服务" style="top:116px;left:28px;"/> 
</div>
