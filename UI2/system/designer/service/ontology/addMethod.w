<?xml version="1.0" encoding="utf-8"?>

<div xmlns="http://www.w3.org/1999/xhtml" xid="window" class="window" component="$UI/system/components/justep/window/window"
  design="device:pc">  
  <div component="$UI/system/components/justep/model/model" xid="model" style="top:395px;left:264px;height:auto;">
    <div component="$UI/system/components/justep/data/data" autoLoad="true"
      xid="methodData" idColumn="fieldName">
      <column label="字段名" name="fieldName" type="String" xid="xid3"/>  
      <column label="关键字" name="keyword" type="String" xid="xid4"/>  
      <column label="连接符" name="connect" type="String" xid="xid6"/>
    </div>  
    <div component="$UI/system/components/justep/data/data" autoLoad="true"
      xid="fieldNameData" idColumn="value">
      <column label="字段名称" name="value" type="String" xid="xid2"/>  
      <column label="模型类型" name="dataType" type="String" xid="xid12"/>
    </div>  
    <div component="$UI/system/components/justep/data/data" autoLoad="true"
      xid="keywordData" idColumn="value">
      <column label="关键字名称" name="value" type="String" xid="xid1"/>
    </div>  
    <div component="$UI/system/components/justep/data/data" autoLoad="true"
      xid="propsData" idColumn="methodName">
      <column label="方法名称" name="methodName" type="String" xid="xid11"></column>
  <column label="是否分页" name="pageable" type="String" xid="xid7"></column>
  <column label="是否对数据有修改" name="modify" type="String" xid="xid8"></column>
  <column label="返回值" name="result" type="String" xid="xid9"></column>
  <column label="排序" name="orderBy" type="String" xid="xid10"></column>
  <column label="sql语句" name="sql" type="String" xid="xid16"></column></div>  
    <div component="$UI/system/components/justep/data/data" autoLoad="true"
      xid="connectData" idColumn="word">
      <column label="连接符" name="word" type="String" xid="xid5"/>
    </div>
  <div component="$UI/system/components/justep/data/data" autoLoad="true" xid="orderByData" idColumn="fieldName"><column label="字段名称" name="fieldName" type="String" xid="xid13"></column>
  <column label="排序类型" name="type" type="String" xid="xid14"></column></div>
  <div component="$UI/system/components/justep/data/data" autoLoad="true" xid="resultData" idColumn="type"><column label="返回值类型" name="type" type="String" xid="xid15"></column></div></div>  
  <div component="$UI/system/components/justep/panel/panel" class="x-panel x-full"
    xid="panel1"> 
    <div class="x-panel-content" xid="content1"> 
      <div xid="propDiv" class="propDiv likeBlueDiv "> 
        <div xid="div3" class="spanDivstyle" style="width:70px; position:absolute;top:5px;"> 
          <span xid="span4" style="font-weight:700;font-size:small;"><![CDATA[属性列表]]></span>
        </div>  
        <div xid="div2" style="display:flex;">
          <div xid="modifyDiv" class="modifyDiv">
            <span component="$UI/system/components/justep/button/checkbox" class="x-checkbox" xid="checkbox2" label="修改操作" style="width:100%;height:100%;" bind-checked="$model.propsData.val(&quot;modify&quot;)==&quot;true&quot;" onChange="checkbox2Change" />
          </div><div xid="pageableDiv">
            <span component="$UI/system/components/justep/button/checkbox" class="x-checkbox"
              xid="checkbox1" label="结果分页" checked="false" bind-checked="$model.propsData.val(&quot;pageable&quot;)==&quot;true&quot;"
              onChange="checkbox1Change"/>
          </div>
          
        <div xid="div7" class="div7" style="margin-left:15px;">
   <span component="$UI/system/components/justep/button/checkbox" class="x-checkbox" xid="orderByCheckBox" label="排序" onChange="checkbox3Change" bind-checked=' $model.propsData.val("orderBy")=="true"'></span></div></div>
        <div xid="div1" class="orderByDiv" bind-visible=' $model.propsData.val("orderBy")=="true"'>
   
  <div style="margin-right:20px;"><div component="$UI/system/components/justep/labelEdit/labelEdit" class="x-label-edit x-label45" xid="labelEdit1">
   <select component="$UI/system/components/justep/select/select" class="form-control x-edit" xid="select6" bind-options="fieldNameData" bind-optionsValue="value" style="width:160px; border:1px solid #aaa;" bind-ref='$model.orderByData.ref("fieldName")'></select></div></div><div xid="div5"><span component="$UI/system/components/justep/button/checkbox" class="x-checkbox" xid="AscCheckbox" label="Asc" bind-checked=' $model.orderByData.val("type")=="Asc"' onChange="AscCheckboxChange"></span>
  <span component="$UI/system/components/justep/button/checkbox" class="x-checkbox" xid="DescCheckbox" bind-checked=' $model.orderByData.val("type")=="Desc"' label="Desc" onChange="DescCheckboxChange"></span></div>
  </div><div xid="resultDiv" class="resultDiv">
          <span xid="span5" style="width:80px;"><![CDATA[返回值：]]></span>
          <select component="$UI/system/components/justep/select/select" bind-optionsCaption="请选择..." class="form-control" xid="select3" style="border:1px solid #aaa;" bind-options="resultData" bind-optionsValue="type" bind-ref='$model.propsData.ref("result")'></select></div> 
      <div xid="sqlDiv" style="margin-top:10px;"><span xid="span6"><![CDATA[自定义SQL语句：]]></span>
  <textarea component="$UI/system/components/justep/textarea/textarea" class="form-control" xid="textarea2" style="border:1px solid #aaa; border-radius:6px; min-height:70px;margin-top:10px;" placeHolder="自定义sql" bind-ref='$model.propsData.ref("sql")'></textarea></div></div>
      <div xid="paramsDiv" style="width:100%;min-height:40%;margin-top:10px;max-height:100%;"
        class="likeBlueDiv"> 
        <div xid="spanDiv" class="spanDivstyle" style="width:70px;"> 
          <span xid="fromSpan" style="font-weight:700;font-size:small;"><![CDATA[参数列表]]></span> 
        </div>  
        <div component="$UI/system/components/justep/button/buttonGroup" class="btn-group topButtonGroup"
          tabbed="true" xid="buttonGroup5" style="margin-bottom:5px;"> 
          <a component="$UI/system/components/justep/button/button" class="btn btn-link btn-xs btn-icon-left"
            xid="addParam" icon="glyphicon glyphicon-plus" label="添加参数" onClick="addParamClick"> 
            <i xid="i20" class="glyphicon glyphicon-plus" style="color:#318E31;"/>  
            <span xid="span25">添加参数</span> 
          </a> 
        </div>  
        <div xid="div4" class="sunDiv"> 
          <table component="$UI/system/components/justep/list/list" class="x-list"
            xid="list4" style="width:100%;" data="methodData" dataItemAlias="$row"> 
            <thead xid="thead2"> 
              <tr xid="tr3"> 
                <th xid="default6" style="width:160px">字段名称</th>  
                <th xid="default6" style="width:160px">关键字</th>  
                <th xid="default6" style="width:80px">连接符</th>  
                <th xid="default6" style="width:30px">操作</th> 
              </tr> 
            </thead>  
            <tbody class="x-list-template" xid="listTemplate2"> 
              <tr xid="tr4"> 
                <td xid="td2"> 
                  <select component="$UI/system/components/justep/select/select"
                    bind-optionsCaption="请选择..." class="form-control" xid="select1"
                    bind-options="$model.fieldNameData" bind-optionsValue="value"
                    bind-ref="ref(&quot;fieldName&quot;)"/>
                </td>  
                <td xid="td5" style="position:relative;"> 
                  <select component="$UI/system/components/justep/select/select"
                    class="form-control" xid="select2"
                    bind-options="$model.keywordData" bind-optionsValue="value" bind-ref="ref(&quot;keyword&quot;)"/>
                </td>  
                <td xid="td4"> 
                  <select component="$UI/system/components/justep/select/select"
                    class="form-control" xid="select4"
                    bind-options="$model.connectData" bind-optionsValue="word"
                    bind-ref='ref("connect")'/>
                </td>
                <td xid="td1" style="text-align:center;"> 
                  <a component="$UI/system/components/justep/button/button"
                    class="btn btn-link btn-only-label" label="删除" xid="removeBtn"
                    onClick="removeBtnClick" bind-visible="$row.index()!=0"> 
                    <i xid="i3"/>  
                    <span xid="span3">删除</span>
                  </a>
                </td> 
              </tr> 
            </tbody> 
          </table> 
        </div> 
      </div>
    </div>  
    <div class="x-panel-bottom" xid="bottom1"> 
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
  <span component="$UI/system/components/justep/windowReceiver/windowReceiver"
    xid="windowReceiver1" onReceive="windowReceiver1Receive" style="top:296px;left:229px;"/> 
</div>
