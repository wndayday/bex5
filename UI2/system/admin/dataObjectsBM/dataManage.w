<?xml version="1.0" encoding="utf-8"?>

<div xmlns="http://www.w3.org/1999/xhtml" xid="window" class="window" component="$UI/system/components/justep/window/window"
  design="device:pc">  
  <div component="$UI/system/components/justep/model/model" xid="model" style="top:385px;left:656px;height:auto;"
    onLoad="modelLoad">
    <div component="$UI/system/components/justep/data/data" autoLoad="true"
      xid="tableData" idColumn="label"> 
      <column name="label" type="String" xid="xid1"/>  
      <column name="name" type="String" xid="xid2"/>  
      <column name="path" type="String" xid="xid3"/>
    </div>
  </div>  
  <div component="$UI/system/components/justep/panel/panel" class="x-panel x-full"
    xid="panel2"> 
    <div class="x-panel-content" xid="content2">
      <div component="$UI/system/components/justep/row/row" class="x-row" xid="row5" style="height:100%;">
   <div class="x-col x-col-25" xid="col13"><table component="$UI/system/components/justep/list/list" class="x-list table" xid="list1" data="tableData"> 
            <thead xid="thead1"> 
              <tr xid="tr1"> 
                <th xid="default1">数据对象</th>
              </tr> 
            </thead>  
            <tbody class="x-list-template x-min-height" xid="listTemplate1"> 
              <tr xid="tr2" bind-css="{success:$object==$model.tableData.getCurrentRow()}" bind-click="tr2Click"> 
                <td xid="td1"> 
                  <div component="$UI/system/components/justep/output/output" class="x-output" xid="output1" bind-ref="ref(&quot;label&quot;)" />
                </td> 
              </tr> 
            </tbody> 
          </table></div>
   <div class="x-col" xid="col14" style="height:100%;"><iframe src="" xid="iframe1" width="100%" height="100%" style="border:0"/> </div></div></div> 
  </div> 
</div>
