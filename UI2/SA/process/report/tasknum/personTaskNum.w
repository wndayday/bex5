<?xml version="1.0" encoding="utf-8"?>

<div xmlns="http://www.w3.org/1999/xhtml" xid="window" class="window" component="$UI/system/components/justep/window/window"
  design="device:pc">  
  <div component="$UI/system/components/justep/model/model" xid="model" onLoad="modelLoad" onActive="modelActive" style="height:90px;top:84px;left:964px;width:158px;"> 
    <div component="$UI/system/components/justep/data/bizData" autoLoad="true" xid="loadData" concept="SA_OPPerson">
    <reader xid="default16" action="/system/logic/action/queryTaskNumAction"></reader>
    </div>
        <div component="$UI/system/components/justep/data/data" autoLoad="true"
      xid="masterData" idColumn="startDate"> 
      <column label="startDate" name="startDate" type="Date" xid="default100"/>  
      <data xid="default2">[{}]</data>  
      <column label="endDate" name="endDate" type="Date" xid="xid1"/> 
    </div> 
  <div component="$UI/system/components/justep/reportData/reportData" xid="pie1">
   <source xid="default18"><action xid="default20" name="personPieChartAction" columns="PERSONNAME,TASKNUM" type="action"></action></source></div>
  <div component="$UI/system/components/justep/reportData/reportData" xid="bar2">
   <source xid="default19"><action xid="default21" name="personBarVChartAction" columns="PERSONNAME,DEPTNAME,TASKNUM,NONUM" type="action"></action></source></div></div> 
  
  <div component="$UI/system/components/bootstrap/tabs/tabs" xid="tabs"> 
    <ul class="nav nav-tabs" xid="tabNav1"> 
      <li class="active" xid="li101"> 
        <a content="tabContent1" xid="tabItem1"><![CDATA[饼图]]></a> 
      </li>  
      <li role="presentation" xid="li102"> 
        <a content="tabContent2" xid="tabItem2" bind-click="tabItem2Click">柱状图</a> 
      </li>  
      <li role="presentation" xid="li3"> 
        <a content="tabContent3" xid="tabItem3" bind-click="tabItem3Click">报表</a> 
      </li>
       <li role="presentation" xid="li4"> 
        <a content="tabContent4" xid="tabItem4" bind-click="tabItem4Click">列表</a> 
      </li> 
    </ul> 
      <div class="tab-content" xid="div1"> 
      <div class="tab-pane active" xid="tabContent1"> 
        <div component="$UI/system/components/justep/toolBar/toolBar" class="x-toolbar form-inline x-toolbar-spliter"
          xid="toolBar3"> 
          <a component="$UI/system/components/justep/button/button" class="btn btn-link btn-icon-left"
            onClick="{'operation':'chart1.pageSetup'}" xid="button31"> 
            <i xid="i31"/>  
            <span xid="span31"/> 
          </a>  
          <a component="$UI/system/components/justep/button/button" class="btn btn-link btn-icon-left"
            onClick="{'operation':'chart1.preview'}" xid="button32"> 
            <i xid="i32"/>  
            <span xid="span32"/> 
          </a>  
          <a component="$UI/system/components/justep/button/button" class="btn btn-link btn-icon-left"
            onClick="{'operation':'chart1.print'}" xid="button33"> 
            <i xid="i33"/>  
            <span xid="span33"/> 
          </a>  
          <a component="$UI/system/components/justep/button/button" class="btn btn-link btn-icon-left"
            onClick="{'operation':'chart1.exportPDF'}" xid="button34"> 
            <i xid="i34"/>  
            <span xid="span34"/> 
          </a>  
          <a component="$UI/system/components/justep/button/button" class="btn btn-link btn-icon-left"
            onClick="{'operation':'chart1.exportWord'}" xid="button35"> 
            <i xid="i35"/>  
            <span xid="span35"/> 
          </a>  
          <a component="$UI/system/components/justep/button/button" class="btn btn-link btn-icon-left"
            onClick="{'operation':'chart1.exportExcel'}" xid="button36"> 
            <i xid="i36"/>  
            <span xid="span36"/> 
          </a> 
        </div>  
        <div component="$UI/system/components/bootstrap/row/row" class="row"
          xid="rowww1"> 
          <div class="col col-xs-1 text-right" xid="colww4"> 
            <label style="margin-top:9px">部门：</label> 
          </div>  
          <div class="col col-xs-2" xid="wwcol105"> 
            <input component="$UI/system/components/justep/input/input" class="form-control"
              xid="pdeptName"/> 
          </div>  
          <div class="col col-xs-1 text-right" xid="colww6"> 
            <label style="margin-top:9px">人员：</label> 
          </div>  
          <div class="col col-xs-2" xid="wwcol7"> 
            <input component="$UI/system/components/justep/input/input" class="form-control"
              xid="ppersonName"/> 
          </div> 
        </div>  
        <div component="$UI/system/components/bootstrap/row/row" class="row"
          xid="roww2"> 
          <div class="col col-xs-1 text-right" xid="colw4"> 
            <label style="margin-top:9px">开始时间：</label> 
          </div>  
          <div class="col col-xs-2" xid="colw5"> 
            <input component="$UI/system/components/justep/input/input" class="form-control"
              xid="pstartDate" bind-ref="masterData.ref(&quot;startDate&quot;)"/> 
          </div>  
          <div class="col col-xs-1 text-right" xid="colw6"> 
            <label style="margin-top:9px">结束时间：</label> 
          </div>  
          <div class="col col-xs-2" xid="colw7"> 
            <input component="$UI/system/components/justep/input/input" class="form-control"
              xid="pendDate" bind-ref="masterData.ref(&quot;endDate&quot;)"/> 
          </div>  
          <div class="col col-xs-2" xid="colw8"> 
            <a component="$UI/system/components/justep/button/button" class="btn btn-default"
              label="查询" xid="buttonp2" onClick="psearchData"> 
              <i xid="iw6"/>  
              <span xid="spanw6">查询</span> 
            </a> 
          </div> 
        </div>  
        <div component="$UI/system/components/justep/chart/chart" chart-name="chart"
          autoLoad="true" data-list="" xid="chart1" style="height:289px;width:566px;"> 
          <chart xid="chart2"> 
            <config xid="default6"> 
              <title xid="default3" visible="false" position="TOP"></title> 
            </config>  
            <series-set xid="series-set1"> 
              <series xid="chartSeries1" chart-type="pie" name="piechart"> 
                <data categoryAxis="PERSONNAME" numberAxis="TASKNUM" ref="pie1"
                  xid="default8"/>  
                <config xid="default9"/> 
              </series> 
            </series-set> 
          </chart> 
        </div> 
      </div>  
      <div class="tab-pane" xid="tabContent2"> 
        <div component="$UI/system/components/justep/toolBar/toolBar" class="x-toolbar form-inline x-toolbar-spliter"
          xid="toolBar2"> 
          <a component="$UI/system/components/justep/button/button" class="btn btn-link btn-icon-left"
            onClick="{'operation':'chart3.pageSetup'}" xid="button21"> 
            <i xid="i21"/>  
            <span xid="span21"/> 
          </a>  
          <a component="$UI/system/components/justep/button/button" class="btn btn-link btn-icon-left"
            onClick="{'operation':'chart3.preview'}" xid="button22"> 
            <i xid="i22"/>  
            <span xid="span22"/> 
          </a>  
          <a component="$UI/system/components/justep/button/button" class="btn btn-link btn-icon-left"
            onClick="{'operation':'chart3.print'}" xid="button23"> 
            <i xid="i23"/>  
            <span xid="span23"/> 
          </a>  
          <a component="$UI/system/components/justep/button/button" class="btn btn-link btn-icon-left"
            onClick="{'operation':'chart3.exportPDF'}" xid="button24"> 
            <i xid="i24"/>  
            <span xid="span24"/> 
          </a>  
          <a component="$UI/system/components/justep/button/button" class="btn btn-link btn-icon-left"
            onClick="{'operation':'chart3.exportWord'}" xid="button25"> 
            <i xid="i25"/>  
            <span xid="span25"/> 
          </a>  
          <a component="$UI/system/components/justep/button/button" class="btn btn-link btn-icon-left"
            onClick="{'operation':'chart3.exportExcel'}" xid="button26"> 
            <i xid="i26"/>  
            <span xid="span26"/> 
          </a> 
        </div>  
        <div component="$UI/system/components/bootstrap/row/row" class="row"
          xid="rowdw1"> 
          <div class="col col-xs-1 text-right" xid="colwd4"> 
            <label style="margin-top:9px">部门：</label> 
          </div>  
          <div class="col col-xs-2" xid="wwcol5"> 
            <input component="$UI/system/components/justep/input/input" class="form-control"
              xid="bdeptName"/> 
          </div>  
          <div class="col col-xs-1 text-right" xid="colwd6"> 
            <label style="margin-top:9px">人员：</label> 
          </div>  
          <div class="col col-xs-2" xid="wdcol7"> 
            <input component="$UI/system/components/justep/input/input" class="form-control"
              xid="bpersonName"/> 
          </div> 
        </div>  
        <div component="$UI/system/components/bootstrap/row/row" class="row"
          xid="rowb2"> 
          <div class="col col-xs-1 text-right" xid="colb4"> 
            <label style="margin-top:9px">开始时间：</label> 
          </div>  
          <div class="col col-xs-2" xid="col5"> 
            <input component="$UI/system/components/justep/input/input" class="form-control"
              xid="bstartDate" bind-ref="masterData.ref(&quot;startDate&quot;)"/> 
          </div>  
          <div class="col col-xs-1 text-right" xid="colb6"> 
            <label style="margin-top:9px">结束时间：</label> 
          </div>  
          <div class="col col-xs-2" xid="colb7"> 
            <input component="$UI/system/components/justep/input/input" class="form-control"
              xid="bendDate" bind-ref="masterData.ref(&quot;endDate&quot;)"/> 
          </div>  
          <div class="col col-xs-2" xid="colb8"> 
            <a component="$UI/system/components/justep/button/button" class="btn btn-default"
              label="查询" xid="button2b" onClick="bsearchData"> 
              <i xid="ib6"/>  
              <span xid="spanb6">查询</span> 
            </a> 
          </div> 
        </div>  
        <div component="$UI/system/components/justep/chart/chart" chart-name="chart"
          autoLoad="true" data-list="" xid="chart3" style="height:339px;width:664px;"> 
          <chart xid="chart4"> 
            <config xid="default7"> 
              <title xid="default10" visible="false" position="TOP"></title> 
            <legend xid="default17" visible="false" position="BOTTOM"></legend></config>  
            <series-set xid="series-set2"> 
              <series xid="chartSeries2" chart-type="vertical-bar" name="verticalbarchart"> 
                  
                <config xid="default12"> 
                  <category-title xid="default13"></category-title>  
                  <serie-title xid="default14">流程任务数</serie-title>  
                  <map-tool-tip-format xid="default15" type="number">######</map-tool-tip-format> 
                </config> 
              <data title="PERSONNAME" categoryAxis="PERSONNAME" numberAxis="TASKNUM" ref="bar2" autoData="true" xid="default11"></data></series> 
            </series-set> 
          </chart> 
        </div> 
      </div>  
      <div class="tab-pane" xid="tabContent3"> 
        <div component="$UI/system/components/justep/toolBar/toolBar" class="x-toolbar form-inline x-toolbar-spliter"
          xid="toolBar101"> 
          <a component="$UI/system/components/justep/button/button" class="btn btn-link btn-icon-left"
            onClick="{'operation':'report1.pageSetup'}" xid="button1"> 
            <i xid="i1"/>  
            <span xid="span101"/> 
          </a>  
          <a component="$UI/system/components/justep/button/button" class="btn btn-link btn-icon-left"
            onClick="{'operation':'report1.preview'}" xid="button202"> 
            <i xid="i2"/>  
            <span xid="span102"/> 
          </a>  
          <a component="$UI/system/components/justep/button/button" class="btn btn-link btn-icon-left"
            onClick="{'operation':'report1.print'}" xid="button3"> 
            <i xid="i3"/>  
            <span xid="span103"/> 
          </a>  
          <a component="$UI/system/components/justep/button/button" class="btn btn-link btn-icon-left"
            onClick="{'operation':'report1.exportPDF'}" xid="button4"> 
            <i xid="i204"/>  
            <span xid="span204"/> 
          </a>  
          <a component="$UI/system/components/justep/button/button" class="btn btn-link btn-icon-left"
            onClick="{'operation':'report1.exportWord'}" xid="button5"> 
            <i xid="i5"/>  
            <span xid="span205"/> 
          </a>  
          <a component="$UI/system/components/justep/button/button" class="btn btn-link btn-icon-left"
            onClick="{'operation':'report1.exportExcel'}" xid="button6"> 
            <i xid="i6"/>  
            <span xid="span206"/> 
          </a> 
        </div>  
        <div component="$UI/system/components/bootstrap/row/row" class="row"
          xid="rowxw1"> 
          <div class="col col-xs-1 text-right" xid="colxw4"> 
            <label style="margin-top:9px">部门：</label> 
          </div>  
          <div class="col col-xs-2" xid="wwxol5"> 
            <input component="$UI/system/components/justep/input/input" class="form-control"
              xid="rdeptName"/> 
          </div>  
          <div class="col col-xs-1 text-right" xid="colxw6"> 
            <label style="margin-top:9px">人员：</label> 
          </div>  
          <div class="col col-xs-2" xid="wwcxl7"> 
            <input component="$UI/system/components/justep/input/input" class="form-control"
              xid="rpersonName"/> 
          </div> 
        </div>  
        <div component="$UI/system/components/bootstrap/row/row" class="row"
          xid="rowr2"> 
          <div class="col col-xs-1 text-right" xid="colr4"> 
            <label style="margin-top:9px">开始时间：</label> 
          </div>  
          <div class="col col-xs-2" xid="colr5"> 
            <input component="$UI/system/components/justep/input/input" class="form-control"
              xid="rstartDate" bind-ref="masterData.ref(&quot;startDate&quot;)"/> 
          </div>  
          <div class="col col-xs-1 text-right" xid="colr6"> 
            <label style="margin-top:9px">结束时间：</label> 
          </div>  
          <div class="col col-xs-2" xid="colr7"> 
            <input component="$UI/system/components/justep/input/input" class="form-control"
              xid="rendDate" bind-ref="masterData.ref(&quot;endDate&quot;)"/> 
          </div>  
          <div class="col col-xs-2" xid="colr8"> 
            <a component="$UI/system/components/justep/button/button" class="btn btn-default"
              label="查询" xid="button2" onClick="rsearchData"> 
              <i xid="ir6"/>  
              <span xid="spanr6">查询</span> 
            </a> 
          </div> 
        </div>  
        <div component="$UI/system/components/justep/report/report" src="person_xls.xml"
          reportName="report" autoLoad="true" dataList="" class="x-report x-scroll-h"
          xid="report1"/> 
      </div> 
       <div class="tab-pane" xid="tabContent4">
         <span component="$UI/system/components/justep/bizFilter/bizFilter" xid="bizFilter"
    filterData="loadData" style="left:268px;top:184px;"/>  
   <div component="$UI/system/components/justep/toolBar/toolBar" class="x-toolbar form-inline x-toolbar-spliter" xid="toolBar1">
       <a component="$UI/system/components/justep/button/button" class="btn btn-link btn-icon-left"
         label="" xid="filterBtn" icon="icon-search" onClick="{operation:'bizFilter.menu'}"> 
         <i xid="i4" class="icon-search"/>  
         <span xid="span305"></span> 
       </a> 
      <div class="x-smartFilter-clear-hide input-group" component="$UI/system/components/justep/smartFilter/smartFilter"
        xid="smartFilter" filterData="loadData" filterCols="sName,sLoginName,sValidState,taskNum"
        style="width:140px;" autoRefresh="true"> 
        <input type="text" class="form-control" placeholder="搜索" data-bind="valueUpdate: ['input', 'afterkeydown']"
          bind-value="$model.comp($element.parentElement).searchText" bind-change="$model.comp($element.parentElement).onInputChange.bind($model.comp($element.parentElement))"
          xid="input1"/>  
        <span class="input-group-addon x-smartFilter-refresh" bind-click="$model.comp($element.parentElement).refresh.bind($model.comp($element.parentElement))"
          xid="span9"> 
          <i class="icon-android-search" xid="i9"/> 
        </span> 
      </div> 
   </div>
   <div component="$UI/system/components/justep/dataTables/dataTables" flexibleWidth="true" responsive="true" rowActiveClass="active" class="table table-hover table-striped" xid="personData" data="loadData">
      <columns xid="columns2">
      <column name="sName" xid="column1" label="人员名称"></column>
      <column name="sLoginName" xid="column3" label="登录名"></column>
      <column name="sValidState" xid="column5" label="人员状态"></column>
      <column name="taskNum" xid="column2" label="流程任务数"></column>
  </columns>
     </div>
  <div component="$UI/system/components/justep/pagerBar/pagerBar" class="x-pagerbar container-fluid" xid="pagerBar1" data="loadData">
   <div class="row" xid="div2">
    <div class="col-sm-3" xid="div3">
     <div class="x-pagerbar-length" xid="div4">
      <label component="$UI/system/components/justep/pagerLimitSelect/pagerLimitSelect" class="x-pagerlimitselect" xid="pagerLimitSelect1">
       <span xid="span1">显示</span>
       <select component="$UI/system/components/justep/select/select" class="form-control input-sm" xid="select1">
        <option value="10" xid="default1">10</option>
        <option value="20" xid="default3">20</option>
        <option value="50" xid="default4">50</option>
        <option value="100" xid="default5">100</option></select> 
       <span xid="span2">条</span></label> </div> </div> 
    <div class="col-sm-3" xid="div5">
     <div class="x-pagerbar-info" xid="div6">当前显示0条，共0条</div></div> 
    <div class="col-sm-6" xid="div7">
     <div class="x-pagerbar-pagination" xid="div8">
      <ul class="pagination" component="$UI/system/components/bootstrap/pagination/pagination" xid="pagination1">
       <li class="prev" xid="li1">
        <a href="#" xid="a1">
         <span aria-hidden="true" xid="span3">«</span>
         <span class="sr-only" xid="span4">Previous</span></a> </li> 
       <li class="next" xid="li2">
        <a href="#" xid="a2">
         <span aria-hidden="true" xid="span5">»</span>
         <span class="sr-only" xid="span6">Next</span></a> </li> </ul> </div> </div> </div> </div>
       </div>
    </div> 
    
  
  </div>
  </div>
