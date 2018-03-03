<?xml version="1.0" encoding="utf-8"?>

<div xmlns="http://www.w3.org/1999/xhtml" component="$UI/system/components/justep/window/window" class="window">  
  <div component="$UI/system/components/justep/model/model" xid="model" style="height:auto;left:138px;top:151px;"
    onLoad="modelLoad"> 
    <div component="$UI/system/components/justep/data/data" xid="mainData"
      idColumn="id" onValueChange="mainDataValueChange"> 
      <column label="id" name="id" type="String" xid="default1"></column>
  <column label="业务数据列表" name="dataId" type="String" xid="default2"></column>
  <column label="canDelete" name="canDelete" type="String" xid="default3"></column>
  <column label="concept" name="concept" type="String" xid="default4"></column>
  <column label="writer" name="writer" type="String" xid="default5"></column>
  <column label="creator" name="creator" type="String" xid="default6"></column>
  <column label="reader" name="reader" type="String" xid="default8"></column>
  <column label="columns" name="columns" type="String" xid="default9"></column>
  <column label="是否显示为树形" name="isTree" type="Boolean" xid="default10"></column>
  <column label="parent-relation(*)" name="parentRelation" type="String" xid="default11"></column>
  <column label="node-kind-relation" name="nodeKindRelation" type="String" xid="default12"></column>
  <column label="node-level-relation" name="nodeLevelRelation" type="String" xid="default13"></column>
  <column label="root-filter" name="rootFilter" type="String" xid="default14"></column>
  <column label="是否为从数据" name="isDetail" type="Boolean" xid="default15"></column>
  <column label="master-data" name="masterData" type="String" xid="default16"></column>
  <column label="master-column" name="masterColumn" type="String" xid="default17"></column>
  <column label="概念名称" name="conceptName" type="String" xid="xid1"></column>
  <rule xid="rule4">
   <col name="dataId" xid="ruleCol3">
    <readonly xid="readonly3">
     <expr xid="default20">js:val('dataId')==&quot;mainData&quot;</expr></readonly> 
    <required xid="required1">
     <expr xid="default1">js:true</expr>
     <message xid="default21">dataId不能为空，</message></required> </col> 
   <col name="concept" xid="ruleCol4">
    <required xid="required2">
     <expr xid="default2">js:true</expr>
     <message xid="default21">请选择数据对象，</message></required> </col> 
   <col name="reader" xid="ruleCol5">
    <required xid="required3">
     <expr xid="default3"></expr>
     <message xid="default21"></message></required> </col> </rule></div>  
    <div component="$UI/system/components/justep/data/data" xid="treeConfigData"
      idColumn="xid"> 
      <rule xid="rule2"/>  
      <column label="xid" name="xid" type="String" xid="default18"/>  
      <column label="可选择数据名称" name="name" type="String" xid="default19"/> 
    </div> 
  </div>  
<!--   <div class="row nav-row">  -->
<!--     <ul class="nav navbar-nav" style="margin-left:15px">  -->
<!--       <li>  -->
<!--         <a bind-click="addDataBtnClick" href="#" role="button"> -->
<!--           <i class="glyphicon glyphicon-plus"/>新增 -->
<!--         </a>  -->
<!--       </li>   -->
<!--       <li>  -->
<!--         <a bind-click="deleteDataBtnClick" href="#" role="button"> -->
<!--           <i class="glyphicon glyphicon-minus"/>删除 -->
<!--         </a>  -->
<!--       </li> -->
<!--       </ul>  -->
<!--   </div>   -->
  <div class="row" style="padding-top:50px"> 
<!--     <div class="col-xs-3">  -->
<!--       <ul class="nav data-nav" id="sidebar" bind-foreach="mainData.datas">  -->
<!--         <li bind-css="{active: $model.mainData.currentRow.get() == $object}">  -->
<!--           <a href="#" bind-text="ref('dataId')" bind-click="pageClick"/>  -->
<!--         </li>  -->
<!--       </ul>  -->
<!--     </div>   -->
    <div class="col-xs-9 " style=""> 
      <form class="form-horizontal data-form scroll" style="margin-right:12px"
        role="form"> 
