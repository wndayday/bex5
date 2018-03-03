<?xml version="1.0" encoding="utf-8"?>

<div xmlns="http://www.w3.org/1999/xhtml" xid="window" class="window" component="$UI/system/components/justep/window/window"
  design="device:pc;">  
  <div component="$UI/system/components/justep/model/model" xid="model" style="height:auto;top:504px;left:37px;"
    onParamsReceive="modelParamsReceive"> 
    <div component="$UI/system/components/justep/data/data" autoLoad="true"
      xid="strategyData" idColumn="sName"> 
      <column label="策略名称" name="sName" type="String" xid="xid3"/>  
      <column label="是否选中" name="state" type="String" xid="xid6"/>  
      <data xid="default3">[{"sName":"Thrift","state":"0"},{"sName":"GRPC","state":"0"}]</data>
    </div>  
    <div component="$UI/system/components/justep/data/data" autoLoad="true"
      xid="typeData" idColumn="value"> 
      <column label="选择的语言" name="value" type="String" xid="xid4"/> 
    </div>  
    <div component="$UI/system/components/justep/data/data" autoLoad="true"
      xid="chooseSgy" idColumn="cName">
      <column label="选择的策略" name="cName" type="String" xid="xid7"/>
    </div>  
    <div component="$UI/system/components/justep/data/data" autoLoad="true"
      xid="compileData" idColumn="name"> 
      <column label="框架名称" name="name" type="String" xid="column1"/>  
      <data xid="default4">[{"name":"spring"},{"name":"jboss"},{"name":"bundle"}]</data>
    </div>  
    <div component="$UI/system/components/justep/data/data" autoLoad="false"
      xid="docData" idColumn="domin" autoNew="true"> 
      <column label="域名地址" name="domin" type="String" xid="xid23"/>  
      <column label="输出路径" name="output" type="String" xid="xid24"/>
    </div>
  </div>  
  <div component="$UI/system/components/justep/panel/panel" class="x-panel x-full"
    xid="panel1"> 
    <div class="x-panel-content" xid="content1" style="padding: 15px;"> 
      <div component="$UI/system/components/justep/labelEdit/labelEdit" class="x-label-edit x-label25"
        xid="labelEdit11"> 
        <label class="x-label" xid="label11" style="text-align:right;"><![CDATA[编译模式：]]></label>  
        <select component="$UI/system/components/justep/select/select" class="form-control x-edit"
          xid="select2" bind-options="compileData" bind-optionsValue="name" onChange="select1Change"
          bind-ref="compileName"/>
      </div>  
      <div component="$UI/system/components/justep/labelEdit/labelEdit" class="x-label-edit x-label25"
        xid="labelEdit3"> 
        <label class="x-label" xid="label4" style="text-align:right;"><![CDATA[引用策略：]]></label>  
        <div class="x-edit" xid="div3" style="height:38px;padding:8px 12px;">
          <span xid="strategyPut" bind-text="strategy"/>
        </div>
      </div>
      <div component="$UI/system/components/justep/labelEdit/labelEdit" class="x-label-edit x-label25"
        xid="labelEdit2"> 
        <label class="x-label" xid="label1"/>  
        <div class="x-edit" xid="div2">
          <div component="$UI/system/components/justep/list/list" class="x-list"
            xid="list2" data="strategyData"> 
            <ul class="x-list-template" xid="listTemplateUl2"> 
              <li xid="li2" class="pull-left"> 
                <div component="$UI/system/components/justep/labelEdit/labelEdit" class="x-label-edit x-label100" xid="labelEdit9" style="justify-content: flex-start;"><span component="$UI/system/components/justep/button/checkbox" class="x-checkbox" xid="strategyCheck" onChange="strategyCheckChange" bind-checked=" val(&quot;state&quot;)==&quot;1&quot;" bind-label='val("sName")' bind-value='ref("state")' checkedValue='"1"' uncheckedValue='"0"' /><label class="x-label" xid="label9" bind-text="val(&quot;sName&quot;)" /></div>
  </li> 
            </ul> 
          </div>
        </div>
      </div>
      <div class="panel panel-default" component="$UI/system/components/bootstrap/panel/panel"
        xid="panel5"> 
        <div class="panel-heading" xid="heading3"> 
          <h4 class="panel-title" xid="h43"><![CDATA[API 文档通用配置选项]]></h4>
        </div>  
        <div class="panel-body" xid="body3"> 
          <div component="$UI/system/components/justep/row/row" class="x-row"
            xid="row1"> 
            <div class="x-col" xid="col1">
              <div component="$UI/system/components/justep/labelEdit/labelEdit"
                class="x-label-edit x-label25" xid="labelEdit7"> 
                <label class="x-label" xid="label2" style="text-align:right;">访问地址：</label>  
                <input component="$UI/system/components/justep/input/input" class="form-control x-edit"
                  xid="input2" placeHolder="例如：http://localhost:3000" bind-ref="$model.docData.ref(&quot;domin&quot;)"/>
              </div>
            </div>  
            <div class="x-col" xid="col3">
              <div component="$UI/system/components/justep/labelEdit/labelEdit"
                class="x-label-edit x-label25" xid="labelEdit1"> 
                <label class="x-label" xid="label3" style="text-align:right;">输出路径：</label>  
                <input component="$UI/system/components/justep/input/input" class="form-control x-edit"
                  xid="input3" bind-ref="$model.docData.ref(&quot;output&quot;)"/>
              </div>
            </div>
          </div> 
        </div> 
      </div> 
    </div>  
    <div class="x-panel-bottom" xid="bottom1"> 
      <div xid="div1" style="padding-right:30px;">
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
