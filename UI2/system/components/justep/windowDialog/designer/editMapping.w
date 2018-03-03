<?xml version="1.0" encoding="utf-8"?>

<div xmlns="http://www.w3.org/1999/xhtml" xid="window" class="window" component="$UI/system/components/justep/window/window"
  design="device:pc;">  
  <div component="$UI/system/components/justep/model/model" xid="model" onLoad="modelLoad"
    style="height:auto;top:293px;left:540px;"> 
    <div component="$UI/system/components/justep/data/data" autoLoad="true"
      xid="dataMapping" idColumn="id" confirmDelete="false" confirmRefresh="false"> 
      <column label="id" name="id" type="String" xid="xid1"/>  
      <column label="弹出框列" name="fromCol" type="String" xid="xid2"/>  
      <column label="主窗口列" name="toCol" type="String" xid="xid3"/>  
      <column label="弹出框列名" name="fromColName" type="String" xid="xid2"/>  
      <column label="主窗口列名" name="toColName" type="String" xid="xid3"/>  
      <column label="是否鉴别列" name="locator" type="Boolean" xid="xid4"/> 
    </div>  
    <div component="$UI/system/components/justep/data/data" autoLoad="true"
      xid="dataFrom" idColumn="xid"> 
      <column name="xid" type="String" xid="xid5"/>  
      <column name="name" type="String" xid="xid6"/>  
      <column name="did" type="String" xid="xid7"/>  
      <column name="xml" type="String" xid="xid8"/> 
    </div>  
    <div component="$UI/system/components/justep/data/data" autoLoad="true"
      xid="dataTo" idColumn="xid"> 
      <column name="xid" type="String" xid="default1"/>  
      <column name="name" type="String" xid="default2"/>  
      <column name="did" type="String" xid="default3"/>  
      <column name="xml" type="String" xid="default4"/> 
    </div>  
    <div component="$UI/system/components/justep/data/data" autoLoad="true"
      xid="dataDoKind" idColumn="kind">
      <column name="kind" type="String"/>  
      <column name="name" type="String"/> 
      <data>[{"name":"全部新增","kind":{"value":"new"}},{"name":"根据鉴别列新增或修改","kind":{"value":"edit"}},{"name":"删除全部后新增","kind":{"value":"clear"}},{"name":"修改当前行","kind":{"value":"modify"}}]</data> 
      </div>
  </div>  
  <div component="$UI/system/components/justep/panel/panel" class="x-panel x-full"
    xid="panel1"> 
    <div class="x-panel-content container-fluid" xid="content1"> 
      <div component="$UI/system/components/bootstrap/row/row" class="row"
        xid="row1" style="height:100%;"> 
        <div class="col col-xs-3" xid="col1" style="height:100%;overflow:auto;"> 
          <div component="$UI/system/components/justep/controlGroup/controlGroup"
            class="x-control-group" title="弹出窗口" xid="controlGroup1"> 
            <div class="x-control-group-title" xid="controlGroupTitle1"> 
              <span xid="span1">title</span> 
            </div>  
            <select component="$UI/system/components/justep/select/select" bind-optionsCaption="请选择Data..."
              class="form-control" xid="select1" bind-options="fromDatas" bind-optionsValue="xid"
              bind-ref="fromData"/>  
            <div component="$UI/system/components/fragment/list/listTable"
              data="dataFrom" masterData="" masterCol="" xid="listTable1"> 
              <div component="$UI/system/components/justep/list/list" class="x-list"
                data="dataFrom" xid="list1"> 
                <table class="table table-bordered table-hover table-striped table-condensed"
                  component="$UI/system/components/bootstrap/table/table" xid="table1"> 
                  <thead xid="thead1"> 
                    <tr xid="tr1"> 
                      <th xid="col4"> 
                        <label xid="label2"><![CDATA[弹出窗口列]]></label> 
                      </th> 
                    </tr> 
                  </thead>  
                  <tbody class="x-list-template" bind-click="$model!=$object?$object.data.to($object):null"
                    xid="listTemplate1"> 
                    <tr xid="tr2" bind-css="{'info':$object===$model.dataFrom.getCurrentRow()}"> 
                      <td xid="td2"> 
                        <div component="$UI/system/components/justep/output/output"
                          class="x-output" xid="output1" bind-ref="ref(&quot;name&quot;)"/> 
                      </td> 
                    </tr> 
                  </tbody> 
                </table> 
              </div> 
            </div> 
          </div> 
        </div>  
        <div class="col col-xs-3" xid="col2" style="height:100%;overflow:auto;"> 
          <div component="$UI/system/components/justep/controlGroup/controlGroup"
            class="x-control-group" title="主窗口" xid="controlGroup2"> 
            <div class="x-control-group-title" xid="controlGroupTitle2"> 
              <span xid="span2">title</span> 
            </div>  
            <select component="$UI/system/components/justep/select/select" bind-optionsCaption="请选择Data..."
              class="form-control" xid="select2" bind-options="toDatas" bind-optionsValue="xid"
              bind-ref="toData"/>  
            <div component="$UI/system/components/fragment/list/listTable"
              data="dataTo" masterData="" masterCol="" xid="listTable2"> 
              <div component="$UI/system/components/justep/list/list" class="x-list"
                data="dataTo" xid="list2"> 
                <table class="table table-bordered table-hover table-striped table-condensed"
                  component="$UI/system/components/bootstrap/table/table" xid="table2"> 
                  <thead xid="thead2"> 
                    <tr xid="tr3"> 
                      <th xid="col5"> 
                        <label xid="label1"><![CDATA[主窗口列]]></label> 
                      </th> 
                    </tr> 
                  </thead>  
                  <tbody class="x-list-template" bind-click="$model!=$object?$object.data.to($object):null"
                    xid="listTemplate2"> 
                    <tr xid="tr4" bind-css="{'info':$object===$model.dataTo.getCurrentRow()}"> 
                      <td xid="td1"> 
                        <div component="$UI/system/components/justep/output/output"
                          class="x-output" xid="output2" bind-ref="ref(&quot;name&quot;)"/> 
                      </td> 
                    </tr> 
                  </tbody> 
                </table> 
              </div> 
            </div> 
          </div> 
        </div>  
        <div class="col col-xs-6" xid="col3" style="height:100%;">
          <div component="$UI/system/components/justep/panel/panel" class="x-panel x-full"
            xid="panel2"> 
            <div class="x-panel-top mapping" xid="top1">
              <div component="$UI/system/components/justep/toolBar/toolBar"
                class="x-toolbar form-inline x-toolbar-spliter" xid="toolBar1">
                <a component="$UI/system/components/justep/button/button"
                  class="btn btn-default" label="增加" xid="btnAdd" onClick="btnAddClick"> 
                  <i xid="i1"/>  
                  <span xid="span4">增加</span>
                </a>  
                <a component="$UI/system/components/justep/button/button"
                  class="btn btn-default" label="删除" xid="btnDelete" onClick="btnDeleteClick"> 
                  <i xid="i2"/>  
                  <span xid="span5">删除</span>
                </a>  
                <a component="$UI/system/components/justep/button/button"
                  class="btn btn-default" label="删除全部" xid="btnDelAll" onClick="btnDelAllClick"> 
                  <i xid="i3"/>  
                  <span xid="span6">删除全部</span>
                </a>
              </div>
            </div>  
            <div class="x-panel-content  mapping" xid="content2">
              <div component="$UI/system/components/fragment/list/listTable"
                data="dataMapping" masterData="" masterCol="" xid="listTable3"> 
                <div component="$UI/system/components/justep/list/list" class="x-list"
                  data="dataMapping" xid="list3"> 
                  <table class="table table-bordered table-hover table-striped table-condensed"
                    component="$UI/system/components/bootstrap/table/table" xid="table3"> 
                    <thead xid="thead3"> 
                      <tr xid="tr5"> 
                        <th xid="col6"><![CDATA[弹出窗口列]]></th>  
                        <th xid="col7"><![CDATA[主窗口列]]></th>  
                        <th xid="col8" style="width:80px;"><![CDATA[鉴别列]]></th>
                      </tr> 
                    </thead>  
                    <tbody class="x-list-template" bind-click="$model!=$object?$object.data.to($object):null"
                      xid="listTemplate3"> 
                      <tr xid="tr6" bind-css="{'info':$object===$model.dataMapping.getCurrentRow()}"> 
                        <td xid="td4">
                          <div component="$UI/system/components/justep/output/output"
                            class="x-output" xid="output4" bind-ref="ref(&quot;fromColName&quot;)"/>
                        </td>  
                        <td xid="td5">
                          <div component="$UI/system/components/justep/output/output"
                            class="x-output" xid="output6" bind-ref="ref(&quot;toColName&quot;)"/>
                        </td>
                        <td xid="td3" style="text-align:center;"> 
                          <span component="$UI/system/components/justep/button/checkbox"
                            class="x-checkbox" xid="checkbox1" bind-ref="ref(&quot;locator&quot;)"
                            name="locator"/>
                        </td> 
                      </tr> 
                    </tbody> 
                  </table> 
                </div> 
              </div>
            </div>  
            <div class="x-panel-bottom  mapping" xid="bottom1" height="60">
              <label xid="label3"><![CDATA[数据操作方式:]]></label>  
              <span component="$UI/system/components/justep/select/radioGroup" class="x-radio-group" xid="radioGroup1" bind-itemset="dataDoKind" bind-itemsetValue='ref("kind")' bind-itemsetLabel='ref("name")' bind-ref="doKind"></span></div>
          </div>
        </div> 
      </div> 
    </div> 
  </div> 
</div>
