<?xml version="1.0" encoding="utf-8"?>

<div xmlns="http://www.w3.org/1999/xhtml" xid="window" class="window" component="$UI/system/components/justep/window/window"
  design="device:pc">  
  <div component="$UI/system/components/justep/model/model" xid="model" onLoad="modelLoad"
    style="height:auto;top:159px;left:42px;"> 
    <div component="$UI/system/components/justep/data/data" autoLoad="true"
      xid="methodData" idColumn="tabelName"> 
      <column label="data名" name="tabelName" type="String" xid="xid2"/>  
      <column label="方法名称" name="methodName" type="String" xid="xid3"/>  
      <column label="检查状态" name="checked" type="String" xid="xid4"/>  
      <column label="文件路径" name="filePath" type="String" xid="xid5"/>
      <column label="描述信息" name="desc" type="String" xid="xid78"/>
      
    </div>  
    <div component="$UI/system/components/justep/data/data" autoLoad="true"
      xid="tableNameData" idColumn="name"> 
      <column label="数据名称" name="name" type="String" xid="xid1"/> 
    </div>  
    <div component="$UI/system/components/justep/data/data" autoLoad="false"
      xid="customData" idColumn="customName" autoNew="true">
      <column label="自定义服务名" name="customName" type="String" xid="xid6"/>
    </div>  
    <div component="$UI/system/components/justep/data/data" autoLoad="true"
      xid="rpcNameData" idColumn="name">
      <column name="name" type="String" xid="xid7"/>
    </div>
  </div>  
  <div component="$UI/system/components/justep/panel/panel" class="x-panel x-full"
    xid="panel1"> 
    <div class="x-panel-content" xid="content1"> 
      <!-- <div component="$UI/system/components/justep/row/row" class="x-row" xid="row2">
   <div class="x-col" xid="col3"><div component="$UI/system/components/justep/labelEdit/labelEdit" class="x-label-edit x-label30" xid="labelEdit1">
   <label class="x-label" xid="label1"><![CDATA[自定义服务：]]></label>
   <input component="$UI/system/components/justep/input/input" class="form-control x-edit" xid="input1" bind-ref='$model.customData.ref("customName")' onChange="input1Change"></input></div></div>
   </div><div component="$UI/system/components/justep/row/row" class="x-row" xid="row3">
   <div class="x-col" xid="col6"><span xid="span3"><![CDATA[选择服务列表：]]></span></div>
   <div class="x-col" xid="col7"></div>
   </div>-->
      <div component="$UI/system/components/justep/row/row" class="x-row" xid="row1" style="height:100%;"> 
        <div class="x-col" xid="col1" style="border:1px solid #ddd;border-right:none;"> 
          <table component="$UI/system/components/justep/list/list" class="x-list table table-striped"
            xid="list1" data="tableNameData" dataItemAlias="tableRow"> 
            <thead xid="thead1"> 
              <tr xid="tr1"> 
                <th xid="default1" style="text-align:center;">数据名称</th> 
              </tr> 
            </thead>  
            <tbody class="x-list-template x-min-height" xid="listTemplate1" componentname="$UI/system/components/justep/list/list#listTemplate"> 
              <tr xid="tr2" bind-css="{'current': tableRow.val(&quot;name&quot;)==$model.tableNameData.val('name')}"
                bind-click="tr2Click"> 
                <td xid="td1" bind-text="ref(&quot;name&quot;)"/> 
              </tr> 
            </tbody> 
          </table> 
        </div>  
        <div class="x-col" xid="col2" style="border:1px solid #ddd; flex:1.5;overflow:auto;"> 
          <table component="$UI/system/components/justep/list/list" class="x-list table table-striped"
            xid="list2" data="methodData"> 
            <thead xid="thead2"> 
              <tr xid="tr3"> 
                <th xid="default2" style="text-align:center;">方法名称</th> 
              </tr> 
            </thead>  
            <tbody class="x-list-template x-min-height" xid="listTemplate2"> 
              <tr xid="tr4"> 
                <td xid="td2"> 
                  <div component="$UI/system/components/justep/labelEdit/labelEdit"
                    class="x-label-edit x-label30" xid="labelEdit3" style="justify-content:flex-start;"> 
                    <span component="$UI/system/components/justep/button/radio"
                      class="x-radio" xid="radio1" name="methodName" onChange="radio1Change" style="margin-right:1.2em;"/>
                    <label class="x-label" xid="label4" bind-text='val("desc")'
                      style="width:100%;"/> 
                  </div>
                </td> 
              </tr> 
            </tbody> 
          </table> 
        </div> 
      </div> 
    </div>  
    <div class="x-panel-bottom" xid="bottom1"> 
      <div xid="div1" class="pull-right">
        <a component="$UI/system/components/justep/button/button" class="btn btn-default"
          label="确认" xid="okBtn" onClick="okBtnClick" style="border:none;background:#4fc7c5; color:#fff;margin-right:1.4em;"> 
          <i xid="i1"/>  
          <span xid="span1">确认</span> 
        </a>
        <a component="$UI/system/components/justep/button/button" class="btn btn-default"
          label="取消" xid="noBtn" onClick="noBtnClick" style="border:none;background:#4fc7c5; color:#fff;"> 
          <i xid="i2"/>  
          <span xid="span2">取消</span> 
        </a>
      </div>
    </div> 
  </div> 
</div>
