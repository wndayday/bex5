<?xml version="1.0" encoding="utf-8"?>

<div xmlns="http://www.w3.org/1999/xhtml" xid="window" class="window" component="$UI/system/components/justep/window/window"
  design="device:pc">  
  <div component="$UI/system/components/justep/model/model" xid="model" style="height:auto;top:311px;left:426px;"
    onLoad="modelLoad"> 
    <div component="$UI/system/components/justep/data/data" xid="paramData" idColumn="name" confirmDeleteText="确定删除当前参数?" confirmRefresh="false">
      <column label="参数" name="name" type="String" xid="default1"></column>
	  <column label="值" name="value" type="String" xid="default2"></column>
	  <column label="label" name="label" type="String" xid="default3"></column>
	  <column label="页面参数" name="isPagaParam" type="String" xid="default3"></column>
    </div>  
    <div component="$UI/system/components/justep/dataOperation/dataOperation"
      xid="dataOperation1"/> 
  </div>  
  <div component="$UI/system/components/justep/panel/panel" class="x-panel x-full"
    xid="panel1"> 
    <div class="x-panel-content" xid="content1">
      <table component="$UI/system/components/justep/list/list" class="x-list table"
        xid="list1" data="paramData"> 
        <thead xid="thead1"> 
          <tr xid="tr1"> 
            <th xid="default1" style="width:40%;">参数</th>  
            <th>值</th> 
            <th></th> 
          </tr> 
        </thead>  
        <tbody class="x-list-template x-min-height" xid="listTemplate1"> 
          <tr xid="tr2" bind-css="{'info':$object==$model.paramData.getCurrentRow()}"> 
            <td xid="td1">
            	<div component="$UI/system/components/justep/output/output" class="x-output" xid="output1" bind-text="val('name')+(val('label')?('('+val('label')+')'):'')"></div> 
            </td>  
            <td xid="td2"> 
              <div class="input-group" component="$UI/system/components/bootstrap/inputGroup/inputGroup"
                xid="inputGroup1"> 
                <input type="text" class="form-control" component="$UI/system/components/justep/input/input"
                  xid="input1" bind-ref="ref(&quot;value&quot;)"/>  
                <div class="input-group-btn" xid="layoutWizard1"> 
                  <a component="$UI/system/components/justep/button/button"
                    class="btn btn-default btn-only-icon" label="button" xid="exprBtn"
                    icon="icon-android-more" onClick="button1Click"> 
                    <i xid="i3" class="icon-android-more"/>  
                    <span xid="span3"/>
                  </a> 
                </div>
              </div>
            </td>
            <td>
                <a component="$UI/system/components/justep/button/button" class="btn btn-link"
                label="删除" xid="deleteBtn" icon="icon-android-close"
                onClick="{&quot;operation&quot;:&quot;dataOperation1.deleteData&quot;}" bind-disable="val('isPagaParam')"> 
                <i xid="i1" class="icon-android-close"/>  
                <span xid="span1">删除</span> 
              </a>
            </td> 
          </tr> 
        </tbody> 
      </table>
    </div> 
  </div>
</div>
