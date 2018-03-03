<?xml version="1.0" encoding="utf-8"?>

<div xmlns="http://www.w3.org/1999/xhtml" xid="window" class="window" component="$UI/system/components/justep/window/window"
  design="device:m;">  
  <div component="$UI/system/components/justep/model/model" xid="model" style="height:auto;top:317px;left:529px;"
    onLoad="modelLoad" onParamsReceive="modelParamsReceive">
    <div component="$UI/system/components/justep/data/data" autoLoad="true"
      xid="basicData" idColumn="name">
      <column label="参数名称" name="name" type="String" xid="xid1"/>  
      <column label="数据类型" name="dataType" type="String" xid="xid3"/>
    </div>  
    <div component="$UI/system/components/justep/data/data" autoLoad="true"
      xid="assemblyData" idColumn="value">
      <column label="集合值" name="value" type="String" xid="xid4"/>
    </div>  
    <div component="$UI/system/components/justep/data/data" autoLoad="true"
      xid="modeTypeData" idColumn="type">
      <column label="数据类型" name="type" type="String" xid="xid5"/>
    </div>  
    <div component="$UI/system/components/justep/data/data" autoLoad="true"
      xid="qutoData" idColumn="name">
      <column isCalculate="false" label="名称" name="name" type="String" xid="xid6"></column><column label="集合类型" name="dataType" type="String" xid="xid7"/>
    </div>
  <div component="$UI/system/components/justep/data/data" autoLoad="true" xid="nameData" idColumn="name"><column label="名称" name="name" type="String" xid="xid2"></column></div></div>  
  <div component="$UI/system/components/justep/panel/panel" class="x-panel x-full"
    xid="panel2"> 
    <div class="x-panel-content" xid="content3"> 
      <div xid="div3">
                  <div component="$UI/system/components/justep/labelEdit/labelEdit" class="x-label-edit x-label30" xid="labelEdit1"> 
                    <label class="x-label" xid="label1" style="text-align:right;"><![CDATA[名称：]]></label>  
                    <input component="$UI/system/components/justep/input/input" class="form-control x-edit" xid="input3" bind-ref='$model.nameData.ref("name")' style="border:1px solid #aaa;" />
                  </div>
                </div><div component="$UI/system/components/justep/tabs/tabs" class="x-tabs"
        xid="tabs1"> 
        <div component="$UI/system/components/justep/panel/panel" class="x-panel"
          xid="panel1"> 
          <div class="x-panel-top" xid="top1"> 
            <ul class="nav nav-tabs" xid="navs1"> 
              <li class="active" xid="li1"> 
                <a content="tabContent_1" xid="tabItem1"><![CDATA[基本]]></a> 
              </li>  
              <li xid="li2"> 
                <a content="tabContent_2" xid="tabItem2"><![CDATA[引用]]></a> 
              </li> 
            </ul> 
          </div>  
          <div class="x-panel-content" xid="content2"> 
            <div component="$UI/system/components/justep/contents/contents"
              class="x-contents" active="0" xid="contents1" onActiveChange="contents1ActiveChange"> 
              <div class="x-contents-content active" xid="content1"> 
                
                <div xid="div4" class="sunDiv" style="display:none;"> 
                  <table component="$UI/system/components/justep/list/list" class="x-list"
                    xid="list4" style="width:100%;" data="basicData"> 
                    <thead xid="thead2"> 
                      <tr xid="tr3"> 
                        <th xid="default6" style="width:160px">名称</th>  
                        <th xid="default6" style="width:160px">集合</th>  
                        <th xid="default6" style="width:120px">数据类型</th>  
                        <th xid="default6" style="width:30px">操作</th>
                      </tr> 
                    </thead>  
                    <tbody class="x-list-template" xid="listTemplate2"> 
                      <tr xid="tr4"> 
                        <td xid="td2"> 
                          <input component="$UI/system/components/justep/input/input"
                            class="form-control" xid="input2" bind-ref="ref(&quot;name&quot;)"/>
                        </td>  
                        <td xid="td5" style="position:relative;"> 
                          <select component="$UI/system/components/justep/select/select"
                            bind-optionsCaption="请选择..." class="form-control" xid="select2"
                            bind-ref="ref(&quot;assembly&quot;)" bind-options="$model.assemblyData"
                            bind-optionsValue="value"/>
                        </td>  
                        <td xid="td4"> 
                          <select component="$UI/system/components/justep/select/select"
                            bind-optionsCaption="请选择..." class="form-control" xid="select4"
                            bind-optionsValue="type" bind-ref="ref(&quot;dataType&quot;)" bind-options="$model.modeTypeData"/>
                        </td>  
                        <td xid="td1" style="text-align:center;"> 
                          <a component="$UI/system/components/justep/button/button"
                            class="btn btn-link btn-only-label" label="删除" xid="removeBtn"
                            onClick="removeBtnClick"> 
                            <i xid="i3"/>  
                            <span xid="span3">删除</span>
                          </a> 
                        </td> 
                      </tr> 
                    </tbody> 
                  </table>  
                  
                </div>  
                <div xid="div6">
                  <div component="$UI/system/components/justep/labelEdit/labelEdit"
                    class="x-label-edit x-label30" xid="labelEdit2"> 
                    <label class="x-label" xid="label2" style="text-align:right;"><![CDATA[数据类型：]]></label>  
                    <select component="$UI/system/components/justep/select/select"
                      class="form-control x-edit" xid="select3" bind-ref="$model.basicData.ref(&quot;dataType&quot;)"
                      bind-options="modeTypeData" bind-optionsValue="type" style="border:1px solid #aaa;"/>
                  </div>
                </div>
              </div>  
              <div class="x-contents-content" xid="quoteContent">
                <div xid="div7" style="display:none"> 
                  <div component="$UI/system/components/justep/labelEdit/labelEdit"
                    class="x-label-edit x-label30" xid="labelEdit3"> 
                    <label class="x-label" xid="label3" style="text-align:right">名称：</label>  
                    <input component="$UI/system/components/justep/input/input"
                      class="form-control x-edit" xid="input4" bind-ref="$model.qutoData.ref(&quot;name&quot;)"
                      style="border:1px solid #aaa;"/>
                  </div> 
                </div>  
                <div xid="div5">
   <div component="$UI/system/components/justep/labelEdit/labelEdit" class="x-label-edit x-label30" xid="labelEdit6">
    <label class="x-label" xid="label6" style="text-align:right">集合：</label>
    <span component="$UI/system/components/justep/button/checkbox" class="x-checkbox form-control x-edit" xid="checkbox1" onChange="checkbox1Change" bind-checked='isAssembly.get()=="1"'></span></div> </div><div xid="div8"> 
                  <div component="$UI/system/components/justep/labelEdit/labelEdit"
                    class="x-label-edit x-label30" xid="labelEdit4"> 
                    <label class="x-label" xid="label4" style="text-align:right"><![CDATA[引用对象：]]></label>  
                    <select component="$UI/system/components/justep/select/select"
                      class="form-control x-edit" xid="select5" bind-ref="$model.qutoData.ref(&quot;dataType&quot;)"
                      bind-options="assemblyData" bind-optionsValue="value" style="border:1px solid #aaa;"/>
                  </div> 
                </div>
              </div> 
            </div> 
          </div> 
        </div> 
      </div> 
    </div>  
    <div class="x-panel-bottom" xid="bottom2"> 
      <a component="$UI/system/components/justep/button/button" class="btn btn-link pull-right"
        label="取消" style="margin-right:12%" xid="NOBtn" onClick="NOBtnClick"> 
        <i xid="i1"/>  
        <span xid="span1">取消</span>
      </a>  
      <a component="$UI/system/components/justep/button/button" class="btn btn-default pull-right"
        label="确定" style="margin-right:20px;" xid="OkBtn" onClick="OkBtnClick"> 
        <i xid="i2"/>  
        <span xid="span2">确定</span>
      </a> 
    </div>
  </div> 
</div>
