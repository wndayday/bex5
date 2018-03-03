<?xml version="1.0" encoding="utf-8"?>

<div xmlns="http://www.w3.org/1999/xhtml" xid="window" class="window" component="$UI/system/components/justep/window/window"
  design="device:pc">  
  <div component="$UI/system/components/justep/model/model" xid="model" style="height:auto;width:108px;top:44px;left:1040px;"> 
    <div component="$UI/system/components/justep/reportData/reportData" xid="s1"> 
      <source xid="default1"> 
        <action id="default6" columns="SPROCESSNAME,INSTANCENUM" name="processTypePieChartAction"
          type="action"/> 
      </source> 
    </div>  
    <div component="$UI/system/components/justep/reportData/reportData" xid="s2"> 
      <source xid="default4"> 
        <action xid="default5" name="processTypeBarVChartAction" columns="SPROCESSNAME,INSTANCENUM,TASKNUM,NONUM"
          type="action"/> 
      </source> 
    </div>  
    <div component="$UI/system/components/justep/data/data" autoLoad="true"
      xid="masterData" idColumn="startDate"> 
      <column label="startDate" name="startDate" type="Date" xid="default100"/>  
      <data xid="default2">[{}]</data>  
      <column label="endDate" name="endDate" type="Date" xid="xid1"/>
    </div> 
  </div>  
  <div component="$UI/system/components/bootstrap/tabs/tabs" xid="tabs"> 
    <ul class="nav nav-tabs" xid="tabNav1"> 
      <li class="active" xid="li1"> 
        <a content="tabContent1" xid="tabItem1"><![CDATA[饼图]]></a> 
      </li>  
      <li role="presentation" xid="li2"> 
        <a content="tabContent2" xid="tabItem2" bind-click="tabItem2Click">柱状图</a> 
      </li>  
      <li role="presentation" xid="li3"> 
        <a content="tabContent3" xid="tabItem3" bind-click="tabItem3Click">报表</a> 
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
          xid="rowp1"> 
          <div class="col col-xs-1 text-right" xid="col4"> 
            <label style="margin-top:9px">流程类型名称：</label> 
          </div>  
          <div class="col col-xs-2" xid="col5"> 
            <input component="$UI/system/components/justep/input/input" class="form-control"
              xid="pprocessName"/> 
          </div> 
        </div>  
        <div component="$UI/system/components/bootstrap/row/row" class="row"
          xid="rowp2"> 
          <div class="col col-xs-1 text-right" xid="pcol4"> 
            <label style="margin-top:9px">开始时间：</label> 
          </div>  
          <div class="col col-xs-2" xid="pcol5"> 
            <input component="$UI/system/components/justep/input/input" class="form-control"
              xid="pstartDate" bind-ref="masterData.ref(&quot;startDate&quot;)"/> 
          </div>  
          <div class="col col-xs-1 text-right" xid="pcol6"> 
            <label style="margin-top:9px">结束时间：</label> 
          </div>  
          <div class="col col-xs-2" xid="pcol7"> 
            <input component="$UI/system/components/justep/input/input" class="form-control"
              xid="pendDate" bind-ref="masterData.ref(&quot;endDate&quot;)"/> 
          </div>  
          <div class="col col-xs-2" xid="pcol8"> 
            <a component="$UI/system/components/justep/button/button" class="btn btn-default"
              label="查询" xid="buttonp2" onClick="psearchData"> 
              <i xid="ip6"/>  
              <span xid="spanp6">查询</span> 
            </a> 
          </div> 
        </div>  
        <div component="$UI/system/components/justep/chart/chart" chart-name="chart"
          autoLoad="true" data-list="" xid="chart1" style="height:289px;width:566px;"> 
          <chart xid="chart2"> 
            <config xid="default6">
              <title xid="default3" visible="false" position="TOP"/>
            </config>  
            <series-set xid="series-set1"> 
              <series xid="chartSeries1" chart-type="pie" name="piechart"> 
                <data categoryAxis="SPROCESSNAME" numberAxis="INSTANCENUM" ref="s1"
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
          xid="rowb1"> 
          <div class="col col-xs-1 text-right" xid="bcol104"> 
            <label style="margin-top:9px">流程类型名称：</label> 
          </div>  
          <div class="col col-xs-2" xid="bcol105"> 
            <input component="$UI/system/components/justep/input/input" class="form-control"
              xid="bprocessName"/> 
          </div> 
        </div>  
        <div component="$UI/system/components/bootstrap/row/row" class="row"
          xid="rowb2"> 
          <div class="col col-xs-1 text-right" xid="bcol4"> 
            <label style="margin-top:9px">开始时间：</label> 
          </div>  
          <div class="col col-xs-2" xid="bcol5"> 
            <input component="$UI/system/components/justep/input/input" class="form-control"
              xid="bstartDate" bind-ref="masterData.ref(&quot;startDate&quot;)"/> 
          </div>  
          <div class="col col-xs-1 text-right" xid="bcol6"> 
            <label style="margin-top:9px">结束时间：</label> 
          </div>  
          <div class="col col-xs-2" xid="bcol7"> 
            <input component="$UI/system/components/justep/input/input" class="form-control"
              xid="bendDate" bind-ref="masterData.ref(&quot;endDate&quot;)"/> 
          </div>  
          <div class="col col-xs-2" xid="col8"> 
            <a component="$UI/system/components/justep/button/button" class="btn btn-default"
              label="查询" xid="buttonb2" onClick="bsearchData"> 
              <i xid="ibb6"/>  
              <span xid="spanb6">查询</span> 
            </a> 
          </div> 
        </div>  
        <div component="$UI/system/components/justep/chart/chart" chart-name="chart"
          autoLoad="true" data-list="" xid="chart3" style="height:339px;width:664px;"> 
          <chart xid="chart103"> 
            <config xid="default7">
              <title xid="default10" visible="false" position="TOP"/>
            </config>  
            <series-set xid="series-set2"> 
              <series xid="chartSeries2" chart-type="vertical-bar" name="verticalbarchart"> 
                <data title="SPROCESSNAME" categoryAxis="INSTANCENUM" numberAxis="TASKNUM "
                  ref="s2" autoData="true" xid="default11"/>  
                <config xid="default12">
                  <category-title xid="default13">流程实例数</category-title>  
                  <serie-title xid="default14">流程任务数</serie-title>  
                  <map-tool-tip-format xid="default15" type="number">######</map-tool-tip-format>
                </config>
              </series> 
            </series-set> 
          </chart> 
        </div> 
      </div>  
      <div class="tab-pane" xid="tabContent3"> 
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
          xid="rowr1"> 
          <div class="col col-xs-1 text-right" xid="rcol104"> 
            <label style="margin-top:9px">流程类型名称：</label> 
          </div>  
          <div class="col col-xs-2" xid="rcol105"> 
            <input component="$UI/system/components/justep/input/input" class="form-control"
              xid="rprocessName"/> 
          </div> 
        </div>  
        <div component="$UI/system/components/bootstrap/row/row" class="row"
          xid="row2"> 
          <div class="col col-xs-1 text-right" xid="rcol4"> 
            <label style="margin-top:9px">开始时间：</label> 
          </div>  
          <div class="col col-xs-2" xid="rcol5"> 
            <input component="$UI/system/components/justep/input/input" class="form-control"
              xid="rstartDate" bind-ref="masterData.ref(&quot;startDate&quot;)"/> 
          </div>  
          <div class="col col-xs-1 text-right" xid="rcol6"> 
            <label style="margin-top:9px">结束时间：</label> 
          </div>  
          <div class="col col-xs-2" xid="rcol7"> 
            <input component="$UI/system/components/justep/input/input" class="form-control"
              xid="rendDate" bind-ref="masterData.ref(&quot;endDate&quot;)"/> 
          </div>  
          <div class="col col-xs-2" xid="rcol8"> 
            <a component="$UI/system/components/justep/button/button" class="btn btn-default"
              label="查询" xid="buttonr2" onClick="rsearchData"> 
              <i xid="ir6"/>  
              <span xid="spanr6">查询</span> 
            </a> 
          </div> 
        </div>  
        <div component="$UI/system/components/justep/report/report" src="type_xls.xml"
          reportName="report" autoLoad="true" class="x-report x-scroll-h" xid="report1"/>
      </div> 
    </div> 
  </div> 
</div>