<!--         <div class="form-group">  -->
<!--           <label for="text1" class="control-label col-xs-3">数据ID(dataId)</label>   -->
<!--           <div class="col-xs-9">  -->
<!--             <input component="$UI/system/components/justep/input/input" class="form-control" -->
<!--               xid="dataId" data="mainData" bind-ref="mainData.ref('dataId')" bind-value="mainData.ref('dataId')"/>  -->
<!--           </div>  -->
<!--         </div>   -->
        <div class="form-group"> 
            
          <label for="text1" class="control-label col-xs-3"><![CDATA[数据对象]]></label><div class="col-xs-9"> 
             
          <div class="input-group input-append"> 
               
            <input component="$UI/system/components/justep/input/input" class="form-control  template-output-control" xid="concept" bind-value="mainData.ref('conceptName')"></input><span class="input-group-btn"> 
                <a class="btn btn-default" component="$UI/system/components/justep/button/button" bind-click="selectConceptBtnClick">选择</a> 
              </span></div></div> 
        </div>  
          
          
          
          
<!--         <div class="form-group">  -->
<!--           <label for="text1" class="control-label col-xs-3">是否显示为树</label>   -->
<!--           <div class="col-xs-9">  -->
<!--             <span component="$UI/system/components/justep/button/checkbox" xid="isTree" -->
<!--               class="x-checkbox" name="checkbox" onChange="isTreeChange" checkedValue="1"/>  -->
<!--           </div>  -->
<!--         </div> -->
<!--         <div class="form-group" bind-visible="$model.mainData.val('dataId')!='mainData'">  -->
<!--           <label for="text2" class="control-label col-xs-3">是否为从数据</label>   -->
<!--           <div class="col-xs-9">  -->
<!--             <span component="$UI/system/components/justep/button/checkbox" xid="isDetail" -->
<!--               class="x-checkbox" name="checkbox"  onChange="isDetailChange" -->
<!--               checkedValue="1"/>  -->
<!--           </div>  -->
<!--         </div>   -->
<!--         <div class="form-group tree" style="display:none;">  -->
<!--           <label for="text1" class="control-label col-xs-3">parent-relation(*):</label>   -->
<!--           <div class="col-xs-9">  -->
<!--             <select class="form-control" component="$UI/system/components/justep/select/select" -->
<!--               bind-ref="mainData.ref('parentRelation')" bind-labelRef="mainData.ref('parentRelation')" -->
<!--               bind-options="treeConfigData" bind-optionsValue="name" bind-optionsCaption="" -->
<!--               bind-click="select1Click" />  -->
<!--           </div>  -->
<!--         </div>   -->
<!--         <div class="form-group tree" style="display:none;">  -->
<!--           <label for="text1" class="control-label col-xs-3">node-kind-relation:</label>   -->
<!--           <div class="col-xs-9">  -->
<!--             <select class="form-control" component="$UI/system/components/justep/select/select" -->
<!--               bind-ref="mainData.ref('nodeKindRelation')" bind-labelRef="mainData.ref('nodeKindRelation')" -->
<!--               bind-options="treeConfigData" bind-optionsValue="name" bind-optionsCaption="" -->
<!--               bind-click="select1Click"/>  -->
<!--           </div>  -->
<!--         </div>   -->
<!--         <div class="form-group tree" style="display:none;">  -->
<!--           <label for="text1" class="control-label col-xs-3">node-level-relation</label>   -->
<!--           <div class="col-xs-9">  -->
<!--             <select class="form-control" component="$UI/system/components/justep/select/select" -->
<!--               bind-ref="mainData.ref('nodeLevelRelation')" bind-labelRef="mainData.ref('nodeLevelRelation')" -->
<!--               bind-options="treeConfigData" bind-optionsValue="name" bind-optionsCaption="" -->
<!--               bind-click="select1Click"/>  -->
<!--           </div>  -->
<!--         </div>   -->
<!--         <div class="form-group tree" style="display:none;">  -->
<!--           <label for="text1" class="control-label col-xs-3">root-filter</label>   -->
<!--           <div class="col-xs-9">  -->
<!--             <input component="$UI/system/components/justep/input/input" class="form-control" -->
<!--               data="mainData" bind-ref="mainData.ref('rootFilter')" bind-value="mainData.ref('rootFilter')"/>  -->
<!--           </div>  -->
<!--         </div>   -->
<!--         <div class="form-group detail" style="display:none;">  -->
<!--           <label for="text2" class="control-label col-xs-3">master-data(*):</label>   -->
<!--           <div class="col-xs-9">  -->
<!--             <select class="form-control" component="$UI/system/components/justep/select/select" -->
<!--               bind-labelRef="mainData.ref('masterData')" -->
<!--               bind-options="mainData" bind-optionsValue="dataId" bind-optionsCaption="select the masterData" bind-value="mainData.ref('masterData')"/>  -->
<!--           </div>  -->
<!--         </div>   -->
<!--         <div class="form-group detail" style="display:none;">  -->
<!--           <label for="text2" class="control-label col-xs-3">master-column(*):</label>   -->
<!--           <div class="col-xs-9">  -->
<!--             <select class="form-control" component="$UI/system/components/justep/select/select" -->
<!--               bind-labelRef="mainData.ref('masterColumn')" -->
<!--               bind-options="treeConfigData" bind-optionsValue="name" bind-optionsCaption="" -->
<!--               bind-click="select1Click" bind-value="mainData.ref('masterColumn')"/>  -->
<!--           </div>  -->
<!--         </div>  -->
      <div xid="normalModeDiv" style="display:none;"><div class="form-group"> 
          <label for="text1" class="control-label col-xs-3">读取动作(reader)</label>  
          <div class="col-xs-9"> 
            <div class="input-group input-append"> 
              <input component="$UI/system/components/justep/input/input" class="form-control template-output-control" xid="reader" bind-value="mainData.ref('reader')"></input><span class="input-group-btn"> 
                <a class="btn btn-default" component="$UI/system/components/justep/button/button" bind-click="selectReaderBtnClick">选择</a> 
              </span> 
            </div> 
          </div> 
        </div><div class="form-group"> 
          <label for="text1" class="control-label col-xs-3">写入动作(writer)</label>  
          <div class="col-xs-9"> 
            <div class="input-group input-append">
              <input component="$UI/system/components/justep/input/input" class="form-control template-output-control" xid="writer" bind-value="mainData.ref('writer')"></input><span class="input-group-btn"> 
                <a class="btn btn-default" component="$UI/system/components/justep/button/button" bind-click="selectWriterBtnClick">选择</a> 
              </span> 
            </div> 
          </div> 
        </div><div class="form-group"> 
          <label for="text1" class="control-label col-xs-3">新建动作(creator)</label>  
          <div class="col-xs-9"> 
            <div class="input-group input-append">
            	<input component="$UI/system/components/justep/input/input" class="form-control template-output-control" xid="creator" bind-value="mainData.ref('creator')"></input><span class="input-group-btn"> 
                <a class="btn btn-default" component="$UI/system/components/justep/button/button" bind-click="selectCreatorBtnClick">选择</a> 
              </span> 
            </div> 
          </div> 
        </div><div class="form-group"> 
          <label for="text1" class="control-label col-xs-3">关系(columns)</label>  
          <div class="col-xs-9"> 
            <div class="input-group input-append">
            	<output component="$UI/system/components/justep/output/output" class="form-control template-output-control" xid="columns" bind-value="mainData.ref('columns')" /> 
              <span class="input-group-btn"> 
                <a class="btn btn-default" component="$UI/system/components/justep/button/button" bind-click="selectRelationsBtnClick">选择</a> 
              </span> 
            </div> 
          </div> 
        </div></div></form> 
    </div> 
  </div> 
</div>
