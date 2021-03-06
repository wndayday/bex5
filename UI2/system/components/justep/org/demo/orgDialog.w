<?xml version="1.0" encoding="utf-8"?>

<div xmlns="http://www.w3.org/1999/xhtml" component="$UI/system/components/justep/window/window" class="x-flex x-flex-column">  
  <div component="$UI/system/components/justep/model/model" xid="model" style="top:26px;height:auto;left:378px;">
    <div component="$UI/system/components/justep/data/data" xid="OrgData" idColumn="fID">
      <column label="组织ID" name="fID" type="String" xid="default3"/>  
      <column label="名称" name="fName" type="String" xid="default4"/>  
      <column label="全路径" name="fFID" type="String" xid="default5"/>
    </div>
  </div>  
  <span component="$UI/system/components/justep/org/orgDialog" xid="orgDialog"
    style="left:486px;top:145px;" title="选择组织机构" multiSelection="true" onReceive="orgDialogReceive"/>  
  <div component="$UI/system/components/justep/panel/panel" class="x-panel x-full"
    xid="panel1"> 
    <div class="x-panel-top" xid="top1"> 
      <div component="$UI/system/components/justep/titleBar/titleBar" class="x-titlebar"
        xid="titleBar1" title="orgDialog"> 
        <div class="x-titlebar-left" xid="div1"> 
          <a component="$UI/system/components/justep/button/button" class="btn btn-link"
            xid="button4" icon="icon-chevron-left" onClick="closeWin"> 
            <i xid="i3" class="icon-chevron-left"/>  
            <span xid="span3"/> 
          </a> 
        </div>  
        <div class="x-titlebar-title" xid="div2">orgDialog</div>  
        <div class="x-titlebar-right reverse" xid="div3"/> 
      </div> 
    </div>  
    <div class="x-panel-content" xid="content1"> 
      <div component="$UI/system/components/justep/controlGroup/controlGroup"
        class="x-control-group x-flex x-flex-column x-flex1" xid="controlGroup1"> 
          <h3>orgDialog
          <a component="$UI/system/components/justep/button/button" class="btn btn-link"
            label="源码" xid="button2" onClick="showOrgDialogSource"> 
            <i xid="i1"/>  
            <span xid="span1">源码</span> 
          </a>  
          <a component="$UI/system/components/justep/button/button" class="btn btn-link"
            label="js" xid="button3" onClick="showJsSource"> 
            <i xid="i2"/>  
            <span xid="span2">js</span> 
          </a> 
          </h3>
        <a component="$UI/system/components/justep/button/button" class="btn btn-default btn-block"
          label="选择组织..." xid="button1" onClick="button1Click" icon="icon-android-search"> 
          <i class="icon-android-search"/>  
          <span>选择组织...</span> 
        </a>  
        <div xid="div6">
          <label xid="label1" style="margin:6px 6px 6px 6px;"><![CDATA[选择结果：]]></label>
        </div>  
        <div class="x-list" component="$UI/system/components/justep/list/list"
          data="OrgData" disablePullToRefresh="false" disableInfiniteLoad="false"
          xid="list1"> 
          <div class="x-list-template" xid="listTemplateDiv1"> 
            <div align="center" style="float: left;margin-right: 6px;" xid="div5"> 
              <div class="x-blob x-blob-radius" component="$UI/system/components/justep/org/orgImage"
                style="height:64px;width:64px;" xid="orgImage1" bind-ref="ref('fFID')"> 
                <div class="x-blob-bar" xid="div4"> 
                  <i class="x-blob-edit icon-compose" xid="i5"/>  
                  <i class="x-blob-del icon-close-round" xid="i4"/>
                </div>  
                <img class="x-blob-img x-autofill" xid="image1"/>
              </div>  
              <span bind-text="ref('fName')" xid="span4"/>
            </div> 
          </div> 
        </div> 
      </div> 
    </div> 
  </div>  
  <span component="$UI/system/components/justep/windowDialog/windowDialog" xid="windowDialog"
    src="$UI/system/components/justep/common/demo/dialog.w" style="left:522px;top:145px;"/> 
</div>
