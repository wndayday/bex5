<?xml version="1.0" encoding="utf-8"?>

<div xmlns="http://www.w3.org/1999/xhtml" xid="window" class="window" component="$UI/system/components/justep/window/window"
  design="device:pc">  
  <div component="$UI/system/components/justep/model/model" xid="model" style="height:auto;width:108px;top:44px;left:1040px;"> 
    <div component="$UI/system/components/justep/reportData/reportData" xid="s1"> 
      <source xid="default1"> 
        <action id="default6" columns="NONUM,INSTANCENAME,SPROCESSNAME,SSTATUSNAME,LONGTIME,LIMITTIME"
          name="processLimitTimeAction" type="action"/> 
      </source> 
    </div> 
    <div component="$UI/system/components/justep/data/data" xid="itemData"
      idColumn="fValue" autoLoad="true"> 
      <column name="fValue" type="String" label="值"/>  
      <column name="fName" type="String" label="显示名称"/>  
      <data xid="default10">[{"fValue":"asc","fName":"正序"},{"fValue":"desc","fName":"倒序"}]</data> 
    </div> 
    <div component="$UI/system/components/justep/data/data" autoLoad="true"
      xid="masterData" idColumn="startDate"> 
      <column label="startDate" name="startDate" type="Date" xid="startDateCol"/>  
      <data xid="default2">[{}]</data>  
      <column label="endDate" name="endDate" type="Date" xid="endDateCol"/>
    </div> 
  </div>  
  <div component="$UI/system/components/bootstrap/tabs/tabs" xid="tabs"> 
    <div class="tab-content" xid="div1"> 
      <div class="tab-pane active" xid="tabContent1"> 
        <div component="$UI/system/components/justep/toolBar/toolBar" class="x-toolbar form-inline x-toolbar-spliter"
          xid="toolBar1"> 
          <a component="$UI/system/components/justep/button/button" class="btn btn-link btn-icon-left"
            onClick="{'operation':'report1.pageSetup'}" xid="button1"> 
            <i xid="i1"/>  
            <span xid="span1"/> 
          </a>  
          <a component="$UI/system/components/justep/button/button" class="btn btn-link btn-icon-left"
            onClick="{'operation':'report1.preview'}" xid="button2"> 
            <i xid="i2"/>  
            <span xid="span2"/> 
          </a>  
          <a component="$UI/system/components/justep/button/button" class="btn btn-link btn-icon-left"
            onClick="{'operation':'report1.print'}" xid="button3"> 
            <i xid="i3"/>  
            <span xid="span3"/> 
          </a>  
          <a component="$UI/system/components/justep/button/button" class="btn btn-link btn-icon-left"
            onClick="{'operation':'report1.exportPDF'}" xid="button4"> 
            <i xid="i4"/>  
            <span xid="span4"/> 
          </a>  
          <a component="$UI/system/components/justep/button/button" class="btn btn-link btn-icon-left"
            onClick="{'operation':'report1.exportWord'}" xid="button5"> 
            <i xid="i5"/>  
            <span xid="span5"/> 
          </a>  
          <a component="$UI/system/components/justep/button/button" class="btn btn-link btn-icon-left"
            onClick="{'operation':'report1.exportExcel'}" xid="button6"> 
            <i xid="i6"/>  
            <span xid="span6"/> 
          </a> 
        </div>  
        <div component="$UI/system/components/bootstrap/row/row" class="row"
          xid="row1"> 
          <div class="col col-xs-1 text-right" xid="col104"> 
            <label style="margin-top:9px">流程类型名称：</label> 
          </div>  
          <div class="col col-xs-2" xid="col105"> 
            <input component="$UI/system/components/justep/input/input" class="form-control"
              xid="processName"/> 
          </div> 
           <div class="col col-xs-1 text-right" xid="col204">
          <label style="margin-top:9px">排序：</label>
        </div> 
         <div class="col col-xs-2" xid="col205">
         <select component="$UI/system/components/justep/select/select" class="form-control input-sm x-edit"
              xid="selectValue" bind-options="itemData" bind-optionsLabel="fName" bind-optionsValue="fValue"/> 
         </div>
        </div>  
        <div component="$UI/system/components/bootstrap/row/row" class="row"
          xid="row2"> 
          <div class="col col-xs-1 text-right" xid="col4"> 
            <label style="margin-top:9px">开始时间：</label> 
          </div>  
          <div class="col col-xs-2" xid="col5"> 
            <input component="$UI/system/components/justep/input/input" class="form-control"
              xid="startDate" bind-ref="masterData.ref(&quot;startDate&quot;)"/> 
          </div>  
          <div class="col col-xs-1 text-right" xid="col6"> 
            <label style="margin-top:9px">结束时间：</label> 
          </div>  
          <div class="col col-xs-2" xid="col7"> 
            <input component="$UI/system/components/justep/input/input" class="form-control"
              xid="endDate" bind-ref="masterData.ref(&quot;endDate&quot;)"/> 
          </div>  
          <div class="col col-xs-2" xid="col8"> 
            <a component="$UI/system/components/justep/button/button" class="btn btn-default"
              label="查询" xid="button12" onClick="searchData"> 
              <i xid="i16"/>  
              <span xid="span16">查询</span> 
            </a> 
          </div> 
        </div>  
        <div component="$UI/system/components/justep/report/report" src="limitTime_xls.xml"
          reportName="report" autoLoad="true" class="x-report x-scroll-h" xid="report1"
          style="height:169px;width:887px;"/> 
      </div> 
    </div> 
  </div> 
</div>
