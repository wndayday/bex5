<?xml version="1.0" encoding="utf-8"?>

<div xmlns="http://www.w3.org/1999/xhtml" xid="window" class="window" component="$UI/system/components/justep/window/window"
  design="device:pc">  
  <div component="$UI/system/components/justep/model/model" xid="model" style="height:auto;width:108px;top:44px;left:1040px;"> 
    <div component="$UI/system/components/justep/reportData/reportData" xid="s1"> 
      <source xid="default1"> 
        <action id="default6" columns="DEPTNAME,TASKNUM" name="deptPieChartAction"
          type="action"/> 
      </source> 
    </div>  
    <div component="$UI/system/components/justep/reportData/reportData" xid="s2"> 
      <source xid="default4"> 
        <action xid="default5" name="deptBarVChartAction" columns="ACTIVITYNAME,DEPTNAME,TASKNUM "
          type="action"/> 
      </source> 
    </div>  
    <div component="$UI/system/components/justep/data/data" autoLoad="true"
      xid="masterData" idColumn="startDate"> 
      <column label="startDate" name="startDate" type="Date" xid="default31"/>  
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
    </ul>  
    <div class="tab-content" xid="div1"> 
      <div class="tab-pane active" xid="tabContent1"> 
        <div component="$UI/system/components/justep/toolBar/toolBar" class="x-toolbar form-inline x-toolbar-spliter"
          xid="toolBar2"> 
          <a component="$UI/system/components/justep/button/button" class="btn btn-link btn-icon-left"
            onClick="{'operation':'chart1.pageSetup'}" xid="button11"> 
            <i xid="i11"/>  
            <span xid="span11"/> 
          </a>  
          <a component="$UI/system/components/justep/button/button" class="btn btn-link btn-icon-left"
            onClick="{'operation':'chart1.preview'}" xid="button12"> 
            <i xid="i12"/>  
            <span xid="span12"/> 
          </a>  
          <a component="$UI/system/components/justep/button/button" class="btn btn-link btn-icon-left"
            onClick="{'operation':'chart1.print'}" xid="button13"> 
            <i xid="i13"/>  
            <span xid="span13"/> 
          </a>  
          <a component="$UI/system/components/justep/button/button" class="btn btn-link btn-icon-left"
            onClick="{'operation':'chart1.exportPDF'}" xid="button14"> 
            <i xid="i14"/>  
            <span xid="span14"/> 
          </a>  
          <a component="$UI/system/components/justep/button/button" class="btn btn-link btn-icon-left"
            onClick="{'operation':'chart1.exportWord'}" xid="button15"> 
            <i xid="i15"/>  
            <span xid="span15"/> 
          </a>  
          <a component="$UI/system/components/justep/button/button" class="btn btn-link btn-icon-left"
            onClick="{'operation':'chart1.exportExcel'}" xid="button16"> 
            <i xid="i16"/>  
            <span xid="span16"/> 
          </a> 
        </div>  
        <div component="$UI/system/components/bootstrap/row/row" class="row"
          xid="roww2"> 
            
          <div class="col col-xs-1 text-right" xid="colw4"> 
            <label style="margin-top:9px">开始时间：</label> 
          </div><div class="col col-xs-2" xid="colw5"> 
            <input component="$UI/system/components/justep/input/input" class="form-control"
              xid="pstartDate" bind-ref="$model.masterData.ref(&quot;startDate&quot;)"/> 
          </div>  
          <div class="col col-xs-1 text-right" xid="colw6"> 
            <label style="margin-top:9px">结束时间：</label> 
          </div>  
          <div class="col col-xs-2" xid="colw7"> 
            <input component="$UI/system/components/justep/input/input" class="form-control"
              xid="pendDate" bind-ref="$model.masterData.ref(&quot;endDate&quot;)"/> 
          </div>  
          <div class="col col-xs-2" xid="colw8"> 
            <a component="$UI/system/components/justep/button/button" class="btn btn-default"
              label="查询" xid="button102" onClick="psearchData"> 
              <i xid="iw6"/>  
              <span xid="spanw106">查询</span> 
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
                <data categoryAxis="DEPTNAME" numberAxis="TASKNUM" ref="s1"
                  xid="default8"/>  
                <config xid="default9"/>
              </series> 
            </series-set> 
          </chart> 
        </div> 
      </div>  
      <div class="tab-pane" xid="tabContent2"> 
        <div component="$UI/system/components/justep/toolBar/toolBar" class="x-toolbar form-inline x-toolbar-spliter"
          xid="toolBar1"> 
          <a component="$UI/system/components/justep/button/button" class="btn btn-link btn-icon-left"
            onClick="{'operation':'chart3.pageSetup'}" xid="button1"> 
            <i xid="i1"/>  
            <span xid="span1"/> 
          </a>  
          <a component="$UI/system/components/justep/button/button" class="btn btn-link btn-icon-left"
            onClick="{'operation':'chart3.preview'}" xid="button2"> 
            <i xid="i2"/>  
            <span xid="span2"/> 
          </a>  
          <a component="$UI/system/components/justep/button/button" class="btn btn-link btn-icon-left"
            onClick="{'operation':'chart3.print'}" xid="button3"> 
            <i xid="i3"/>  
            <span xid="span3"/> 
          </a>  
          <a component="$UI/system/components/justep/button/button" class="btn btn-link btn-icon-left"
            onClick="{'operation':'chart3.exportPDF'}" xid="button4"> 
            <i xid="i4"/>  
            <span xid="span4"/> 
          </a>  
          <a component="$UI/system/components/justep/button/button" class="btn btn-link btn-icon-left"
            onClick="{'operation':'chart3.exportWord'}" xid="button5"> 
            <i xid="i5"/>  
            <span xid="span5"/> 
          </a>  
          <a component="$UI/system/components/justep/button/button" class="btn btn-link btn-icon-left"
            onClick="{'operation':'chart3.exportExcel'}" xid="button6"> 
            <i xid="i6"/>  
            <span xid="span6"/> 
          </a> 
        </div>  
        <div component="$UI/system/components/bootstrap/row/row" class="row"
          xid="rowq2"> 
          <div class="col col-xs-1 text-right" xid="colq4"> 
            <label style="margin-top:9px">开始时间：</label> 
          </div>  
          <div class="col col-xs-2" xid="colq5"> 
            <input component="$UI/system/components/justep/input/input" class="form-control"
              xid="bstartDate" bind-ref="$model.masterData.ref(&quot;startDate&quot;)"/> 
          </div>  
          <div class="col col-xs-1 text-right" xid="colq6"> 
            <label style="margin-top:9px">结束时间：</label> 
          </div>  
          <div class="col col-xs-2" xid="colq7"> 
            <input component="$UI/system/components/justep/input/input" class="form-control"
              xid="bendDate" bind-ref="$model.masterData.ref(&quot;endDate&quot;)"/> 
          </div>  
          <div class="col col-xs-2" xid="colq8"> 
            <a component="$UI/system/components/justep/button/button" class="btn btn-default"
              label="查询" xid="buttonq2" onClick="bsearchData"> 
              <i xid="iq6"/>  
              <span xid="spanw6">查询</span> 
            </a> 
          </div> 
        </div>  
        <div component="$UI/system/components/justep/chart/chart" chart-name="chart"
          autoLoad="true" data-list="" xid="chart3" style="height:339px;width:664px;"> 
          <chart xid="chart4"> 
            <config xid="default7">
              <title xid="default10" visible="false" position="TOP"></title>
            <legend xid="default20" visible="false" position="BOTTOM"></legend></config>  
            <series-set xid="series-set2"> 
              <series xid="chartSeries2" chart-type="vertical-bar" name="verticalbarchart"> 
                  
                <config xid="default12">
                  <category-title xid="default13"></category-title>  
                  <serie-title xid="default14">流程任务数</serie-title>  
                  <serie-number xid="default15" auto="true" visible="true" start="0"
                    end="5" step="1"></serie-number>  
                  <map-tool-tip-format xid="default16" type="number">######</map-tool-tip-format>
                </config>
              <data title="DEPTNAME" categoryAxis="DEPTNAME" numberAxis="TASKNUM " ref="s2" autoData="true" xid="default19"></data></series> 
            </series-set> 
          </chart> 
        </div> 
      </div> 
    </div> 
  </div> 
</div>
