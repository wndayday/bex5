<?xml version="1.0" encoding="utf-8"?>

<div xmlns="http://www.w3.org/1999/xhtml" xid="window" class="window" component="$UI/system/components/justep/window/window"
  design="device:pc;">  
  <div component="$UI/system/components/justep/model/model" xid="model" style="height:auto;top:162px;left:728px;"
    onParamsReceive="modelParamsReceive"> 
    <div component="$UI/system/components/justep/data/data" autoLoad="true"
      xid="protocolData" idColumn="pName"> 
      <column label="协议名称" name="pName" type="String" xid="xid2"/>  
      <column label="是否选中" name="check" type="String" xid="xid5"/>  
      <data xid="default2">[{"pName":"Thrift","check":"0"},{"pName":"GRPC","check":"0"}]</data>
    </div>  
    <div component="$UI/system/components/justep/data/data" autoLoad="true"
      xid="devLanguageData" idColumn="name"> 
      <column label="语言名称" name="name" type="String" xid="xid1"/>  
      <data xid="default1">[{"name":"Java"},{"name":"PHP"}]</data>
    </div>  
    <div component="$UI/system/components/justep/data/data" autoLoad="true"
      xid="dataBase" idColumn="baseType">
      <column label="数据库类型" name="baseType" type="String" xid="xid6"/>  
      <data xid="default5">[]</data>
    </div>  
    <div component="$UI/system/components/justep/data/data" autoLoad="true"
      xid="httpData" idColumn="name">
      <column label="协议名称" name="name" type="String" xid="xid7"/>  
      <data xid="default4">[{"name":"HTTP"},{"name":"HTTPS"}]</data>
    </div>  
    <div component="$UI/system/components/justep/data/data" autoLoad="true"
      xid="agentConfig" idColumn="url">
      <column label="服务端口" name="port" type="String" xid="xid14"/>
      <column label="首页地址" name="url" type="String" xid="xid14"/>  
      <column label="心跳测试" name="test" type="String" xid="xid15"/>
    </div>  
    <div component="$UI/system/components/justep/data/data" autoLoad="true"
      xid="sourceData" idColumn="sourceName" onValueChange="sourceDataValueChange"
      confirmDelete="false" autoNew="false"> 
      <column label="名称" name="sourceName" type="String" xid="xid8"/>  
      <column label="连接类型" name="cType" type="String" xid="xid9"/>  
      <column label="数据库" name="baseType" type="String" xid="xid10"/>  
      <column label="URL" name="url" type="String" xid="xid11"/>  
      <column label="用户名" name="uName" type="String" xid="xid12"/>  
      <column label="密码" name="pwd" type="String" xid="xid13"/>  
      <column label="显示SQL" name="show_sql" type="String" xid="xid17"/>  
      <column label="DDL" name="ddl_auto" type="String" xid="xid18"/>
    </div>  
    <div component="$UI/system/components/justep/data/data" autoLoad="true"
      xid="patternData" idColumn="name"> 
      <column label="" name="name" type="String" xid="column1"/>  
      <column label="中文名" name="cN_name" type="String" xid="column2"/>  
      <data xid="default6">[{"name":"general","cN_name":"普通服务"},{"name":"agent","cN_name":"代理服务"}]</data>
    </div>  
    <div component="$UI/system/components/justep/data/data" autoLoad="true"
      xid="cTypeData" idColumn="cType">
      <column label="连接类型" name="cType" type="String" xid="xid3"/>
    </div>  
    <div component="$UI/system/components/justep/data/data" autoLoad="true"
      xid="showSql" idColumn="show_sql">
      <column label="是否显示sql" name="show_sql" type="String" xid="xid4"/>
    </div>  
    <div component="$UI/system/components/justep/data/data" autoLoad="true"
      xid="ddlAuto" idColumn="ddl_auto">
      <column label="加载方式" name="ddl_auto" type="String" xid="xid16"/>
    </div>  
    <div component="$UI/system/components/justep/data/data" autoLoad="true"
      xid="docData" idColumn="domin" autoNew="false"> 
      <column label="域名地址" name="domin" type="String" xid="xid23"/>  
      <column label="输出路径" name="output" type="String" xid="xid24"/>
    </div>  
    <div component="$UI/system/components/justep/data/data" autoLoad="true"
      xid="javaConfigData" idColumn="configName"> 
      <column label="配置项名称" name="configName" type="String" xid="xid21"/>  
      <column label="状态" name="status" type="String" xid="xid22"/>
    </div>
  </div>  
  <div component="$UI/system/components/justep/panel/panel" class="x-panel x-full"
    xid="panel1"> 
    <div class="x-panel-content" xid="content1" style="padding: 15px;"> 
      <div xid="div1" style="display:flex;justify-content: center;"> 
        <div component="$UI/system/components/justep/row/row" class="x-row"
          xid="row1"> 
          <div class="x-col" xid="col1">
            <div component="$UI/system/components/justep/labelEdit/labelEdit"
              class="x-label-edit x-label30" xid="labelEdit1"> 
              <label class="x-label" xid="label1" style="text-align:right;">名称：</label>  
              <input component="$UI/system/components/justep/input/input" class="form-control x-edit"
                xid="name" bind-ref="name" placeHolder="微服务名称"/>
            </div>
          </div>  
          <div class="x-col" xid="col2">
            <div component="$UI/system/components/justep/labelEdit/labelEdit"
              class="x-label-edit x-label30" xid="labelEdit6"> 
              <label class="x-label" xid="label6" style="text-align:right;"><![CDATA[开发语言：]]></label>  
              <select component="$UI/system/components/justep/select/select" class="form-control x-edit"
                xid="select1" bind-optionsValue="name" bind-options="devLanguageData"
                onChange="select1Change" bind-ref="languageVal"/>
            </div>
          </div>  
          <div class="x-col" xid="col12">
            <div component="$UI/system/components/justep/labelEdit/labelEdit" class="x-label-edit x-label30" xid="labelEdit26">
   <label class="x-label" xid="label24" style="text-align:right;"><![CDATA[模式：]]></label>
   <div class="x-edit" xid="div6" style="height:38px;padding:8px 12px;"><span xid="span6" bind-text="patternName"></span></div></div></div>
        </div>
      </div>
      <div xid="javaConfig" bind-visible='(languageVal.get()=="Java")  &amp;&amp; (patternName.get()=="普通服务")'> 
        <div class="panel panel-default" component="$UI/system/components/bootstrap/panel/panel"
          xid="panel3"> 
          <div class="panel-heading" xid="heading6"> 
            <h4 class="panel-title" xid="h46"><![CDATA[服务治理功能选项]]></h4>
          </div>  
          <div class="panel-body" xid="body2"> 
            <div component="$UI/system/components/justep/list/list" class="x-list"
              xid="list2" data="javaConfigData"> 
              <ul class="x-list-template" xid="listTemplateUl3"> 
                <li xid="li3" style="display:inline-block;"> 
                  <div component="$UI/system/components/justep/labelEdit/labelEdit"
                    class="x-label-edit x-label100" xid="labelEdit15" style="justify-content: flex-start;"> 
                    <span component="$UI/system/components/justep/button/checkbox"
                      class="x-checkbox" xid="javaCheckbox" onChange="javaCheckboxChange"
                      bind-checked=" val(&quot;status&quot;)==&quot;1&quot;"/>  
                    <label class="x-label" xid="label14" bind-text="val(&quot;configName&quot;)"/>
                  </div> 
                </li> 
              </ul> 
            </div>
          </div> 
        </div> 
      </div>
      <div class="x-contents-content" xid="generalModel" bind-visible='patternName.get()=="普通服务"'>
        <div class="panel panel-default" component="$UI/system/components/bootstrap/panel/panel"
          xid="panel2"> 
          <div class="panel-heading" xid="heading1"> 
            <h4 class="panel-title" xid="h41"><![CDATA[RPC 配置选项]]></h4>
          </div>  
          <div class="panel-body" xid="body1">
            <div component="$UI/system/components/justep/list/list" class="x-list"
              xid="list1" data="protocolData"> 
              <ul class="x-list-template" xid="listTemplateUl1"> 
                <li xid="li1" style="display:inline-block;"> 
                  <div component="$UI/system/components/justep/labelEdit/labelEdit"
                    class="x-label-edit x-label100" xid="labelEdit5" style="justify-content: flex-start;"> 
                    <span component="$UI/system/components/justep/button/checkbox"
                      class="x-checkbox" xid="protocolCheck" onChange="protocolCheckChange"
                      bind-checked=" val(&quot;check&quot;) ==&quot;1&quot;"/>  
                    <label class="x-label" xid="label5" bind-text="val(&quot;pName&quot;)"/>
                  </div> 
                </li> 
              </ul> 
            </div>
          </div>  
          <div class="panel-footer" xid="footer1" style="display:none;"/>
        </div>  
        
        <div class="panel panel-default" component="$UI/system/components/bootstrap/panel/panel"
          xid="panel4"> 
          <div class="panel-heading" xid="heading2"> 
            <h4 class="panel-title" xid="h42"><![CDATA[数据源配置选项]]></h4>
            <a component="$UI/system/components/justep/button/button" class="btn btn-default btn-xs btn-only-icon"
              label="button" xid="addBtn" icon="linear linear-bus" onClick="addBtnClick"
              style="float:right;margin-top:-20px;"> 
              <i xid="i3" class="linear linear-bus"/>  
              <span xid="span3"/>
            </a>
          </div>  
          <div class="panel-footer" xid="footer2" style="display:none;"/>  
          <div class="panel-body" xid="body6"> 
            <div component="$UI/system/components/justep/list/list" class="x-list"
              xid="sourceList" data="sourceData" autoLoad="true"> 
              <ul class="x-list-template" xid="listTemplateUl2"> 
                <li xid="li2" class="source-model"> 
                  <div xid="div3" style="display:none;justify-content: flex-start;display:none;"> 
                    <div component="$UI/system/components/justep/labelEdit/labelEdit"
                      class="x-label-edit x-label30" xid="labelEdit3"> 
                      <label class="x-label" xid="label13" bind-text="label(&quot;sourceName&quot;)"/>  
                      <input component="$UI/system/components/justep/input/input"
                        class="form-control x-edit" xid="input10" bind-ref="ref(&quot;sourceName&quot;)"
                        onChange="input10Change"/>
                    </div>  
                    <div component="$UI/system/components/justep/labelEdit/labelEdit"
                      class="x-label-edit x-label30" xid="labelEdit12" style="margin: 0 .5em; width:200px;"> 
                      <label class="x-label" xid="label12" bind-text="label(&quot;cType&quot;)"
                        style="width:45%"/>  
                      <select component="$UI/system/components/justep/select/select"
                        class="form-control x-edit" xid="select5" bind-ref="ref(&quot;cType&quot;)"
                        bind-optionsValue="cType" bind-options="$model.cTypeData"/>
                    </div>
                    <div component="$UI/system/components/justep/labelEdit/labelEdit"
                      class="x-label-edit x-label30" xid="labelEdit7" style="width:250px;"> 
                      <label class="x-label" xid="label7" style="width:40%;"
                        bind-text="label(&quot;baseType&quot;)"/>  
                      <select component="$UI/system/components/justep/select/select"
                        class="form-control x-edit" xid="select2" bind-ref="ref(&quot;baseType&quot;)"
                        bind-optionsValue="baseType" bind-options="$model.dataBase"/>
                    </div> 
                  </div>  
                  <div xid="url" style="display:none;display:flex;justify-content: flex-start;display:none;"> 
                    <div component="$UI/system/components/justep/labelEdit/labelEdit"
                      class="x-label-edit x-label30" xid="labelEdit8" style="width:250px;flex:1;"> 
                      <label class="x-label" xid="label4" style="width:46%;"
                        bind-text="label(&quot;show_sql&quot;)"/>  
                      <select component="$UI/system/components/justep/select/select"
                        class="form-control x-edit" xid="select3" bind-ref="ref(&quot;show_sql&quot;)"
                        bind-optionsValue="show_sql" bind-options="$model.showSql"/>
                    </div>  
                    <div component="$UI/system/components/justep/labelEdit/labelEdit"
                      class="x-label-edit x-label30" xid="labelEdit11" style="width:250px;flex:1;"> 
                      <label class="x-label" xid="label4" style="width:40%;"
                        bind-text="label(&quot;ddl_auto&quot;)"/>  
                      <select component="$UI/system/components/justep/select/select"
                        class="form-control x-edit" xid="select4" bind-ref="ref(&quot;ddl_auto&quot;)"
                        bind-optionsValue="ddl_auto" bind-options="$model.ddlAuto"/>
                    </div>  
                    <div component="$UI/system/components/justep/labelEdit/labelEdit"
                      class="x-label-edit" xid="labelEdit16" style="flex:1.6;"> 
                      <label class="x-label" xid="label16" bind-text="label(&quot;url&quot;)"/>  
                      <input component="$UI/system/components/justep/input/input"
                        class="form-control x-edit" xid="input5" placeHolder="例如：jdbc:mysql://192.168.1.112:3306/account"
                        bind-ref="ref(&quot;url&quot;)"/>
                    </div> 
                  </div>
                  <div xid="div2" style="display:flex;justify-content:space-between;align-items: center;display:none;"> 
                    <div component="$UI/system/components/justep/labelEdit/labelEdit"
                      class="x-label-edit x-label30" xid="labelEdit10"> 
                      <label class="x-label" xid="label8" bind-text="label(&quot;uName&quot;)"/>  
                      <input component="$UI/system/components/justep/input/input"
                        class="form-control x-edit" xid="input3" bind-ref="ref(&quot;uName&quot;)"/>
                    </div>  
                    <div component="$UI/system/components/justep/labelEdit/labelEdit"
                      class="x-label-edit x-label30" xid="labelEdit13" style="margin: 0 .5em;"> 
                      <label class="x-label" xid="label3" bind-text="label(&quot;pwd&quot;)"/>  
                      <input component="$UI/system/components/justep/input/password"
                        class="form-control x-edit" xid="password2" bind-ref="ref(&quot;pwd&quot;)"/>
                    </div>  
                    <div xid="div2"> 
                      <a component="$UI/system/components/justep/button/button"
                        class="btn btn-default btn-only-label pull-right" label="删除"
                        xid="deleteBtn" onClick="deleteBtnClick"> 
                        <i xid="i4"/>  
                        <span xid="span4">删除</span>
                      </a> 
                    </div> 
                  </div>  
                  <div xid="div4"> 
                    <div component="$UI/system/components/bootstrap/row/row"
                      class="row" xid="row2"> 
                      <div class="col col-xs-4" xid="col3"> 
                        <div component="$UI/system/components/justep/labelEdit/labelEdit"
                          class="x-label-edit x-label25" xid="labelEdit2"> 
                          <label class="x-label" xid="label18" bind-text="label(&quot;sourceName&quot;)"
                            style="text-align:right;"/>  
                          <input component="$UI/system/components/justep/input/input"
                            class="form-control x-edit" xid="input6" bind-ref="ref(&quot;sourceName&quot;)"/>
                        </div> 
                      </div>  
                      <div class="col col-xs-4" xid="col4"> 
                        <div component="$UI/system/components/justep/labelEdit/labelEdit"
                          class="x-label-edit x-label25" xid="labelEdit17"> 
                          <label class="x-label" xid="label17" bind-text="label(&quot;cType&quot;)"
                            style="text-align:right;"/>  
                          <select component="$UI/system/components/justep/select/select"
                            class="form-control x-edit" xid="select8" bind-ref="ref(&quot;cType&quot;)"
                            bind-optionsValue="cType" bind-options="$model.cTypeData"/>
                        </div> 
                      </div>  
                      <div class="col col-xs-4" xid="col5"> 
                        <div component="$UI/system/components/justep/labelEdit/labelEdit"
                          class="x-label-edit x-label25" xid="labelEdit18"> 
                          <label class="x-label" xid="label15" bind-text="label(&quot;baseType&quot;)"
                            style="text-align:right;"/>  
                          <select component="$UI/system/components/justep/select/select"
                            class="form-control x-edit" xid="select8" bind-ref="ref(&quot;baseType&quot;)"
                            bind-optionsValue="baseType" bind-options="$model.dataBase"/>
                        </div> 
                      </div> 
                    </div>  
                    <div component="$UI/system/components/bootstrap/row/row"
                      class="row" xid="row3"> 
                      <div class="col col-xs-4" xid="col7"> 
                        <div component="$UI/system/components/justep/labelEdit/labelEdit"
                          class="x-label-edit x-label25" xid="labelEdit19"> 
                          <label class="x-label" xid="label15" bind-text="label(&quot;url&quot;)"
                            style="text-align:right;"/>  
                          <input component="$UI/system/components/justep/input/input"
                            class="form-control x-edit" xid="input4" placeHolder="jdbc:mysql://127.0.0.1:3306/test"
                            bind-ref="ref(&quot;url&quot;)"/>
                        </div> 
                      </div>  
                      <div class="col col-xs-4" xid="col11"> 
                        <div component="$UI/system/components/justep/labelEdit/labelEdit"
                          class="x-label-edit x-label25" xid="labelEdit17"> 
                          <label class="x-label" xid="label19" bind-text="label(&quot;uName&quot;)"
                            style="text-align:right;"/>  
                          <input component="$UI/system/components/justep/input/input"
                            class="form-control x-edit" xid="input7" bind-ref="ref(&quot;uName&quot;)"/>
                        </div> 
                      </div>
                      <div class="col col-xs-4" xid="col9"> 
                        <div component="$UI/system/components/justep/labelEdit/labelEdit"
                          class="x-label-edit x-label25" xid="labelEdit18"> 
                          <label class="x-label" xid="label18" bind-text="label(&quot;pwd&quot;)"
                            style="text-align:right;"/>  
                          <input component="$UI/system/components/justep/input/password"
                            class="form-control x-edit" xid="password1" bind-ref="ref(&quot;pwd&quot;)"/>
                        </div> 
                      </div>
                    </div>  
                    <div component="$UI/system/components/bootstrap/row/row"
                      class="row" xid="row4"> 
                      <div class="col col-xs-4" xid="col8"> 
                        <div component="$UI/system/components/justep/labelEdit/labelEdit"
                          class="x-label-edit x-label25" xid="labelEdit23"> 
                          <label class="x-label" xid="label19" bind-text="label(&quot;show_sql&quot;)"
                            style="text-align:right;"/>  
                          <select component="$UI/system/components/justep/select/select"
                            class="form-control x-edit" xid="select6" bind-ref="ref(&quot;show_sql&quot;)"
                            bind-optionsValue="show_sql" bind-options="$model.showSql"/>
                        </div> 
                      </div>
                      <div class="col col-xs-4" xid="col6"> 
                        <div component="$UI/system/components/justep/labelEdit/labelEdit"
                          class="x-label-edit x-label25" xid="labelEdit24"> 
                          <label class="x-label" xid="label2" bind-text="label(&quot;ddl_auto&quot;)" style="text-align:right;"/>  
                          <select component="$UI/system/components/justep/select/select"
                            class="form-control x-edit" xid="select9" bind-ref="ref(&quot;ddl_auto&quot;)"
                            bind-optionsValue="ddl_auto" bind-options="$model.ddlAuto"/>
                        </div> 
                      </div>
                      <div class="col col-xs-4" xid="col10"> 
                        <a component="$UI/system/components/justep/button/button"
                          class="btn btn-default btn-sm btn-only-label pull-right"
                          label="删除" xid="button1" onClick="deleteBtnClick"> 
                          <i xid="i5"/>  
                          <span xid="span5">删除</span>
                        </a> 
                      </div>
                    </div> 
                  </div>
                </li> 
              </ul> 
            </div> 
          </div>
        </div> 
      <div class="panel panel-default" component="$UI/system/components/bootstrap/panel/panel" xid="panel5"> 
          <div class="panel-heading" xid="heading3"> 
            <h4 class="panel-title" xid="h43"><![CDATA[API 文档配置选项]]></h4>
          </div>  
          <div class="panel-body" xid="body3"> 
            <div component="$UI/system/components/justep/row/row" class="x-row" xid="row5"> 
              <div class="x-col" xid="col13">
                <div component="$UI/system/components/justep/labelEdit/labelEdit" class="x-label-edit x-label25" xid="labelEdit4"> 
                  <label class="x-label" xid="label9" style="text-align:right;">访问地址：</label>  
                  <input component="$UI/system/components/justep/input/input" class="form-control x-edit" xid="input2" placeHolder="例如：http://localhost:3000" bind-ref="$model.docData.ref(&quot;domin&quot;)" />
                </div>
              </div>  
              <div class="x-col" xid="col15">
                <div component="$UI/system/components/justep/labelEdit/labelEdit" class="x-label-edit x-label25" xid="labelEdit14"> 
                  <label class="x-label" xid="label11" style="text-align:right;">输出路径：</label>  
                  <input component="$UI/system/components/justep/input/input" class="form-control x-edit" xid="input1" bind-ref="$model.docData.ref(&quot;output&quot;)" />
                </div>
              </div>
            </div> 
          </div> 
        </div></div>
      <div class="x-contents-content" xid="agentModel" bind-visible='patternName.get()=="代理服务"'>
        <div class="panel panel-default" component="$UI/system/components/bootstrap/panel/panel"
          xid="panel7"> 
          <div class="panel-heading" xid="heading5"> 
            <h4 class="panel-title" xid="h45"><![CDATA[代理服务配置]]></h4>
          </div>  
          <div class="panel-body" xid="body5"> 
            <div component="$UI/system/components/justep/row/row" class="x-row"
              xid="row6"> 
              <div class="x-col" xid="col16">
                <div component="$UI/system/components/justep/labelEdit/labelEdit"
                  class="x-label-edit x-label25" xid="labelEdit25"> 
                  <label class="x-label" xid="label23" style="text-align:right;"><![CDATA[服务端口：]]></label>  
                  <div component="$UI/system/components/justep/output/output"
                    class="x-output x-edit form-control" xid="output2"/>
                </div>
              </div>  
              <div class="x-col" xid="col18">
                <div component="$UI/system/components/justep/labelEdit/labelEdit"
                  class="x-label-edit x-label25" xid="labelEdit20"> 
                  <label class="x-label" xid="label20" style="text-align:right;"><![CDATA[服务协议：]]></label>  
                  <select component="$UI/system/components/justep/select/select"
                    class="form-control x-edit" xid="select7" bind-options="httpData"
                    bind-optionsValue="name" bind-ref="httpName"/>
                </div>
              </div>
            </div>  
            <div component="$UI/system/components/justep/row/row" class="x-row"
              xid="row7"> 
              <div class="x-col" xid="col19">
                <div component="$UI/system/components/justep/labelEdit/labelEdit"
                  class="x-label-edit x-label25" xid="labelEdit21"> 
                  <label class="x-label" xid="label21" style="text-align:right;"><![CDATA[URL：]]></label>  
                  <input component="$UI/system/components/justep/input/input"
                    class="form-control x-edit" xid="input8" bind-ref="$model.agentConfig.ref(&quot;url&quot;)"/>
                </div>
              </div>  
              <div class="x-col" xid="col21">
                <div component="$UI/system/components/justep/labelEdit/labelEdit"
                  class="x-label-edit x-label25" xid="labelEdit22"> 
                  <label class="x-label" xid="label22" style="text-align:right;"><![CDATA[Test：]]></label>  
                  <input component="$UI/system/components/justep/input/input"
                    class="form-control x-edit" xid="input9" bind-ref="$model.agentConfig.ref(&quot;test&quot;)"/>
                </div>
              </div>
            </div> 
          </div>  
          <div class="panel-footer" xid="footer5" style="display:none;"/>
        </div>
      </div> 
    </div>  
    <div class="x-panel-bottom" xid="bottom1"> 
      <div xid="div5" style="padding-right:30px;">
        <a component="$UI/system/components/justep/button/button" class="btn btn-link btn-only-label x-dialog-button"
          label="取消" xid="cancelBtn" onClick="{operation:'window.close'}"> 
          <i xid="i1"/>  
          <span xid="span1">取消</span> 
        </a>
        <a component="$UI/system/components/justep/button/button" class="btn btn-primary x-dialog-button"
          label="确定" xid="OKBtn" onClick="OKBtnClick"> 
          <i xid="i2"/>  
          <span xid="span2">确定</span> 
        </a>
      </div>
    </div> 
  </div> 
</div>
