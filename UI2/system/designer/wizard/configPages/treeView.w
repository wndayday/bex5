<?xml version="1.0" encoding="utf-8"?>

<div xmlns="http://www.w3.org/1999/xhtml" xid="window" class="window" component="$UI/system/components/justep/window/window">  
  <div component="$UI/system/components/justep/model/model" xid="model" onLoad="modelLoad"
    style="height:auto;top:351px;left:117px;" onParamsReceive="modelParamsReceive"> 
    <div component="$UI/system/components/justep/data/data" xid="treeData"
      idColumn="id"> 
      <column label="id" name="id" type="String" xid="xid1"></column>
  <column label="parent-relation(*)" name="parentRelation" type="String" xid="xid3"></column>
  <column label="根节点" name="rootNodeLable" type="String" xid="xid4"></column>
  <column label="显示列" name="treeNodeLabel" type="String" xid="xid5"></column>
  <column label="node-kind-relation" name="nodeKindRelation" type="String" xid="xid6"></column>
  <column label="node-level-relation" name="nodeLevelRelation" type="String" xid="xid7"></column>
  <column label="root-filter" name="rootFilter" type="String" xid="xid8"></column>
  <rule xid="rule1">
   <col name="parentRelation" xid="ruleCol1">
    <required xid="required1">
     <expr xid="default1">js:true</expr>
     <message xid="default2">parent-relation(*) 必填</message></required> 
    <calculate xid="calculate1">
     <expr xid="default5">'fParent'</expr></calculate> </col> 
   <col name="treeNodeName" xid="ruleCol2">
    <required xid="required2">
     <expr xid="default3">js:true</expr>
     <message xid="default4">树节点名称必填</message></required> </col> 
   <col name="nodeKindRelation" xid="ruleCol3">
    <calculate xid="calculate2">
     <expr xid="default6">'fNodeKind'</expr></calculate> </col> </rule>
  <column name="treeNodeName" type="String" xid="xid9"></column></div>  
    <div component="$UI/system/components/justep/data/data" xid="canSelectData"
      idColumn="xid"> 
      <column label="xid" name="xid" type="String" xid="xid2"/>  
      <column label="可选择数据名称" name="name" type="String" xid="default7"/> 
    </div> 
  </div>  
  <div class="row" style="padding-top:50px"> 
    <div class="col-xs-9"> 
      <form class="form-horizontal data-form scroll" style="margin-right:12px"
        role="form"> 
        <div class="form-group"> 
          <label for="text1" class="control-label col-xs-3"><![CDATA[根节点]]></label>  
          <div class="col-xs-9"> 
              <input component="$UI/system/components/justep/input/input" class="form-control"
                xid="input1" bind-ref="treeData.ref('rootNodeLable')"/> 
          </div> 
        </div>  
        <div class="form-group"> 
          <label for="text1" class="control-label col-xs-3"><![CDATA[显示列]]></label>  
          <div class="col-xs-9"> 
            <div class="input-group input-append"> 
              <output component="$UI/system/components/justep/output/output" class="form-control template-output-control"
                xid="output1" bind-value=' $model.treeData.val("treeNodeLabel")'/>  
              <span class="input-group-btn"> 
                <a class="btn btn-default" component="$UI/system/components/justep/button/button"
                  bind-click="selectRootLabel" bind-enable="treeData.count()&gt;0">选择</a> 
              </span> 
            </div> 
          </div> 
        </div>  
          
          
         
      <div xid="div1" style="display:none;"><div class="form-group"> 
          <label for="text1" class="control-label col-xs-3">parentRelation(*)</label>  
          <div class="col-xs-9"> 
            <div class="input-group input-append"> 
              <output component="$UI/system/components/justep/output/output" class="form-control template-output-control" xid="output2" bind-value="treeData.val(&quot;parentRelation&quot;)" />  
              <span class="input-group-btn"> 
                <a class="btn btn-default" component="$UI/system/components/justep/button/button" bind-click="selectParentRelation">选择</a> 
              </span> 
            </div> 
          </div> 
        </div><div class="form-group"> 
          <label for="text1" class="control-label col-xs-3">nodeKindRelation</label>  
          <div class="col-xs-9"> 
            <div class="input-group input-append"> 
              <output component="$UI/system/components/justep/output/output" class="form-control template-output-control" xid="output3" bind-value="treeData.val(&quot;nodeKindRelation&quot;)" />  
              <span class="input-group-btn"> 
                <a class="btn btn-default" component="$UI/system/components/justep/button/button" bind-click="selectNodeKind">选择</a> 
              </span> 
            </div> 
          </div> 
        </div><div class="form-group"> 
          <label for="text1" class="control-label col-xs-3">rootFilter</label>  
          <div class="col-xs-9"> 
              <input component="$UI/system/components/justep/input/input" class="form-control" xid="input2" bind-ref="treeData.ref('rootFilter')" /> 
          </div> 
        </div></div></form> 
    </div> 
  </div> 
  </div>
