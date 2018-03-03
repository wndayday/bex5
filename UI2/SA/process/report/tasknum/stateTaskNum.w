<?xml version="1.0" encoding="utf-8"?>

<div xmlns="http://www.w3.org/1999/xhtml" xid="window" class="window" component="$UI/system/components/justep/window/window"
  design="device:pc">  
  <div component="$UI/system/components/justep/model/model" xid="model" style="height:auto;width:108px;top:44px;left:1040px;"> 
    <div component="$UI/system/components/justep/reportData/reportData" xid="s1"> 
      <source xid="default1"> 
        <action id="default6" columns="STATUSNAME,TASKNUM" name="statePieChartAction"
          type="action"/> 
      </source> 
    </div>  
    <div component="$UI/system/components/justep/reportData/reportData" xid="s2"> 
      <source xid="default4"> 
        <action xid="default5" name="stateBarVChartAction" columns="STATUSNAME,TASKNUM "
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
    </ul>  
    <div class="tab-content" xid="div1"> 
      <div class="tab-pane active" xid="tabContent1"> 
        <div component="$UI/system/components/justep/toolBar/toolBar" class="x-toolbar form-inline x-toolbar-spliter"
          xid="toolBar1"> 
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
            onClick="{'operation':'chart1.exportExcel'}" xid="button63"> 
            <i xid="i36"/>  
            <span xid="span36"/> 
          </a> 
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
              label="查询" xid="button102" onClick="psearchData"> 
              <i xid="iw6"/>  
              <span xid="spanw6">查询</span> 
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
                <data categoryAxis="STATUSNAME" numberAxis="TASKNUM" ref="s1"
                  xid="default8"/>  
                <config xid="default9"/>
              </series> 
            </series-set> 
          </chart> 
        </div> 
      </div>  
      <div class="tab-pane" xid="tabContent2"> 
        <div component="$UI/system/components/justep/toolBar/toolBar" class="x-toolbar form-inline x-toolbar-spliter"
          xid="toolBar3"> 
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
          xid="rowq2"> 
          <div class="col col-xs-1 text-right" xid="colq4"> 
            <label style="margin-top:9px">开始时间：</label> 
          </div>  
          <div class="col col-xs-2" xid="colq5"> 
            <input component="$UI/system/components/justep/input/input" class="form-control"
              xid="bstartDate" bind-ref="masterData.ref(&quot;startDate&quot;)"/> 
          </div>  
          <div class="col col-xs-1 text-right" xid="colq6"> 
            <label style="margin-top:9px">结束时间：</label> 
          </div>  
          <div class="col col-xs-2" xid="colq7"> 
            <input component="$UI/system/components/justep/input/input" class="form-control"
              xid="bendDate" bind-ref="masterData.ref(&quot;endDate&quot;)"/> 
          </div>  
          <div class="col col-xs-2" xid="colq8"> 
            <a component="$UI/system/components/justep/button/button" class="btn btn-default"
              label="查询" xid="button2" onClick="bsearchData"> 
              <i xid="iq6"/>  
              <span xid="spanq6">查询</span> 
            </a> 
          </div> 
        </div>  
        <div component="$UI/system/components/justep/chart/chart" chart-name="chart"
          autoLoad="true" data-list="" xid="chart3" style="height:339px;width:664px;"> 
          <chart xid="chart4"> 
            <config xid="default7">
              <title xid="default10" visible="false" position="TOP"></title>
            <legend xid="default16" visible="false" position="BOTTOM"></legend></config>  
            <series-set xid="series-set2"> 
              <series xid="chartSeries2" chart-type="vertical-bar" name="verticalbarchart"> 
                  
                <config xid="default12">
                  <category-title xid="default13"></category-title>  
                  <serie-title xid="default14">流程任务数</serie-title>  
                  <map-tool-tip-format xid="default15" type="number">######</map-tool-tip-format>
                </config>
              <data title="STATUSNAME" categoryAxis="STATUSNAME" numberAxis="TASKNUM " ref="s2" autoData="true" xid="default11"></data></series> 
            </series-set> 
          </chart> 
        </div> 
      </div> 
    </div> 
  </div> 
</div>
