<?xml version="1.0" encoding="utf-8"?>

<div xmlns="http://www.w3.org/1999/xhtml" xid="window" class="window" component="$UI/system/components/justep/window/window"
  design="device:pc">  
  <div component="$UI/system/components/justep/model/model" xid="model" style="height:auto;top:397px;left:798px;"
    onLoad="modelLoad">
    <div component="$UI/system/components/justep/data/data" autoLoad="true"
      xid="propertyData" idColumn="name" onValueChange="propertyDataValueChange">
      <column name="name" type="String" xid="xid1"></column>
  <column name="dataType" type="String" xid="xid2"></column>
  <column name="required" type="String" xid="xid3"></column>
  <column name="primary" type="String" xid="xid4"></column>
  <column name="unique" type="String" xid="xid5"></column>
  <column name="length" type="String" xid="xid6"></column>
  <column label="默认" name="default" type="String" xid="xid19"></column></div>  
    <div component="$UI/system/components/justep/data/data" autoLoad="true"
      xid="typeData" idColumn="value"> 
      <column name="value" type="String" xid="xid23"/>  
      <data xid="default4">[{"value":"String"},{"value":"Integer"},{"value":"Date"},{"value":"DateTime"},{"value":"Float"},{"value":"Blob"},{"value":"Time"},{"value":"Decimal"},{"value":"Text"},{"value":"List"}]</data>
    </div>  
    <div component="$UI/system/components/justep/data/data" autoLoad="true"
      xid="mapTypeData" idColumn="value">
      <column name="value" type="String" xid="xid10"/>  
      <data xid="default3">[{"value":"String"},{"value":"Integer"},{"value":"Boolean"},{"value":"Float"},{"value":"Date"},{"value":"DateTime"},{"value":"Time"},{"value":"Decimal"},{"value":"Blob"},{"value":"Text"}]</data>
    </div>  
    <div component="$UI/system/components/justep/data/data" autoLoad="true"
      xid="methodData" idColumn="name" onValueChange="methodDataValueChange">
      <column name="name" type="String" xid="xid11"></column>
  <column name="type" type="String" xid="xid12"></column>
  <column name="sql" type="String" xid="xid13"></column>
  <column name="dataType" type="String" xid="xid14"></column>
  <column name="pageable" type="String" xid="xid15"></column>
  <column name="modify" type="String" xid="xid16"></column>
  <column name="isSql" type="String" xid="xid22"></column></div>  
    <div component="$UI/system/components/justep/data/data" autoLoad="true"
      xid="constraintsData" idColumn="target" onValueChange="validationDataValueChange">
      <column name="target" type="String" xid="xid21"/>
    </div>  
    <div component="$UI/system/components/justep/data/data" autoLoad="false"
      xid="tableNameData" idColumn="table" onValueChange="tableNameDataValueChange"
      autoNew="true">
      <column name="table" type="String" xid="xid24"/>
    </div>
    <div component="$UI/system/components/justep/data/data" autoLoad="true"
      xid="paramData" idColumn="name" onValueChange="paramDataValueChange">
      <column name="name" type="String" xid="xid17"/>  
      <column name="dataType" type="String" xid="xid18"/>
    </div>
    <div component="$UI/system/components/justep/data/data" autoLoad="true"
      xid="propertyMappingData" idColumn="name" onValueChange="propertyMappingDataValueChange">
      <column name="name" type="String" xid="xid7"/>  
      <column name="column" type="String" xid="xid8"/>  
      <column name="dataType" type="String" xid="xid9"/>
    </div>  
    <div component="$UI/system/components/justep/data/data" autoLoad="true"
      xid="fieldData" idColumn="fieldName">
      <column label="字段名称" name="fieldName" type="String" xid="xid20"/>
    </div>
  </div>  
  <span component="$UI/system/components/justep/windowDialog/windowDialog" xid="chooseObjectDialog"
    src="./chooseObjectType.w" title="选择对象类型" showTitle="true" status="normal" forceRefreshOnOpen="true"
    width="800" height="600" onReceive="chooseObjectDialogReceive"/>
  <div component="$UI/system/components/justep/panel/panel" class="x-panel x-full"
    xid="panel1"> 
    <div class="x-panel-top" xid="top1"> 
      <a component="$UI/system/components/justep/button/button" class="btn btn-link"
        label="生成数据库库表" xid="button2" onClick="button2Click" style="display:none"> 
        <i xid="i11"/>  
        <span xid="span11"/> 
      </a>  
      <a component="$UI/system/components/justep/button/button" class="btn btn-link"
        label="反向生成数据对象" xid="d2oBtn" onClick="d2oBtnClick" style="display:none;"> 
        <i xid="i19"/>  
        <span xid="span19">反向生成数据对象</span> 
      </a> 
    </div>  
    <div class="x-panel-content" xid="content1"> 
      <div component="$UI/system/components/justep/contents/contents" class="x-contents x-full"
        active="0" xid="contents1"> 
        <div class="x-contents-content" xid="content2"> 
          <div component="$UI/system/components/justep/tabs/tabs" class="x-tabs"
            xid="tabs2"> 
            <div component="$UI/system/components/justep/panel/panel" class="x-panel"
              xid="panel2"> 
              <div class="x-panel-top" xid="top2"> 
                <ul class="nav nav-tabs" xid="navs1"> 
                  <li class="active" xid="li3"> 
                    <a content="tabContent_1" xid="tabItem3"><![CDATA[字段设置]]></a> 
                  </li>  
                  <li xid="li4"> 
                    <a content="tabContent3" xid="tabItem4"><![CDATA[ORM设置]]></a> 
                  </li>  
                  <li xid="li5"> 
                    <a content="tabContent4" xid="tabItem5"><![CDATA[访问方法设置]]></a> 
                  </li>  
                  <li xid="li1" style="display:none;"> 
                    <a content="tabContent1" xid="tabItem1"><![CDATA[validation设置]]></a>
                  </li>
                </ul> 
              </div>  
              <div class="x-panel-content" xid="content4"> 
                <div component="$UI/system/components/justep/contents/contents"
                  class="x-contents" active="0" xid="contents2"> 
                  <div class="x-contents-content active" xid="content1"> 
                    <div component="$UI/system/components/justep/toolBar/toolBar"
                      class="x-toolbar form-inline x-toolbar-spliter" xid="toolBar1"
                      style="padding:1px;"> 
                      <a component="$UI/system/components/justep/button/button"
                        class="btn btn-link btn-icon-left" label="添加" xid="addProperty"
                        icon="glyphicon glyphicon-plus" onClick="addPropertyClick"> 
                        <i xid="i7" class="glyphicon glyphicon-plus" style="color:#009124;"/>  
                        <span xid="span7">添加</span> 
                      </a>  
                      <a component="$UI/system/components/justep/button/button"
                        class="btn btn-link btn-icon-left" label="删除" xid="deleteRelationBtn" icon="glyphicon glyphicon-remove"
                        onClick="deleteRelationBtnClick"> 
                        <i xid="i7" class="glyphicon glyphicon-remove" style="color:#B00000;"/>  
                        <span xid="span7">删除</span> 
                      </a>  
                      <a component="$UI/system/components/justep/button/button"
                        class="btn btn-link btn-icon-left" label="上移" xid="moveUpBtn" icon="glyphicon glyphicon-arrow-up"
                        onClick="moveUpBtnClick"> 
                        <i xid="i8" class="glyphicon glyphicon-arrow-up"
                          style="color:#AEAE35;"/>  
                        <span xid="span8">上移</span> 
                      </a>  
                      <a component="$UI/system/components/justep/button/button"
                        class="btn btn-link btn-icon-left" label="下移" xid="moveDownBtn" icon="glyphicon glyphicon-arrow-down"
                        onClick="moveDownBtnClick"> 
                        <i xid="i9" class="glyphicon glyphicon-arrow-down"
                          style="color:#AEAE35;"/>  
                        <span xid="span9">下移</span> 
                      </a> 
                    </div>  
                    <table component="$UI/system/components/justep/list/list"
                      class="x-list table" xid="list1" data="propertyData"> 
                      <thead xid="thead1"> 
                        <tr xid="tr1"> 
                          <th xid="default1">字段名称</th>  
                          <th xid="default1">数据类型</th>  
                          <th xid="default1">长度</th>  
                          <th xid="default1">默认</th>  
                          <th xid="default1">必须</th>  
                          <th xid="default1">唯一</th>  
                          <th xid="default1">主键</th>  
                          <th xid="default2">数据项检查</th> 
                        </tr> 
                      </thead>  
                      <tbody class="x-list-template x-min-height" xid="listTemplate1"> 
                        <tr xid="tr2" bind-css="{success:$object==$model.propertyData.getCurrentRow()}"> 
                          <td xid="td1" style="width:20%;">
                            <div component="$UI/system/components/justep/output/output" class="x-output " xid="output9" bind-ref='ref("name")'></div></td>  
                          <td xid="td1" style="width:30%;"> 
                            <div class="input-group" component="$UI/system/components/bootstrap/inputGroup/inputGroup"
                              xid="inputGroup4"> 
                              <div component="$UI/system/components/justep/output/output" class="x-output " xid="output1" bind-ref='ref("dataType")'></div><select component="$UI/system/components/justep/select/select"
                                class="form-control"
                                xid="select1" bind-ref="ref(&quot;dataType&quot;)" bind-options="$model.typeData"
                                bind-optionsValue="value" bind-optionsLabel="value" style="display:none;"/>  
                              <div class="input-group-btn" xid="layoutWizard4"> 
                                <a component="$UI/system/components/justep/button/button"
                                  class="btn btn-default btn-only-icon" label="button"
                                  icon="icon-android-more" xid="chooseObjectBtn" onClick="chooseObjectBtnClick"> 
                                  <i xid="i14" class="icon-android-more"/>  
                                  <span xid="span14"/>
                                </a> 
                              </div> 
                            </div>
                          </td>  
                          <td xid="td1" style="width:20%;">
                            <input component="$UI/system/components/justep/input/input"
                              class="form-control" xid="input1" bind-ref="ref(&quot;length&quot;)"/>
                          </td>  
                          <td xid="td10" style="width:20%;">
   <input component="$UI/system/components/justep/input/input" class="form-control" xid="input2" bind-ref='ref("default")'></input></td><td xid="td1">
                            <span component="$UI/system/components/justep/button/checkbox"
                              class="x-checkbox" xid="checkbox1" checkedValue="true"
                              bind-ref="ref(&quot;required&quot;)" uncheckedValue="false"/>
                          </td>  
                          <td xid="td1">
                            <span component="$UI/system/components/justep/button/checkbox"
                              class="x-checkbox" xid="checkbox2" checkedValue="true"
                              bind-ref="ref(&quot;unique&quot;)"/>
                          </td>  
                          <td xid="td1">
                            <span component="$UI/system/components/justep/button/checkbox"
                              class="x-checkbox" xid="checkbox3" checkedValue="true"
                              bind-ref="ref(&quot;primary&quot;)"/>
                          </td>  
                          <td xid="td6"> 
                            <a component="$UI/system/components/justep/button/button"
                              class="btn btn-default btn-icon-right" label="数据项检查"
                              xid="dataCheckBtn" icon="icon-android-more" onClick="dataCheckBtnClick"> 
                              <i xid="i12" class="icon-android-more"/>  
                              <span xid="span16">数据项检查</span>
                            </a>
                          </td>
                        </tr> 
                      </tbody> 
                    </table> 
                  </div>  
                  <div class="x-contents-content" xid="content5">
                    <div component="$UI/system/components/justep/row/row" class="x-row"
                      xid="row1"> 
                      <div class="x-col" xid="col2">
                        <div component="$UI/system/components/justep/labelEdit/labelEdit"
                          class="x-label-edit x-label30" xid="labelEdit1"> 
                          <label class="x-label" xid="label1" style="text-align:right;"><![CDATA[数据表名称：]]></label>  
                          <input component="$UI/system/components/justep/input/input"
                            class="form-control x-edit" xid="tableInput" bind-ref="$model.tableNameData.ref(&quot;table&quot;)"/>
                        </div>
                      </div>  
                      <div class="x-col" xid="col3"/>
                    </div>  
                    <div component="$UI/system/components/justep/controlGroup/controlGroup"
                      class="x-control-group" title="字段映射" xid="controlGroup1"> 
                      <div class="x-control-group-title" xid="controlGroupTitle1"> 
                        <span xid="span1"><![CDATA[字段映射]]></span>
                      </div>  
                      <div component="$UI/system/components/justep/toolBar/toolBar"
                        class="x-toolbar form-inline x-toolbar-spliter" xid="toolBar2">
                        <a component="$UI/system/components/justep/button/button"
                          class="btn btn-link btn-icon-left" label="添加" xid="button1" icon="glyphicon glyphicon-plus"
                          onClick="addPropertyMap"> 
                          <i xid="i1" class="glyphicon glyphicon-plus" style="color:#009124;"/>  
                          <span xid="span2">添加</span>
                        </a>  
                        <a component="$UI/system/components/justep/button/button"
                          class="btn btn-link btn-icon-left" label="删除" xid="button3" icon="glyphicon glyphicon-remove"
                          onClick="deletePropertyMap"> 
                          <i xid="i1" class="glyphicon glyphicon-remove"
                            style="color:#B00000;"/>  
                          <span xid="span2">删除</span>
                        </a>
                      </div>  
                      <table component="$UI/system/components/justep/list/list"
                        class="x-list table" xid="list2" data="propertyMappingData"> 
                        <thead xid="thead2"> 
                          <tr xid="tr3"> 
                            <th xid="default2">字段名称</th>  
                            <th xid="default2">表列字段名称</th> 
                          </tr> 
                        </thead>  
                        <tbody class="x-list-template x-min-height" xid="listTemplate2"> 
                          <tr xid="tr4" bind-css="{success:$object==$model.propertyMappingData.getCurrentRow()}"> 
                            <td xid="td2">
                              <div component="$UI/system/components/justep/output/output"
                                class="x-output" xid="output2" bind-ref="ref(&quot;name&quot;)"/>
                            </td>
                            <td xid="td2">
                              <input component="$UI/system/components/justep/input/input"
                                class="form-control" xid="input3" bind-ref='ref("column")'/>
                            </td>
                          </tr> 
                        </tbody> 
                      </table> 
                    </div>
                  </div>  
                  <div class="x-contents-content" xid="content6">
                    <div component="$UI/system/components/justep/toolBar/toolBar"
                      class="x-toolbar form-inline x-toolbar-spliter" xid="toolBar3">
                      <a component="$UI/system/components/justep/button/button"
                        class="btn btn-link btn-icon-left" label="添加" xid="button7" icon="glyphicon glyphicon-plus"
                        onClick="addMethod"> 
                        <i xid="i4" class="glyphicon glyphicon-plus" style="color:#009124;"/>  
                        <span xid="span6">添加</span>
                      </a>  
                      <a component="$UI/system/components/justep/button/button"
                        class="btn btn-link" label="删除method" xid="button6" icon="glyphicon glyphicon-remove"
                        onClick="deleteMethod" style="display:none;"> 
                        <i xid="i4" class="glyphicon glyphicon-remove" style="color:#B00000;"/>  
                        <span xid="span6">删除method</span>
                      </a>
                    </div>
                    <div component="$UI/system/components/justep/row/row" class="x-row"
                      xid="row2" style="height:100%;"> 
                      <div class="x-col" xid="col4" style="border-right:1px solid #ddd;">
                        <table component="$UI/system/components/justep/list/list"
                          class="x-list table" xid="list5" data="methodData"> 
                          <thead xid="thead4"> 
                            <tr xid="tr7"> 
                              <th xid="default6">方法名称</th>
                              <th xid="default6">修改操作</th>
                              <th xid="default6">结果分页</th>
                              <th xid="default6">自定义SQL</th>
                              <th xid="default6" width="140">操作</th>
                            </tr> 
                          </thead>  
                          <tbody class="x-list-template x-min-height" xid="listTemplate4"> 
                            <tr xid="tr8" bind-css="{success:$object==$model.methodData.getCurrentRow()}"> 
                              <td xid="td4" bind-click="td4Click">
                                <div component="$UI/system/components/justep/output/output"
                                  class="x-output" xid="output3" bind-ref="ref(&quot;name&quot;)"/>
                              </td>
                            
  <td xid="td7" bind-click="td4Click">
   <span component="$UI/system/components/justep/button/checkbox" class="x-checkbox" xid="checkbox7" bind-value='ref("modify")' disabled="true" checkedValue="true"></span></td>
  <td xid="td8" bind-click="td4Click">
   <span component="$UI/system/components/justep/button/checkbox" class="x-checkbox" xid="checkbox4" disabled="true" checkedValue='true' bind-value='ref("pageable")'></span></td>
  <td xid="td9" bind-click="td4Click">
   <span component="$UI/system/components/justep/button/checkbox" class="x-checkbox" xid="checkbox8" disabled="true" bind-value='ref("isSql")' checkedValue="true"></span></td><td xid="td6" bind-click="td4Click">
   <a component="$UI/system/components/justep/button/button" class="btn btn-link btn-only-label" label="编辑" xid="editBtn" onClick="editBtnClick">
   <i xid="i3"></i>
   <span xid="span12">编辑</span></a><a component="$UI/system/components/justep/button/button" class="btn btn-link btn-only-label" label="删除" xid="delBtn" onClick="delBtnClick">
   <i xid="i6"></i>
   <span xid="span13">删除</span></a></td></tr> 
                          </tbody> 
                        </table>
                      </div>  
                      <div class="x-col" xid="col5" style="display:none"> 
                        <div component="$UI/system/components/justep/controlGroup/controlGroup"
                          class="x-control-group" title="方法属性" xid="controlGroup3"> 
                          <div class="x-control-group-title" xid="controlGroupTitle3"> 
                            <span xid="span4"><![CDATA[方法属性]]></span>
                          </div>  
                          <span component="$UI/system/components/justep/button/checkbox"
                            class="x-checkbox" xid="checkbox5" label="是否sql" bind-ref="$model.methodData.ref(&quot;type&quot;)"
                            checkedValue="sql" onChange="checkbox5Change"/>
                          <div component="$UI/system/components/justep/labelEdit/labelEdit"
                            class="x-label-edit x-label30" xid="labelEdit3" style="display:none;"> 
                            <label class="x-label" xid="label3"><![CDATA[方法名：]]></label>  
                            <input component="$UI/system/components/justep/input/input"
                              class="form-control x-edit" xid="input5" bind-ref="$model.methodData.ref(&quot;name&quot;)"/>
                          </div>
                          <div component="$UI/system/components/justep/labelEdit/labelEdit"
                            class="x-label-edit x-label30" xid="labelEdit2" style="display:none;"> 
                            <label class="x-label" xid="label2"><![CDATA[返回值：]]></label>  
                            <input component="$UI/system/components/justep/input/input"
                              class="form-control x-edit" xid="input4" bind-ref="$model.methodData.ref(&quot;dataType&quot;)"/>
                          </div>
                          <div xid="div1" bind-visible=" $model.methodData.val(&quot;type&quot;) == &quot;sql&quot;">
                            <span component="$UI/system/components/justep/button/checkbox"
                              class="x-checkbox" xid="checkbox6" label="modify" checkedValue="true"
                              bind-ref="$model.methodData.ref(&quot;modify&quot;)" checked="false" style="display:none;"/>
                            <div component="$UI/system/components/justep/labelEdit/labelEdit"
                              class="x-label-edit x-label30" xid="labelEdit7"> 
                              <label class="x-label" xid="label7"><![CDATA[sql语句：]]></label>  
                              <textarea component="$UI/system/components/justep/textarea/textarea"
                                class="form-control x-edit" xid="textarea1" bind-ref='$model.methodData.ref("sql")'
                                style="height:100px;"/>
                            </div>
                          </div>
                        </div>
                        <div component="$UI/system/components/justep/controlGroup/controlGroup"
                          class="x-control-group" title="参数列表" xid="controlGroup2" style="display:none;"> 
                          <div class="x-control-group-title" xid="controlGroupTitle2"> 
                            <span xid="span3">title</span>
                          </div> 
                        </div>  
                        <div component="$UI/system/components/justep/toolBar/toolBar"
                          class="x-toolbar form-inline x-toolbar-spliter" xid="toolBar4" style="display:none;">
                          <a component="$UI/system/components/justep/button/button"
                            class="btn btn-link" label="添加" xid="button5" icon="glyphicon glyphicon-plus"
                            onClick="addParams"> 
                            <i xid="i2" class="glyphicon glyphicon-plus"
                              style="color:#009124;"/>  
                            <span xid="span5">添加</span>
                          </a>  
                          <a component="$UI/system/components/justep/button/button"
                            class="btn btn-link" label="删除" xid="button4" icon="glyphicon glyphicon-remove"
                            onClick="deleteParams"> 
                            <i xid="i2" class="glyphicon glyphicon-remove"
                              style="color:#B00000;"/>  
                            <span xid="span5">删除</span>
                          </a>
                        </div>  
                        <table component="$UI/system/components/justep/list/list"
                          class="x-list table" xid="list3" data="paramData" style="display:none;"> 
                          <thead xid="thead3"> 
                            <tr xid="tr5"> 
                              <th xid="default5">名称</th>  
                              <th xid="default5">类型</th>
                            </tr> 
                          </thead>  
                          <tbody class="x-list-template x-min-height" xid="listTemplate3"> 
                            <tr xid="tr6" bind-css="{success:$object==$model.paramData.getCurrentRow()}"> 
                              <td xid="td3">
                                <input component="$UI/system/components/justep/input/input"
                                  class="form-control" xid="input6" bind-ref="ref(&quot;name&quot;)"/>
                              </td>
                              <td xid="td3">
                                <select component="$UI/system/components/justep/select/select"
                                  bind-optionsCaption="请选择..." class="form-control"
                                  xid="select3" bind-ref="ref(&quot;dataType&quot;)" bind-options="$model.mapTypeData"
                                  bind-optionsValue="value" bind-optionsLabel="value"/>
                              </td>
                            </tr> 
                          </tbody> 
                        </table>
                      </div> 
                    </div>
                  </div>  
                  <div class="x-contents-content" xid="content7" style="display:none;">
                    <div component="$UI/system/components/justep/toolBar/toolBar"
                      class="x-toolbar form-inline x-toolbar-spliter" xid="toolBar5"
                      style="padding:1px;"> 
                      <a component="$UI/system/components/justep/button/button"
                        class="btn btn-link" label="添加constraints" xid="button10"
                        icon="glyphicon glyphicon-plus" onClick="addValidationBtn"> 
                        <i xid="i5" class="glyphicon glyphicon-plus" style="color:#009124;"/>  
                        <span xid="span10">添加constraints</span>
                      </a>  
                      <a component="$UI/system/components/justep/button/button"
                        class="btn btn-link" label="删除" xid="button11" icon="glyphicon glyphicon-remove"
                        onClick="deleteValidationBtn"> 
                        <i xid="i5" class="glyphicon glyphicon-remove" style="color:#B00000;"/>  
                        <span xid="span10">删除</span>
                      </a> 
                    </div>  
                    <div component="$UI/system/components/justep/list/list"
                      class="x-list" xid="list6" data="constraintsData"> 
                      <ul class="x-list-template" xid="listTemplateUl1"> 
                        <li xid="li2">
                          <div class="panel panel-default" component="$UI/system/components/bootstrap/panel/panel"
                            xid="panel4"> 
                            <div class="panel-heading" xid="heading1"> 
                              <div component="$UI/system/components/justep/row/row"
                                class="x-row" xid="row3"> 
                                <div class="x-col x-col-20 x-col-center x-col-15"
                                  xid="col1">
                                  <h4 class="panel-title" xid="h41"><![CDATA[数据项检查：]]></h4>
                                </div>  
                                <div class="x-col x-col-50 x-col-center" xid="col6">
                                  <div component="$UI/system/components/justep/labelEdit/labelEdit"
                                    class="x-label-edit x-label30" xid="labelEdit4"> 
                                    <label class="x-label" xid="label4"><![CDATA[目标字段名称：]]></label>  
                                    <select component="$UI/system/components/justep/select/select"
                                      class="form-control x-edit" xid="select2" bind-ref="ref(&quot;target&quot;)"
                                      bind-options="$model.fieldData" bind-optionsValue="fieldName"/>
                                  </div>
                                </div>  
                                <div class="x-col x-col-center" xid="col7"> 
                                  <a component="$UI/system/components/justep/button/button"
                                    class="btn btn-link btn-icon-left" label="添加子选项"
                                    xid="addChild" icon="icon-android-add"> 
                                    <i xid="i10" class="icon-android-add"/>  
                                    <span xid="span15">添加子选项</span>
                                  </a>
                                  <a component="$UI/system/components/justep/button/button"
                                    class="btn btn-link btn-icon-left" label="删除"
                                    xid="button8" icon="icon-android-close"> 
                                    <i xid="i3" class="icon-android-close"/>  
                                    <span xid="span12">删除</span>
                                  </a>
                                </div>
                              </div>
                            </div>  
                            <div class="panel-body" xid="body1">
                              <table component="$UI/system/components/justep/list/list"
                                class="x-list table" xid="list4" data="constraintsData"> 
                                <thead xid="thead5"> 
                                  <tr xid="tr9"> 
                                    <th xid="default7">名称</th>  
                                    <th xid="default7">类型</th>  
                                    <th xid="default7">表达式</th>  
                                    <th xid="default7">错误信息</th> 
                                  </tr> 
                                </thead>  
                                <tbody class="x-list-template x-min-height" xid="listTemplate5"> 
                                  <tr xid="tr10" bind-css="{success:$object==$model.constraintsData.getCurrentRow()}"> 
                                    <td xid="td5" style="width:20%;"> 
                                      <div component="$UI/system/components/justep/output/output"
                                        class="x-output" xid="output5" bind-ref="ref(&quot;property&quot;)"/>
                                    </td>  
                                    <td xid="td5" style="width:30%;"> 
                                      <div component="$UI/system/components/justep/output/output"
                                        class="x-output" xid="output6" bind-ref="ref(&quot;type&quot;)"/>
                                    </td>  
                                    <td xid="td5" style="width:20%;"> 
                                      <input component="$UI/system/components/justep/input/input"
                                        class="form-control" xid="input7" bind-ref="ref(&quot;expr&quot;)"/>
                                    </td>  
                                    <td xid="td5"> 
                                      <input component="$UI/system/components/justep/input/input"
                                        class="form-control" xid="input10" bind-ref="ref(&quot;errMsg&quot;)"/>
                                    </td> 
                                  </tr> 
                                </tbody> 
                              </table>
                            </div> 
                          </div>
                        </li>
                      </ul> 
                    </div> 
                  </div>
                </div> 
              </div> 
            </div> 
          </div> 
        </div>  
        <div class="x-contents-content" xid="content3"> 
          <label xid="loadingLabel" style="display:block;width:150px;margin:auto;margin-top:50px;font-size:20px;color:#aaa;"
            class="source-loading-label">正在加载...</label> 
        </div> 
      </div> 
    </div>  
    <div class="x-panel-bottom" xid="bottom1" height="36"> 
      <div component="$UI/system/components/justep/button/buttonGroup" class="btn-group "
        tabbed="true" xid="buttonGroup2"> 
        <a component="$UI/system/components/justep/button/button" class="btn btn-default"
          label="设计" xid="designBtn" style="width:80px;" target="content2" onClick="designBtnClick"> 
          <i xid="i18"/>  
          <span xid="span17">设计</span> 
        </a>  
        <a component="$UI/system/components/justep/button/button" class="btn btn-default"
          label="源码" xid="sourceBtn" style="width:80px;" target="content3" onClick="sourceBtnClick"> 
          <i xid="i17"/>  
          <span xid="span18">源码</span> 
        </a> 
      </div> 
    </div> 
  </div>  
  <span component="$UI/system/components/justep/windowDialog/windowDialog" xid="addValidationDialog"
    src="./addValidation.w" title="添加规则" showTitle="true" status="normal" forceRefreshOnOpen="true"
    width="1200px" height="820px" onReceived="addValidationDialogReceived"/>
  <span component="$UI/system/components/justep/windowDialog/windowDialog" xid="addMethodDialog"
    src="./addMethod.w" title="添加方法" showTitle="true" status="normal" forceRefreshOnOpen="true"
    width="700" height="640" onReceived="addMethodDialogReceived"/>
  <span component="$UI/system/components/justep/windowDialog/windowDialog" xid="addPropertyMappingDialog"
    title="添加关系映射" showTitle="true" src="./addPropertyMapping.w" status="normal" forceRefreshOnOpen="true"
    width="800" height="600" onReceived="addPropertyMappingDialogReceived"/>
  <span component="$UI/system/components/justep/windowDialog/windowDialog" xid="addPropertyDialog"
    src="$UI/system/designer/service/ontology/addPropAnddataType.w" title="添加新字段" showTitle="true" status="normal" forceRefreshOnOpen="true"
    width="380px" height="400px" onReceived="addPropertyDialogReceived"/>
</div>
