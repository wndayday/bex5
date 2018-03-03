<?xml version="1.0" encoding="utf-8"?>

<div xmlns="http://www.w3.org/1999/xhtml" xid="window" class="window" component="$UI/system/components/justep/window/window"
  design="device:pc">  
  <div component="$UI/system/components/justep/model/model" xid="model" onLoad="modelLoad"
    style="height:auto;top:179px;left:380px;"> 
    <div component="$UI/system/components/justep/data/data" autoLoad="true"
      xid="appData" idColumn="path" onCustomRefresh="appDataCustomRefresh" confirmRefresh="false" > 
      <column label="应用" name="path" type="String" xid="default4"/>  
      
    </div> 
    
  </div>  
  <span component="$UI/system/components/justep/windowDialog/windowDialog" xid="devDialog"
    src="$UI/SA/ide/process/ide/devActivityImpl.w" forceRefreshOnOpen="true" onClose="devDialogClose"
    showTitle="false" width="100%" height="100%" style="top:205px;left:130px;"/>  
  <div xid="view"> 
    <div component="$UI/system/components/justep/toolBar/toolBar" class="x-toolbar form-inline x-toolbar-spliter"
      xid="bar"> 
      <a component="$UI/system/components/justep/button/button" class="btn btn-link btn-icon-left"
        label="新建项目" xid="newBtn" icon="round round-plus" onClick="newBtnClick"> 
        <i xid="i3" class="round round-plus"/>  
        <span xid="span3">新建项目</span> 
      </a>  
      <!-- 
      <a component="$UI/system/components/justep/button/button" class="btn btn-link btn-icon-left"
        label="复制新建项目" xid="copyNewBtn" icon="dataControl dataControl-file"> 
        <i xid="i4" class="dataControl dataControl-file"/>  
        <span xid="span4">复制新建项目</span> 
      </a> 
       --> 
      <a component="$UI/system/components/justep/button/button" class="btn btn-link btn-icon-left"
        label="编辑项目" xid="editBtn" icon="round round-edit" onClick="editBtnClick"> 
        <i xid="i5" class="round round-edit"/>  
        <span xid="span5">编辑项目</span> 
      </a>  
      <a component="$UI/system/components/justep/button/button" class="btn btn-link btn-icon-left"
        label="删除项目" xid="deleteBtn" icon="round round-close" onClick="deleteBtnClick"> 
        <i xid="i6" class="round round-close"/>  
        <span xid="span6">删除项目</span> 
      </a>  
      <a component="$UI/system/components/justep/button/button" class="btn btn-link btn-icon-left"
        label="刷新" xid="refreshBtn" icon="round round-update" onClick='{"operation":"appData.refresh"}'> 
        <i xid="i7" class="round round-update"/>  
        <span xid="span7">刷新</span> 
      </a> 
    </div>  
   
        <div component="$UI/system/components/justep/dataTables/dataTables" 
          flexibleWidth="true" class="table table-hover table-striped" xid="appList"
          data="appData" rowActiveClass="active" ordering="false"> 
          <columns xid="columns1"> 
            <column name="path" xid="column9"/>  
           
          </columns> 
        </div>
       
    
  </div> 
<span component="$UI/system/components/justep/windowDialog/windowDialog" xid="createAppDialog" src="$UI/SA/ide/process/ide/dialog/createApp.w" title="创建应用" onReceive="createAppDialogReceive" status="normal" showTitle="true" width="500px" height="300px"></span></div>
